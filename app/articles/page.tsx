import { PlatformFoundationPage } from "@/components/PlatformFoundationPage";
import { platformPages } from "@/lib/platform-pages";
import { createPageMetadata } from "@/lib/seo";

/*
 * 文件说明：该文件实现 /articles 最新行业内容页面。
 * 功能说明：承接首页最新行业内容入口，聚合主站已有重点文章入口。
 *
 * 结构概览：
 *   第一部分：页面元信息
 *   第二部分：页面主体
 */

export const metadata = createPageMetadata({
  title: "最新行业内容：CNAS认可路径、准备与评审风险",
  description: "聚合 CNAS认可路径判断、认可准备、评审整改和认可后维护相关基础行业内容入口。",
  path: "/articles",
});

// ========== 第二部分：页面主体 ==========
export default function ArticlesPage() {
  return <PlatformFoundationPage content={platformPages.articles} />;
}
