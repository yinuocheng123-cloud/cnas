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
import { getIndustryBySlug } from "@/lib/industry-taxonomy";
import { getRelatedCases, getRelatedSolutions, getSolutionBySlug, solutions } from "@/lib/site-data";
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
    description: solution.seoDescription ?? solution.summary,
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

  const relatedSolutions = getRelatedSolutions(solution.slug, 2);
  const relatedCases = getRelatedCases([solution.slug], undefined, 2);
  const industry = getIndustryBySlug(solution.slug);

  return (
    <main className="min-h-screen bg-white text-ink">
      <Header />
      <HeroSection
        variant="balanced"
        eyebrow="Industry Solution"
        title={solution.title}
        emphasis={industry?.judgment}
        description={<p>{solution.summary}</p>}
        actions={
          <>
            <a href="#solution-content" className="btn-primary">
              获取实验室认可路径
            </a>
            <Link href="/diagnosis" className="btn-secondary">
              开始路径诊断
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

      <section id="solution-content" className="site-shell max-w-[680px] px-5 py-6 md:py-10">
        <div className="grid gap-4">
          <div className="card">
            <h2 className="text-heading">适合什么基础下启动</h2>
            <p className="mt-3 text-[16px] leading-7 text-muted">{solution.suitableFor}</p>
          </div>
          <ChecklistBlock title="这类实验室常卡住的问题" items={solution.commonProblems} />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="site-shell max-w-[680px] px-5 py-6 md:py-10">
          <SectionTitle
            title="真正决定能不能顺利推进的难点"
            description="行业差异最后都会落到人员、设备、环境、方法、记录和体系运行证据上，判断错了，后面通常就是返工。"
            descriptionClassName="text-copy leading-7 md:max-w-5xl md:text-[17px] md:leading-normal"
          />
          <div className="mt-4 md:mt-6">
            <ChecklistBlock title="需要重点判断的地方" items={solution.recognitionDifficulties} />
          </div>
        </div>
      </section>

      <section className="site-shell max-w-[680px] px-5 py-6 md:py-10">
        <SectionTitle title="更稳妥的建设路径" />
        <div className="mt-4 md:mt-6">
          <ProcessSteps steps={solution.buildPath} />
        </div>
      </section>

      <section className="site-shell max-w-[680px] px-5 pb-6 md:pb-8">
        <div className="grid gap-4">
          <ChecklistBlock title="如果判断错了，后面最容易出现什么风险" items={solution.assessmentRisks} />
          <ChecklistBlock title="启动前更建议怎么做" items={solution.solutionReference} />
        </div>
      </section>

      {relatedSolutions.length ? (
        <section className="site-shell max-w-[680px] px-5 pb-6 md:pb-8">
          <SectionTitle
            title="相关行业方案"
            description="如果当前场景还在判断边界，可以顺手对比相近实验室的启动路径。"
            descriptionClassName="text-copy leading-7 md:max-w-5xl md:text-[17px] md:leading-normal"
          />
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {relatedSolutions.map((relatedSolution) => (
              <Link key={relatedSolution.slug} href={relatedSolution.href} className="card-link h-full gap-3">
                <div className="flex flex-wrap gap-2">
                  {relatedSolution.tags?.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-full border border-line px-2 py-1 text-[11px] leading-4 text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-body font-semibold text-ink">{relatedSolution.title}</h3>
                <p className="text-copy">{relatedSolution.summary}</p>
                <span className="btn-secondary w-full sm:w-fit">获取实验室认可路径</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {relatedCases.length ? (
        <section className="site-shell max-w-[680px] px-5 pb-6 md:pb-8">
          <SectionTitle
            title="相关案例"
            description="先看相近实验室是怎么提前暴露风险、修正路径，再决定当前阶段该怎么推进。"
            descriptionClassName="text-copy leading-7 md:max-w-5xl md:text-[17px] md:leading-normal"
          />
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {relatedCases.map((caseItem: (typeof relatedCases)[number]) => (
              <Link key={caseItem.slug} href={`/cases#${caseItem.slug}`} className="card-link h-full gap-2">
                <h3 className="text-body font-semibold text-ink">{caseItem.title}</h3>
                <p className="text-copy">原本计划：{caseItem.problem}</p>
                <span className="btn-secondary w-full sm:w-fit">查看问题路径</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <CtaBlock />
      <Footer />
    </main>
  );
}
