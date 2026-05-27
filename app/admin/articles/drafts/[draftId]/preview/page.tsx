/*
 * 文件说明：该文件实现文章草稿预览页。
 * 功能说明：用接近前台文章的阅读结构预览草稿，但不生成公开文章路由。
 *
 * 结构概览：
 *   第一部分：导入依赖
 *   第二部分：正文段落拆分
 *   第三部分：草稿预览页面
 */

// ========== 第一部分：导入依赖 ==========
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ensureAdminAccess, getAdminHref } from "@/lib/admin";
import { getArticleDraftById } from "@/lib/article-drafts";

// ========== 第二部分：正文段落拆分 ==========
function getParagraphs(content: string) {
  return content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

// ========== 第三部分：草稿预览页面 ==========
export default async function AdminArticleDraftPreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ draftId: string }>;
  searchParams: Promise<{ key?: string }>;
}) {
  noStore();

  const [{ draftId }, { key }] = await Promise.all([params, searchParams]);
  const access = await ensureAdminAccess(key);
  const draft = await getArticleDraftById(draftId);

  if (!draft) {
    notFound();
  }

  const paragraphs = getParagraphs(draft.content);

  return (
    <AdminShell
      active="articles"
      adminKey={access.adminKey}
      title="草稿预览"
      description="该预览只在后台可见，用于检查标题、摘要、正文段落和 FAQ 结构，不代表已发布到前台。"
      actions={
        <Link href={getAdminHref(`/admin/articles/drafts/${draft.id}/edit`, access.adminKey)} className="rounded-2xl bg-[#0b1d35] px-5 py-3 text-sm font-semibold text-white">
          返回编辑
        </Link>
      }
    >
      <article className="mx-auto max-w-4xl rounded-3xl border border-[#e4ded2] bg-white p-6 shadow-sm md:p-10">
        <p className="text-sm font-semibold text-[#b78b49]">{draft.category}</p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-[#0b1d35]">{draft.title || "未填写标题"}</h1>
        <p className="mt-4 text-base leading-7 text-[#667085]">{draft.summary || draft.seoDescription || "暂无摘要。"}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {[draft.mainKeyword, ...draft.relatedKeywords].filter(Boolean).map((keyword) => (
            <span key={keyword} className="rounded-full bg-[#f7f2e9] px-3 py-1 text-xs font-semibold text-[#856339]">
              {keyword}
            </span>
          ))}
        </div>

        <div className="mt-10 space-y-5 text-base leading-8 text-[#344054]">
          {paragraphs.length > 0 ? paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>) : <p>正文暂未填写。</p>}
        </div>

        {draft.faqs.length > 0 ? (
          <section className="mt-10 rounded-3xl bg-[#f7f2e9] p-6">
            <h2 className="text-xl font-semibold text-[#0b1d35]">FAQ</h2>
            <div className="mt-5 space-y-4">
              {draft.faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl bg-white p-4">
                  <h3 className="font-semibold text-[#0b1d35]">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#667085]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </AdminShell>
  );
}
