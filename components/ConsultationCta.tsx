import Link from "next/link";

/*
 * 文件说明：该文件实现页面底部咨询转化入口。
 * 功能说明：统一承接首页、文章页和栏目页的初步诊断转化动作。
 *
 * 结构概览：
 *   第一部分：咨询入口组件
 */

// ========== 第一部分：咨询入口组件 ==========
export function ConsultationCta() {
  return (
    <section className="bg-ink text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <h2 className="text-2xl font-semibold">不确定企业现在适不适合做CNAS？</h2>
          <p className="mt-2 text-sm leading-6 text-white/70">
            先做一次初步诊断，判断基础、风险和投入顺序，再决定是否启动。
          </p>
        </div>
        <Link
          href="/services"
          className="inline-flex w-fit rounded bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:bg-skyglass"
        >
          预约一次初步诊断
        </Link>
      </div>
    </section>
  );
}
