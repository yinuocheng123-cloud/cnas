import type { CaseItem } from "@/src/data/cases";

/*
 * 文件说明：该文件实现案例卡片组件。
 * 功能说明：用问题、解决、结果三段结构拆解案例。
 *
 * 结构概览：
 *   第一部分：CaseCard 组件
 */

// ========== 第一部分：CaseCard 组件 ==========
export function CaseCard({ caseItem }: { caseItem: CaseItem }) {
  return (
    <article id={caseItem.slug} className="card scroll-mt-28">
      <div className="mb-3 flex flex-wrap gap-2">
        {caseItem.tags.map((tag) => (
          <span key={tag} className="rounded-lg border border-line px-2 py-1 text-meta text-muted">
            {tag}
          </span>
        ))}
      </div>
      <h3 className="text-body font-semibold text-ink">{caseItem.title}</h3>
      <p className="mt-3 text-copy">问题：{caseItem.problem}</p>
      <p className="mt-2 text-copy">动作：{caseItem.action}</p>
      <p className="mt-2 text-copy">结果：{caseItem.result}</p>
    </article>
  );
}
