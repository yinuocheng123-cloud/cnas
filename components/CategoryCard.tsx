import Link from "next/link";
import type { Category } from "@/src/data/categories";

/*
 * 文件说明：该文件实现内容分类卡片。
 * 功能说明：展示知识库分类入口，支撑长期内容扩展。
 *
 * 结构概览：
 *   第一部分：CategoryCard 组件
 */

// ========== 第一部分：CategoryCard 组件 ==========
export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={category.href} className="card-link">
      <h3 className="text-body font-semibold text-ink">{category.title}</h3>
      <p className="mt-3 text-copy">{category.description}</p>
    </Link>
  );
}
