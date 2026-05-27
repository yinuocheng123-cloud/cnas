/*
 * 文件说明：该文件实现 CMS v1.2 新增 FAQ 页面。
 * 功能说明：展示 FAQ 表单，保存后写入 data/faqs.json。
 *
 * 结构概览：
 *   第一部分：导入依赖
 *   第二部分：新增 FAQ 页面
 */

// ========== 第一部分：导入依赖 ==========
import { unstable_noStore as noStore } from "next/cache";
import { AdminShell } from "@/components/admin/AdminShell";
import { CmsFaqForm } from "@/components/admin/CmsFaqForm";
import { ensureAdminAccess } from "@/lib/admin";

// ========== 第二部分：新增 FAQ 页面 ==========
export default async function AdminNewFaqPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string; error?: string }>;
}) {
  noStore();

  const params = await searchParams;
  const access = await ensureAdminAccess(params.key);

  return (
    <AdminShell active="faqs" adminKey={access.adminKey} title="新增 FAQ" description="保存后写入 data/faqs.json，并自动备份旧文件。">
      <CmsFaqForm action="/admin/faqs/actions" adminKey={access.adminKey} error={params.error} />
    </AdminShell>
  );
}
