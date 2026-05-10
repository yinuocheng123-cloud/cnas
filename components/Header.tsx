"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "@/lib/site-data";

/*
 * 文件说明：该文件实现首页及主要页面使用的全站 Header。
 * 功能说明：提供品牌入口、桌面导航和移动端抽屉菜单。
 *
 * 结构概览：
 *   第一部分：移动端导航配置
 *   第二部分：Header 组件
 */

// ========== 第一部分：移动端导航配置 ==========
const mobileNavItems = [
  { label: "首页", href: "/" },
  { label: "知识库", href: "/knowledge" },
  { label: "方案", href: "/solutions" },
  { label: "案例", href: "/cases" },
  { label: "诊断", href: "/diagnosis" },
];

// ========== 第二部分：Header 组件 ==========
export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 bg-paper/95 backdrop-blur">
      <div className="site-shell flex min-h-14 items-center justify-between gap-4 py-2.5 md:min-h-16 md:py-3">
        <Link href="/" className="flex w-fit items-center">
          <span className="text-base font-semibold text-ink md:hidden">CNAS认可指南</span>
          <Image
            src="/brand/cnas-logo.png"
            alt="CNAS认可指南"
            width={1415}
            height={404}
            priority
            sizes="(max-width: 767px) 156px, 220px"
            className="hidden h-auto w-[156px] md:block md:w-[220px]"
          />
        </Link>

        <button
          type="button"
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? "关闭菜单" : "打开菜单"}
          className="inline-flex min-h-12 items-center justify-center rounded-lg border border-line bg-white px-3 text-meta font-semibold text-ink transition hover:border-primary hover:text-primary lg:hidden"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
        >
          {isMobileMenuOpen ? "关闭" : "菜单"}
        </button>

        <nav className="hidden flex-wrap items-center gap-x-4 gap-y-2 text-meta font-medium lg:flex">
          {navItems.map((item) => {
            const isCaseMenu = item.label === "案例解析";
            const isActive =
              item.href === "/"
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(`${item.href}/`) || item.children?.some((child) => pathname === child.href);

            return (
              <div key={item.href} className="group relative">
                <Link href={item.href} className={`inline-flex items-center gap-1 transition hover:text-[#4ECDC4] ${isActive ? "text-[#4ECDC4]" : "text-ink"}`}>
                  {item.label}
                  {item.children ? <span className={`text-meta transition ${isActive ? "text-[#4ECDC4]" : "text-subtle group-hover:text-[#4ECDC4]"}`}>▾</span> : null}
                </Link>
                {item.children ? (
                  <div className={`hidden rounded-xl border border-line bg-paper p-2 shadow-card group-hover:block group-focus-within:block lg:absolute lg:left-0 lg:top-7 ${isCaseMenu ? "w-[42rem]" : "w-72"}`}>
                    <div className={isCaseMenu ? "grid grid-cols-4 gap-1" : "grid gap-1"}>
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href} className="rounded-lg px-3 py-2 text-body font-medium text-ink transition hover:bg-surface hover:text-[#4ECDC4]">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>
      </div>

      {isMobileMenuOpen ? (
        <div className="border-t border-line bg-paper/95 lg:hidden">
          <div className="site-shell py-3">
            <div className="ml-auto w-full max-w-[17rem] rounded-2xl border border-line bg-white p-3 shadow-card">
              <div className="grid gap-1">
                {mobileNavItems.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`rounded-xl px-3 py-3 text-body font-medium transition hover:bg-surface hover:text-[#4ECDC4] ${isActive ? "bg-surface text-[#4ECDC4]" : "text-ink"}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
