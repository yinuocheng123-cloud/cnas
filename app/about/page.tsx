import { CtaBlock } from "@/components/CtaBlock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { createPageMetadata } from "@/lib/seo";

/*
 * 文件说明：该文件实现关于平台页面。
 * 功能说明：说明平台聚焦 CNAS认可与实验室能力建设，明确平台边界。
 *
 * 结构概览：
 *   第一部分：平台说明
 */

export const metadata = createPageMetadata({
  title: "关于平台",
  description: "本平台聚焦 CNAS认可与实验室能力建设，帮助企业在启动 CNAS 前看清流程、风险、投入与建设路径。",
  path: "/about",
});

// ========== 第一部分：平台说明 ==========
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <Header />
      <HeroSection
        eyebrow="About Platform"
        title="关于平台"
        description="本平台聚焦 CNAS认可与实验室能力建设，帮助企业在启动 CNAS 前看清流程、风险、投入与建设路径。"
      />
      <section className="mx-auto max-w-4xl px-6 py-12 md:px-8">
        <div className="space-y-5 text-base leading-8 text-slate-700">
          <p>
            平台内容围绕 CNAS认可、实验室能力建设、体系运行、认可范围规划、评审风险和持续改进展开，重点服务企业启动前的判断与规划。
          </p>
          <p>
            这里不把 CNAS 简化为证书结果，也不把认可准备理解为“写材料”。真正需要判断的是实验室是否具备可运行、可评审、可持续改进的能力。
          </p>
          <p>
            相关咨询服务由杭育科技团队提供专业支持。
          </p>
        </div>
      </section>
      <CtaBlock />
      <Footer />
    </main>
  );
}
