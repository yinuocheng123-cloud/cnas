/*
 * 文件说明：该文件实现 CMS v1.2 FAQ 编辑表单。
 * 功能说明：用于新增和编辑 data/faqs.json 中的 FAQ 内容，并保持轻量后台风格。
 *
 * 结构概览：
 *   第一部分：导入依赖
 *   第二部分：FAQ 表单组件
 */

// ========== 第一部分：导入依赖 ==========
import Link from "next/link";
import { getAdminHref } from "@/lib/admin";
import { getCmsArticleStatuses, type CmsFaq } from "@/lib/cms-content";

// ========== 第二部分：FAQ 表单组件 ==========
export function CmsFaqForm({
  action,
  adminKey,
  faq,
  error,
}: {
  action: string;
  adminKey: string | undefined;
  faq?: CmsFaq;
  error?: string;
}) {
  return (
    <form className="space-y-6 rounded-3xl border border-[#e4ded2] bg-white p-5 shadow-sm" action={action} method="post">
      <input type="hidden" name="key" value={adminKey ?? ""} />
      {error ? <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div> : null}

      <label className="block">
        <span className="text-sm font-semibold text-[#344054]">问题</span>
        <input className="mt-2 w-full rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm outline-none focus:border-[#d1a35d]" name="question" defaultValue={faq?.question ?? ""} required />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-[#344054]">回答</span>
        <textarea className="mt-2 min-h-40 w-full rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm leading-6 outline-none focus:border-[#d1a35d]" name="answer" defaultValue={faq?.answer ?? ""} required />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-[#344054]">分类</span>
          <input className="mt-2 w-full rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm outline-none focus:border-[#d1a35d]" name="category" defaultValue={faq?.category ?? "CNAS常见问题"} />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-[#344054]">来源页面</span>
          <input className="mt-2 w-full rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm outline-none focus:border-[#d1a35d]" name="sourcePage" defaultValue={faq?.sourcePage ?? "/faq"} />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-[#344054]">排序</span>
          <input className="mt-2 w-full rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm outline-none focus:border-[#d1a35d]" name="order" type="number" defaultValue={faq?.order ?? 0} />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-[#344054]">状态</span>
          <select className="mt-2 w-full rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm outline-none focus:border-[#d1a35d]" name="status" defaultValue={faq?.status ?? "published"}>
            {getCmsArticleStatuses().map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex items-center gap-3 rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm font-semibold text-[#344054]">
        <input name="featured" type="checkbox" value="true" defaultChecked={faq?.featured ?? false} />
        首页推荐
      </label>

      <div className="flex flex-wrap gap-3 border-t border-[#eee6d8] pt-5">
        <Link href={getAdminHref("/admin/faqs", adminKey)} className="rounded-2xl border border-[#e4ded2] px-5 py-3 text-sm font-semibold text-[#344054]">
          返回列表
        </Link>
        <button className="rounded-2xl bg-[#0b1d35] px-5 py-3 text-sm font-semibold text-white" type="submit">
          保存 FAQ
        </button>
      </div>
    </form>
  );
}
