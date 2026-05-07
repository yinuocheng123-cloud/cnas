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
      <div className="site-shell py-8 md:py-12">
        <div>
          <h2 className="text-title font-semibold">很多时间浪费的，不是认可动作，而是错误路径带来的返工</h2>
          <p className="mt-2 max-w-xl text-body text-slate-300">先把风险看清，再决定要不要启动，通常比边做边改更稳，也更容易控制时间和投入。</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Link href="/diagnosis" className="btn-primary bg-white text-ink hover:bg-surface">
              获取诊断结果
            </Link>
            <Link href="/solutions" className="btn-secondary border-slate-500 bg-transparent text-white hover:border-white hover:text-white">
              获取建议
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
