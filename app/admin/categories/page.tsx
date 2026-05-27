/*
 * 文件说明：该文件实现 CNAS 内容控制台栏目管理只读页。
 * 功能说明：展示平台栏目、前台路径、栏目说明和推荐文章数量，不提供写入能力。
 *
 * 结构概览：
 *   第一部分：导入依赖
 *   第二部分：栏目只读页面
 */

// ========== 第一部分：导入依赖 ==========
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { ensureAdminAccess, getAdminCategoryItems } from "@/lib/admin";

// ========== 第二部分：栏目只读页面 ==========
export default async function AdminCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  noStore();

  const { key } = await searchParams;
  ensureAdminAccess(key);

  const categoryItems = getAdminCategoryItems();

  return (
    <AdminShell
      active="categories"
      adminKey={key}
      title="栏目管理"
      description="只读查看 CNAS行业服务平台的基础栏目。当前版本不新增栏目，也不修改栏目路径。"
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {categoryItems.map((category) => (
          <article key={category.path} className="rounded-3xl border border-[#e4ded2] bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-[#0b1d35]">{category.name}</h3>
                <p className="mt-2 text-sm font-semibold text-[#b78b49]">{category.path}</p>
              </div>
              <span className="rounded-full bg-[#f7f2e9] px-3 py-1 text-xs font-semibold text-[#856339]">
                {category.recommendedArticleCount} 篇
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-[#667085]">{category.description}</p>
            <Link href={category.path} className="mt-5 inline-flex text-sm font-semibold text-[#b78b49]">
              查看前台栏目
            </Link>
          </article>
        ))}
      </div>
    </AdminShell>
  );
}
