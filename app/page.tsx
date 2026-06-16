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
const mobileIndustryProblems = [
  ["路径不清", "一开始没有判断启动路径，后面越做越偏。"],
  ["范围不明确", "认可范围摇摆，材料和资源准备容易反复。"],
  ["文件和实际运行脱节", "文件看起来完整，但现场证据跟不上。"],
  ["人员设备准备不足", "评审前才发现授权、设备和环境不匹配。"],
  ["后期返工严重", "问题集中暴露后，周期和沟通成本都会上升。"],
  ["维护节奏失控", "通过认可后缺少持续运行节奏，监督评审压力变大。"],
];

const mobileCapabilities = [
  ["路径判断", "判断当前条件与启动可行性", "/path"],
  ["认可准备", "梳理体系、人员、设备与记录准备", "/prepare"],
  ["评审整改", "支持评审前风险排查与问题整改", "/review"],
  ["后期维护", "支持监督评审、复评审、扩项和年度维护", "/maintenance"],
];

const mobileHeroCapabilityLinks = [
  { title: "路径判断", href: "/path" },
  { title: "认可准备", href: "/prepare" },
  { title: "评审整改", href: "/review" },
  { title: "后期维护", href: "/maintenance" },
];

const mobilePathCheckItems = [
  ["当前是否适合启动", "先看需求、资源和阶段是否匹配。"],
  ["认可范围是否清楚", "先把项目、标准和报告用途收住。"],
  ["人员设备是否支撑", "看授权、校准、环境和方法能否闭环。"],
  ["体系运行是否具备基础", "看记录、内审和管理评审能否真实运行。"],
];

const mobileMaintenanceItems = [
  ["体系运行维护", "保持管理体系和技术能力持续有效运行"],
  ["监督评审与复评审准备", "提前识别风险，做好应对准备"],
  ["扩项与变更支持", "扩项申请、变更管理和过程支持"],
  ["年度合规维护包", "年度规划、内审、管理评审支持"],
];

