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
    <section className="bg-ink text-white">
      <div className="site-shell flex flex-col gap-5 pt-10 pb-4 md:flex-row md:items-center md:justify-between md:pt-10 md:pb-4">
        <div>
          <h2 className="text-title font-semibold">如需进一步诊断，可联系杭育科技团队。</h2>
          <p className="mt-2 max-w-2xl text-body text-slate-300">
            先判断实验室基础、认可范围、评审风险和投入顺序，再决定是否启动 CNAS认可。
          </p>
        </div>
        <Link
          href="/services"
          className="inline-flex w-fit rounded-lg bg-white px-4 py-2.5 text-meta font-semibold text-ink transition hover:bg-surface"
        >
          进入服务咨询
        </Link>
      </div>
    </section>
  );
}
