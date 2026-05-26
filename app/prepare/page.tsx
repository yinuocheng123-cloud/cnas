import { PlatformFoundationPage } from "@/components/PlatformFoundationPage";
import { platformPages } from "@/lib/platform-pages";
import { createPageMetadata } from "@/lib/seo";

/*
 * 文件说明：该文件实现 /prepare CNAS认可准备页面。
 * 功能说明：承接首页认可准备入口，说明体系、人员、设备和运行证据的准备重点。
 *
 * 结构概览：
 *   第一部分：页面元信息
 *   第二部分：页面主体
 */

export const metadata = createPageMetadata({
  title: "CNAS认可准备：体系、人员、设备与记录",
  description: "说明 CNAS认可准备阶段如何围绕体系文件、人员能力、设备环境和运行证据建立基础。",
  path: "/prepare",
});

// ========== 第二部分：页面主体 ==========
export default function PreparePage() {
  return <PlatformFoundationPage content={platformPages.prepare} />;
}
