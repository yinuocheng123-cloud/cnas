/*
 * 文件说明：该文件实现 CMS v1.2 文章管理页。
 * 功能说明：从 data/articles.json 读取正式文章，支持搜索、分类筛选、状态筛选和编辑入口，同时保留草稿列表查看。
 *
 * 结构概览：
 *   第一部分：导入依赖
 *   第二部分：筛选工具
 *   第三部分：文章管理页面
 */

// ========== 第一部分：导入依赖 ==========
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { ensureAdminAccess, formatAdminDate, getAdminHref } from "@/lib/admin";
import { getArticleDrafts } from "@/lib/article-drafts";
import { getCmsArticleCategories, getCmsArticlesSync } from "@/lib/cms-content";

// ========== 第二部分：筛选工具 ==========
function filterArticles(category: string | undefined, status: string | undefined, keyword: string | undefined) {
  const normalizedKeyword = keyword?.trim().toLowerCase();

  return getCmsArticlesSync().filter((article) => {
    const matchesCategory = !category || article.category === category;
    const matchesStatus = !status || article.status === status;
    const matchesKeyword =
      !normalizedKeyword ||
      article.title.toLowerCase().includes(normalizedKeyword) ||
      article.mainKeyword.toLowerCase().includes(normalizedKeyword) ||
      article.slug.toLowerCase().includes(normalizedKeyword);

    return matchesCategory && matchesStatus && matchesKeyword;
  });
}

// ========== 第三部分：文章管理页面 ==========
export default async function AdminArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string; category?: string; status?: string; q?: string; error?: string }>;
}) {
  noStore();

  const params = await searchParams;
  const access = await ensureAdminAccess(params.key);

  const categories = getCmsArticleCategories();
  const filteredArticles = filterArticles(params.category, params.status, params.q);
  const drafts = await getArticleDrafts();

  return (
    <AdminShell
      active="articles"
      adminKey={access.adminKey}
      title="文章管理"
      description="正式文章已经迁移到 data/articles.json。后台保存会写入 JSON，并自动生成备份，不再修改 TS 源码。"
      actions={
        <Link href={getAdminHref("/admin/articles/new", access.adminKey)} className="rounded-2xl bg-[#0b1d35] px-5 py-3 text-sm font-semibold text-white">
          新增文章
        </Link>
      }
    >
      {params.error ? <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{params.error}</div> : null}

      <form className="grid gap-3 rounded-3xl border border-[#e4ded2] bg-white p-4 md:grid-cols-[1fr_220px_180px_auto]" method="get">
        <input type="hidden" name="key" value={access.adminKey ?? ""} />
        <input
          className="rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm outline-none focus:border-[#d1a35d]"
          name="q"
          defaultValue={params.q ?? ""}
          placeholder="搜索标题、slug 或主词"
        />
        <select className="rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm outline-none focus:border-[#d1a35d]" name="category" defaultValue={params.category ?? ""}>
          <option value="">全部分类</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select className="rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm outline-none focus:border-[#d1a35d]" name="status" defaultValue={params.status ?? ""}>
          <option value="">全部状态</option>
          <option value="published">published</option>
          <option value="draft">draft</option>
          <option value="archived">archived</option>
        </select>
        <button className="rounded-2xl bg-[#0b1d35] px-5 py-3 text-sm font-semibold text-white" type="submit">
          筛选
        </button>
      </form>

      <div className="mt-6 overflow-x-auto rounded-3xl border border-[#e4ded2] bg-white">
        <table className="min-w-[1100px] w-full text-left text-sm">
          <thead className="bg-[#f7f2e9] text-[#657184]">
            <tr>
              <th className="px-4 py-3 font-semibold">标题</th>
              <th className="px-4 py-3 font-semibold">分类</th>
              <th className="px-4 py-3 font-semibold">主词</th>
              <th className="px-4 py-3 font-semibold">状态</th>
              <th className="px-4 py-3 font-semibold">发布时间</th>
              <th className="px-4 py-3 font-semibold">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eee6d8]">
            {filteredArticles.map((article) => (
              <tr key={article.id} className="align-top text-[#344054]">
                <td className="px-4 py-4">
                  <p className="font-medium text-[#0b1d35]">{article.title}</p>
                  <p className="mt-1 text-xs text-[#667085]">/{article.slug}</p>
                </td>
                <td className="px-4 py-4">{article.category}</td>
                <td className="px-4 py-4">{article.mainKeyword}</td>
                <td className="px-4 py-4">{article.status}</td>
                <td className="px-4 py-4">{article.publishDate}</td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-3">
                    {article.status === "published" ? (
                      <Link href={`/articles/${article.slug}`} className="font-semibold text-[#b78b49]">
                        查看前台
                      </Link>
                    ) : null}
                    <Link href={getAdminHref(`/admin/articles/edit/${article.id}`, access.adminKey)} className="font-semibold text-[#b78b49]">
                      编辑
                    </Link>
                    <Link href={getAdminHref(`/admin/articles/preview/${article.id}`, access.adminKey)} className="font-semibold text-[#b78b49]">
                      预览
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredArticles.length === 0 ? <p className="px-4 py-8 text-sm text-[#667085]">未找到匹配文章。</p> : null}
      </div>

      <section className="mt-8 rounded-3xl border border-[#e4ded2] bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-[#0b1d35]">文章草稿</h3>
            <p className="mt-2 text-sm text-[#667085]">草稿仍保存在 data/article-drafts.json，本轮不自动发布为正式文章。</p>
          </div>
          <span className="rounded-full bg-[#f7f2e9] px-3 py-1 text-xs font-semibold text-[#856339]">{drafts.length} 篇草稿</span>
        </div>
      </section>
    </AdminShell>
  );
}
