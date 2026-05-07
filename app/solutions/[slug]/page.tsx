import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
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
 * 文件说明：该文件实现行业方案详情页。
 * 功能说明：围绕适合对象、问题、难点、路径和风险输出移动端更易读的方案页面。
 *
 * 结构概览：
 *   第一部分：静态参数与元信息
 *   第二部分：方案详情页
 */

// ========== 第一部分：静态参数与元信息 ==========
export function generateStaticParams() {
  return solutions.map((solution) => ({
    slug: solution.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    return createPageMetadata({
      title: "行业方案：继续查看不同实验室实施路径",
      description: "CNAS 认可行业解决方案。",
      path: "/solutions",
    });
  }

  return createPageMetadata({
    title: solution.seoTitle,
    description: solution.summary,
    path: solution.href,
  });
}

// ========== 第二部分：方案详情页 ==========
export default async function SolutionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-ink">
      <Header />
      <HeroSection
        variant="balanced"
        eyebrow="Industry Solution"
        title={solution.title}
        description={<p>{solution.summary}</p>}
        actions={
          <>
            <a href="#solution-content" className="btn-primary">
              获取方案
            </a>
            <Link href="/diagnosis" className="btn-secondary">
              开始诊断
            </Link>
          </>
        }
        aside={
          <div className="relative h-40 overflow-hidden rounded-2xl border border-line bg-slate-100 md:h-auto md:aspect-[4/3]">
            <Image
              src={solution.imageSrc}
              alt={solution.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 320px"
              className="object-cover"
            />
          </div>
        }
      />

      <section className="site-shell max-w-[680px] px-5 pt-5 md:pt-8">
        <Breadcrumb items={[{ label: "首页", href: "/" }, { label: "行业方案", href: "/solutions" }, { label: solution.title }]} />
      </section>

      <section id="solution-content" className="site-shell max-w-[680px] px-5 py-8 md:py-12">
        <div className="grid gap-4">
          <div className="card h-full">
            <h2 className="text-heading">适合对象</h2>
            <p className="mt-3 text-[16px] leading-7 text-muted">{solution.suitableFor}</p>
          </div>
          <ChecklistBlock title="常见问题" items={solution.commonProblems} />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="site-shell max-w-[680px] px-5 py-8 md:py-12">
          <SectionTitle title="认可难点" description="行业差异最终都会落到人员、设备、环境、方法、记录和体系运行证据上。" />
          <div className="mt-4 md:mt-6">
            <ChecklistBlock title="需要重点判断的难点" items={solution.recognitionDifficulties} />
          </div>
        </div>
      </section>

      <section className="site-shell max-w-[680px] px-5 py-8 md:py-12">
        <SectionTitle title="建设路径" />
        <div className="mt-4 md:mt-6">
          <ProcessSteps steps={solution.buildPath} />
        </div>
      </section>

      <section className="site-shell max-w-[680px] px-5 pb-10 md:pb-16">
        <div className="grid gap-4">
          <ChecklistBlock title="评审风险" items={solution.assessmentRisks} />
          <ChecklistBlock title="方案建议" items={solution.solutionReference} />
        </div>
      </section>

      <CtaBlock />
      <Footer />
    </main>
  );
}
