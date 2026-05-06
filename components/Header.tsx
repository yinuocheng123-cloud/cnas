import Image from "next/image";
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
    <header className="sticky top-0 z-20 bg-paper/95 backdrop-blur">
      <div className="site-shell flex flex-col gap-3 py-4 lg:flex-row lg:items-center lg:justify-between">
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
          {navItems.map((item) => {
            const isCaseMenu = item.label === "案例解析";

            return (
              <div key={item.href} className="group relative">
                <Link href={item.href} className="inline-flex items-center gap-1 transition hover:text-ink">
                  {item.label}
                  {item.children ? <span className="text-meta text-subtle">▾</span> : null}
                </Link>
                {item.children ? (
                  <div
                    className={`hidden rounded-xl border border-line bg-paper p-2 shadow-card group-hover:block group-focus-within:block lg:absolute lg:left-0 lg:top-7 ${
                      isCaseMenu ? "w-[42rem]" : "w-72"
                    }`}
                  >
                    <div className={isCaseMenu ? "grid grid-cols-4 gap-1" : "grid gap-1"}>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`rounded-lg px-3 py-2 transition hover:bg-surface ${isCaseMenu ? "text-center whitespace-nowrap" : ""}`}
                        >
                          <span className="block text-body font-medium text-ink">{child.label}</span>
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
    </header>
  );
}
