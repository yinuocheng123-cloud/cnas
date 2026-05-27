/*
 * 文件说明：该文件实现 CMS v1.2 的 JSON 内容读写层。
 * 功能说明：统一读取 data/articles.json、data/faqs.json、data/categories.json，并提供后台保存、备份、风险词校验和内容结构转换。
 *
 * 结构概览：
 *   第一部分：导入依赖
 *   第二部分：类型定义与常量
 *   第三部分：通用文件读写与备份
 *   第四部分：文章数据读取、解析与保存
 *   第五部分：FAQ 与栏目数据读取和保存
 */

// ========== 第一部分：导入依赖 ==========
import { randomUUID } from "node:crypto";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

// ========== 第二部分：类型定义与常量 ==========
export type CmsArticleStatus = "published" | "draft" | "archived";

export type CmsArticleSection = {
  heading: string;
  paragraphs: string[];
};

export type CmsArticleTableRow = {
  item: string;
  judgment: string;
  action: string;
};

export type CmsFaq = {
  id: string;
  question: string;
  answer: string;
  category: string;
  sourcePage: string;
  featured: boolean;
  order: number;
  status: CmsArticleStatus;
};

export type CmsArticle = {
  id: string;
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  category: string;
  mainKeyword: string;
  relatedKeywords: string[];
  summary: string;
  content: string;
  sections: CmsArticleSection[];
  table: CmsArticleTableRow[];
  faq: Omit<CmsFaq, "id" | "category" | "sourcePage" | "featured" | "order" | "status">[];
  faqs?: Omit<CmsFaq, "id" | "category" | "sourcePage" | "featured" | "order" | "status">[];
  nextSteps: string[];
  status: CmsArticleStatus;
  featured: boolean;
  publishDate: string;
  updateDate: string;
  conclusion: string;
  definition: string;
};

export type CmsCategory = {
  id: string;
  name: string;
  slug: string;
  path: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  order: number;
  featured: boolean;
  status: CmsArticleStatus;
};

export type CmsContentValidationResult = {
  ok: boolean;
  message?: string;
};

const dataDir = join(process.cwd(), "data");
const backupDir = join(dataDir, "backups");
const articlesFilePath = join(dataDir, "articles.json");
const faqsFilePath = join(dataDir, "faqs.json");
const categoriesFilePath = join(dataDir, "categories.json");
const articleStatuses: CmsArticleStatus[] = ["published", "draft", "archived"];
const riskWords = ["包过", "保证通过", "官方指定", "唯一", "最权威", "100%通过", "必过"];

function cleanWordPastedText(value: string) {
  return value
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// ========== 第三部分：通用文件读写与备份 ==========
function readJsonFileSync<T>(filePath: string, fallback: T): T {
  try {
    const raw = readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw) as T;

    return parsed;
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;

    if (code === "ENOENT") {
      return fallback;
    }

    throw error;
  }
}

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as T;

    return parsed;
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;

    if (code === "ENOENT") {
      return fallback;
    }

    throw error;
  }
}

function getBackupFilePath(filePath: string) {
  const now = new Date();
  const timestamp = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
    "-",
    String(now.getHours()).padStart(2, "0"),
    String(now.getMinutes()).padStart(2, "0"),
    String(now.getSeconds()).padStart(2, "0"),
  ].join("");
  const name = filePath.endsWith("articles.json") ? "articles" : filePath.endsWith("faqs.json") ? "faqs" : "categories";

  return join(backupDir, `${name}-${timestamp}.json`);
}

async function backupFileIfExists(filePath: string) {
  if (!existsSync(filePath)) {
    return;
  }

  await mkdir(backupDir, { recursive: true });
  await copyFile(filePath, getBackupFilePath(filePath));
}

