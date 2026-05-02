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
    <header className="sticky top-0 z-20 bg-paper/95 backdrop-blur">
      <div className="site-shell flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="text-meta font-medium text-ink">
          CNAS专业知识与认可解决方案平台
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
