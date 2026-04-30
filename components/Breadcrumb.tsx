import Link from "next/link";

/*
 * 文件说明：该文件实现面包屑导航。
 * 功能说明：帮助用户和搜索引擎理解当前页面层级。
 *
 * 结构概览：
 *   第一部分：类型定义
 *   第二部分：Breadcrumb 组件
 */

// ========== 第一部分：类型定义 ==========
type BreadcrumbItem = {
  label: string;
  href?: string;
};

// ========== 第二部分：Breadcrumb 组件 ==========
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex flex-wrap gap-2 text-sm text-slate-500" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={item.label} className="flex items-center gap-2">
          {item.href ? (
            <Link href={item.href} className="hover:text-blue-900">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-700">{item.label}</span>
          )}
          {index < items.length - 1 ? <span>/</span> : null}
        </span>
      ))}
    </nav>
  );
}
