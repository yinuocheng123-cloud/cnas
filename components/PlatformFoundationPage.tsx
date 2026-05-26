import Link from "next/link";
import { CtaBlock } from "@/components/CtaBlock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import type { PlatformPageContent } from "@/lib/platform-pages";

/*
 * 文件说明：该文件实现 CNAS行业服务平台基础内容页的通用页面组件。
 * 功能说明：统一标题、核心内容、延伸入口、常见问题、下一步建议和返回首页入口。
 *
 * 结构概览：
 *   第一部分：组件入参
 *   第二部分：平台基础页组件
 */

// ========== 第一部分：组件入参 ==========
type PlatformFoundationPageProps = {
  content: PlatformPageContent;
};

// ========== 第二部分：平台基础页组件 ==========
export function PlatformFoundationPage({ content }: PlatformFoundationPageProps) {
  return (
    <main className="min-h-screen bg-white text-ink">
      <Header />
      <HeroSection
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        actions={
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/diagnosis" className="btn-primary">
              进入路径诊断
            </Link>
            <Link href="/" className="btn-secondary">
              返回首页
            </Link>
          </div>
        }
      />

      <section className="bg-[#06162c] text-white">
        <div className="site-shell py-8 md:py-12">
          <p className="text-meta font-semibold text-[#d8ad63]">平台说明</p>
          <h2 className="mt-2 max-w-3xl text-2xl font-semibold leading-snug md:text-title">{content.title}</h2>
          <p className="mt-3 max-w-4xl text-body leading-7 text-slate-300 md:text-[17px]">{content.intro}</p>
        </div>
      </section>

      <section className="site-shell section-space">
        <SectionTitle title="核心内容" description="先把关键判断拆开看清，再决定继续阅读、诊断或准备下一步动作。" />
        <div className="mt-5 grid gap-3 md:mt-6 md:grid-cols-2">
          {content.sections.map((section, index) => (
            <article key={section.title} className="card">
              <span className="text-meta font-semibold text-primary">0{index + 1}</span>
              <h3 className="mt-2 text-body font-semibold text-ink">{section.title}</h3>
              <p className="mt-2 text-copy">{section.summary}</p>
            </article>
          ))}
        </div>
      </section>

      {content.links ? (
        <section className="bg-surface">
          <div className="site-shell py-8 md:py-10">
            <SectionTitle title="继续阅读" description="这些入口承接首页内容卡片，让用户可以继续深入了解。" />
            <div className="mt-5 grid gap-3 md:mt-6 md:grid-cols-3">
              {content.links.map((item) => (
                <Link key={item.href} href={item.href} className="card-link">
                  <h3 className="text-body font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-copy">{item.summary}</p>
                  <span className="mt-3 text-meta font-semibold text-primary">查看内容 →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="site-shell section-space">
        <div className="grid gap-5 md:grid-cols-[1fr_0.9fr] md:items-start">
          <div>
            <SectionTitle title="常见问题" description="先用短问题确认边界，避免把基础内容误解成固定结论。" />
            <div className="mt-5 grid gap-3">
              {content.faqs.map((faq) => (
                <details key={faq.question} className="card">
                  <summary className="cursor-pointer text-body font-semibold text-ink">{faq.question}</summary>
                  <p className="mt-3 text-copy">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>

          <aside className="rounded-xl border border-line bg-card p-5 shadow-card">
            <h2 className="text-heading">下一步建议</h2>
            <ol className="mt-4 grid gap-3">
              {content.nextSteps.map((step, index) => (
                <li key={step} className="flex gap-3 text-copy">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#06162c] text-meta font-semibold text-white">{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <Link href="/" className="btn-secondary mt-5 w-full">
              返回首页
            </Link>
          </aside>
        </div>
      </section>

      <CtaBlock />
      <Footer />
    </main>
  );
}
