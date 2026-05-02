import { CtaBlock } from "@/components/CtaBlock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { SolutionCard } from "@/components/SolutionCard";
import { solutions } from "@/lib/site-data";
import { createPageMetadata } from "@/lib/seo";

/*
 * 文件说明：该文件实现行业方案首页。
 * 功能说明：展示制造企业、检测机构、食品/材料/医疗、高校科研和集团内部实验室的 CNAS认可方案入口。
 *
 * 结构概览：
 *   第一部分：页面头部
 *   第二部分：方案列表
 */

export const metadata = createPageMetadata({
  title: "行业方案",
  description: "面向制造企业、检测机构、食品/材料/医疗、高校科研和集团内部实验室的 CNAS认可解决方案参考。",
  path: "/solutions",
});

// ========== 第一部分：页面头部 ==========
export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <Header />
      <HeroSection
        eyebrow="Industry Solutions"
        title="行业方案"
        description="不同行业实验室的基础、认可范围、评审风险不同，解决方案要先从真实能力和建设路径判断。"
      />

      {/* ========== 第二部分：方案列表 ========== */}
      <section className="site-shell section-space">
        <SectionTitle title="方案入口" />
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution) => (
            <SolutionCard key={solution.slug} solution={solution} />
          ))}
        </div>
      </section>
      <CtaBlock />
      <Footer />
    </main>
  );
}
