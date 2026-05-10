import Link from "next/link";
import { CaseCard } from "@/components/CaseCard";
import { CategoryCard } from "@/components/CategoryCard";
import { CtaBlock } from "@/components/CtaBlock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProcessSteps } from "@/components/ProcessSteps";
import { RiskEntryCard } from "@/components/RiskEntryCard";
import { RiskNotice } from "@/components/RiskNotice";
import { SectionTitle } from "@/components/SectionTitle";
import { SolutionCard } from "@/components/SolutionCard";
import { cases, categories, getOrderedSolutions, homePathwayLead, homePathways, hotQuestions, riskEntries } from "@/lib/site-data";
import { createPageMetadata } from "@/lib/seo";

/*
 * 文件说明：该文件实现 CNAS 认可指南首页。
 * 功能说明：桌面端保留现有判断型内容结构，移动端收敛为更短的决策路径首页。
 *
 * 结构概览：
 *   第一部分：页面元信息
 *   第二部分：移动端首页精简数据
 *   第三部分：首页主体内容
 */

export const metadata = createPageMetadata({
  title: "CNAS认可为什么总返工｜很多问题出在启动阶段",
  description: "围绕风险判断、返工成本、流程、周期和实验室建设，帮助企业先看清误判代价，再决定是否启动 CNAS认可。",
  path: "/",
});

// ========== 第二部分：移动端首页精简数据 ==========
const mobileCoreEntries = [
  {
    title: "先了解：CNAS知识库",
    summary: "看懂流程、费用、周期和常见问题。",
    href: "/knowledge",
  },
  {
    title: "先判断：风险诊断",
    summary: "判断现在适不适合启动。",
    href: "/diagnosis",
  },
  {
    title: "看路径：行业方案",
    summary: "按实验室类型找到对应路径。",
    href: "/solutions",
  },
];

const mobileSolutionSlugs = ["manufacturing-lab", "testing-lab", "new-energy-lab"];

