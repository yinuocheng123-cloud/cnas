import { PlatformFoundationPage } from "@/components/PlatformFoundationPage";
import { platformPages } from "@/lib/platform-pages";
import { createPageMetadata } from "@/lib/seo";

/*
 * 文件说明：该文件实现 /maintenance CNAS认可后维护页面。
 * 功能说明：承接首页后期维护入口，说明认可后体系运行、监督评审、复评审和扩项维护重点。
 *
 * 结构概览：
 *   第一部分：页面元信息
 *   第二部分：页面主体
 */

export const metadata = createPageMetadata({
  title: "CNAS认可后维护：监督评审、复评审与扩项",
  description: "说明 CNAS认可通过后为什么仍需持续维护，以及监督评审、复评审、扩项变更的基础工作。",
  path: "/maintenance",
});

// ========== 第二部分：页面主体 ==========
export default function MaintenancePage() {
  return <PlatformFoundationPage content={platformPages.maintenance} />;
}
