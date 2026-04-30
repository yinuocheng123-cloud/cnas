/*
 * 文件说明：该文件实现判断清单组件。
 * 功能说明：统一风险提示、判断清单和评审前检查项展示。
 *
 * 结构概览：
 *   第一部分：ChecklistBlock 组件
 */

// ========== 第一部分：ChecklistBlock 组件 ==========
export function ChecklistBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded border border-slate-200 bg-white p-5">
      <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
      <ul className="mt-4 grid gap-3">
        {items.map((item) => (
          <li key={item} className="border-l-4 border-blue-900 pl-3 text-sm leading-6 text-slate-600">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
