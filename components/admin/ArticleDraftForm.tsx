/*
 * 文件说明：该文件实现文章草稿编辑表单。
 * 功能说明：复用在新建与编辑草稿页面，使用 textarea 保存 Markdown/纯文本正文，并提示 Word 粘贴会做基础清洗。
 *
 * 结构概览：
 *   第一部分：导入依赖
 *   第二部分：表单组件
 */

// ========== 第一部分：导入依赖 ==========
import Link from "next/link";
import { getAdminHref } from "@/lib/admin";
import { getArticleDraftStatuses, stringifyFaqs, stringifyRelatedKeywords, type ArticleDraft } from "@/lib/article-drafts";
import { geoArticleCategories } from "@/lib/geo-articles";

// ========== 第二部分：表单组件 ==========
export function ArticleDraftForm({
  action,
  adminKey,
  draft,
}: {
  action: string;
  adminKey: string | undefined;
  draft?: ArticleDraft;
}) {
  const relatedKeywordsText = draft ? stringifyRelatedKeywords(draft.relatedKeywords) : "";
  const faqsText = draft ? stringifyFaqs(draft.faqs) : "";

  return (
    <form className="space-y-6 rounded-3xl border border-[#e4ded2] bg-white p-5 shadow-sm" action={action} method="post">
      <input type="hidden" name="key" value={adminKey ?? ""} />

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-[#344054]">标题</span>
          <input className="mt-2 w-full rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm outline-none focus:border-[#d1a35d]" name="title" defaultValue={draft?.title ?? ""} required />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-[#344054]">slug</span>
          <input className="mt-2 w-full rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm outline-none focus:border-[#d1a35d]" name="slug" defaultValue={draft?.slug ?? ""} required />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-[#344054]">分类</span>
          <select className="mt-2 w-full rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm outline-none focus:border-[#d1a35d]" name="category" defaultValue={draft?.category ?? geoArticleCategories[0]}>
            {geoArticleCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-[#344054]">状态</span>
          <select className="mt-2 w-full rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm outline-none focus:border-[#d1a35d]" name="status" defaultValue={draft?.status ?? "草稿"}>
            {getArticleDraftStatuses().map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-[#344054]">主词</span>
          <input className="mt-2 w-full rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm outline-none focus:border-[#d1a35d]" name="mainKeyword" defaultValue={draft?.mainKeyword ?? ""} />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-[#344054]">SEO标题</span>
          <input className="mt-2 w-full rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm outline-none focus:border-[#d1a35d]" name="seoTitle" defaultValue={draft?.seoTitle ?? ""} />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-semibold text-[#344054]">关联词</span>
        <textarea className="mt-2 min-h-28 w-full rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm leading-6 outline-none focus:border-[#d1a35d]" name="relatedKeywordsText" defaultValue={relatedKeywordsText} placeholder="每行一个，或用逗号分隔" />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-[#344054]">SEO描述</span>
        <textarea className="mt-2 min-h-28 w-full rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm leading-6 outline-none focus:border-[#d1a35d]" name="seoDescription" defaultValue={draft?.seoDescription ?? ""} />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-[#344054]">摘要</span>
        <textarea className="mt-2 min-h-28 w-full rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm leading-6 outline-none focus:border-[#d1a35d]" name="summary" defaultValue={draft?.summary ?? ""} />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-[#344054]">正文</span>
        <textarea
          className="mt-2 min-h-[420px] w-full rounded-2xl border border-[#e4ded2] px-4 py-3 font-mono text-sm leading-7 outline-none focus:border-[#d1a35d]"
          name="content"
          defaultValue={draft?.content ?? ""}
          placeholder="可粘贴 Word 文本；保存时会保留段落，并清洗连续多余空行。"
        />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-[#344054]">FAQ</span>
        <textarea className="mt-2 min-h-40 w-full rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm leading-6 outline-none focus:border-[#d1a35d]" name="faqsText" defaultValue={faqsText} placeholder={"问：问题一\n答：回答一\n\n问：问题二\n答：回答二"} />
      </label>

      <div className="flex flex-col gap-3 border-t border-[#eee6d8] pt-5 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-[#667085]">正式发布功能将在下一阶段开放。当前保存内容只进入本地草稿文件。</p>
        <div className="flex flex-wrap gap-3">
          <Link href={getAdminHref("/admin/articles", adminKey)} className="rounded-2xl border border-[#e4ded2] px-5 py-3 text-sm font-semibold text-[#344054]">
            返回列表
          </Link>
          <button className="rounded-2xl border border-[#d8ad63] px-5 py-3 text-sm font-semibold text-[#8a6531] opacity-60" type="button" disabled>
            发布
          </button>
          <button className="rounded-2xl bg-[#0b1d35] px-5 py-3 text-sm font-semibold text-white" type="submit">
            保存草稿
          </button>
        </div>
      </div>
    </form>
  );
}
