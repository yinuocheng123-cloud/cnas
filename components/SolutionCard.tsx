import Link from "next/link";
import type { Solution } from "@/lib/site-data";

/*
 * 文件说明：该文件实现解决方案卡片组件。
 * 功能说明：展示适合对象、解决问题、交付结果和客户配合事项。
 *
 * 结构概览：
 *   第一部分：SolutionCard 组件
 */

// ========== 第一部分：SolutionCard 组件 ==========
export function SolutionCard({ solution }: { solution: Solution }) {
  return (
    <Link href={solution.href} className="card-link">
      <h3 className="text-body font-semibold text-ink">{solution.title}</h3>
      <p className="mt-3 text-copy">{solution.summary}</p>
      <div className="mt-5 space-y-3 text-copy">
        <p><span className="font-semibold text-ink">适合谁：</span>{solution.suitableFor}</p>
        <p><span className="font-semibold text-ink">常见问题：</span>{solution.commonProblems.slice(0, 2).join("、")}</p>
        <p><span className="font-semibold text-ink">评审风险：</span>{solution.assessmentRisks.slice(0, 2).join("、")}</p>
      </div>
      <span className="btn-secondary mt-auto inline-flex w-fit pt-5">
        查看详情
      </span>
    </Link>
  );
}
