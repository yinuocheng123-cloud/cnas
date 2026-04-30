import Link from "next/link";

/*
 * 文件说明：该文件实现咨询转化区块。
 * 功能说明：统一页面底部咨询入口，承接初步诊断需求。
 *
 * 结构概览：
 *   第一部分：CtaBlock 组件
 */

// ========== 第一部分：CtaBlock 组件 ==========
export function CtaBlock() {
  return (
    <section className="bg-slate-950 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <h2 className="text-2xl font-semibold">如需进一步诊断，可联系杭育科技团队。</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            先判断实验室基础、认可范围、评审风险和投入顺序，再决定是否启动 CNAS认可。
          </p>
        </div>
        <Link
          href="/services"
          className="inline-flex w-fit rounded bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
        >
          进入服务咨询
        </Link>
      </div>
    </section>
  );
}
