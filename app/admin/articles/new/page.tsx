/*
 * 文件说明：该文件实现 CMS v1.1 新建文章草稿页面。
 * 功能说明：在后台登录保护下展示文章草稿表单，提交后保存到非 Git 跟踪草稿文件。
 *
 * 结构概览：
 *   第一部分：导入依赖
 *   第二部分：新建草稿页面
 */

// ========== 第一部分：导入依赖 ==========
import { unstable_noStore as noStore } from "next/cache";
import { AdminShell } from "@/components/admin/AdminShell";
import { ArticleDraftForm } from "@/components/admin/ArticleDraftForm";
import { ensureAdminAccess } from "@/lib/admin";

// ========== 第二部分：新建草稿页面 ==========
export default async function AdminNewArticleDraftPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  noStore();

  const { key } = await searchParams;
  const access = await ensureAdminAccess(key);

  return (
    <AdminShell
      active="articles"
      adminKey={access.adminKey}
      title="新建文章草稿"
      description="草稿只保存到 data/article-drafts.json，不会覆盖现有 20 篇正式文章。正文可粘贴 Word 文本，保存时做基础段落清洗。"
    >
      <ArticleDraftForm action="/admin/articles/draft-actions" adminKey={access.adminKey} />
    </AdminShell>
  );
}
