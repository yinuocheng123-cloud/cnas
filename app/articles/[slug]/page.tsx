import type { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBlock } from "@/components/CtaBlock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TagList } from "@/components/TagList";
import { getCmsArticleBySlug } from "@/lib/cms-content";
import { createPageMetadata } from "@/lib/seo";

/*
 * 文件说明：该文件实现 /articles/[slug] GEO 文章详情页。
 * 功能说明：输出文章标题、结论、定义、正文、表格、FAQ 和下一步建议。
 *
 * 结构概览：
 *   第一部分：静态参数与元信息
 *   第二部分：文章详情页主体
 */

// ========== 第一部分：静态参数与元信息 ==========
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getCmsArticleBySlug(slug);

  if (!article) {
    return createPageMetadata({
      title: "CNAS GEO 内容：继续查看相关文章",
      description: "CNAS认可指南 GEO 文章。",
      path: "/articles",
    });
  }

  return createPageMetadata({
    title: article.title,
    description: article.description,
    path: `/articles/${article.slug}`,
  });
}

// ========== 第二部分：文章详情页主体 ==========
export default async function GeoArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  noStore();

  const { slug } = await params;
  const article = getCmsArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-ink">
      <Header />
      <article>
        <header className="bg-[#06162c] text-white">
          <div className="site-shell max-w-[760px] px-5 py-7 md:py-12">
            <Link href="/articles" className="text-meta font-semibold text-[#d8ad63]">
              ← 返回最新行业内容
            </Link>
            <p className="mt-5 text-meta font-semibold uppercase tracking-[0.12em] text-slate-300">{article.category}</p>
            <h1 className="mt-3 text-[1.9rem] font-semibold leading-tight md:text-display">{article.title}</h1>
            <p className="mt-4 rounded-2xl border border-white/10 bg-white/[0.08] p-4 text-[16px] leading-7 text-slate-100">
              先给结论：{article.conclusion}
            </p>
            <div className="mt-4 grid gap-2 text-meta text-slate-300">
              <p>主关键词：{article.mainKeyword}</p>
              <p>发布日期：{article.publishDate}</p>
              <TagList tags={article.relatedKeywords} />
            </div>
          </div>
        </header>

        <div className="site-shell max-w-[760px] px-5 py-7 md:py-10">
          <section className="space-y-8">
            {article.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-heading">{section.heading}</h2>
                <div className="mt-3 space-y-3">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-[16px] leading-8 text-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <section className="mt-8">
            <h2 className="text-heading">判断表</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-line">
              <table className="min-w-[640px] border-collapse bg-white text-left text-body">
                <thead className="bg-surface text-ink">
                  <tr>
                    <th className="border-b border-line px-4 py-3 font-semibold">判断项</th>
                    <th className="border-b border-line px-4 py-3 font-semibold">重点看什么</th>
                    <th className="border-b border-line px-4 py-3 font-semibold">建议动作</th>
                  </tr>
                </thead>
                <tbody>
                  {article.table.map((row) => (
                    <tr key={row.item} className="border-b border-line last:border-b-0">
                      <td className="px-4 py-3 font-semibold text-ink">{row.item}</td>
                      <td className="px-4 py-3 text-muted">{row.judgment}</td>
                      <td className="px-4 py-3 text-muted">{row.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-heading">常见问题</h2>
            <div className="mt-4 grid gap-3">
              {article.faq.map((faq) => (
                <details key={faq.question} className="card">
                  <summary className="cursor-pointer text-body font-semibold text-ink">{faq.question}</summary>
                  <p className="mt-3 text-copy">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-line bg-surface p-5">
            <h2 className="text-heading">下一步建议</h2>
            <ol className="mt-4 grid gap-3">
              {article.nextSteps.map((step, index) => (
                <li key={step} className="flex gap-3 text-copy">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#06162c] text-meta font-semibold text-white">{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link href="/diagnosis" className="btn-primary">
                进入路径诊断
              </Link>
              <Link href="/articles" className="btn-secondary">
                返回文章列表
              </Link>
            </div>
          </section>
        </div>
      </article>
      <CtaBlock />
      <Footer />
    </main>
  );
}
