import { NextResponse } from "next/server";
import { appendLead, hasRecentDuplicateLead, type LeadInput } from "@/lib/lead-storage";
import { hasLeadWebhookConfigured, sendLeadNotifications } from "@/lib/webhook";

/*
 * 文件说明：该文件实现诊断线索提交 API。
 * 功能说明：接收前端诊断表单 JSON，做最小校验后先写入本地 leads.json，再并行推送飞书与企业微信 webhook。
 *
 * 结构概览：
 *   第一部分：辅助函数
 *   第二部分：POST 提交处理
 */

// ========== 第一部分：辅助函数 ==========
function normalizeField(value: unknown, maxLength = 120) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().replace(/[<>]/g, "").slice(0, maxLength);
}

function hasSuspiciousContent(value: string) {
  return /<script|javascript:|data:text\/html/i.test(value);
}

function validateLeadInput(body: Record<string, unknown>): LeadInput | null {
  const payload: LeadInput = {
    name: normalizeField(body.name, 40),
    company: normalizeField(body.company, 80),
    enterpriseType: normalizeField(body.enterpriseType, 80),
    hasLab: normalizeField(body.hasLab, 80),
    stage: normalizeField(body.stage, 80),
    startTime: normalizeField(body.startTime, 80),
    equipmentPlan: normalizeField(body.equipmentPlan, 80),
    contact: normalizeField(body.contact, 120),
    phone: normalizeField(body.phone, 30),
    wechat: normalizeField(body.wechat, 60),
    demand: normalizeField(body.demand, 300),
    sourcePage: normalizeField(body.sourcePage, 160) || "/diagnosis",
    utmSource: normalizeField(body.utmSource, 80),
    utmMedium: normalizeField(body.utmMedium, 80),
    utmCampaign: normalizeField(body.utmCampaign, 120),
  };

  const requiredFields = [
    payload.name,
    payload.company,
    payload.enterpriseType,
    payload.hasLab,
    payload.stage,
    payload.startTime,
    payload.equipmentPlan,
    payload.demand,
  ];

  if (requiredFields.some((field) => field.length === 0)) {
    return null;
  }

  if (!payload.phone && !payload.wechat && payload.contact.length < 5) {
    return null;
  }

  if (Object.values(payload).some(hasSuspiciousContent)) {
    return null;
  }

  return payload;
}

function getLeadLogPayload(record: Awaited<ReturnType<typeof appendLead>>) {
  const phoneLast4 = record.phone ? record.phone.slice(-4) : "";

  return {
    event: "lead received",
    createdAt: record.createdAt,
    source: record.sourcePage,
    utm_source: record.utmSource || "",
    hasPhone: Boolean(record.phone),
    hasWechat: Boolean(record.wechat),
    phoneLast4,
  };
}
// ========== 第二部分：POST 提交处理 ==========
export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "请求格式不正确。",
      },
      { status: 400 },
    );
  }

  const leadInput = validateLeadInput(body);

  if (!leadInput) {
    return NextResponse.json(
      {
        success: false,
        message: "请完整填写表单，并确认联系方式有效。",
      },
      { status: 400 },
    );
  }

  const contactKey = leadInput.phone || leadInput.wechat || leadInput.contact;

  if (await hasRecentDuplicateLead(contactKey)) {
    return NextResponse.json(
      {
        success: false,
        message: "我们已经收到你的信息，请不要重复提交。",
      },
      { status: 429 },
    );
  }

  const record = await appendLead(leadInput);

  if (process.env.NODE_ENV === "production") {
    console.info("[lead:created]", getLeadLogPayload(record));
  } else {
    console.info("[lead:created:dev]", record);
  }

  if (process.env.NODE_ENV === "production" && !hasLeadWebhookConfigured()) {
    console.warn("[lead:webhook:missing] No lead webhook is configured. Local JSON is only a fallback store.");
  }

  const notificationResult = await sendLeadNotifications(record);

  if (notificationResult.configured && !notificationResult.delivered) {
    console.error("[lead:webhook:all-failed]", getLeadLogPayload(record));

    return NextResponse.json(
      {
        success: true,
        message: "信息已收到，通知通道暂时可能延迟，我们会尽快处理。",
        deliveryStatus: "notification_failed",
      },
      { status: 202 },
    );
  }

  return NextResponse.json({
    success: true,
    message: notificationResult.delivered ? "信息已收到，我们会尽快联系你。" : "信息已收到，我们会尽快处理。",
    deliveryStatus: notificationResult.delivered ? "notified" : "local_backup_only",
  });
}
