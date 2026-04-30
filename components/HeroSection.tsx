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
  title: string;
  description: string;
  actions?: React.ReactNode;
  aside?: React.ReactNode;
};

// ========== 第二部分：HeroSection 组件 ==========
export function HeroSection({ eyebrow, title, description, actions, aside }: HeroSectionProps) {
  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:px-8 md:py-16 lg:grid-cols-[1fr_320px] lg:items-end">
        <div>
          {eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-900">{eyebrow}</p>
          ) : null}
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-slate-950 md:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">{description}</p>
          {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
        {aside}
      </div>
    </section>
  );
}
