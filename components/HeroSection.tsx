/*
 * 文件说明：该文件实现站点通用的 Hero 区块组件。
 * 功能说明：统一承接页面标题、说明、操作按钮、风险提示和辅助图片区域。
 *
 * 结构概览：
 *   第一部分：类型定义
 *   第二部分：HeroSection 组件
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

// ========== 第二部分：HeroSection 组件 ==========
export function HeroSection({ eyebrow, title, emphasis, description, actions, riskNotice, aside, variant = "default" }: HeroSectionProps) {
  const isBalanced = variant === "balanced";
  const shouldGroupAside = isBalanced && Boolean(aside);

  return (
    <section className="bg-surface">
      <div
        className={`site-shell grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] ${
          isBalanced ? "min-h-[78vh] py-5 md:min-h-[auto] md:py-10 lg:items-start lg:gap-6" : "py-8 md:py-12 lg:items-end"
        }`}
      >
        <div className={isBalanced ? "flex flex-col justify-center lg:pt-1" : ""}>
          {eyebrow ? <p className="text-meta font-semibold uppercase tracking-[0.14em] text-primary">{eyebrow}</p> : null}
          <h1
            className={`font-semibold text-ink ${
              isBalanced
                ? "mt-2.5 max-w-[15rem] text-[1.75rem] leading-tight sm:max-w-[23rem] md:mt-4 md:max-w-[36rem] md:text-display md:leading-[1.2]"
                : "mt-4 max-w-[18rem] text-3xl leading-tight sm:max-w-[28rem] md:mt-5 md:max-w-4xl md:text-display md:leading-[1.2]"
            }`}
          >
            {title}
          </h1>
          {emphasis ? (
            <p className={isBalanced ? "mt-3 text-body font-medium text-muted md:mt-4" : "mt-3 text-title text-primary md:mt-4"}>{emphasis}</p>
          ) : null}
          <div className={isBalanced ? "mt-2.5 max-w-[30rem] text-[15px] leading-6 text-slate-600 md:mt-4 md:text-body md:leading-7" : "mt-4 max-w-3xl text-copy leading-7 md:mt-5"}>
            {description}
          </div>
          {actions ? (
            <div
              className={
                isBalanced
                  ? "mt-4 flex flex-col gap-3 [&>*]:min-h-12 [&>*]:w-full sm:flex-row sm:flex-wrap sm:[&>*]:w-auto md:mt-6"
                  : "mt-6 flex flex-col gap-3 [&>*]:min-h-12 [&>*]:w-full sm:flex-row sm:flex-wrap sm:[&>*]:w-auto md:mt-8"
              }
            >
              {actions}
            </div>
          ) : null}
          {riskNotice && !shouldGroupAside ? (
            <p
              className={
                isBalanced
                  ? "mt-3 max-w-2xl rounded-lg border border-line bg-paper px-3 py-2 text-[13px] leading-5 text-muted"
                  : "mt-4 max-w-3xl rounded-lg border border-line bg-paper px-4 py-3 text-meta leading-6 text-muted"
              }
            >
              {riskNotice}
            </p>
          ) : null}
        </div>
        {shouldGroupAside ? (
          <div className="grid gap-3 self-start">
            {riskNotice ? <p className="rounded-lg border border-line bg-paper px-3 py-2 text-[13px] leading-6 text-muted">{riskNotice}</p> : null}
            {aside}
          </div>
        ) : (
          aside
        )}
      </div>
    </section>
  );
}
