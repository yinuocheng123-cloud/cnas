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
export const siteName = "CNAS专业知识与认可解决方案平台";
export const siteUrl = "https://www.hangyukeji.com";

// ========== 第二部分：元信息生成函数 ==========
// canonical 需要绝对 URL；这里先使用品牌域名占位，正式上线前应替换为真实生产域名。
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
