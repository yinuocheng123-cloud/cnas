/*
 * 文件说明：该文件实现 CMS v1.2 正式文章编辑表单。
 * 功能说明：用于新增和编辑 data/articles.json 中的正式文章内容，不修改 TS 源码文件。
 *
 * 结构概览：
 *   第一部分：导入依赖
 *   第二部分：文章表单组件
 */

// ========== 第一部分：导入依赖 ==========
import Link from "next/link";
import { getAdminHref } from "@/lib/admin";
import {
  getCmsArticleStatuses,
  stringifyCmsFaqText,
  stringifyTextList,
  type CmsArticle,
} from "@/lib/cms-content";
import { geoArticleCategories } from "@/lib/geo-articles";

// ========== 第二部分：文章表单组件 ==========
export function CmsArticleForm({
  action,
  adminKey,
  article,
  error,
}: {
  action: string;
  adminKey: string | undefined;
  article?: CmsArticle;
  error?: string;
}) {
  return (
    <form className="space-y-6 rounded-3xl border border-[#e4ded2] bg-white p-5 shadow-sm" action={action} method="post">
      <input type="hidden" name="key" value={adminKey ?? ""} />

      {error ? <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-[#344054]">标题</span>
          <input className="mt-2 w-full rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm outline-none focus:border-[#d1a35d]" name="title" defaultValue={article?.title ?? ""} required />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-[#344054]">slug</span>
          <input className="mt-2 w-full rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm outline-none focus:border-[#d1a35d]" name="slug" defaultValue={article?.slug ?? ""} required />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-[#344054]">分类</span>
          <select className="mt-2 w-full rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm outline-none focus:border-[#d1a35d]" name="category" defaultValue={article?.category ?? geoArticleCategories[0]}>
            {geoArticleCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-[#344054]">状态</span>
          <select className="mt-2 w-full rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm outline-none focus:border-[#d1a35d]" name="status" defaultValue={article?.status ?? "draft"}>
            {getCmsArticleStatuses().map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-[#344054]">主词</span>
          <input className="mt-2 w-full rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm outline-none focus:border-[#d1a35d]" name="mainKeyword" defaultValue={article?.mainKeyword ?? ""} />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-[#344054]">发布时间</span>
          <input className="mt-2 w-full rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm outline-none focus:border-[#d1a35d]" name="publishDate" defaultValue={article?.publishDate ?? new Date().toISOString().slice(0, 10)} />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-[#344054]">SEO标题</span>
          <input className="mt-2 w-full rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm outline-none focus:border-[#d1a35d]" name="seoTitle" defaultValue={article?.seoTitle ?? article?.title ?? ""} />
        </label>
        <label className="flex items-center gap-3 rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm font-semibold text-[#344054]">
          <input name="featured" type="checkbox" value="true" defaultChecked={article?.featured ?? false} />
          是否推荐
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-semibold text-[#344054]">关联词</span>
        <textarea className="mt-2 min-h-28 w-full rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm leading-6 outline-none focus:border-[#d1a35d]" name="relatedKeywordsText" defaultValue={article ? stringifyTextList(article.relatedKeywords) : ""} placeholder="每行一个，或用逗号分隔" />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-[#344054]">SEO描述</span>
        <textarea className="mt-2 min-h-28 w-full rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm leading-6 outline-none focus:border-[#d1a35d]" name="seoDescription" defaultValue={article?.description ?? ""} />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-[#344054]">摘要</span>
        <textarea className="mt-2 min-h-28 w-full rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm leading-6 outline-none focus:border-[#d1a35d]" name="summary" defaultValue={article?.summary ?? article?.conclusion ?? ""} />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-[#344054]">正文</span>
        <textarea className="mt-2 min-h-[520px] w-full rounded-2xl border border-[#e4ded2] px-4 py-3 font-mono text-sm leading-7 outline-none focus:border-[#d1a35d]" name="content" defaultValue={article?.content ?? ""} placeholder="可用 ## 小标题 分段；保存时会转成文章正文结构。" />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-[#344054]">FAQ</span>
        <textarea className="mt-2 min-h-40 w-full rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm leading-6 outline-none focus:border-[#d1a35d]" name="faqsText" defaultValue={article ? stringifyCmsFaqText(article.faq) : ""} placeholder={"问：问题一\n答：回答一\n\n问：问题二\n答：回答二"} />
      </label>

      <div className="flex flex-col gap-3 border-t border-[#eee6d8] pt-5 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-[#667085]">保存会写入 data/articles.json，并自动备份旧文件到 data/backups/。</p>
        <div className="flex flex-wrap gap-3">
          <Link href={getAdminHref("/admin/articles", adminKey)} className="rounded-2xl border border-[#e4ded2] px-5 py-3 text-sm font-semibold text-[#344054]">
            返回列表
          </Link>
          {article?.status === "published" ? (
            <Link href={`/articles/${article.slug}`} className="rounded-2xl border border-[#d8ad63] px-5 py-3 text-sm font-semibold text-[#8a6531]">
              查看前台
            </Link>
          ) : null}
          <button className="rounded-2xl bg-[#0b1d35] px-5 py-3 text-sm font-semibold text-white" type="submit">
            保存文章
          </button>
        </div>
      </div>
    </form>
  );
}