const mobileLatestContents = [
  {
    title: "CNAS认可前，为什么要先判断路径？",
    href: "/knowledge/cnas-first-step-is-judgment",
    meta: "路径判断",
  },
  {
    title: "CNAS认可通过后，还需要维护什么？",
    href: "/knowledge/suitable-companies-for-cnas",
    meta: "持续维护",
  },
  {
    title: "CNAS评审整改，常见问题有哪些？",
    href: "/knowledge/why-cnas-assessment-fails",
    meta: "评审整改",
  },
];

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
      <section className="relative overflow-hidden bg-[#06162c] text-white md:hidden">
        <div className="absolute inset-0 opacity-[0.45]" aria-hidden="true">
          <img src="/images/hero/home-hero.webp" alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#06162c]/[0.92] via-[#06162c]/[0.84] to-[#06162c]" aria-hidden="true" />
        <div className="site-shell relative grid min-h-[calc(100svh-64px)] content-center gap-7 py-10">
          <div className="grid w-fit gap-1 border-b border-[#d8ad63] pb-4">
            <span className="text-xl font-semibold leading-tight">CNAS认可指南</span>
            <span className="text-meta text-slate-300">CNAS行业服务平台</span>
          </div>
          <div>
            <h1 className="text-[2.35rem] font-semibold leading-[1.18] tracking-[-0.01em]">
              做CNAS，
              <br />
              先判断路径，
              <br />
              <span className="text-[#f2d59a]">再做认可准备</span>
            </h1>
            <p className="mt-5 max-w-[18rem] text-base leading-8 text-slate-200">很多实验室的问题，不是审核，而是方向。</p>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {mobileHeroCapabilityLinks.map((item) => (
              <Link key={item.href} href={item.href} className="grid min-h-16 place-items-center rounded-2xl border border-white/10 bg-white/[0.08] px-2 text-center text-xs font-semibold text-slate-100 backdrop-blur transition hover:border-[#d8ad63]/60">
                {item.title}
              </Link>
            ))}
          </div>
          <Link href="/path" className="flex min-h-14 items-center justify-between rounded-2xl bg-gradient-to-r from-[#f5dca8] to-[#d8ad63] px-5 text-sm font-semibold text-[#06162c] shadow-[0_18px_42px_rgba(216,173,99,0.22)]">
            了解CNAS认可路径判断
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#06162c] text-lg text-white">→</span>
          </Link>
        </div>
      </section>

      <section className="site-shell rounded-t-[1.75rem] bg-[#f7f8fb] py-8 md:hidden">
        <p className="text-meta font-semibold text-[#b88a3c]">行业问题</p>
        <h2 className="mt-2 text-2xl font-semibold leading-snug text-ink">为什么很多CNAS项目后面越来越乱？</h2>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {mobileIndustryProblems.map(([title, summary], index) => (
            <article key={title} className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_14px_34px_rgba(15,23,42,0.06)]">
              <span className="text-meta font-semibold text-[#b88a3c]">0{index + 1}</span>
              <h3 className="mt-2 text-body font-semibold text-ink">{title}</h3>
              <p className="mt-1 text-[0.8125rem] leading-6 text-muted">{summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#06162c] py-8 text-white md:hidden">
        <div className="site-shell">
          <p className="text-meta font-semibold text-[#d8ad63]">平台能力</p>
          <h2 className="mt-2 text-2xl font-semibold leading-snug">CNAS认可指南能做什么？</h2>
          <p className="mt-3 text-body text-slate-300">围绕认可前、认可中、认可后，提供持续的信息、判断与服务支持，帮助实验室更清楚地推进CNAS认可准备。</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {mobileCapabilities.map(([title, summary, href], index) => (
              <Link key={title} href={href} className="rounded-2xl border border-white/10 bg-white/[0.08] p-4 transition hover:border-[#d8ad63]/60">
                <span className="grid h-9 w-9 place-items-center rounded-xl border border-[#d8ad63]/35 text-sm font-semibold text-[#f2d59a]">{index + 1}</span>
                <h3 className="mt-4 text-base font-semibold">{title}</h3>
                <p className="mt-2 text-[0.8125rem] leading-6 text-slate-300">{summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="mobile-path-check" className="site-shell bg-[#f7f8fb] py-8 md:hidden">
        <p className="text-meta font-semibold text-[#b88a3c]">路径判断说明</p>
        <h2 className="mt-2 text-2xl font-semibold leading-snug text-ink">CNAS认可路径判断</h2>
        <p className="mt-3 text-body text-muted">不是一开始就做材料，而是先判断实验室当前是否适合启动、认可范围是否清楚、人员设备是否支撑、体系运行是否具备基础。</p>
        <div className="mt-5 grid gap-3">
          {mobilePathCheckItems.map(([title, summary]) => (
            <article key={title} className="rounded-2xl border border-slate-200 bg-white p-4">
              <h3 className="text-body font-semibold text-ink">{title}</h3>
              <p className="mt-1 text-copy">{summary}</p>
            </article>
          ))}
        </div>
        <Link href="/path" className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-[#06162c] px-5 text-sm font-semibold text-white">
          了解路径判断
        </Link>
      </section>

      <section className="site-shell bg-[#f7f8fb] pb-8 md:hidden">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
          <p className="text-meta font-semibold text-[#b88a3c]">服务入口</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink">CNAS认可指南顾问</h2>
          <p className="mt-2 text-body text-muted">针对实验室当前阶段，提供路径判断与准备建议。</p>
          <div className="mt-5 grid grid-cols-[132px_minmax(0,1fr)] items-center gap-4 rounded-2xl bg-[#06162c] p-4 text-white">
            <img src="/wecom-qr.png" alt="企业微信顾问二维码" className="h-32 w-32 rounded-xl bg-white p-2" />
            <div className="min-w-0">
              <p className="font-semibold">添加顾问</p>
              <p className="mt-2 text-[0.8125rem] leading-6 text-slate-300">领取路径判断问卷，先把启动方向看清。</p>
            </div>
          </div>
          <Link href="#footer-wecom" className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#f5dca8] to-[#d8ad63] px-5 text-sm font-semibold text-[#06162c]">
            获取路径判断建议
          </Link>
        </div>
      </section>

      <section className="site-shell bg-[#f7f8fb] pb-8 md:hidden">
        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <p className="text-meta font-semibold text-[#b88a3c]">轻量信息收集</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink">路径判断问卷</h2>
          <p className="mt-2 text-body text-muted">手机端先进入专门诊断页填写，不在首页堆完整长表单，现有接口、webhook 和后台线索逻辑保持不变。</p>
          <Link href="/diagnosis" className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 text-sm font-semibold text-ink">
            填写基础信息
          </Link>
        </div>
      </section>

      <section className="site-shell bg-[#f7f8fb] pb-8 md:hidden">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-meta font-semibold text-[#b88a3c]">内容入口</p>
            <h2 className="mt-2 text-2xl font-semibold text-ink">最新行业内容</h2>
          </div>
          <Link href="/articles" className="shrink-0 text-meta font-semibold text-ink">
            查看更多 →
          </Link>
        </div>
        <div className="mt-5 grid gap-3">
          {mobileLatestContents.map((item) => (
            <Link key={item.href} href={item.href} className="grid grid-cols-[86px_minmax(0,1fr)] gap-3 rounded-2xl border border-slate-200 bg-white p-3">
              <span className="grid min-h-20 place-items-center rounded-xl bg-[#06162c] px-2 text-center text-xs font-semibold text-[#f2d59a]">{item.meta}</span>
              <strong className="self-center text-body font-semibold leading-6 text-ink">{item.title}</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="site-shell bg-[#f7f8fb] pb-8 md:hidden">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-meta font-semibold text-[#b88a3c]">常见问题</p>
            <h2 className="mt-2 text-2xl font-semibold text-ink">先把关键疑问说清楚</h2>
          </div>
          <Link href="/faq" className="shrink-0 text-meta font-semibold text-ink">
            全部问题 →
          </Link>
        </div>
        <div className="mt-5 grid gap-3">
          {mobileFaqItems.map(([question, answer]) => (
            <details key={question} className="rounded-2xl border border-slate-200 bg-white p-4">
              <summary className="cursor-pointer text-body font-semibold text-ink">{question}</summary>
              <p className="mt-3 text-copy">{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-[#06162c] py-8 text-white md:hidden">
        <div className="site-shell">
          <p className="text-meta font-semibold text-[#d8ad63]">认可后维护</p>
          <h2 className="mt-2 text-2xl font-semibold leading-snug">CNAS认可不是拿证结束</h2>
          <div className="mt-5 grid gap-3">
            {mobileMaintenanceItems.map(([title, summary]) => (
              <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.08] p-4">
                <h3 className="text-body font-semibold">{title}</h3>
                <p className="mt-1 text-[0.8125rem] leading-6 text-slate-300">{summary}</p>
              </article>
            ))}
          </div>
          <Link href="/maintenance" className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-[#d8ad63]/45 px-5 text-sm font-semibold text-[#f2d59a]">
            了解认可后维护
          </Link>
        </div>
      </section>

      <div className="hidden md:block">
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
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/diagnosis" className="btn-primary" data-track-event="start_judgment_click" data-track-location="home-hero">
                  开始路径诊断
                </Link>
                <Link href="/cases" className="btn-secondary hidden md:inline-flex">
                  查看行业案例
                </Link>
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
      </div>

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

      <div className="hidden md:block">
        <CtaBlock />
      </div>
      <Footer showAdminEntry />
    </main>
  );
}
