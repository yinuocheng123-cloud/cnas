import { FaqLanding } from "@/components/FaqLanding";
import { unstable_noStore as noStore } from "next/cache";
import { createPageMetadata } from "@/lib/seo";

/*
 * 文件说明：该文件实现 /faq CNAS常见问题基础页。
 * 功能说明：承接首页 FAQ 入口，提供按阶段理解常见问题的基础说明。
 *
 * 结构概览：
 *   第一部分：页面元信息
 *   第二部分：页面主体
 */

export const metadata = createPageMetadata({
  title: "CNAS常见问题：启动、准备、评审与维护",
  description: "聚合 CNAS认可启动前、准备中、评审整改和认可后维护的基础常见问题。",
  path: "/faq",
});

// ========== 第二部分：页面主体 ==========
export default function FaqPage() {
  noStore();

  return <FaqLanding />;
}
