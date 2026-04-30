/*
 * 文件说明：该文件实现风险提示组件。
 * 功能说明：突出 CNAS 启动前不建议盲目推进的边界条件。
 *
 * 结构概览：
 *   第一部分：RiskNotice 组件
 */

// ========== 第一部分：RiskNotice 组件 ==========
export function RiskNotice({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded border border-blue-900/20 bg-blue-50 p-5">
      <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
      <ul className="mt-4 grid gap-3">
        {items.map((item) => (
          <li key={item} className="text-sm leading-6 text-slate-700">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
