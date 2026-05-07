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
 * 文件说明：该文件实现 CNAS 认可指南首页。
 * 功能说明：围绕启动误判、返工成本、路径识别和行动入口组织首页内容。
 *
 * 结构概览：
 *   第一部分：页面元信息
 *   第二部分：首页主体内容
 */

export const metadata = createPageMetadata({
  title: "CNAS认可为什么总返工｜很多问题出在启动阶段",
  description: "围绕风险判断、返工成本、流程、周期和实验室建设，帮助企业先看清误判代价，再决定是否启动 CNAS认可。",
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
            为什么很多实验室
            <br />
            <span className="hero-subline block">问题不是出在认可</span>
            <br />
            <span className="hero-subline block">而是出在启动阶段</span>
          </>
        }
        description={<p>很多返工，其实在项目开始前就已经决定了。真正容易浪费的，不只是认可费用，而是错误方向带来的几个月重做时间。</p>}
        actions={
          <>
            <Link href="/diagnosis" className="btn-primary" data-track-event="start_judgment_click" data-track-location="home-hero">
              开始路径判断
            </Link>
            <Link href="/cases" className="btn-secondary">
              查看返工案例
            </Link>
          </>
        }
        riskNotice={
          <>
            <span className="text-amber-500">⚠</span> 很多企业不是做不下来，而是一开始走错。设备先采购、体系后补，往往就是返工真正开始的地方。
          </>
        }
      />

      <section className="site-shell pt-3 pb-10 md:pt-6 md:pb-16">
        <SectionTitle
          title="很多返工，不是评审时才发生"
          description="很多实验室真正浪费的，不是认可费用，而是错误启动带来的返工时间。一次能力范围误判，往往就意味着几个月重新调整。"
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
          <SectionTitle
            title="大家通常怎么做错"
            description="很多实验室一开始急着搭体系，但真正的问题往往不是资料不够，而是能力范围、投入顺序和负责人判断错了。"
          />
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
          <SectionTitle
            title="先看别人怎么提前发现风险"
            description="真正有参考价值的，不是完成了什么，而是原本准备怎么做、哪里先暴露风险、怎么及时调整，最后避免了什么返工。"
          />
          <div className="mt-4 grid gap-3 md:mt-6 md:grid-cols-2 md:gap-3 xl:grid-cols-4">
            {cases.map((caseItem) => (
              <CaseCard key={caseItem.slug} caseItem={caseItem} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="site-shell py-10 md:py-16">
          <SectionTitle
            title="先判断方向，比边做边改更省成本"
            description="不是把模块摆出来，而是把企业真正会遇到的判断节点拆开。先知道自己处在哪一段，再决定下一步最合适做什么。"
          />
          <div className="mt-4 grid gap-3 md:mt-6 md:grid-cols-3 md:gap-3">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section className="site-shell py-10 md:py-16">
        <RiskNotice
          title="不是所有企业都适合现在马上启动"
          items={[
            "如果认可范围还没有收清，先别急着进入申请。检测项目、方法标准、样品类型和报告用途要先梳理清楚。",
            "如果人员、设备、环境和方法还撑不住检测项目，就先补能力基础。评审看的是能不能做，不是计划写得多完整。",
            "如果体系还停留在文件层，没有试运行记录，后面往往只能边补边改，周期会被明显拉长。",
            "先做判断，再规划，再建设，再进入评审，通常比边做边改更稳，也更省投入。",
          ]}
        />
        <div className="mt-4 md:mt-6">
          <ProcessSteps
            steps={[
              {
                title: "先判断",
                description: "先盘点需求、资源和管理基础，判断现在能不能启动、该不该马上启动。",
              },
              {
                title: "再收范围",
                description: "从项目和标准方法倒推认可范围，避免一开始铺得过大，后面资源跟不上。",
              },
              {
                title: "再建能力",
                description: "围绕认可范围配置人员、设备、环境和方法，把能力补到能真实运行。",
              },
              {
                title: "再跑体系",
                description: "形成原始记录、质控记录、内审和管理评审等证据链，让体系真的跑起来。",
              },
              {
                title: "最后进评审",
                description: "评审前集中排查不符合风险，准备检测演示和记录追溯，尽量把返工留在现场前。",
              },
            ]}
          />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="site-shell py-10 md:py-16">
          <SectionTitle
            title="先看你更接近哪一种启动路径"
            description="同样是做 CNAS认可，不同行业、不同基础、不同检测范围，判断重点完全不同。先看清自己属于哪一类，再决定下一步。"
          />

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

          <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-5 md:mt-10 md:flex-row md:items-center md:justify-between md:pt-8">
            <p className="max-w-xl text-copy">如果看完仍不确定自己属于哪条路径，建议先做一次判断，再决定是否继续投入。</p>
            <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
              <Link href="/diagnosis" className="btn-primary w-full sm:w-auto" data-track-event="start_judgment_click" data-track-location="home-results-matrix">
                获取诊断结果
              </Link>
              <Link href="/solutions" className="btn-secondary w-full sm:w-auto">
                获取建议
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
