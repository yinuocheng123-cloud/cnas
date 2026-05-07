"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "@/lib/site-data";

/*
 * 文件说明：该文件实现站点的通用顶部导航。
 * 功能说明：与 Header 保持一致的导航体验，供需要独立引用的页面复用。
 *
 * 结构概览：
 *   第一部分：移动端导航配置
 *   第二部分：SiteHeader 组件
 */

// ========== 第一部分：移动端导航配置 ==========
const mobileNavItems = [
  { label: "知识库", href: "/knowledge" },
  { label: "流程", href: "/cnas-process" },
  { label: "方案", href: "/solutions" },
  { label: "案例", href: "/cases" },
  { label: "FAQ", href: "/faqs" },
  { label: "诊断", href: "/diagnosis" },
];

// ========== 第二部分：SiteHeader 组件 ==========
export function SiteHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 bg-paper/95 backdrop-blur">
      <div className="site-shell flex h-14 items-center justify-between gap-3 md:min-h-16 md:py-3">
        <Link href="/" className="flex w-fit flex-col gap-1">
          <Image
            src="/brand/cnas-logo.png"
            alt="CNAS认可指南"
            width={1151}
            height={445}
            priority
            sizes="(max-width: 767px) 156px, 220px"
            className="h-auto w-[146px] md:w-[210px]"
          />
          <span className="hidden text-meta-token lg:block">CNAS专业知识与认可解决方案平台</span>
        </Link>

        <button
          type="button"
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? "关闭菜单" : "打开菜单"}
          className="inline-flex min-h-12 items-center justify-center rounded-lg border border-line bg-white px-3 text-meta font-semibold text-ink transition hover:border-primary hover:text-primary md:hidden"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
        >
          {isMobileMenuOpen ? "关闭" : "菜单"}
        </button>

        <nav className="hidden flex-wrap gap-x-4 gap-y-2 text-meta font-medium text-ink md:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(`${item.href}/`) || item.children?.some((child) => pathname === child.href);

            return (
              <Link key={item.href} href={item.href} className={`transition hover:text-[#4ECDC4] ${isActive ? "text-[#4ECDC4]" : "text-ink"}`}>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {isMobileMenuOpen ? (
        <div className="border-t border-line bg-paper/95 md:hidden">
          <div className="site-shell py-2">
            <div className="ml-auto w-full max-w-[16rem] rounded-2xl border border-line bg-white p-2.5 shadow-card">
              <div className="grid gap-1">
                {mobileNavItems.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`rounded-xl px-3 py-2.5 text-body font-medium transition hover:bg-surface hover:text-[#4ECDC4] ${isActive ? "bg-surface text-[#4ECDC4]" : "text-ink"}`}
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
