/*
 * 文件说明：该脚本用于导出 CMS 正式内容 JSON。
 * 功能说明：将 data/articles.json、data/faqs.json、data/categories.json 复制到 exports/cms-content/，用于把线上内容回灌到 GitHub。
 *
 * 结构概览：
 *   第一部分：导入依赖与路径常量
 *   第二部分：时间与文件工具
 *   第三部分：README 生成
 *   第四部分：主流程
 */

// ========== 第一部分：导入依赖与路径常量 ==========
import { access, copyFile, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const rootDir = process.cwd();
const exportDir = resolve(rootDir, "exports", "cms-content");
const cmsFiles = [
  { name: "articles.json", source: resolve(rootDir, "data", "articles.json") },
  { name: "faqs.json", source: resolve(rootDir, "data", "faqs.json") },
  { name: "categories.json", source: resolve(rootDir, "data", "categories.json") },
];

// ========== 第二部分：时间与文件工具 ==========
function formatDateTime() {
  const now = new Date();

  return [
    `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`,
    `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`,
  ].join(" ");
}

async function assertReadable(filePath) {
  try {
    await access(filePath);
  } catch {
    throw new Error(`CMS 内容文件不存在或不可读：${filePath}`);
  }
}

// ========== 第三部分：README 生成 ==========
function createReadme(exportTime) {
  return `# CMS 内容导出

导出时间：${exportTime}

来源目录：

\`\`\`text
${resolve(rootDir, "data")}
\`\`\`

## 用途

本目录用于临时保存线上 CMS 正式内容，方便把服务器后台编辑后的内容回灌到 GitHub 仓库。

## 包含文件

- \`articles.json\`：正式文章内容。
- \`faqs.json\`：FAQ 内容。
- \`categories.json\`：栏目内容。

## 不包含内容

- 不包含 \`data/article-drafts.json\`。
- 不包含 \`data/leads.json\`。
- 不包含 \`data/backups/\`。

## 回灌方式

如需把线上内容同步回 GitHub，请人工检查本目录 JSON 后复制到仓库正式数据文件：

- \`data/articles.json\`
- \`data/faqs.json\`
- \`data/categories.json\`

随后执行构建和类型检查，再提交 Git。
`;
}

// ========== 第四部分：主流程 ==========
async function main() {
  const exportTime = formatDateTime();
  const outputPaths = [];

  await mkdir(exportDir, { recursive: true });

  for (const file of cmsFiles) {
    await assertReadable(file.source);

    const target = resolve(exportDir, file.name);
    await copyFile(file.source, target);
    outputPaths.push(target);
  }

  const readmePath = resolve(exportDir, "README.md");
  await writeFile(readmePath, createReadme(exportTime), "utf8");
  outputPaths.push(readmePath);

  console.log("CMS 正式内容已导出：");
  for (const outputPath of outputPaths) {
    console.log(`- ${outputPath}`);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
