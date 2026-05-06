import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ChecklistBlock } from "@/components/ChecklistBlock";
import { CtaBlock } from "@/components/CtaBlock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProcessSteps } from "@/components/ProcessSteps";
import { SectionTitle } from "@/components/SectionTitle";
import { getSolutionBySlug, solutions } from "@/lib/site-data";
import { createPageMetadata } from "@/lib/seo";

/*
 * 文件说明：该文件实现行业解决方案详情页。
 * 功能说明：按适合对象、常见问题、认可难点、建设路径、评审风险和方案参考生成详情。
 *
 * 结构概览：
 *   第一部分：静态路由与元信息
 *   第二部分：方案详情页面
 */

// ========== 第一部分：静态路由与元信息 ==========
export function generateStaticParams() {
  return solutions.map((solution) => ({
    slug: solution.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    return createPageMetadata({
      title: "行业方案：继续查看不同实验室实施路径",
      description: "CNAS认可行业解决方案。",
      path: "/solutions",
    });
  }

  return createPageMetadata({
    title: solution.seoTitle,
    description: solution.summary,
    path: solution.href,
  });
}

// ========== 第二部分：方案详情页面 ==========
export default async function SolutionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-ink">
      <Header />
      <HeroSection eyebrow="Industry Solution" title={solution.title} description={solution.summary} />

      <section className="site-shell pt-8">
        <Breadcrumb items={[{ label: "首页", href: "/" }, { label: "行业方案", href: "/solutions" }, { label: solution.title }]} />
      </section>

      <section className="site-shell grid gap-4 py-10 md:grid-cols-2">
        <div className="card h-full">
          <h2 className="text-heading">适合对象</h2>
          <p className="mt-3 text-copy">{solution.suitableFor}</p>
        </div>
        <ChecklistBlock title="常见问题" items={solution.commonProblems} />
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="site-shell section-space">
          <SectionTitle title="认可难点" description="行业差异最终会落到人员、设备、环境、方法、记录和体系运行证据上。" />
          <div className="mt-6">
            <ChecklistBlock title="需要重点判断的难点" items={solution.recognitionDifficulties} />
          </div>
        </div>
      </section>

      <section className="site-shell section-space">
        <SectionTitle title="建设路径" />
        <div className="mt-6">
          <ProcessSteps steps={solution.buildPath} />
        </div>
      </section>

      <section className="site-shell grid gap-6 pb-12 md:grid-cols-2">
        <ChecklistBlock title="评审风险" items={solution.assessmentRisks} />
        <ChecklistBlock title="解决方案参考" items={solution.solutionReference} />
      </section>
      <CtaBlock />
      <Footer />
    </main>
  );
}
