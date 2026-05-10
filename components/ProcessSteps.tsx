/*
 * 文件说明：该文件实现步骤条组件。
 * 功能说明：用于展示 CNAS 诊断、规划、建设、辅导、评审的阶段路径。
 *
 * 结构概览：
 *   第一部分：ProcessSteps 组件
 */

type ProcessStep = string | {
  title: string;
  description?: string;
};

// ========== 第一部分：ProcessSteps 组件 ==========
export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="grid gap-3 md:grid-cols-5 md:gap-4">
      {steps.map((step, index) => (
        <li
          key={typeof step === "string" ? step : step.title}
          className="card flex flex-col transition hover:border-slate-300"
        >
          <span className="text-meta-token font-semibold">STEP {index + 1}</span>
          <p className="mt-3 text-body font-semibold leading-snug text-ink">{typeof step === "string" ? step : step.title}</p>
          {typeof step !== "string" && step.description ? (
            <p className="mt-3 text-copy">{step.description}</p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
