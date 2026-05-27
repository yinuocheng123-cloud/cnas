/*
 * 文件说明：该文件实现 CNAS 内容控制台的统一后台页面壳子。
 * 功能说明：提供后台导航、页面标题区和统一视觉容器，确保只读后台页面保持一致。
 *
 * 结构概览：
 *   第一部分：导入依赖
 *   第二部分：导航配置
 *   第三部分：后台壳子组件
 */

// ========== 第一部分：导入依赖 ==========
import Link from "next/link";
import { getAdminHref, type AdminNavKey } from "@/lib/admin";

// ========== 第二部分：导航配置 ==========
const adminNavItems: { key: AdminNavKey | "front" | "logout"; label: string; href: string }[] = [
  { key: "home", label: "首页", href: "/admin" },
  { key: "articles", label: "文章", href: "/admin/articles" },
  { key: "faqs", label: "FAQ", href: "/admin/faqs" },
  { key: "categories", label: "栏目", href: "/admin/categories" },
  { key: "leads", label: "线索", href: "/admin/leads" },
  { key: "settings", label: "设置", href: "/admin/settings" },
  { key: "front", label: "返回前台", href: "/" },
  { key: "logout", label: "退出登录", href: "/admin/logout" },
];

// ========== 第三部分：后台壳子组件 ==========
export function AdminShell({
  active,
  adminKey,
  title,
  description,
  children,
  actions,
}: {
  active: AdminNavKey;
  adminKey: string | undefined;
  title: string;
  description: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#f6f3ec] text-[#142033]">
      <header className="border-b border-[#e4ded2] bg-white/85 backdrop-blur">
        <div className="site-shell flex flex-col gap-5 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b78b49]">CNAS Content Console</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#0b1d35]">CNAS内容控制台</h1>
          </div>
          <nav className="flex flex-wrap gap-2 text-sm">
            {adminNavItems.map((item) => {
              const isActive = item.key === active;
              const href = item.key === "front" || item.key === "logout" ? item.href : getAdminHref(item.href, adminKey);
              const className = [
                "rounded-full border px-4 py-2 transition",
                isActive
                  ? "border-[#0b1d35] bg-[#0b1d35] text-white"
                  : "border-[#e4ded2] bg-white text-[#40516a] hover:border-[#d1a35d] hover:text-[#0b1d35]",
              ].join(" ");

              if (item.key === "logout") {
                return (
                  <a key={item.key} href={href} className={className}>
                    {item.label}
                  </a>
                );
              }

              return (
                <Link key={item.key} href={href} className={className}>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <section className="site-shell py-8 lg:py-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[#b78b49]">Readonly Admin</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#0b1d35]">{title}</h2>
            <p className="mt-3 text-base leading-7 text-[#5c6675]">{description}</p>
          </div>
          {actions ? <div className="shrink-0">{actions}</div> : null}
        </div>

        <div className="mt-8">{children}</div>
      </section>
    </main>
  );
}
