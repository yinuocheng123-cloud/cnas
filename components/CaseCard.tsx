import Image from "next/image";
import Link from "next/link";
import type { CaseItem } from "@/src/data/cases";

/*
 * 文件说明：该文件实现案例卡片组件。
 * 功能说明：用原来状态、关键动作和结果变化的三段结构展示企业少走弯路的真实路径。
 *
 * 结构概览：
 *   第一部分：CaseCard 组件
 */

// ========== 第一部分：CaseCard 组件 ==========
export function CaseCard({ caseItem }: { caseItem: CaseItem }) {
  return (
    <article id={caseItem.slug} className="card scroll-mt-28">
      <div className="relative mb-4 h-40 overflow-hidden rounded-xl border border-line bg-slate-100 md:h-auto md:aspect-[4/3]">
        <Image
          src={caseItem.imageSrc}
          alt={caseItem.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover"
        />
      </div>
      <div className="mb-3 flex flex-wrap gap-2">
        {caseItem.tags.map((tag) => (
          <span key={tag} className="rounded-lg border border-line px-2 py-1 text-meta text-muted">
            {tag}
          </span>
        ))}
      </div>
      <h3 className="text-body font-semibold text-ink">{caseItem.title}</h3>
      <p className="mt-3 text-copy">原来状态：{caseItem.problem}</p>
      <p className="mt-2 text-copy">关键动作：{caseItem.action}</p>
      <p className="mt-2 text-copy">结果变化：{caseItem.result}</p>
      <div className="mt-4">
        <Link href={`/cases#${caseItem.slug}`} className="btn-secondary w-full sm:w-fit">
          查看案例
        </Link>
      </div>
    </article>
  );
}
