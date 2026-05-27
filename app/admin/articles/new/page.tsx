/*
 * 文件说明：该文件实现 CMS v1.2 新增正式文章页面。
 * 功能说明：展示写入 data/articles.json 的文章表单，不再作为草稿新建入口。
 *
 * 结构概览：
 *   第一部分：导入依赖
 *   第二部分：新增文章页面
 */

// ========== 第一部分：导入依赖 ==========
import { unstable_noStore as noStore } from "next/cache";
import { AdminShell } from "@/components/admin/AdminShell";
import { CmsArticleForm } from "@/components/admin/CmsArticleForm";
import { ensureAdminAccess } from "@/lib/admin";

// ========== 第二部分：新增文章页面 ==========
export default async function AdminNewArticlePage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string; error?: string }>;
}) {
  noStore();

  const params = await searchParams;
  const access = await ensureAdminAccess(params.key);

  return (
    <AdminShell active="articles" adminKey={access.adminKey} title="新增文章" description="新增文章会写入 data/articles.json。建议先保存为 draft 或 archived，确认后再改为 published。">
      <CmsArticleForm action="/admin/articles/actions" adminKey={access.adminKey} error={params.error} />
    </AdminShell>
  );
}
