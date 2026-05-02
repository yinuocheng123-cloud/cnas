/*
 * 文件说明：该文件实现通用首屏区组件。
 * 功能说明：统一页面标题、说明和操作区的基础布局。
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
  riskNotice?: string;
  aside?: React.ReactNode;
  variant?: "default" | "balanced";
};

// ========== 第二部分：HeroSection 组件 ==========
export function HeroSection({ eyebrow, title, emphasis, description, actions, riskNotice, aside, variant = "default" }: HeroSectionProps) {
  const isBalanced = variant === "balanced";

  return (
    <section className="bg-surface">
      <div
        className={`site-shell grid gap-8 lg:grid-cols-[1fr_320px] ${
          isBalanced ? "py-10 md:py-12 lg:items-center" : "py-12 md:py-16 lg:items-end"
        }`}
      >
        <div>
          {eyebrow ? (
            <p className="text-meta font-semibold uppercase tracking-[0.16em] text-primary">{eyebrow}</p>
          ) : null}
          <h1
            className={`font-semibold text-ink ${
              isBalanced
                ? "mt-4 max-w-2xl text-title leading-tight md:text-display"
                : "mt-5 max-w-4xl text-title md:text-display"
            }`}
          >
            {title}
          </h1>
          {emphasis ? (
            <p className={isBalanced ? "mt-3 text-body font-medium text-muted" : "mt-4 text-title text-primary"}>
              {emphasis}
            </p>
          ) : null}
          <p className={isBalanced ? "mt-4 max-w-2xl text-copy" : "mt-5 max-w-3xl text-copy"}>
            {description}
          </p>
          {actions ? <div className={isBalanced ? "mt-6 flex flex-wrap gap-2" : "mt-8 flex flex-wrap gap-3"}>{actions}</div> : null}
          {riskNotice ? (
            <p
              className={
                isBalanced
                  ? "mt-3 max-w-2xl rounded-lg border border-line bg-paper px-3 py-2 text-meta text-muted"
                  : "mt-4 max-w-3xl rounded-lg border border-line bg-paper px-4 py-3 text-meta text-muted"
              }
            >
              {riskNotice}
            </p>
          ) : null}
        </div>
        {aside}
      </div>
    </section>
  );
}
