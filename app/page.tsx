import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileFirstPathHome } from "@/components/MobileFirstPathHome";
import { createPageMetadata } from "@/lib/seo";

/*
 * 文件说明：该文件实现 CNAS认可指南主站首页。
 * 功能说明：把原成交页的路径判断、企业微信承接和 A/B/C 诊断逻辑整合进主站首页。
 *
 * 结构概览：
 *   第一部分：页面元信息
 *   第二部分：首页组合
 */

// ========== 第一部分：页面元信息 ==========
export const metadata = createPageMetadata({
  title: "CNAS认可指南｜先判断路径，再决定怎么启动",
  description: "做CNAS认可前，先判断实验室类型、认可范围、人员设备、体系运行和评审准备，再决定是否启动申请。",
  path: "/",
});

// ========== 第二部分：首页组合 ==========
export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <Header />
      <MobileFirstPathHome />
      <Footer />
    </main>
  );
}
