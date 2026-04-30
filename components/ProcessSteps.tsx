/*
 * 文件说明：该文件实现步骤条组件。
 * 功能说明：用于展示 CNAS 诊断、规划、建设、辅导、评审的阶段路径。
 *
 * 结构概览：
 *   第一部分：ProcessSteps 组件
 */

// ========== 第一部分：ProcessSteps 组件 ==========
export function ProcessSteps({ steps }: { steps: string[] }) {
  return (
    <ol className="grid gap-3 md:grid-cols-5">
      {steps.map((step, index) => (
        <li key={step} className="rounded border border-slate-200 bg-white p-4">
          <span className="text-xs font-semibold text-blue-900">STEP {index + 1}</span>
          <p className="mt-2 text-sm font-semibold text-slate-950">{step}</p>
        </li>
      ))}
    </ol>
  );
}
