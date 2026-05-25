import type { LeadInput, LeadRecord } from "@/lib/lead-storage";

/*
 * 文件说明：该文件封装诊断线索的 webhook 推送能力。
 * 功能说明：负责把线索内容格式化后分别推送到飞书和企业微信机器人，失败时只记录日志，不中断主流程。
 *
 * 结构概览：
 *   第一部分：类型与消息格式化
 *   第二部分：飞书推送
 *   第三部分：企业微信推送
 */

// ========== 第一部分：类型与消息格式化 ==========
type LeadWebhookPayload = LeadInput | LeadRecord;

function formatLeadMessage(data: LeadWebhookPayload) {
  return [
    "【CNAS认可路径诊断线索】",
    `称呼：${data.name}`,
    `企业名称：${data.company}`,
    `企业类型：${data.enterpriseType}`,
    `阶段：${data.stage}`,
    `是否已有实验室：${data.hasLab}`,
    `启动时间：${data.startTime}`,
    `设备规划：${data.equipmentPlan}`,
    `电话：${data.phone || "未填写"}`,
    `微信：${data.wechat || "未填写"}`,
    `需求描述：${data.demand}`,
    `来源页面：${data.sourcePage}`,
    `UTM：${data.utmSource || "-"} / ${data.utmMedium || "-"} / ${data.utmCampaign || "-"}`,
  ].join("\n");
}

async function postWebhook(url: string, body: Record<string, unknown>, label: string) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const responseText = await response.text();
      console.error(`[lead:webhook:${label}:error]`, response.status, responseText);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`[lead:webhook:${label}:error]`, error);
    return false;
  }
}

// ========== 第二部分：飞书推送 ==========
export async function sendToFeishu(data: LeadWebhookPayload) {
  const webhookUrl = process.env.LEAD_WEBHOOK_FEISHU?.trim();

  if (!webhookUrl) {
    return false;
  }

  return postWebhook(
    webhookUrl,
    {
      msg_type: "text",
      content: {
        text: formatLeadMessage(data),
      },
    },
    "feishu",
  );
}

// ========== 第三部分：企业微信推送 ==========
export async function sendToWechat(data: LeadWebhookPayload) {
  const webhookUrl = process.env.LEAD_WEBHOOK_WECHAT?.trim();

  if (!webhookUrl) {
    return false;
  }

  return postWebhook(
    webhookUrl,
    {
      msgtype: "text",
      text: {
        content: formatLeadMessage(data),
      },
    },
    "wechat",
  );
}

export function hasLeadWebhookConfigured() {
  return Boolean(process.env.LEAD_WEBHOOK_FEISHU?.trim() || process.env.LEAD_WEBHOOK_WECHAT?.trim());
}

export async function sendLeadNotifications(data: LeadWebhookPayload) {
  const results = await Promise.all([
    process.env.LEAD_WEBHOOK_FEISHU?.trim() ? sendToFeishu(data) : Promise.resolve(false),
    process.env.LEAD_WEBHOOK_WECHAT?.trim() ? sendToWechat(data) : Promise.resolve(false),
  ]);

  return {
    configured: hasLeadWebhookConfigured(),
    delivered: results.some(Boolean),
  };
}
