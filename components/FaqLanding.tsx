import Link from "next/link";
import { CtaBlock } from "@/components/CtaBlock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { faqs } from "@/lib/site-data";

/*
 * 文件说明：该文件实现 FAQ 聚合页组件。
 * 功能说明：统一 /faqs 和 /cnas-faq 的常见问题展示。
 *
 * 结构概览：
 *   第一部分：FaqLanding 组件
 */

// ========== 第一部分：FaqLanding 组件 ==========
export function FaqLanding() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <Header />
      <HeroSection
        eyebrow="CNAS FAQ"
        title="CNAS常见问题"
        description="聚合企业启动 CNAS认可前最常见的判断型问题，帮助先看清条件、风险和投入重点。"
      />
      <section className="mx-auto grid max-w-4xl gap-4 px-6 py-12 md:px-8">
        {faqs.map((faq) => (
          <article key={`${faq.articleSlug}-${faq.question}`} className="rounded border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-slate-950">{faq.question}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{faq.answer}</p>
            <Link href={`/knowledge/${faq.articleSlug}`} className="mt-3 inline-flex text-sm font-semibold text-blue-900">
              来源：{faq.articleTitle}
            </Link>
          </article>
        ))}
      </section>
      <CtaBlock />
      <Footer />
    </main>
  );
}
