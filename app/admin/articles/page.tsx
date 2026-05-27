/*
 * 文件说明：该文件实现 CNAS 内容控制台文章管理只读页。
 * 功能说明：展示现有 20 篇 GEO 文章，并提供分类筛选、标题搜索和前台文章链接。
 *
 * 结构概览：
 *   第一部分：导入依赖
 *   第二部分：筛选工具
 *   第三部分：文章只读页面
 */

// ========== 第一部分：导入依赖 ==========
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { ensureAdminAccess, getAdminArticleCategories } from "@/lib/admin";
import { geoArticles } from "@/lib/geo-articles";

// ========== 第二部分：筛选工具 ==========
function filterArticles(category: string | undefined, keyword: string | undefined) {
  const normalizedKeyword = keyword?.trim().toLowerCase();

  return geoArticles.filter((article) => {
    const matchesCategory = !category || article.category === category;
    const matchesKeyword =
      !normalizedKeyword ||
      article.title.toLowerCase().includes(normalizedKeyword) ||
      article.mainKeyword.toLowerCase().includes(normalizedKeyword);

    return matchesCategory && matchesKeyword;
  });
}

// ========== 第三部分：文章只读页面 ==========
export default async function AdminArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string; category?: string; q?: string }>;
}) {
  noStore();

  const params = await searchParams;
  ensureAdminAccess(params.key);

  const categories = getAdminArticleCategories();
  const filteredArticles = filterArticles(params.category, params.q);

  return (
    <AdminShell
      active="articles"
      adminKey={params.key}
      title="文章管理"
      description="只读查看当前已发布的 GEO 文章。第一版不提供新增、编辑、删除，避免服务器后台直接写入 Git 跟踪源码文件。"
    >
      <form className="grid gap-3 rounded-3xl border border-[#e4ded2] bg-white p-4 md:grid-cols-[1fr_220px_auto]" method="get">
        <input type="hidden" name="key" value={params.key ?? ""} />
        <input
          className="rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm outline-none focus:border-[#d1a35d]"
          name="q"
          defaultValue={params.q ?? ""}
          placeholder="搜索标题或主词"
        />
        <select
          className="rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm outline-none focus:border-[#d1a35d]"
          name="category"
          defaultValue={params.category ?? ""}
        >
          <option value="">全部分类</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button className="rounded-2xl bg-[#0b1d35] px-5 py-3 text-sm font-semibold text-white" type="submit">
          筛选
        </button>
      </form>

      <div className="mt-6 overflow-x-auto rounded-3xl border border-[#e4ded2] bg-white">
        <table className="min-w-[980px] w-full text-left text-sm">
          <thead className="bg-[#f7f2e9] text-[#657184]">
            <tr>
              <th className="px-4 py-3 font-semibold">标题</th>
              <th className="px-4 py-3 font-semibold">分类</th>
              <th className="px-4 py-3 font-semibold">主词</th>
              <th className="px-4 py-3 font-semibold">发布时间</th>
              <th className="px-4 py-3 font-semibold">状态</th>
              <th className="px-4 py-3 font-semibold">前台链接</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eee6d8]">
            {filteredArticles.map((article) => (
              <tr key={article.slug} className="align-top text-[#344054]">
                <td className="px-4 py-4 font-medium text-[#0b1d35]">{article.title}</td>
                <td className="px-4 py-4">{article.category}</td>
                <td className="px-4 py-4">{article.mainKeyword}</td>
                <td className="px-4 py-4">{article.publishDate}</td>
                <td className="px-4 py-4">
                  <span className="rounded-full bg-[#eef8f1] px-3 py-1 text-xs font-semibold text-[#258052]">已发布</span>
                </td>
                <td className="px-4 py-4">
                  <Link href={`/articles/${article.slug}`} className="font-semibold text-[#b78b49]">
                    查看前台文章
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredArticles.length === 0 ? <p className="px-4 py-8 text-sm text-[#667085]">未找到匹配文章。</p> : null}
      </div>
    </AdminShell>
  );
}
