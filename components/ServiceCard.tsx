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
    <article id={service.slug} className="card scroll-mt-28">
      <h3 className="text-body font-semibold text-ink">{service.title}</h3>
      <p className="mt-3 text-copy">适合企业：{service.targetUser}</p>
      <p className="mt-2 text-copy">常见问题：{service.commonProblems.join("、")}</p>
      <p className="mt-3 text-body font-semibold text-ink">支持内容</p>
      <ul className="mt-2 grid gap-2 text-copy">
        {service.supportContent.map((item) => (
          <li key={item} className="border-l-2 border-slate-300 pl-3">
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-copy">交付结果：{service.deliverables.join("、")}</p>
      <p className="mt-2 text-copy">风险提醒：{service.riskNotice}</p>
    </article>
  );
}
