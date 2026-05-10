import Image from "next/image";
import Link from "next/link";
import type { CaseItem } from "@/src/data/cases";

/*
 * 文件说明：该文件实现案例卡片组件。
 * 功能说明：用图片、标题、简短问题摘要和统一 CTA 承接首页与列表页案例入口。
 *
 * 结构概览：
 *   第一部分：CaseCard 组件
 */

// ========== 第一部分：CaseCard 组件 ==========
export function CaseCard({ caseItem }: { caseItem: CaseItem }) {
  return (
    <article id={caseItem.slug} className="card flex h-full scroll-mt-28 flex-col">
      <div className="relative mb-3 h-28 overflow-hidden rounded-xl border border-line bg-slate-100 md:mb-4 md:aspect-[4/3] md:h-auto">
        <Image
          src={caseItem.imageSrc}
          alt={caseItem.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover"
        />
      </div>
      <div className="mb-3 hidden flex-wrap gap-2 md:flex">
        {caseItem.tags.map((tag) => (
          <span key={tag} className="rounded-lg border border-line px-2 py-1 text-meta text-muted">
            {tag}
          </span>
        ))}
      </div>
      <h3
        className="truncate text-body font-semibold leading-snug text-ink"
      >
        {caseItem.title}
      </h3>
      <p className="mt-2 text-copy md:mt-3">
        原本计划：{caseItem.problem}
      </p>
      <div className="mt-auto pt-3 md:pt-4">
        <Link href={`/cases#${caseItem.slug}`} className="btn-secondary w-full sm:w-fit">
          查看案例
        </Link>
      </div>
    </article>
  );
}
