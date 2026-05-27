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
import { ensureAdminAccess, formatAdminDate, getAdminArticleCategories, getAdminHref } from "@/lib/admin";
import { getArticleDrafts } from "@/lib/article-drafts";
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
  const access = await ensureAdminAccess(params.key);

  const categories = getAdminArticleCategories();
  const filteredArticles = filterArticles(params.category, params.q);
  const drafts = await getArticleDrafts();

  return (
    <AdminShell
      active="articles"
      adminKey={access.adminKey}
      title="文章管理"
      description="查看当前已发布的 GEO 文章，并管理本地文章草稿。草稿不会覆盖正式文章，也不会进入 Git 仓库。"
      actions={
        <Link href={getAdminHref("/admin/articles/new", access.adminKey)} className="rounded-2xl bg-[#0b1d35] px-5 py-3 text-sm font-semibold text-white">
          新建草稿
        </Link>
      }
    >
      <form className="grid gap-3 rounded-3xl border border-[#e4ded2] bg-white p-4 md:grid-cols-[1fr_220px_auto]" method="get">
        <input type="hidden" name="key" value={access.adminKey ?? ""} />
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

      <section className="mt-8 rounded-3xl border border-[#e4ded2] bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-[#0b1d35]">文章草稿</h3>
            <p className="mt-2 text-sm text-[#667085]">草稿保存在 data/article-drafts.json，本轮不提供正式发布。</p>
          </div>
          <span className="rounded-full bg-[#f7f2e9] px-3 py-1 text-xs font-semibold text-[#856339]">{drafts.length} 篇草稿</span>
        </div>

        <div className="mt-5 overflow-x-auto rounded-2xl border border-[#eee6d8]">
          <table className="min-w-[980px] w-full text-left text-sm">
            <thead className="bg-[#f7f2e9] text-[#657184]">
              <tr>
                <th className="px-4 py-3 font-semibold">标题</th>
                <th className="px-4 py-3 font-semibold">分类</th>
                <th className="px-4 py-3 font-semibold">状态</th>
                <th className="px-4 py-3 font-semibold">更新时间</th>
                <th className="px-4 py-3 font-semibold">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eee6d8]">
              {drafts.length > 0 ? (
                drafts.map((draft) => (
                  <tr key={draft.id} className="align-top text-[#344054]">
                    <td className="px-4 py-4 font-medium text-[#0b1d35]">{draft.title || "未填写标题"}</td>
                    <td className="px-4 py-4">{draft.category}</td>
                    <td className="px-4 py-4">{draft.status}</td>
                    <td className="px-4 py-4">{formatAdminDate(draft.updatedAt)}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-3">
                        <Link href={getAdminHref(`/admin/articles/drafts/${draft.id}`, access.adminKey)} className="font-semibold text-[#b78b49]">
                          查看
                        </Link>
                        <Link href={getAdminHref(`/admin/articles/drafts/${draft.id}/edit`, access.adminKey)} className="font-semibold text-[#b78b49]">
                          编辑
                        </Link>
                        <Link href={getAdminHref(`/admin/articles/drafts/${draft.id}/preview`, access.adminKey)} className="font-semibold text-[#b78b49]">
                          预览
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-[#667085]">
                    暂无草稿，可先新建一篇用于测试编辑流程。
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

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
