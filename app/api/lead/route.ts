import { NextResponse } from "next/server";
import { appendLead, type LeadInput } from "@/lib/lead-storage";
import { sendToFeishu, sendToWechat } from "@/lib/webhook";

/*
 * 文件说明：该文件实现诊断线索提交 API。
 * 功能说明：接收前端诊断表单 JSON，做最小校验后先写入本地 leads.json，再并行推送飞书与企业微信 webhook。
 *
 * 结构概览：
 *   第一部分：辅助函数
 *   第二部分：POST 提交处理
 */

// ========== 第一部分：辅助函数 ==========
function normalizeField(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function validateLeadInput(body: Record<string, unknown>): LeadInput | null {
  const payload: LeadInput = {
    enterpriseType: normalizeField(body.enterpriseType),
    hasLab: normalizeField(body.hasLab),
    stage: normalizeField(body.stage),
    startTime: normalizeField(body.startTime),
    equipmentPlan: normalizeField(body.equipmentPlan),
    contact: normalizeField(body.contact),
  };

  const requiredFields = Object.values(payload);

  if (requiredFields.some((field) => field.length === 0)) {
    return null;
  }

  if (payload.contact.length < 5) {
    return null;
  }

  return payload;
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

  const record = await appendLead(leadInput);

  console.log("[lead:created]", record);
  await Promise.all([sendToFeishu(record), sendToWechat(record)]);

  return NextResponse.json({
    success: true,
    message: "线索已收到。",
  });
}
