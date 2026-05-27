/*
 * 文件说明：该文件实现 CNAS 内容控制台后台首页。
 * 功能说明：在 ADMIN_KEY 保护下展示文章、FAQ、栏目、线索和设置的只读入口与基础统计。
 *
 * 结构概览：
 *   第一部分：导入依赖
 *   第二部分：后台首页页面
 */

// ========== 第一部分：导入依赖 ==========
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { ensureAdminAccess, getAdminCategoryItems, getAdminFaqItems, getAdminHref, getRecentUpdateText } from "@/lib/admin";
import { geoArticles } from "@/lib/geo-articles";
import { getLeads } from "@/lib/lead-storage";

// ========== 第二部分：后台首页页面 ==========
export default async function AdminHomePage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  noStore();

  const { key } = await searchParams;
  ensureAdminAccess(key);

  const [leads, faqItems, categoryItems] = await Promise.all([getLeads(), getAdminFaqItems(), getAdminCategoryItems()]);
  const stats = [
    { label: "已发布文章数", value: geoArticles.length, href: "/admin/articles" },
    { label: "FAQ数量", value: faqItems.length, href: "/admin/faqs" },
    { label: "栏目数量", value: categoryItems.length, href: "/admin/categories" },
    { label: "线索数量", value: leads.length, href: "/admin/leads" },
    { label: "最近更新时间", value: getRecentUpdateText(), href: "/admin/settings" },
  ];

  const entries = [
    { title: "文章管理", summary: "查看已发布 GEO 文章、分类、主词和前台链接。", href: "/admin/articles" },
    { title: "FAQ管理", summary: "聚合展示当前站内 FAQ，便于检查问题来源。", href: "/admin/faqs" },
    { title: "栏目管理", summary: "查看平台栏目、路径和推荐文章数量。", href: "/admin/categories" },
    { title: "线索查看", summary: "进入现有线索只读页，不改变线索 API 和后台逻辑。", href: "/admin/leads" },
    { title: "站点设置", summary: "只读查看环境变量和公开站点配置状态。", href: "/admin/settings" },
  ];

  return (
    <AdminShell
      active="home"
      adminKey={key}
      title="后台首页"
      description="第一版 CNAS内容控制台只做只读管理，用来查看内容、栏目、线索和站点配置状态，不提供新增、编辑或删除。"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => (
          <Link key={stat.label} href={getAdminHref(stat.href, key)} className="rounded-2xl border border-[#e4ded2] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#d1a35d]">
            <p className="text-sm text-[#657184]">{stat.label}</p>
            <p className="mt-3 text-2xl font-semibold text-[#0b1d35]">{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {entries.map((entry) => (
          <Link key={entry.title} href={getAdminHref(entry.href, key)} className="rounded-3xl border border-[#e4ded2] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#d1a35d]">
            <h3 className="text-lg font-semibold text-[#0b1d35]">{entry.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[#667085]">{entry.summary}</p>
            <span className="mt-5 inline-flex text-sm font-semibold text-[#b78b49]">进入查看</span>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
