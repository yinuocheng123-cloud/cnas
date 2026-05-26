import { PlatformFoundationPage } from "@/components/PlatformFoundationPage";
import { platformPages } from "@/lib/platform-pages";
import { createPageMetadata } from "@/lib/seo";

/*
 * 文件说明：该文件实现 /path CNAS认可路径判断页面。
 * 功能说明：承接首页路径判断入口，提供基础版路径判断内容说明。
 *
 * 结构概览：
 *   第一部分：页面元信息
 *   第二部分：页面主体
 */

export const metadata = createPageMetadata({
  title: "CNAS认可路径判断：先判断路径再启动",
  description: "说明 CNAS认可启动前为什么要先判断路径、范围、人员设备和体系运行基础。",
  path: "/path",
});

// ========== 第二部分：页面主体 ==========
export default function PathPage() {
  return <PlatformFoundationPage content={platformPages.path} />;
}
