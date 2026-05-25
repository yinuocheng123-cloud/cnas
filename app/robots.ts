import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

/*
 * 文件说明：该文件生成站点 robots 配置。
 * 功能说明：允许搜索引擎抓取公开页面，并声明 sitemap 地址。
 *
 * 结构概览：
 *   第一部分：robots 生成
 */

// ========== 第一部分：robots 生成 ==========
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api", "/data"],
    },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}
