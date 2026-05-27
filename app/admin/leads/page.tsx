/*
 * 文件说明：该文件实现 CNAS 内容控制台线索查看只读页。
 * 功能说明：复用现有 leads.json 读取能力，在 ADMIN_KEY 保护下展示已提交线索，不改动线索 API。
 *
 * 结构概览：
 *   第一部分：导入依赖
 *   第二部分：线索只读页面
 */

// ========== 第一部分：导入依赖 ==========
import { unstable_noStore as noStore } from "next/cache";
import { AdminShell } from "@/components/admin/AdminShell";
import { ensureAdminAccess, formatAdminDate } from "@/lib/admin";
import { getLeads } from "@/lib/lead-storage";

// ========== 第二部分：线索只读页面 ==========
export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  noStore();

  const { key } = await searchParams;
  ensureAdminAccess(key);

  const leads = await getLeads();

  return (
    <AdminShell
      active="leads"
      adminKey={key}
      title="线索查看"
      description="继续展示现有本地线索备份数据。当前页面只读，不新增 CRM 跟进、分配或编辑能力。"
    >
      <div className="overflow-x-auto rounded-3xl border border-[#e4ded2] bg-white">
        <table className="min-w-[980px] w-full text-left text-sm">
          <thead className="bg-[#f7f2e9] text-[#657184]">
            <tr>
              <th className="px-4 py-3 font-semibold">提交时间</th>
              <th className="px-4 py-3 font-semibold">称呼</th>
              <th className="px-4 py-3 font-semibold">企业名称</th>
              <th className="px-4 py-3 font-semibold">企业类型</th>
              <th className="px-4 py-3 font-semibold">当前阶段</th>
              <th className="px-4 py-3 font-semibold">联系方式</th>
              <th className="px-4 py-3 font-semibold">来源</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eee6d8]">
            {leads.length > 0 ? (
              leads.map((lead) => (
                <tr key={lead.id} className="align-top text-[#344054]">
                  <td className="px-4 py-4">{formatAdminDate(lead.createdAt)}</td>
                  <td className="px-4 py-4">{lead.name || "-"}</td>
                  <td className="px-4 py-4">{lead.company || "-"}</td>
                  <td className="px-4 py-4">{lead.enterpriseType}</td>
                  <td className="px-4 py-4">{lead.stage}</td>
                  <td className="px-4 py-4">{lead.contact || [lead.phone, lead.wechat].filter(Boolean).join(" / ") || "-"}</td>
                  <td className="px-4 py-4">{lead.sourcePage || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-[#667085]">
                  暂无已提交线索。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
