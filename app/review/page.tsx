import { PlatformFoundationPage } from "@/components/PlatformFoundationPage";
import { platformPages } from "@/lib/platform-pages";
import { createPageMetadata } from "@/lib/seo";

/*
 * 文件说明：该文件实现 /review CNAS评审整改页面。
 * 功能说明：承接首页评审整改入口，说明评审前排查和评审后整改闭环重点。
 *
 * 结构概览：
 *   第一部分：页面元信息
 *   第二部分：页面主体
 */

export const metadata = createPageMetadata({
  title: "CNAS评审整改：评审前排查与整改闭环",
  description: "说明 CNAS评审整改阶段如何提前识别风险、准备现场问询并完成不符合项整改闭环。",
  path: "/review",
});

// ========== 第二部分：页面主体 ==========
export default function ReviewPage() {
  return <PlatformFoundationPage content={platformPages.review} />;
}
