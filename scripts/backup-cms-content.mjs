/*
 * 文件说明：该脚本用于手动备份 CMS 正式内容 JSON。
 * 功能说明：读取 data/articles.json、data/faqs.json、data/categories.json，并复制到 data/backups/manual/ 时间戳文件。
 *
 * 结构概览：
 *   第一部分：导入依赖与路径常量
 *   第二部分：时间戳与复制工具
 *   第三部分：主流程
 */

// ========== 第一部分：导入依赖与路径常量 ==========
import { access, copyFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const rootDir = process.cwd();
const backupDir = resolve(rootDir, "data", "backups", "manual");
const cmsFiles = [
  { name: "articles", source: resolve(rootDir, "data", "articles.json") },
  { name: "faqs", source: resolve(rootDir, "data", "faqs.json") },
  { name: "categories", source: resolve(rootDir, "data", "categories.json") },
];

// ========== 第二部分：时间戳与复制工具 ==========
function getTimestamp() {
  const now = new Date();

  return [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
    "-",
    String(now.getHours()).padStart(2, "0"),
    String(now.getMinutes()).padStart(2, "0"),
    String(now.getSeconds()).padStart(2, "0"),
  ].join("");
}

async function assertReadable(filePath) {
  try {
    await access(filePath);
  } catch {
    throw new Error(`CMS 内容文件不存在或不可读：${filePath}`);
  }
}

// ========== 第三部分：主流程 ==========
async function main() {
  const timestamp = getTimestamp();
  const outputPaths = [];

  await mkdir(backupDir, { recursive: true });

  for (const file of cmsFiles) {
    await assertReadable(file.source);

    const target = resolve(backupDir, `${file.name}-${timestamp}.json`);
    await copyFile(file.source, target);
    outputPaths.push(target);
  }

  console.log("CMS 正式内容已备份：");
  for (const outputPath of outputPaths) {
    console.log(`- ${outputPath}`);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
