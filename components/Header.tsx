import Link from "next/link";
import { navItems } from "@/lib/site-data";

/*
 * 文件说明：该文件实现全站 Header。
 * 功能说明：提供品牌入口、主导航和移动端自动换行布局。
 *
 * 结构概览：
 *   第一部分：Header 组件
 */

// ========== 第一部分：Header 组件 ==========
export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between md:px-8">
        <Link href="/" className="text-base font-semibold text-slate-950">
          CNAS专业知识与认可解决方案平台
        </Link>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-blue-900">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
