/*
 * 文件说明：该文件实现 CMS v1.2 栏目编辑页面。
 * 功能说明：读取 data/categories.json 中指定栏目，允许编辑标题、描述、SEO、排序和状态。
 *
 * 结构概览：
 *   第一部分：导入依赖
 *   第二部分：栏目编辑页面
 */

// ========== 第一部分：导入依赖 ==========
import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { CmsCategoryForm } from "@/components/admin/CmsCategoryForm";
import { ensureAdminAccess } from "@/lib/admin";
import { getCmsCategoriesSync } from "@/lib/cms-content";

// ========== 第二部分：栏目编辑页面 ==========
export default async function AdminEditCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ key?: string; error?: string; saved?: string }>;
}) {
  noStore();

  const [{ id }, query] = await Promise.all([params, searchParams]);
  const access = await ensureAdminAccess(query.key);
  const category = getCmsCategoriesSync().find((item) => item.id === id);

  if (!category) {
    notFound();
  }

  return (
    <AdminShell active="categories" adminKey={access.adminKey} title="编辑栏目" description="本轮只编辑已有栏目内容，不新增路由或改变栏目路径。">
      {query.saved ? <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">已保存。</div> : null}
      <CmsCategoryForm action={`/admin/categories/actions/${category.id}`} adminKey={access.adminKey} category={category} error={query.error} />
    </AdminShell>
  );
}
