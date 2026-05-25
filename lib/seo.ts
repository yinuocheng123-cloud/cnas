import type { Metadata } from "next";

/*
 * 文件说明：该文件提供站点 SEO 元信息生成工具。
 * 功能说明：统一生成 title、description、canonical 和 Open Graph 基础信息。
 *
 * 结构概览：
 *   第一部分：站点常量
 *   第二部分：元信息生成函数
 */

// ========== 第一部分：站点常量 ==========
export const siteName = "CNAS认可指南";
const rawSiteUrl = process.env.SITE_URL?.trim();
const isDeploymentBuild = process.env.CI === "true" || process.env.VERCEL === "1";

if (process.env.NODE_ENV === "production" && !rawSiteUrl) {
  if (isDeploymentBuild) {
    throw new Error("SITE_URL is required for production deployment builds.");
  }

  console.warn("[seo:site-url:missing] SITE_URL is not configured. Production metadata will fall back to localhost.");
}

export const siteUrl = rawSiteUrl || "http://localhost:3000";
export const defaultPageTitle = "CNAS认可指南｜专业知识与认可解决方案平台";

// ========== 第二部分：元信息生成函数 ==========
// canonical 需要绝对 URL；统一通过 SITE_URL 环境变量控制，避免本地与线上混用旧域名。
export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = new URL(path, siteUrl).toString();

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: "zh_CN",
      type: "website",
    },
  };
}
