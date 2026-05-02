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
import { cases, categories, homePathways, homeStats, hotQuestions, solutions } from "@/lib/site-data";
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
  title: "企业做CNAS认可前，先把关键路径想清楚",
  description: "很多企业在做CNAS认证（即CNAS认可）时，会在实验室建设、体系准备和评审环节走弯路。这里帮你先判断要不要做、怎么做、从哪一步开始。",
  path: "/",
});

// ========== 第一部分：首屏专业入口 ==========
export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <Header />
      <HeroSection
        variant="balanced"
        eyebrow="CNAS Recognition Knowledge Platform"
        title={
          <>
            企业做CNAS认可前
            <br />
            <span className="hero-subline mt-1 block">先把关键路径想清楚</span>
          </>
        }
        emphasis="再去做实验室能力建设"
        description={
          <>
            很多企业在做CNAS认证（即CNAS认可）时，
            <br className="hidden md:block" />
            会在实验室建设、体系准备和评审环节走弯路。
            <br />
            这里帮你先判断：要不要做、怎么做、从哪一步开始。
          </>
        }
        actions={
          <>
            <Link href="/diagnosis" className="btn-primary">
              先判断我适不适合做CNAS
            </Link>
            <Link href="/cnas-risk" className="btn-secondary">
              看看别人都在哪一步出问题
            </Link>
          </>
        }
        riskNotice="⚠ 很多企业在“设备先采购、体系后补”的情况下，容易导致返工和评审风险。"
        aside={
          <dl className="grid gap-3">
            {homeStats.map((stat) => (
              <div key={stat.label} className="card p-4">
                <dt className="text-meta-token">{stat.label}</dt>
                <dd className="mt-2 text-title font-semibold text-ink">{stat.value}</dd>
              </div>
            ))}
          </dl>
        }
      />

      <section className="site-shell section-space">
        <SectionTitle title="平台路径" description="首页结构对应导航入口：知识库承接流量，流程承接强需求，方案承接成交，案例建立信任，诊断推动转化。" />
        <div className="mt-6 grid gap-4 md:grid-cols-5">
          {homePathways.map((pathway) => (
            <Link key={pathway.href} href={pathway.href} className="card-link">
              <p className="text-meta-token font-semibold">{pathway.intent}</p>
              <h3 className="mt-3 text-body font-semibold text-ink">{pathway.title}</h3>
              <p className="mt-3 text-copy">{pathway.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ========== 第二部分：热门问题与内容分类 ========== */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="site-shell section-space">
        <SectionTitle title="热门问题入口" description="先回答企业最常搜索、最容易误判的 CNAS认可问题。" />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {hotQuestions.map((entry) => (
            <Link key={entry.href} href={entry.href} className="card-link">
              <h3 className="text-body font-semibold text-ink">{entry.title}</h3>
              <p className="mt-3 text-copy">{entry.summary}</p>
            </Link>
          ))}
        </div>
        </div>
      </section>

      <section>
        <div className="site-shell section-space">
          <SectionTitle title="内容分类入口" description="围绕基础认知、申请流程、费用周期、评审风险、实验室建设和常见问题持续扩展。" />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== 第三部分：风险诊断、行业方案、案例和咨询入口 ========== */}
      <section className="site-shell section-space">
        <RiskNotice
          title="企业是否适合现在启动CNAS认可？"
          items={[
            "如果认可范围尚不清晰，不建议直接进入申请。先把检测项目、标准方法、样品类型和报告用途梳理清楚，再判断哪些能力适合首批申报。",
            "如果人员、设备、环境和方法无法支撑检测项目，应先补齐能力基础。现场评审看的不是计划书，而是人员会不会做、设备能不能用、环境能不能稳定支撑检测。",
            "如果体系只停留在文件层面，没有试运行记录，现场评审风险会明显增加。至少要形成样品流转、原始记录、质量控制、内审和管理评审等可追溯证据。",
            "先做诊断，再规划，再建设，再辅导，再评审，能减少盲目投入。尤其是设备采购、场地改造和认可范围选择，应当围绕实际检测能力倒推。",
          ]}
        />
        <div className="mt-6">
          <ProcessSteps
            steps={[
              {
                title: "启动诊断",
                description: "先盘点检测需求、现有资源和管理基础，判断现在能不能启动，以及哪些短板会影响评审。",
              },
              {
                title: "范围规划",
                description: "从产品、项目、标准方法和客户要求倒推认可范围，避免一开始铺得过大、后续支撑不足。",
              },
              {
                title: "实验室建设",
                description: "围绕认可范围配置人员、设备、环境和方法，重点确认每项能力是否有真实运行条件。",
              },
              {
                title: "体系运行",
                description: "让文件进入日常运行，形成原始记录、质控记录、内审和管理评审等评审证据链。",
              },
              {
                title: "现场评审",
                description: "评审前集中排查不符合风险，准备检测演示、人员问询、记录追溯和整改闭环。",
              },
            ]}
          />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="site-shell section-space">
          <SectionTitle title="行业方案入口" description="不同行业实验室的基础不同，CNAS认可路径也需要分别判断。" />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {solutions.map((solution) => (
              <SolutionCard key={solution.slug} solution={solution} />
            ))}
          </div>
        </div>
      </section>

      <section className="site-shell section-space">
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
