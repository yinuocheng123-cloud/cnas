import Link from "next/link";
import { navItems } from "@/lib/site-data";

/*
 * 文件说明：该文件实现全站顶部导航。
 * 功能说明：提供 Logo、主导航与咨询入口，保证各页面有一致访问路径。
 *
 * 结构概览：
 *   第一部分：导航组件
 */

// ========== 第一部分：导航组件 ==========
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-ink/10 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between md:px-8">
        <Link href="/" className="text-base font-semibold text-ink">
          杭育｜CNAS专业知识与解决方案平台
        </Link>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink/70">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-moss">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
