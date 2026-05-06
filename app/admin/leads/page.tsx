import { unstable_noStore as noStore } from "next/cache";
import { forbidden } from "next/navigation";
import { getLeads } from "@/lib/lead-storage";

/*
 * 文件说明：该文件实现线索只读管理页。
 * 功能说明：在简单 query key 保护下展示 leads.json 内容，便于上线后快速查看和跟进线索。
 *
 * 结构概览：
 *   第一部分：权限判断
 *   第二部分：线索列表页面
 */

// ========== 第一部分：权限判断 ==========
function ensureAdminAccess(key: string | undefined) {
  const adminKey = process.env.ADMIN_KEY?.trim();

  if (!adminKey || key !== adminKey) {
    forbidden();
  }
}

function formatLeadTime(value: string) {
  try {
    return new Intl.DateTimeFormat("zh-CN", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

// ========== 第二部分：线索列表页面 ==========
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
    <main className="min-h-screen bg-paper text-ink">
      <section className="site-shell section-space">
        <div className="max-w-4xl">
          <p className="text-meta-token">Admin Leads</p>
          <h1 className="mt-3 text-display">诊断线索列表</h1>
          <p className="mt-4 text-copy">当前展示本地 `data/leads.json` 中的已提交线索，供上线初期快速查看与跟进。</p>
        </div>

        <div className="mt-8 overflow-x-auto rounded-3xl border border-line bg-white">
          <table className="min-w-full divide-y divide-line text-left">
            <thead className="bg-surface">
              <tr className="text-meta-token">
                <th className="px-4 py-3 font-semibold">提交时间</th>
                <th className="px-4 py-3 font-semibold">企业类型</th>
                <th className="px-4 py-3 font-semibold">当前阶段</th>
                <th className="px-4 py-3 font-semibold">联系方式</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {leads.length > 0 ? (
                leads.map((lead) => (
                  <tr key={lead.id} className="text-copy">
                    <td className="px-4 py-4">{formatLeadTime(lead.createdAt)}</td>
                    <td className="px-4 py-4">{lead.enterpriseType}</td>
                    <td className="px-4 py-4">{lead.stage}</td>
                    <td className="px-4 py-4">{lead.contact}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-copy">
                    暂无已提交线索。
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
