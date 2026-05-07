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
import { cases, categories, homePathwayLead, homePathways, hotQuestions, solutions } from "@/lib/site-data";
import { createPageMetadata } from "@/lib/seo";

/*
 * 文件说明：该文件实现 CNAS 专业内容平台首页。
 * 功能说明：承接用户的首轮判断、内容浏览、案例查看与诊断转化入口。
 *
 * 结构概览：
 *   第一部分：首页元信息
 *   第二部分：首页主体内容
 */

export const metadata = createPageMetadata({
  title: "把CNAS认可讲清楚｜少走弯路，避免返工",
  description: "围绕流程、费用、周期、实验室建设和评审风险，帮助企业先判断是否适合启动 CNAS 认可，再决定怎么推进。",
  path: "/",
});

// ========== 第一部分：首页主体内容 ==========
export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <Header />
      <HeroSection
        variant="balanced"
        eyebrow="CNAS Recognition Knowledge Platform"
        title={
          <>
            把CNAS认可
            <br />
            <span className="hero-subline block">讲清楚、走对路</span>
            <br />
            <span className="hero-subline block">避免返工</span>
          </>
        }
        description={<p>围绕流程、费用、周期和实验室建设，先把启动前最容易做错的判断讲清楚。</p>}
        actions={
          <>
            <Link href="/diagnosis" className="btn-primary" data-track-event="start_judgment_click" data-track-location="home-hero">
              开始诊断
            </Link>
            <Link href="/solutions" className="btn-secondary">
              获取方案
            </Link>
          </>
        }
        riskNotice={
          <>
            <span className="text-amber-500">⚠</span> 很多企业不是做不下来，而是一开始走错。设备先采购、体系后补，是最容易返工的路径。
          </>
        }
      />

      <section className="site-shell pt-3 pb-10 md:pt-6 md:pb-16">
        <SectionTitle
          title="平台路径"
          description="首页结构对应导航入口：知识库承接流量，流程承接强需求，方案承接成交，案例建立信任，诊断推动转化。"
          descriptionClassName="max-w-5xl text-copy leading-7"
        />
        <p className="mt-2 max-w-xl text-copy md:mt-4">{homePathwayLead}</p>
        <div className="mt-4 grid gap-3 md:mt-5 md:grid-cols-5 md:gap-3">
          {homePathways.map((pathway) => (
            <Link key={pathway.href} href={pathway.href} className="card-link gap-2">
              <h3 className="text-body font-semibold text-ink">{pathway.title}</h3>
              <p className="text-copy">{pathway.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="site-shell py-10 md:py-16">
          <SectionTitle title="热门问题入口" description="先回答企业最常搜索、也最容易判断失误的几个问题。" />
          <div className="mt-4 grid gap-3 md:mt-6 md:grid-cols-3 md:gap-3">
            {hotQuestions.map((entry) => (
              <Link key={entry.href} href={entry.href} className="card-link gap-2">
                <h3 className="text-body font-semibold text-ink">{entry.title}</h3>
                <p className="text-copy">{entry.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="site-shell py-10 md:py-16">
          <SectionTitle title="内容分类入口" description="围绕基础认知、流程、费用周期、评审风险和实验室建设持续扩展。" />
          <div className="mt-4 grid gap-3 md:mt-6 md:grid-cols-3 md:gap-3">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section className="site-shell py-10 md:py-16">
        <RiskNotice
          title="企业是否适合现在启动CNAS认可？"
          items={[
            "如果认可范围尚不清晰，不建议直接进入申请。先把检测项目、标准方法、样品类型和报告用途梳理清楚。",
            "如果人员、设备、环境和方法无法支撑检测项目，应先补齐能力基础。现场评审看的不是计划书，而是人员会不会做、设备能不能用、环境能不能支撑检测。",
            "如果体系只停留在文件层面，没有试运行记录，现场评审风险会明显增加。",
            "先做诊断，再规划，再建设，再辅导，再评审，通常比边做边改更省成本。",
          ]}
        />
        <div className="mt-4 md:mt-6">
          <ProcessSteps
            steps={[
              {
                title: "启动诊断",
                description: "先盘点需求、资源和管理基础，判断现在能不能启动。",
              },
              {
                title: "范围规划",
                description: "从项目和标准方法倒推认可范围，避免一开始铺得过大。",
              },
              {
                title: "实验室建设",
                description: "围绕认可范围配置人员、设备、环境和方法。",
              },
              {
                title: "体系运行",
                description: "形成原始记录、质控记录、内审和管理评审等证据链。",
              },
              {
                title: "现场评审",
                description: "评审前集中排查不符合风险，准备检测演示和记录追溯。",
              },
            ]}
          />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="site-shell py-10 md:py-16">
          <SectionTitle title="先看你更接近哪一种情况" description="先判断实验室属于哪类场景，再对照典型问题和错误路径，会更快看清下一步。" />

          <div className="mt-4 md:mt-6">
            <div className="flex flex-col gap-1.5">
              <h3 className="text-body font-semibold text-ink">按行业场景判断路径</h3>
              <p className="max-w-xl text-copy">先看你更接近哪类实验室，再进入对应路径。</p>
            </div>
            <div className="mt-3 grid gap-3 md:mt-4 md:grid-cols-3 md:gap-3">
              {solutions.map((solution) => (
                <SolutionCard key={solution.slug} solution={solution} />
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-slate-200 pt-6 md:mt-10 md:pt-10">
            <div className="flex flex-col gap-1.5">
              <h3 className="text-body font-semibold text-ink">按典型问题判断风险</h3>
              <p className="max-w-xl text-copy">再看别人通常在哪一步出问题，以及会带来什么后果。</p>
            </div>
            <div className="mt-3 grid gap-3 md:mt-4 md:grid-cols-2 md:gap-3 xl:grid-cols-4">
              {cases.map((caseItem) => (
                <CaseCard key={caseItem.slug} caseItem={caseItem} />
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-5 md:mt-10 md:flex-row md:items-center md:justify-between md:pt-8">
            <p className="max-w-xl text-copy">如果看完仍不确定自己属于哪种路径，建议先做一次判断。</p>
            <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
              <Link href="/cases" className="btn-secondary w-full sm:w-auto">
                查看案例
              </Link>
              <Link href="/diagnosis" className="btn-primary w-full sm:w-auto" data-track-event="start_judgment_click" data-track-location="home-results-matrix">
                开始诊断
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBlock />
      <Footer />
    </main>
  );
}
