/*
 * 文件说明：该文件实现站点通用的 Hero 区块组件。
 * 功能说明：统一承接页面标题、说明、操作按钮、风险提示和右侧辅助入口区域。
 *
 * 结构概览：
 *   第一部分：类型定义
 *   第二部分：预警图标
 *   第三部分：HeroSection 组件
 */

// ========== 第一部分：类型定义 ==========
type HeroSectionProps = {
  eyebrow?: string;
  title: React.ReactNode;
  emphasis?: string;
  description: React.ReactNode;
  actions?: React.ReactNode;
  riskNotice?: React.ReactNode;
  aside?: React.ReactNode;
  variant?: "default" | "balanced";
};

// ========== 第二部分：预警图标 ==========
function WarningIcon() {
  return (
    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber-200 bg-amber-50 text-amber-500 shadow-[0_10px_30px_-20px_rgba(245,158,11,0.95)]">
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-none stroke-current stroke-[1.9]">
        <path d="M12 9v4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 17h.01" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

// ========== 第三部分：HeroSection 组件 ==========
export function HeroSection({ eyebrow, title, emphasis, description, actions, riskNotice, aside, variant = "default" }: HeroSectionProps) {
  const isBalanced = variant === "balanced";
  const shouldGroupAside = isBalanced && Boolean(aside);
  const riskNoticeClassName = isBalanced
    ? "mt-3 flex items-start gap-3 rounded-2xl border border-amber-200/80 bg-gradient-to-r from-amber-50 via-white to-white px-4 py-3 text-sm leading-6 text-slate-700 shadow-[0_18px_40px_-32px_rgba(245,158,11,0.95)]"
    : "mt-4 flex items-start gap-3 rounded-2xl border border-amber-200/80 bg-gradient-to-r from-amber-50 via-white to-white px-4 py-3 text-sm leading-6 text-slate-700 shadow-[0_18px_40px_-32px_rgba(245,158,11,0.95)]";

  return (
    <section className="bg-surface">
      <div
        className={`site-shell grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px] ${
          isBalanced
            ? "items-center py-6 md:items-start md:py-8 lg:grid-cols-[minmax(0,1fr)_560px] lg:items-end lg:gap-5 xl:grid-cols-[minmax(0,1fr)_600px]"
            : "py-6 md:py-10 lg:items-end"
        }`}
      >
        <div className={isBalanced ? "flex flex-col items-start justify-start lg:pb-1" : ""}>
          {eyebrow ? <p className="text-meta font-semibold uppercase tracking-[0.14em] text-primary">{eyebrow}</p> : null}
          <h1
            className={`font-semibold text-ink ${
              isBalanced
                ? "mt-2.5 max-w-[20rem] text-3xl leading-tight sm:max-w-[23rem] md:mt-4 md:max-w-[36rem] md:text-display md:leading-[1.2]"
                : "mt-4 max-w-[18rem] text-3xl leading-tight sm:max-w-[28rem] md:mt-5 md:max-w-4xl md:text-display md:leading-[1.2]"
            }`}
          >
            {title}
          </h1>
          {emphasis ? (
            <p className={isBalanced ? "mt-3 text-body font-medium text-muted md:mt-4" : "mt-3 text-title text-primary md:mt-4"}>{emphasis}</p>
          ) : null}
          <div className={isBalanced ? "mt-2.5 max-w-[34rem] text-base leading-7 text-slate-600 md:mt-4 md:max-w-5xl md:text-[17px] md:leading-normal" : "mt-4 max-w-4xl text-copy leading-7 md:mt-5"}>
            {description}
          </div>
          {actions ? (
            <div
              className={
                isBalanced
                  ? "mt-4 flex flex-col gap-3 [&>*]:min-h-12 [&>*]:w-full sm:flex-row sm:flex-wrap sm:[&>*]:w-auto md:mt-6"
                  : "mt-5 flex flex-col gap-3 [&>*]:min-h-12 [&>*]:w-full sm:flex-row sm:flex-wrap sm:[&>*]:w-auto md:mt-6"
              }
            >
              {actions}
            </div>
          ) : null}
          {riskNotice && !shouldGroupAside ? (
            <div className={riskNoticeClassName}>
              <WarningIcon />
              <p className="min-w-0 flex-1">{riskNotice}</p>
            </div>
          ) : null}
        </div>
        {shouldGroupAside ? (
          <div className="hidden items-start gap-4 self-end lg:grid">
            {riskNotice ? (
              <div className={riskNoticeClassName}>
                <WarningIcon />
                <p className="min-w-0 flex-1">{riskNotice}</p>
              </div>
            ) : null}
            {aside}
          </div>
        ) : (
          aside
        )}
      </div>
    </section>
  );
}
