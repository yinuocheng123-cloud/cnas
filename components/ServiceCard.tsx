import type { ServiceItem } from "@/src/data/services";

/*
 * 文件说明：该文件实现服务卡片组件。
 * 功能说明：展示服务对象、问题、交付物和客户配合事项，避免服务边界含糊。
 *
 * 结构概览：
 *   第一部分：ServiceCard 组件
 */

// ========== 第一部分：ServiceCard 组件 ==========
export function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <article className="rounded border border-slate-200 bg-white p-5">
      <h3 className="text-lg font-semibold text-slate-950">{service.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">适合企业：{service.targetUser}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">常见问题：{service.commonProblems.join("、")}</p>
      <p className="mt-3 text-sm font-semibold text-slate-950">支持内容</p>
      <ul className="mt-2 grid gap-2 text-sm leading-6 text-slate-600">
        {service.supportContent.map((item) => (
          <li key={item} className="border-l-4 border-blue-900 pl-3">
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm leading-6 text-slate-600">交付结果：{service.deliverables.join("、")}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">风险提醒：{service.riskNotice}</p>
    </article>
  );
}
