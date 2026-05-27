/*
 * 文件说明：该文件实现 CNAS 内容控制台站点设置只读页。
 * 功能说明：只展示关键环境变量与公开站点配置是否已配置，不暴露任何密钥原文。
 *
 * 结构概览：
 *   第一部分：导入依赖
 *   第二部分：站点设置只读页面
 */

// ========== 第一部分：导入依赖 ==========
import { unstable_noStore as noStore } from "next/cache";
import { AdminShell } from "@/components/admin/AdminShell";
import { ensureAdminAccess, getSiteSettingStatuses } from "@/lib/admin";

// ========== 第二部分：站点设置只读页面 ==========
export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  noStore();

  const { key } = await searchParams;
  const access = await ensureAdminAccess(key);

  const settings = getSiteSettingStatuses();

  return (
    <AdminShell
      active="settings"
      adminKey={access.adminKey}
      title="站点设置"
      description="只读查看当前生产运营配置状态。这里不会显示 ADMIN_KEY、webhook 或任何真实密钥。"
    >
      <div className="rounded-3xl border border-[#e4ded2] bg-white">
        <div className="grid border-b border-[#eee6d8] bg-[#f7f2e9] px-5 py-3 text-sm font-semibold text-[#657184] md:grid-cols-[260px_1fr]">
          <span>配置项</span>
          <span>状态</span>
        </div>
        <div className="divide-y divide-[#eee6d8]">
          {settings.map((setting) => (
            <div key={setting.label} className="grid gap-2 px-5 py-4 text-sm md:grid-cols-[260px_1fr]">
              <span className="font-semibold text-[#0b1d35]">{setting.label}</span>
              <span className={setting.status === "未配置" ? "text-[#b54708]" : "text-[#344054]"}>{setting.status}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-[#e4ded2] bg-white p-6 text-sm leading-7 text-[#667085]">
        第一版设置页只用于检查配置状态。后续如果要做后台编辑器或 Word 文本格式适配，应先引入草稿区与人工发布流程，
        避免服务器后台直接改写 Git 跟踪的源码内容。
      </div>
    </AdminShell>
  );
}