// ========== 第三部分：首页主体内容 ==========
export default function HomePage() {
  const orderedSolutions = getOrderedSolutions();
  const mobileSolutions = orderedSolutions.filter((solution) => mobileSolutionSlugs.includes(solution.slug));
  const mobileCases = cases.slice(0, 3);

  return (
    <main className="min-h-screen bg-white text-ink">
      <Header />
      <HeroSection
        variant="balanced"
        eyebrow="CNAS Recognition Knowledge Platform"
        title={
          <>
            <span className="md:hidden">做 CNAS 认可前，先判断路径有没有走对</span>
            <span className="hidden md:inline">
              为什么很多实验室
              <br />
              <span className="hero-subline block">问题不是出在认可</span>
              <br />
              <span className="hero-subline block">而是出在启动阶段</span>
            </span>
          </>
        }
        description={
          <>
            <p className="md:hidden">流程、费用、周期、实验室建设，先理清，再启动。</p>
            <p className="hidden md:block">很多返工，其实在项目开始前就已经决定了。真正容易浪费的，不只是认可费用，而是错误方向带来的几个月重做时间。</p>
          </>
        }
        actions={
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/diagnosis" className="btn-primary" data-track-event="start_judgment_click" data-track-location="home-hero">
                <span className="md:hidden">开始路径诊断</span>
                <span className="hidden md:inline">开始路径诊断</span>
              </Link>
              <Link href="/solutions" className="btn-secondary md:hidden">
                查看行业方案
              </Link>
              <Link href="/cases" className="btn-secondary hidden md:inline-flex">
                查看行业案例
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 md:hidden">
              {["流程判断", "实验室建设", "评审风险"].map((tag) => (
                <span key={tag} className="rounded-full border border-line bg-white px-3 py-1.5 text-meta text-muted">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        }
        aside={
          <div className="grid grid-cols-2 items-stretch gap-3 md:gap-4">
            {riskEntries.map((entry) => (
              <RiskEntryCard key={entry.title} entry={entry} />
            ))}
          </div>
        }
        riskNotice={
          <>
            很多返工，不是做不下来，而是一开始方向就偏了。
          </>
        }
      />

      <section className="site-shell py-6 md:hidden">
        <div className="rounded-2xl border border-amber-200/80 bg-amber-50/70 p-4">
          <p className="text-body font-medium leading-7 text-ink">很多返工，不是评审当天才发生，而是在启动阶段就已经埋下。</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["路径误判", "设备路线错误"].map((tag) => (
              <span key={tag} className="rounded-full border border-amber-200 bg-white px-3 py-1.5 text-meta text-muted">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="site-shell pb-6 md:hidden">
        <SectionTitle title="先走这三步" description="手机端先保留最常用的判断路径，不把所有内容一次展开。" />
        <div className="mt-4 grid items-start gap-4">
          {mobileCoreEntries.map((entry) => (
            <Link key={entry.href} href={entry.href} className="card-link gap-2">
              <h3 className="text-body font-semibold text-ink">{entry.title}</h3>
              <p className="text-copy">{entry.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="site-shell pb-6 md:hidden">
        <SectionTitle title="重点行业方案" description="先看最常见的三类实验室路径。" />
        <div className="mt-4 grid items-start gap-4">
          {mobileSolutions.map((solution) => (
            <SolutionCard key={solution.slug} solution={solution} />
          ))}
        </div>
        <Link href="/solutions" className="btn-secondary mt-4 w-full">
          查看全部行业方案
        </Link>
      </section>

      <section className="site-shell pb-6 md:hidden">
        <SectionTitle title="案例 / 风险" description="先看别人在哪一步提前发现问题。" />
        <div className="mt-4 grid items-start gap-4">
          {mobileCases.map((caseItem) => (
            <CaseCard key={caseItem.slug} caseItem={caseItem} />
          ))}
        </div>
      </section>

      <div className="hidden md:block">
        <section className="site-shell pt-3 pb-8 md:pt-4 md:pb-8">
          <SectionTitle
            title="很多返工，不是评审时才发生"
            description="很多实验室真正浪费的，不是认可费用，而是错误启动带来的返工时间。一次能力范围误判，往往就意味着几个月重新调整。"
            descriptionClassName="text-copy leading-7 md:max-w-5xl md:text-[17px] md:leading-normal"
          />
          <p className="mt-2 max-w-2xl text-copy md:mt-4">{homePathwayLead}</p>
          <div className="mt-4 grid gap-3 md:mt-5 md:grid-cols-5 md:gap-3">
            {homePathways.map((pathway) => (
                <Link key={pathway.href} href={pathway.href} className="card-link h-full gap-2">
                <h3 className="text-body font-semibold leading-snug text-ink">{pathway.title}</h3>
                <p className="text-copy">{pathway.summary}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50">
          <div className="site-shell py-8 md:py-10">
            <SectionTitle
              title="大家通常怎么做错"
              description="很多实验室一开始急着搭体系，但真正的问题往往不是资料不够，而是能力范围、投入顺序和负责人判断错了。"
              descriptionClassName="text-copy leading-7 md:max-w-5xl md:text-[17px] md:leading-normal"
            />
            <div className="mt-4 grid gap-3 md:mt-6 md:grid-cols-3 md:gap-3">
              {hotQuestions.map((entry) => (
                <Link key={entry.href} href={entry.href} className="card-link h-full gap-2">
                  <h3 className="text-body font-semibold leading-snug text-ink">{entry.title}</h3>
                  <p className="text-copy">{entry.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="site-shell py-8 md:py-10">
            <SectionTitle
              title="先看别人怎么提前发现风险"
              description="更有参考价值的，是原本准备怎么做、哪里先暴露风险，以及最后避免了什么返工。"
              descriptionClassName="text-copy leading-7 md:max-w-5xl md:text-[17px] md:leading-normal"
            />
            <div className="mt-4 grid gap-4 md:mt-6 md:grid-cols-2 xl:grid-cols-4">
              {cases.map((caseItem) => (
                <CaseCard key={caseItem.slug} caseItem={caseItem} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="site-shell py-8 md:py-10">
            <SectionTitle
              title="先判断方向，比边做边改更省成本"
              description="不是把模块摆出来，而是把企业真正会遇到的判断节点拆开。先知道自己处在哪一段，再决定下一步最合适做什么。"
              descriptionClassName="text-copy leading-7 whitespace-normal md:max-w-6xl md:text-[17px] md:leading-normal"
            />
            <div className="mt-4 grid gap-3 md:mt-6 md:grid-cols-3 md:gap-3">
              {categories.map((category) => (
                <CategoryCard key={category.slug} category={category} />
              ))}
            </div>
          </div>
        </section>

        <section className="site-shell py-8 md:py-10">
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
                { title: "先判断", description: "先盘点需求、资源和管理基础，判断现在能不能启动、该不该马上启动。" },
                { title: "再收范围", description: "从项目和标准方法倒推认可范围，避免一开始铺得过大，后面资源跟不上。" },
                { title: "再建能力", description: "围绕认可范围配置人员、设备、环境和方法，把能力补到能真实运行。" },
                { title: "再跑体系", description: "形成原始记录、质控记录、内审和管理评审等证据链，让体系真的跑起来。" },
                { title: "最后进评审", description: "评审前集中排查不符合风险，准备检测演示和记录追溯，尽量把返工留在现场前。" },
              ]}
            />
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="site-shell py-8 md:py-10">
            <SectionTitle
              title="先看你更接近哪一种启动路径"
              description="同样是做 CNAS认可，不同行业、不同基础、不同检测范围，判断重点完全不同。先看清自己属于哪一类，再决定下一步。"
              descriptionClassName="text-copy leading-7 md:max-w-5xl md:text-[17px] md:leading-normal"
            />

            <div className="mt-4 md:mt-6">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-body font-semibold text-ink">按行业场景判断路径</h3>
                <p className="max-w-xl text-copy">先看你更接近哪类实验室，再进入对应路径。</p>
              </div>
              <div className="mt-3 grid gap-3 md:mt-4 md:grid-cols-3 md:gap-3">
                {orderedSolutions.map((solution) => (
                  <SolutionCard key={solution.slug} solution={solution} />
                ))}
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 border-t border-slate-200 pt-4 md:mt-6 md:flex-row md:items-center md:justify-between md:pt-5">
              <p className="max-w-xl text-copy">如果看完仍不确定自己属于哪条路径，建议先做一次判断，再决定是否继续投入。</p>
              <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
                <Link href="/diagnosis" className="btn-primary w-full sm:w-auto" data-track-event="start_judgment_click" data-track-location="home-results-matrix">
                  开始路径诊断
                </Link>
                <Link href="/solutions" className="btn-secondary w-full sm:w-auto">
                  获取实验室认可路径
                </Link>
                <Link href="/cases" className="btn-secondary w-full sm:w-auto">
                  查看行业案例
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <CtaBlock />
      <Footer />
    </main>
  );
}
