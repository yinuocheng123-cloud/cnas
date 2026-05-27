/*
 * 文件说明：该文件实现 CMS v1.1 的文章草稿本地文件存储。
 * 功能说明：读写 data/article-drafts.json，只保存草稿和待发布内容，不覆盖正式 GEO 文章数据。
 *
 * 结构概览：
 *   第一部分：导入依赖
 *   第二部分：类型定义与默认值
 *   第三部分：文本清洗与表单解析
 *   第四部分：草稿文件读写
 *   第五部分：草稿创建与更新
 */

// ========== 第一部分：导入依赖 ==========
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { dirname, join } from "node:path";
import { geoArticleCategories } from "@/lib/geo-articles";

// ========== 第二部分：类型定义与默认值 ==========
export type ArticleDraftStatus = "草稿" | "待发布";

export type ArticleDraftFaq = {
  question: string;
  answer: string;
};

export type ArticleDraft = {
  id: string;
  title: string;
  slug: string;
  category: string;
  mainKeyword: string;
  relatedKeywords: string[];
  seoTitle: string;
  seoDescription: string;
  summary: string;
  content: string;
  faqs: ArticleDraftFaq[];
  status: ArticleDraftStatus;
  createdAt: string;
  updatedAt: string;
};

export type ArticleDraftFormInput = {
  title: string;
  slug: string;
  category: string;
  mainKeyword: string;
  relatedKeywordsText: string;
  seoTitle: string;
  seoDescription: string;
  summary: string;
  content: string;
  faqsText: string;
  status: ArticleDraftStatus;
};

const draftFilePath = join(process.cwd(), "data", "article-drafts.json");
const draftStatuses: ArticleDraftStatus[] = ["草稿", "待发布"];

export function getArticleDraftFilePath() {
  return draftFilePath;
}

export function getArticleDraftStatuses() {
  return draftStatuses;
}

// ========== 第三部分：文本清洗与表单解析 ==========
export function cleanWordPastedText(value: string) {
  return value
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function parseRelatedKeywords(value: string) {
  return cleanWordPastedText(value)
    .split(/[\n,，、]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function stringifyRelatedKeywords(value: string[]) {
  return value.join("\n");
}

function parseFaqs(value: string): ArticleDraftFaq[] {
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

export function stringifyFaqs(value: ArticleDraftFaq[]) {
  return value.map((faq) => `问：${faq.question}\n答：${faq.answer}`).join("\n\n");
}

export function parseArticleDraftForm(formData: FormData): ArticleDraftFormInput {
  const category = String(formData.get("category") ?? geoArticleCategories[0]);
  const status = String(formData.get("status") ?? "草稿") as ArticleDraftStatus;

  return {
    title: cleanWordPastedText(String(formData.get("title") ?? "")),
    slug: cleanWordPastedText(String(formData.get("slug") ?? "")),
    category: geoArticleCategories.includes(category as (typeof geoArticleCategories)[number]) ? category : geoArticleCategories[0],
    mainKeyword: cleanWordPastedText(String(formData.get("mainKeyword") ?? "")),
    relatedKeywordsText: cleanWordPastedText(String(formData.get("relatedKeywordsText") ?? "")),
    seoTitle: cleanWordPastedText(String(formData.get("seoTitle") ?? "")),
    seoDescription: cleanWordPastedText(String(formData.get("seoDescription") ?? "")),
    summary: cleanWordPastedText(String(formData.get("summary") ?? "")),
    content: cleanWordPastedText(String(formData.get("content") ?? "")),
    faqsText: cleanWordPastedText(String(formData.get("faqsText") ?? "")),
    status: draftStatuses.includes(status) ? status : "草稿",
  };
}

// ========== 第四部分：草稿文件读写 ==========
export async function getArticleDrafts(): Promise<ArticleDraft[]> {
  try {
    const raw = await readFile(draftFilePath, "utf8");
    const parsed = JSON.parse(raw) as ArticleDraft[];

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;

    if (code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

async function saveArticleDrafts(drafts: ArticleDraft[]) {
  await mkdir(dirname(draftFilePath), { recursive: true });
  await writeFile(draftFilePath, `${JSON.stringify(drafts, null, 2)}\n`, "utf8");
}

export async function getArticleDraftById(id: string) {
  const drafts = await getArticleDrafts();

  return drafts.find((draft) => draft.id === id);
}

// ========== 第五部分：草稿创建与更新 ==========
export async function createArticleDraft(input: ArticleDraftFormInput) {
  const now = new Date().toISOString();
  const drafts = await getArticleDrafts();
  const draft: ArticleDraft = {
    id: randomUUID(),
    title: input.title,
    slug: input.slug,
    category: input.category,
    mainKeyword: input.mainKeyword,
    relatedKeywords: parseRelatedKeywords(input.relatedKeywordsText),
    seoTitle: input.seoTitle,
    seoDescription: input.seoDescription,
    summary: input.summary,
    content: input.content,
    faqs: parseFaqs(input.faqsText),
    status: input.status,
    createdAt: now,
    updatedAt: now,
  };

  await saveArticleDrafts([draft, ...drafts]);

  return draft;
}

export async function updateArticleDraft(id: string, input: ArticleDraftFormInput) {
  const drafts = await getArticleDrafts();
  const index = drafts.findIndex((draft) => draft.id === id);

  if (index === -1) {
    return undefined;
  }

  const current = drafts[index];
  const updated: ArticleDraft = {
    ...current,
    title: input.title,
    slug: input.slug,
    category: input.category,
    mainKeyword: input.mainKeyword,
    relatedKeywords: parseRelatedKeywords(input.relatedKeywordsText),
    seoTitle: input.seoTitle,
    seoDescription: input.seoDescription,
    summary: input.summary,
    content: input.content,
    faqs: parseFaqs(input.faqsText),
    status: input.status,
    updatedAt: new Date().toISOString(),
  };

  drafts[index] = updated;
  await saveArticleDrafts(drafts);

  return updated;
}
