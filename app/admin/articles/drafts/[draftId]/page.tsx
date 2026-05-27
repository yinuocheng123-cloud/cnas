/*
 * 文件说明：该文件实现文章草稿查看页。
 * 功能说明：展示草稿字段、状态和操作入口，不提供删除或正式发布。
 *
 * 结构概览：
 *   第一部分：导入依赖
 *   第二部分：草稿查看页面
 */

// ========== 第一部分：导入依赖 ==========
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ensureAdminAccess, formatAdminDate, getAdminHref } from "@/lib/admin";
import { getArticleDraftById } from "@/lib/article-drafts";

// ========== 第二部分：草稿查看页面 ==========
export default async function AdminArticleDraftPage({
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
    <AdminShell active="articles" adminKey={access.adminKey} title="查看文章草稿" description="当前页面展示草稿状态和内容摘要。正式发布功能将在下一阶段开放。">
      <article className="rounded-3xl border border-[#e4ded2] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 border-b border-[#eee6d8] pb-5 md:flex-row md:items-start md:justify-between">
          <div>
            <span className="rounded-full bg-[#f7f2e9] px-3 py-1 text-xs font-semibold text-[#856339]">{draft.status}</span>
            <h3 className="mt-3 text-2xl font-semibold text-[#0b1d35]">{draft.title || "未填写标题"}</h3>
            <p className="mt-2 text-sm text-[#667085]">/{draft.slug || "untitled"}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={getAdminHref(`/admin/articles/drafts/${draft.id}/edit`, access.adminKey)} className="rounded-2xl bg-[#0b1d35] px-5 py-3 text-sm font-semibold text-white">
              编辑草稿
            </Link>
            <Link href={getAdminHref(`/admin/articles/drafts/${draft.id}/preview`, access.adminKey)} className="rounded-2xl border border-[#d8ad63] px-5 py-3 text-sm font-semibold text-[#8a6531]">
              草稿预览
            </Link>
          </div>
        </div>

        <dl className="mt-6 grid gap-4 text-sm md:grid-cols-2">
          <div>
            <dt className="font-semibold text-[#0b1d35]">分类</dt>
            <dd className="mt-1 text-[#667085]">{draft.category}</dd>
          </div>
          <div>
            <dt className="font-semibold text-[#0b1d35]">主词</dt>
            <dd className="mt-1 text-[#667085]">{draft.mainKeyword || "-"}</dd>
          </div>
          <div>
            <dt className="font-semibold text-[#0b1d35]">创建时间</dt>
            <dd className="mt-1 text-[#667085]">{formatAdminDate(draft.createdAt)}</dd>
          </div>
          <div>
            <dt className="font-semibold text-[#0b1d35]">更新时间</dt>
            <dd className="mt-1 text-[#667085]">{formatAdminDate(draft.updatedAt)}</dd>
          </div>
        </dl>

        <div className="mt-6 rounded-2xl bg-[#f7f2e9] p-5">
          <p className="text-sm font-semibold text-[#0b1d35]">摘要</p>
          <p className="mt-2 whitespace-pre-line text-sm leading-7 text-[#667085]">{draft.summary || "暂无摘要。"}</p>
        </div>
      </article>
    </AdminShell>
  );
}
