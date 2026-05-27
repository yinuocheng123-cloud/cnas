/*
 * 文件说明：该文件实现 CMS v1.2 FAQ 编辑页面。
 * 功能说明：读取 data/faqs.json 中指定 FAQ，并提交到 JSON 更新接口。
 *
 * 结构概览：
 *   第一部分：导入依赖
 *   第二部分：FAQ 编辑页面
 */

// ========== 第一部分：导入依赖 ==========
import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { CmsFaqForm } from "@/components/admin/CmsFaqForm";
import { ensureAdminAccess } from "@/lib/admin";
import { getCmsFaqsSync } from "@/lib/cms-content";

// ========== 第二部分：FAQ 编辑页面 ==========
export default async function AdminEditFaqPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ key?: string; error?: string; saved?: string }>;
}) {
  noStore();

  const [{ id }, query] = await Promise.all([params, searchParams]);
  const access = await ensureAdminAccess(query.key);
  const faq = getCmsFaqsSync().find((item) => item.id === id);

  if (!faq) {
    notFound();
  }

  return (
    <AdminShell active="faqs" adminKey={access.adminKey} title="编辑 FAQ" description="保存后写入 data/faqs.json，并自动备份旧文件。">
      {query.saved ? <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">已保存。</div> : null}
      <CmsFaqForm action={`/admin/faqs/actions/${faq.id}`} adminKey={access.adminKey} faq={faq} error={query.error} />
    </AdminShell>
  );
}
