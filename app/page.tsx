import Link from "next/link";
import { CaseCard } from "@/components/CaseCard";
import { CategoryCard } from "@/components/CategoryCard";
import { CtaBlock } from "@/components/CtaBlock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProcessSteps } from "@/components/ProcessSteps";
import { RiskNotice } from "@/components/RiskNotice";
import { SectionTitle } from "@/components/SectionTitle";
import { SolutionCard } from "@/components/SolutionCard";
import { cases, categories, homeStats, hotQuestions, solutions } from "@/lib/site-data";
import { createPageMetadata } from "@/lib/seo";

/*
 * 文件说明：该文件实现 CNAS 专业内容平台首页。
 * 功能说明：展示 CNAS 专业入口、热门问题、分类入口、风险诊断、行业方案、案例解析和咨询承接。
 *
 * 结构概览：
 *   第一部分：首屏专业入口
 *   第二部分：热门问题与内容分类
 *   第三部分：风险诊断、行业方案、案例和咨询入口
 */

export const metadata = createPageMetadata({
  title: "企业做CNAS认可前，先看懂实验室能力建设",
  description: "围绕CNAS认可（CNAS认证）流程、费用、周期与实验室建设，提供系统化知识与解决方案参考。",
  path: "/",
});

// ========== 第一部分：首屏专业入口 ==========
export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <Header />
      <HeroSection
        eyebrow="CNAS Recognition Knowledge Platform"
        title="企业做CNAS认可前，先看懂实验室能力建设"
        description="围绕CNAS认可（CNAS认证）流程、费用、周期与实验室建设，提供系统化知识与解决方案参考。"
        actions={
          <>
            <Link href="/diagnosis" className="rounded bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-moss">
              获取CNAS启动诊断
            </Link>
            <Link href="/knowledge" className="rounded border border-slate-300 px-5 py-3 text-sm font-semibold transition hover:border-moss hover:text-moss">
              查看CNAS认可流程
            </Link>
          </>
        }
        aside={
          <dl className="grid gap-3">
            {homeStats.map((stat) => (
              <div key={stat.label} className="rounded border border-slate-200 bg-white p-4">
                <dt className="text-sm text-slate-500">{stat.label}</dt>
                <dd className="mt-2 text-2xl font-semibold text-slate-950">{stat.value}</dd>
              </div>
            ))}
          </dl>
        }
      />

      {/* ========== 第二部分：热门问题与内容分类 ========== */}
      <section className="mx-auto max-w-6xl px-6 py-12 md:px-8">
        <SectionTitle title="热门问题入口" description="先回答企业最常搜索、最容易误判的 CNAS认可问题。" />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {hotQuestions.map((entry) => (
            <Link key={entry.href} href={entry.href} className="rounded border border-slate-200 bg-white p-5 transition hover:border-blue-900">
              <h3 className="text-lg font-semibold text-slate-950">{entry.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{entry.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-12 md:px-8">
          <SectionTitle title="内容分类入口" description="围绕基础认知、申请流程、费用周期、评审风险、实验室建设和常见问题持续扩展。" />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== 第三部分：风险诊断、行业方案、案例和咨询入口 ========== */}
      <section className="mx-auto max-w-6xl px-6 py-12 md:px-8">
        <RiskNotice
          title="企业是否适合现在启动CNAS认可？"
          items={[
            "如果认可范围尚不清晰，不建议直接进入申请。",
            "如果人员、设备、环境和方法无法支撑检测项目，应先补齐能力基础。",
            "如果体系只停留在文件层面，没有试运行记录，现场评审风险会明显增加。",
            "先做诊断，再规划，再建设，再辅导，再评审，能减少盲目投入。",
          ]}
        />
        <div className="mt-6">
          <ProcessSteps steps={["启动诊断", "范围规划", "实验室建设", "体系运行", "现场评审"]} />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12 md:px-8">
          <SectionTitle title="行业方案入口" description="不同行业实验室的基础不同，CNAS认可路径也需要分别判断。" />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {solutions.map((solution) => (
              <SolutionCard key={solution.slug} solution={solution} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:px-8">
        <SectionTitle title="案例解析" description="用问题—动作—结果结构拆解典型 CNAS认可准备场景。" />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {cases.map((caseItem) => (
            <CaseCard key={caseItem.slug} caseItem={caseItem} />
          ))}
        </div>
      </section>

      <CtaBlock />
      <Footer />
    </main>
  );
}
