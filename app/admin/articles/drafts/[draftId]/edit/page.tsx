/*
 * 文件说明：该文件实现文章草稿编辑页。
 * 功能说明：读取指定草稿并复用草稿表单保存更新，仍不触碰正式文章数据。
 *
 * 结构概览：
 *   第一部分：导入依赖
 *   第二部分：编辑草稿页面
 */

// ========== 第一部分：导入依赖 ==========
import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ArticleDraftForm } from "@/components/admin/ArticleDraftForm";
import { ensureAdminAccess } from "@/lib/admin";
import { getArticleDraftById } from "@/lib/article-drafts";

// ========== 第二部分：编辑草稿页面 ==========
export default async function AdminEditArticleDraftPage({
  params,
  searchParams,
}: {
  params: Promise<{ draftId: string }>;
  searchParams: Promise<{ key?: string }>;
}) {
  noStore();

  const [{ draftId }, { key }] = await Promise.all([params, searchParams]);
  const access = await ensureAdminAccess(key);
  const draft = await getArticleDraftById(draftId);

  if (!draft) {
    notFound();
  }

  return (
    <AdminShell active="articles" adminKey={access.adminKey} title="编辑文章草稿" description="编辑内容只保存到本地草稿文件。保存时会对 Word 粘贴文本做基础段落清洗。">
      <ArticleDraftForm action={`/admin/articles/draft-actions/${draft.id}`} adminKey={access.adminKey} draft={draft} />
    </AdminShell>
  );
}
