import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

/*
 * 文件说明：该文件维护线索表单的本地存储能力。
 * 功能说明：提供读取、追加和初始化 leads.json 的轻量方法，供 API Route 与管理页共用。
 *
 * 结构概览：
 *   第一部分：类型定义与路径常量
 *   第二部分：文件读写辅助函数
 *   第三部分：对外存储接口
 */

// ========== 第一部分：类型定义与路径常量 ==========
export type LeadInput = {
  enterpriseType: string;
  hasLab: string;
  stage: string;
  startTime: string;
  equipmentPlan: string;
  contact: string;
};

export type LeadRecord = LeadInput & {
  id: string;
  createdAt: string;
};

const leadsFilePath = path.join(process.cwd(), "data", "leads.json");

// ========== 第二部分：文件读写辅助函数 ==========
async function ensureLeadsFile() {
  await mkdir(path.dirname(leadsFilePath), { recursive: true });

  try {
    await readFile(leadsFilePath, "utf8");
  } catch {
    await writeFile(leadsFilePath, "[]\n", "utf8");
  }
}

async function readLeadFile(): Promise<LeadRecord[]> {
  await ensureLeadsFile();

  try {
    const raw = await readFile(leadsFilePath, "utf8");
    const parsed = JSON.parse(raw);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// ========== 第三部分：对外存储接口 ==========
export async function getLeads() {
  return readLeadFile();
}

export async function appendLead(input: LeadInput) {
  const leads = await readLeadFile();
  const record: LeadRecord = {
    ...input,
    id: `${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  leads.unshift(record);
  await writeFile(leadsFilePath, `${JSON.stringify(leads, null, 2)}\n`, "utf8");

  return record;
}
