import Image from "next/image";
import Link from "next/link";
import { navItems } from "@/lib/site-data";

/*
 * 文件说明：该文件实现全站顶部导航。
 * 功能说明：提供 Logo、主导航与品牌入口，保证各页面有一致访问路径。
 *
 * 结构概览：
 *   第一部分：SiteHeader 组件
 */

// ========== 第一部分：SiteHeader 组件 ==========
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 bg-paper/95 backdrop-blur">
      <div className="site-shell flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="flex w-fit flex-col gap-1">
          <Image
            src="/brand/cnas-logo.png"
            alt="CNAS认可指南"
            width={1151}
            height={445}
            priority
            className="h-auto w-[188px] md:w-[220px]"
          />
          <span className="hidden text-meta-token md:block">CNAS专业知识与认可解决方案平台</span>
        </Link>

        <nav className="flex flex-wrap gap-x-4 gap-y-2 text-meta font-medium text-muted">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
