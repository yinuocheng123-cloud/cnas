/*
 * 文件说明：该文件实现 CMS v1.2 文章编辑页面。
 * 功能说明：读取 data/articles.json 中指定文章，并提交到 JSON 更新接口。
 *
 * 结构概览：
 *   第一部分：导入依赖
 *   第二部分：文章编辑页面
 */

// ========== 第一部分：导入依赖 ==========
import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { CmsArticleForm } from "@/components/admin/CmsArticleForm";
import { ensureAdminAccess } from "@/lib/admin";
import { getCmsArticleById } from "@/lib/cms-content";

// ========== 第二部分：文章编辑页面 ==========
export default async function AdminEditArticlePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ key?: string; error?: string; saved?: string }>;
}) {
  noStore();

  const [{ id }, query] = await Promise.all([params, searchParams]);
  const access = await ensureAdminAccess(query.key);
  const article = getCmsArticleById(id);

  if (!article) {
    notFound();
  }

  return (
    <AdminShell active="articles" adminKey={access.adminKey} title="编辑文章" description="保存后写入 data/articles.json，并自动备份旧版本。">
      {query.saved ? <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">已保存。</div> : null}
      <CmsArticleForm action={`/admin/articles/actions/${article.id}`} adminKey={access.adminKey} article={article} error={query.error} />
    </AdminShell>
  );
}
