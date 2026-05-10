import Link from "next/link";

/*
 * 文件说明：该文件实现站点统一的底部 CTA 区块。
 * 功能说明：在不增加复杂结构的前提下，提供轻量咨询入口与清晰的下一步动作。
 *
 * 结构概览：
 *   第一部分：CtaBlock 组件
 */

// ========== 第一部分：CtaBlock 组件 ==========
export function CtaBlock() {
  return (
    <section className="bg-ink text-white">
      <div className="site-shell py-6 md:py-10">
        <div>
          <h2 className="text-2xl font-semibold leading-snug md:text-title">先判断路径，再决定怎么启动</h2>
          <p className="mt-2 max-w-xl text-base leading-7 text-slate-300 md:text-body">先把风险看清，再决定要不要启动，通常比边做边改更稳。</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Link href="/diagnosis" className="btn-primary bg-white text-ink hover:bg-surface">
              开始路径诊断
            </Link>
            <Link href="/solutions" className="btn-secondary hidden border-slate-500 bg-transparent text-white hover:border-white hover:text-white sm:inline-flex">
              获取实验室认可路径
            </Link>
            <Link href="/cases" className="btn-secondary hidden border-slate-500 bg-transparent text-white hover:border-white hover:text-white sm:inline-flex">
              查看行业案例
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
