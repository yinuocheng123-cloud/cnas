/*
 * 文件说明：该文件实现 CMS v1.2 栏目管理页。
 * 功能说明：从 data/categories.json 读取栏目，展示路径、说明、排序和编辑入口。
 *
 * 结构概览：
 *   第一部分：导入依赖
 *   第二部分：栏目管理页面
 */

// ========== 第一部分：导入依赖 ==========
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { ensureAdminAccess, getAdminHref } from "@/lib/admin";
import { getCmsCategoriesSync } from "@/lib/cms-content";

// ========== 第二部分：栏目管理页面 ==========
export default async function AdminCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string; error?: string }>;
}) {
  noStore();

  const params = await searchParams;
  const access = await ensureAdminAccess(params.key);
  const categoryItems = getCmsCategoriesSync().sort((left, right) => left.order - right.order);

  return (
    <AdminShell
      active="categories"
      adminKey={access.adminKey}
      title="栏目管理"
      description="栏目已迁移到 data/categories.json。本轮支持编辑已有栏目标题、描述、SEO、排序和状态，不新增动态栏目路由。"
    >
      {params.error ? <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{params.error}</div> : null}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {categoryItems.map((category) => (
          <article key={category.id} className="rounded-3xl border border-[#e4ded2] bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-[#0b1d35]">{category.name}</h3>
                <p className="mt-2 text-sm font-semibold text-[#b78b49]">{category.path}</p>
              </div>
              <span className="rounded-full bg-[#f7f2e9] px-3 py-1 text-xs font-semibold text-[#856339]">{category.status}</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-[#667085]">{category.description}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={category.path} className="text-sm font-semibold text-[#b78b49]">
                查看前台
              </Link>
              <Link href={getAdminHref(`/admin/categories/edit/${category.id}`, access.adminKey)} className="text-sm font-semibold text-[#b78b49]">
                编辑栏目
              </Link>
            </div>
          </article>
        ))}
      </div>
    </AdminShell>
  );
}
