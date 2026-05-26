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
    title: "开始路径判断",
    summary: "先判断当前是否适合启动。",
    href: "/diagnosis",
  },
  {
    title: "添加顾问领取问卷",
    summary: "扫码领取《CNAS认可路径判断问卷》。",
    href: "#footer-wecom",
  },
  {
    title: "查看行业路径",
    summary: "按实验室类型看推进差异。",
    href: "/solutions",
  },
];

const mobilePainPoints = [
  ["认可范围没定清", "材料容易重做"],
  ["人员设备没准备好", "评审前容易出问题"],
  ["体系文件和现场运行脱节", "后期整改成本高"],
];

const mobileJudgmentItems = [
  ["实验室类型", "先看适用路径"],
  ["认可范围", "先定项目和标准"],
  ["人员能力", "看授权和确认"],
  ["设备环境", "看配置和校准"],
  ["体系运行", "看记录和内审"],
  ["评审准备", "看现场和整改"],
];

const mobileMaintenanceItems = ["体系运行维护", "监督评审与复评审准备", "扩项与变更支持", "年度合规维护"];

const mobileFaqItems = [
  ["CNAS认可一般要多久？", "取决于范围、人员设备基础和体系运行成熟度，建议先做路径判断。"],
  ["费用为什么差异大？", "差异主要来自认可范围、资源基础、体系建设工作量和评审准备难度。"],
  ["通过后还需要维护吗？", "需要，后续还要持续做好体系运行、监督评审、复评审和整改闭环。"],
  ["现在只是了解阶段，能不能先判断路径？", "可以。越早判断路径，越容易避免后面范围调整和材料返工。"],
];

// ========== 第三部分：首页主体内容 ==========
export default function HomePage() {
  const orderedSolutions = getOrderedSolutions();

  return (
    <main className="min-h-screen bg-white text-ink">
      <Header />
      <HeroSection
        variant="balanced"
        eyebrow="CNAS Recognition Knowledge Platform"
        title={
          <>
            <span className="md:hidden">做CNAS认可，先判断路径，再决定怎么启动</span>
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
            <div className="md:hidden">
              <p>避免一上来就做材料，后面反复返工。</p>
              <div className="mt-4 rounded-2xl border border-line bg-white p-4 shadow-card">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-meta font-semibold text-primary">路径判断</p>
                    <p className="mt-1 text-sm leading-6 text-ink">范围、人员、设备、体系先看清</p>
                  </div>
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-primary/20 bg-primary/10 text-lg font-semibold text-primary">CNAS</div>
                </div>
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {["范围", "人员", "设备", "体系"].map((item, index) => (
                    <div key={item} className="rounded-lg bg-surface px-2 py-2 text-center">
                      <span className="mx-auto grid h-6 w-6 place-items-center rounded-full bg-white text-xs font-semibold text-primary">{index + 1}</span>
                      <p className="mt-1 text-xs text-muted">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="hidden md:block">很多返工，其实在项目开始前就已经决定了。真正容易浪费的，不只是认可费用，而是错误方向带来的几个月重做时间。</p>
          </>
        }
        actions={
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/diagnosis" className="btn-primary" data-track-event="start_judgment_click" data-track-location="home-hero">
                <span className="md:hidden">开始路径判断</span>
                <span className="hidden md:inline">开始路径诊断</span>
              </Link>
              <Link href="#footer-wecom" className="btn-secondary md:hidden">
                添加顾问领取问卷
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
        <SectionTitle title="为什么不建议一上来就做材料？" description="启动前先看清几个关键风险点。" />
        <div className="mt-4 grid gap-3">
          {mobilePainPoints.map(([title, summary], index) => (
            <div key={title} className="flex gap-3 rounded-xl border border-amber-200/80 bg-amber-50/70 p-4">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-sm font-semibold text-amber-600">{index + 1}</span>
              <div className="min-w-0">
                <h3 className="text-body font-semibold text-ink">{title}</h3>
                <p className="mt-1 text-copy">{summary}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="site-shell pb-6 md:hidden">
        <SectionTitle title="路径判断看这六件事" description="手机端先保留最关键判断，不放长表单。" />
        <div className="mt-4 grid grid-cols-2 gap-3">
          {mobileJudgmentItems.map(([title, summary], index) => (
            <div key={title} className="min-w-0 rounded-xl border border-line bg-white p-4 shadow-card">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{index + 1}</span>
              <h3 className="mt-2 text-body font-semibold text-ink">{title}</h3>
              <p className="mt-1 text-copy">{summary}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="site-shell pb-6 md:hidden">
        <SectionTitle title="轻量进入下一步" description="先选一个入口，不在首页堆完整长表单。" />
        <div className="mt-4 grid items-start gap-4">
          {mobileCoreEntries.map((entry) => (
            <Link key={entry.href} href={entry.href} className="card-link gap-2">
              <h3 className="text-body font-semibold text-ink">{entry.title}</h3>
              <p className="text-copy">{entry.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="mobile-wecom" className="site-shell pb-6 md:hidden">
        <div className="rounded-2xl border border-line bg-[#071e3f] p-5 text-center text-white shadow-card">
          <p className="text-meta font-semibold uppercase tracking-[0.12em] text-[#4ECDC4]">Path Check</p>
          <h2 className="mt-2 text-xl font-semibold">添加CNAS认可指南顾问</h2>
          <p className="mt-2 text-body text-slate-300">扫码领取《CNAS认可路径判断问卷》</p>
          <img src="/wecom-qr.png" alt="企业微信顾问二维码" className="mx-auto mt-4 h-40 w-40 rounded-xl bg-white p-2" />
          <p className="mt-3 text-copy text-slate-300">如果还不确定现在是否适合启动，先把路径判断清楚。</p>
        </div>
      </section>

      <section className="site-shell pb-6 md:hidden">
        <SectionTitle title="CNAS认可不是拿证结束" description="通过之后还要持续做好维护。" />
        <div className="mt-4 grid gap-3">
          {mobileMaintenanceItems.map((item) => (
            <div key={item} className="rounded-xl border border-line bg-white p-4 text-body font-semibold text-ink">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="site-shell pb-6 md:hidden">
        <SectionTitle title="常见问题" description="先把高频问题说清楚。" />
        <div className="mt-4 grid items-start gap-4">
          {mobileFaqItems.map(([question, answer]) => (
            <details key={question} className="rounded-xl border border-line bg-white p-4 shadow-card">
              <summary className="cursor-pointer text-body font-semibold text-ink">{question}</summary>
              <p className="mt-3 text-copy">{answer}</p>
            </details>
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
