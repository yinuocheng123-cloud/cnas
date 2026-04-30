import type { Metadata } from "next";
import { siteName, siteUrl } from "@/lib/seo";
import "./globals.css";

/*
 * 文件说明：该文件定义杭育 CNAS 内容站的全局 HTML 外壳。
 * 功能说明：负责站点元信息与全局样式接入。
 *
 * 结构概览：
 *   第一部分：站点元信息
 *   第二部分：根布局组件
 */

// ========== 第一部分：站点元信息 ==========
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s｜${siteName}`,
  },
  description: "围绕CNAS认可、实验室建设、体系运行、评审风险与持续改进，提供系统化知识、判断工具与解决方案参考。",
  openGraph: {
    title: siteName,
    description: "围绕CNAS认可、实验室建设、体系运行、评审风险与持续改进，提供系统化知识、判断工具与解决方案参考。",
    url: siteUrl,
    siteName,
    locale: "zh_CN",
    type: "website",
  },
};

// ========== 第二部分：根布局组件 ==========
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
