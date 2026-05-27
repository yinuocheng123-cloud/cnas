/*
 * 文件说明：该文件集中维护 CNAS 内容控制台第一版只读后台的权限与聚合数据。
 * 功能说明：复用 ADMIN_KEY 做简单访问保护，并把文章、FAQ、栏目、站点配置整理成后台只读视图。
 *
 * 结构概览：
 *   第一部分：导入依赖
 *   第二部分：访问保护与通用工具
 *   第三部分：FAQ 聚合数据
 *   第四部分：栏目与站点设置数据
 */

// ========== 第一部分：导入依赖 ==========
import { existsSync } from "node:fs";
import { join } from "node:path";
import { ensureAdminAccess } from "@/lib/admin-auth";
import { geoArticleCategories, geoArticles, type GeoArticleCategory } from "@/lib/geo-articles";
import { platformPages } from "@/lib/platform-pages";
import { faqs as knowledgeFaqs } from "@/lib/site-data";

// ========== 第二部分：访问保护与通用工具 ==========
export type AdminNavKey = "home" | "articles" | "faqs" | "categories" | "leads" | "settings";

export { ensureAdminAccess };

export function getAdminHref(path: string, key: string | undefined) {
  if (!key) {
    return path;
  }

  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}key=${encodeURIComponent(key)}`;
}

export function formatAdminDate(value: string) {
  try {
    return new Intl.DateTimeFormat("zh-CN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function getRecentUpdateText() {
  const timestamps = geoArticles.map((article) => article.publishDate).sort().reverse();

  return timestamps[0] ?? "待确认";
}

// ========== 第三部分：FAQ 聚合数据 ==========
export type AdminFaqItem = {
  question: string;
  answer: string;
  category: string;
  isHomeShown: boolean;
  sourcePage: string;
};

const homepageFaqQuestions = new Set([
  "CNAS认可一般要多久？",
  "CNAS认可费用为什么差异大？",
  "通过后还需要维护吗？",
  "现在只是了解阶段，能不能先判断路径？",
]);

function dedupeAdminFaqs(items: AdminFaqItem[]) {
  const seen = new Set<string>();

  return items.filter((item) => {
    const key = `${item.sourcePage}::${item.question.trim()}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

export function getAdminFaqItems() {
  const platformFaqItems: AdminFaqItem[] = Object.values(platformPages).flatMap((page) =>
    page.faqs.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
      category: page.title,
      isHomeShown: homepageFaqQuestions.has(faq.question),
      sourcePage: page.path,
    })),
  );

  const geoArticleFaqItems: AdminFaqItem[] = geoArticles.flatMap((article) =>
    article.faqs.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
      category: article.category,
      isHomeShown: homepageFaqQuestions.has(faq.question),
      sourcePage: `/articles/${article.slug}`,
    })),
  );

  const knowledgeFaqItems: AdminFaqItem[] = knowledgeFaqs.map((faq) => ({
    question: faq.question,
    answer: faq.answer,
    category: "问答库",
    isHomeShown: homepageFaqQuestions.has(faq.question),
    sourcePage: `/knowledge/${faq.articleSlug}`,
  }));

  return dedupeAdminFaqs([...platformFaqItems, ...geoArticleFaqItems, ...knowledgeFaqItems]);
}

// ========== 第四部分：栏目与站点设置数据 ==========
export type AdminCategoryItem = {
  name: string;
  path: string;
  description: string;
  recommendedArticleCount: number;
};

const categoryArticleMap: Record<string, GeoArticleCategory | "all"> = {
  "/path": "CNAS认可路径判断",
  "/prepare": "CNAS认可准备",
  "/review": "CNAS评审整改",
  "/maintenance": "CNAS认可后维护",
  "/faq": "CNAS常见问题",
  "/articles": "all",
};

export function getAdminCategoryItems(): AdminCategoryItem[] {
  return Object.values(platformPages).map((page) => {
    const mappedCategory = categoryArticleMap[page.path];
    const recommendedArticleCount =
      mappedCategory === "all"
        ? geoArticles.length
        : mappedCategory
          ? geoArticles.filter((article) => article.category === mappedCategory).length
          : 0;

    return {
      name: page.title,
      path: page.path,
      description: page.description,
      recommendedArticleCount,
    };
  });
}

export function getAdminArticleCategories() {
  return geoArticleCategories;
}

export function getSiteSettingStatuses() {
  const wecomQrPath = join(process.cwd(), "public", "wecom-qr.png");

  return [
    { label: "SITE_URL", status: process.env.SITE_URL ? "已配置" : "未配置" },
    { label: "ADMIN_KEY", status: process.env.ADMIN_KEY ? "已配置" : "未配置" },
    { label: "ADMIN_USERNAME", status: process.env.ADMIN_USERNAME ? "已配置" : "未配置" },
    { label: "ADMIN_PASSWORD", status: process.env.ADMIN_PASSWORD ? "已配置" : "未配置" },
    { label: "LEAD_WEBHOOK_FEISHU", status: process.env.LEAD_WEBHOOK_FEISHU ? "已配置" : "未配置" },
    { label: "LEAD_WEBHOOK_WECHAT", status: process.env.LEAD_WEBHOOK_WECHAT ? "已配置" : "未配置" },
    { label: "NEXT_PUBLIC_GA_ID", status: process.env.NEXT_PUBLIC_GA_ID ? "已配置" : "未配置" },
    { label: "网站名称", status: "CNAS认可指南" },
    { label: "平台定位", status: "CNAS行业服务平台" },
    { label: "主要联系方式", status: "待人工确认真实电话、邮箱和微信信息" },
    { label: "企业微信二维码", status: existsSync(wecomQrPath) ? "已配置" : "未配置" },
  ];
}
