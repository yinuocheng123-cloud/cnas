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
    <section className="card">
      <h2 className="text-heading">{title}</h2>
      <ul className="mt-3 grid gap-3 md:mt-4">
        {items.map((item) => (
          <li key={item} className="text-copy leading-7">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
