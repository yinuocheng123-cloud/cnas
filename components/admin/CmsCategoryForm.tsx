/*
 * 文件说明：该文件实现 CMS v1.2 栏目编辑表单。
 * 功能说明：用于编辑 data/categories.json 中已有栏目标题、描述、SEO、排序和状态。
 *
 * 结构概览：
 *   第一部分：导入依赖
 *   第二部分：栏目表单组件
 */

// ========== 第一部分：导入依赖 ==========
import Link from "next/link";
import { getAdminHref } from "@/lib/admin";
import { getCmsArticleStatuses, type CmsCategory } from "@/lib/cms-content";

// ========== 第二部分：栏目表单组件 ==========
export function CmsCategoryForm({
  action,
  adminKey,
  category,
  error,
}: {
  action: string;
  adminKey: string | undefined;
  category: CmsCategory;
  error?: string;
}) {
  return (
    <form className="space-y-6 rounded-3xl border border-[#e4ded2] bg-white p-5 shadow-sm" action={action} method="post">
      <input type="hidden" name="key" value={adminKey ?? ""} />
      {error ? <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-[#344054]">栏目名称</span>
          <input className="mt-2 w-full rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm outline-none focus:border-[#d1a35d]" name="name" defaultValue={category.name} required />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-[#344054]">路径</span>
          <input className="mt-2 w-full rounded-2xl border border-[#e4ded2] bg-[#f7f2e9] px-4 py-3 text-sm text-[#667085]" value={category.path} readOnly />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-[#344054]">排序</span>
          <input className="mt-2 w-full rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm outline-none focus:border-[#d1a35d]" name="order" type="number" defaultValue={category.order} />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-[#344054]">状态</span>
          <select className="mt-2 w-full rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm outline-none focus:border-[#d1a35d]" name="status" defaultValue={category.status}>
            {getCmsArticleStatuses().map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-semibold text-[#344054]">栏目描述</span>
        <textarea className="mt-2 min-h-32 w-full rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm leading-6 outline-none focus:border-[#d1a35d]" name="description" defaultValue={category.description} />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-[#344054]">SEO标题</span>
        <input className="mt-2 w-full rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm outline-none focus:border-[#d1a35d]" name="seoTitle" defaultValue={category.seoTitle} />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-[#344054]">SEO描述</span>
        <textarea className="mt-2 min-h-32 w-full rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm leading-6 outline-none focus:border-[#d1a35d]" name="seoDescription" defaultValue={category.seoDescription} />
      </label>

      <label className="flex items-center gap-3 rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm font-semibold text-[#344054]">
        <input name="featured" type="checkbox" value="true" defaultChecked={category.featured} />
        推荐展示
      </label>

      <div className="flex flex-wrap gap-3 border-t border-[#eee6d8] pt-5">
        <Link href={getAdminHref("/admin/categories", adminKey)} className="rounded-2xl border border-[#e4ded2] px-5 py-3 text-sm font-semibold text-[#344054]">
          返回列表
        </Link>
        <Link href={category.path} className="rounded-2xl border border-[#d8ad63] px-5 py-3 text-sm font-semibold text-[#8a6531]">
          查看前台栏目
        </Link>
        <button className="rounded-2xl bg-[#0b1d35] px-5 py-3 text-sm font-semibold text-white" type="submit">
          保存栏目
        </button>
      </div>
    </form>
  );
}