async function writeJsonFile<T>(filePath: string, data: T) {
  await mkdir(dirname(filePath), { recursive: true });
  await backupFileIfExists(filePath);
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function ensureDataDir() {
  mkdirSync(dataDir, { recursive: true });
}

export function getCmsDataFilePaths() {
  return {
    articles: articlesFilePath,
    faqs: faqsFilePath,
    categories: categoriesFilePath,
    backups: backupDir,
  };
}

// ========== 第四部分：文章数据读取、解析与保存 ==========
export function getCmsArticleStatuses() {
  return articleStatuses;
}

export function getRiskWords() {
  return riskWords;
}

export function normalizeSlug(value: string) {
  return cleanWordPastedText(value)
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function parseTextList(value: string) {
  return cleanWordPastedText(value)
    .split(/[\n,，、]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function stringifyTextList(value: string[]) {
  return value.join("\n");
}

export function parseCmsFaqText(value: string) {
  const cleaned = cleanWordPastedText(value);

  if (!cleaned) {
    return [];
  }

  return cleaned
    .split(/\n{2,}/)
    .map((block) => {
      const lines = block
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
      const questionLine = lines.find((line) => /^问[:：]/.test(line)) ?? lines[0] ?? "";
      const answerLine = lines.find((line) => /^答[:：]/.test(line)) ?? lines.slice(1).join(" ");

      return {
        question: questionLine.replace(/^问[:：]/, "").trim(),
        answer: answerLine.replace(/^答[:：]/, "").trim(),
      };
    })
    .filter((faq) => faq.question && faq.answer);
}

export function stringifyCmsFaqText(value: { question: string; answer: string }[]) {
  return value.map((faq) => `问：${faq.question}\n答：${faq.answer}`).join("\n\n");
}

export function parseArticleContentSections(value: string): CmsArticleSection[] {
  const cleaned = cleanWordPastedText(value);

  if (!cleaned) {
    return [];
  }

  const sections: CmsArticleSection[] = [];
  let current: CmsArticleSection = { heading: "正文", paragraphs: [] };

  for (const block of cleaned.split(/\n{2,}/)) {
    const trimmed = block.trim();

    if (!trimmed) {
      continue;
    }

    if (trimmed.startsWith("## ")) {
      if (current.paragraphs.length > 0 || current.heading !== "正文") {
        sections.push(current);
      }
      current = { heading: trimmed.replace(/^##\s+/, "").trim(), paragraphs: [] };
      continue;
    }

    current.paragraphs.push(trimmed);
  }

  if (current.paragraphs.length > 0 || current.heading !== "正文") {
    sections.push(current);
  }

  return sections;
}

export function validateRiskWords(values: string[]) {
  const text = values.join("\n");
  const matched = riskWords.filter((word) => text.includes(word));

  if (matched.length > 0) {
    return {
      ok: false,
      message: `内容命中风险词：${matched.join("、")}。请调整后再保存。`,
    };
  }

  return { ok: true };
}

export function validateCnasCertificationText(values: string[]) {
  const text = values.join("\n");

  if (text.includes("CNAS认证") && !text.includes("CNAS认可和CNAS认证有什么区别")) {
    return {
      ok: false,
      message: "内容出现“CNAS认证”，除解释“CNAS认可和CNAS认证区别”的语境外，请统一改为“CNAS认可”。",
    };
  }

  return { ok: true };
}

export function validateCmsText(values: string[]): CmsContentValidationResult {
  const riskCheck = validateRiskWords(values);

  if (!riskCheck.ok) {
    return riskCheck;
  }

  return validateCnasCertificationText(values);
}

export function getCmsArticlesSync() {
  ensureDataDir();

  return readJsonFileSync<CmsArticle[]>(articlesFilePath, []);
}

export async function getCmsArticles() {
  return readJsonFile<CmsArticle[]>(articlesFilePath, []);
}

export function getPublishedCmsArticlesSync() {
  return getCmsArticlesSync().filter((article) => article.status === "published");
}

export function getCmsArticleBySlug(slug: string) {
  return getPublishedCmsArticlesSync().find((article) => article.slug === slug);
}

export function getCmsArticleById(id: string) {
  return getCmsArticlesSync().find((article) => article.id === id);
}

export function getCmsArticleCategories() {
  return Array.from(new Set(getCmsArticlesSync().map((article) => article.category))).filter(Boolean);
}

export function getCmsArticlesByCategory(category: string) {
  return getPublishedCmsArticlesSync().filter((article) => article.category === category);
}

export function parseCmsArticleForm(formData: FormData, current?: CmsArticle): CmsArticle {
  const now = new Date().toISOString().slice(0, 10);
  const status = String(formData.get("status") ?? current?.status ?? "draft") as CmsArticleStatus;
  const slug = normalizeSlug(String(formData.get("slug") ?? current?.slug ?? ""));
  const content = cleanWordPastedText(String(formData.get("content") ?? current?.content ?? ""));
  const faq = parseCmsFaqText(String(formData.get("faqsText") ?? ""));
  const relatedKeywords = parseTextList(String(formData.get("relatedKeywordsText") ?? ""));
  const title = cleanWordPastedText(String(formData.get("title") ?? ""));
  const description = cleanWordPastedText(String(formData.get("seoDescription") ?? ""));
  const summary = cleanWordPastedText(String(formData.get("summary") ?? ""));

  return {
    id: current?.id ?? randomUUID(),
    slug,
    title,
    seoTitle: cleanWordPastedText(String(formData.get("seoTitle") ?? "")) || title,
    description,
    category: cleanWordPastedText(String(formData.get("category") ?? current?.category ?? "")),
    mainKeyword: cleanWordPastedText(String(formData.get("mainKeyword") ?? "")),
    relatedKeywords,
    summary,
    content,
    sections: parseArticleContentSections(content),
    table: current?.table ?? [],
    faq,
    faqs: faq,
    nextSteps: current?.nextSteps ?? [
      "先确认当前实验室所处阶段。",
      "再核对认可范围、人员设备和体系运行证据。",
      "如仍不确定，建议先做一次路径判断。",
    ],
    status: articleStatuses.includes(status) ? status : "draft",
    featured: String(formData.get("featured") ?? "") === "true",
    publishDate: cleanWordPastedText(String(formData.get("publishDate") ?? current?.publishDate ?? now)),
    updateDate: now,
    conclusion: summary || current?.conclusion || title,
    definition: current?.definition ?? description,
  };
}

export async function saveCmsArticle(article: CmsArticle) {
  const articles = await getCmsArticles();
  const validation = validateCmsText([
    article.title,
    article.seoTitle,
    article.description,
    article.summary,
    article.content,
    ...article.faq.flatMap((faq) => [faq.question, faq.answer]),
  ]);

  if (!validation.ok) {
    return validation;
  }

  if (!article.slug) {
    return { ok: false, message: "slug 不能为空。" };
  }

  if (articles.some((item) => item.slug === article.slug && item.id !== article.id)) {
    return { ok: false, message: "slug 已存在，请换一个唯一 slug。" };
  }

  const index = articles.findIndex((item) => item.id === article.id);

  if (index >= 0) {
    articles[index] = article;
  } else {
    articles.unshift(article);
  }

  await writeJsonFile(articlesFilePath, articles);

  return { ok: true };
}

// ========== 第五部分：FAQ 与栏目数据读取和保存 ==========
export function getCmsFaqsSync() {
  return readJsonFileSync<CmsFaq[]>(faqsFilePath, []);
}

export async function getCmsFaqs() {
  return readJsonFile<CmsFaq[]>(faqsFilePath, []);
}

export function getPublishedCmsFaqsSync() {
  return getCmsFaqsSync()
    .filter((faq) => faq.status === "published")
    .sort((left, right) => left.order - right.order);
}

export function parseCmsFaqForm(formData: FormData, current?: CmsFaq): CmsFaq {
  const status = String(formData.get("status") ?? current?.status ?? "published") as CmsArticleStatus;

  return {
    id: current?.id ?? randomUUID(),
    question: cleanWordPastedText(String(formData.get("question") ?? "")),
    answer: cleanWordPastedText(String(formData.get("answer") ?? "")),
    category: cleanWordPastedText(String(formData.get("category") ?? "")),
    sourcePage: cleanWordPastedText(String(formData.get("sourcePage") ?? current?.sourcePage ?? "/faq")),
    featured: String(formData.get("featured") ?? "") === "true",
    order: Number(formData.get("order") ?? current?.order ?? 0),
    status: articleStatuses.includes(status) ? status : "published",
  };
}

export async function saveCmsFaq(faq: CmsFaq) {
  const validation = validateCmsText([faq.question, faq.answer, faq.category]);

  if (!validation.ok) {
    return validation;
  }

  const faqs = await getCmsFaqs();
  const index = faqs.findIndex((item) => item.id === faq.id);

  if (index >= 0) {
    faqs[index] = faq;
  } else {
    faqs.unshift(faq);
  }

  await writeJsonFile(faqsFilePath, faqs);

  return { ok: true };
}

export function getCmsCategoriesSync() {
  return readJsonFileSync<CmsCategory[]>(categoriesFilePath, []);
}

export async function getCmsCategories() {
  return readJsonFile<CmsCategory[]>(categoriesFilePath, []);
}

export function getPublishedCmsCategoriesSync() {
  return getCmsCategoriesSync()
    .filter((category) => category.status === "published")
    .sort((left, right) => left.order - right.order);
}

export function parseCmsCategoryForm(formData: FormData, current: CmsCategory): CmsCategory {
  const status = String(formData.get("status") ?? current.status) as CmsArticleStatus;

  return {
    ...current,
    name: cleanWordPastedText(String(formData.get("name") ?? current.name)),
    description: cleanWordPastedText(String(formData.get("description") ?? current.description)),
    seoTitle: cleanWordPastedText(String(formData.get("seoTitle") ?? current.seoTitle)),
    seoDescription: cleanWordPastedText(String(formData.get("seoDescription") ?? current.seoDescription)),
    order: Number(formData.get("order") ?? current.order),
    featured: String(formData.get("featured") ?? "") === "true",
    status: articleStatuses.includes(status) ? status : current.status,
  };
}

export async function saveCmsCategory(category: CmsCategory) {
  const validation = validateCmsText([category.name, category.description, category.seoTitle, category.seoDescription]);

  if (!validation.ok) {
    return validation;
  }

  const categories = await getCmsCategories();
  const index = categories.findIndex((item) => item.id === category.id);

  if (index === -1) {
    return { ok: false, message: "未找到栏目，不能保存。" };
  }

  categories[index] = category;
  await writeJsonFile(categoriesFilePath, categories);

  return { ok: true };
}
