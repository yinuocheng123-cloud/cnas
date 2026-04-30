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
    <article className="rounded border border-slate-200 bg-white p-5">
      <h3 className="text-lg font-semibold text-slate-950">{caseItem.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">问题：{caseItem.problem}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">动作：{caseItem.action}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">结果：{caseItem.result}</p>
    </article>
  );
}
