import Link from "next/link";
import type { RiskEntry } from "@/src/data/riskEntries";

/*
 * 文件说明：该文件实现首页 Hero 右侧的风险入口卡片。
 * 功能说明：用统一的风险预警卡承接数字、判断标题、说明和跳转入口。
 *
 * 结构概览：
 *   第一部分：RiskEntryCard 组件
 */

// ========== 第一部分：RiskEntryCard 组件 ==========
export function RiskEntryCard({ entry }: { entry: RiskEntry }) {
  return (
    <Link
      href={entry.href}
      className="group relative flex h-full min-h-[128px] flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-gradient-to-br from-white via-white to-amber-50/55 p-4 shadow-[0_20px_45px_-34px_rgba(15,23,42,0.35)] transition duration-200 hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-[0_26px_55px_-34px_rgba(217,119,6,0.22)] lg:min-h-[136px]"
    >
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/80 to-transparent opacity-80" />
      <div className="flex flex-col gap-2">
        <p className="text-[28px] font-semibold leading-none tracking-[-0.03em] text-slate-900 transition group-hover:text-amber-600">
          {entry.metric}
        </p>
        <h3 className="text-[15px] font-semibold leading-[1.45] text-slate-900">
          {entry.title}
        </h3>
      </div>
      <p className="mt-2 text-sm leading-[1.55] text-slate-600">{entry.summary}</p>
    </Link>
  );
}
