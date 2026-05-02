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
      <div className="site-shell flex flex-col gap-5 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-title font-semibold">不确定企业现在适不适合做CNAS？</h2>
          <p className="mt-2 max-w-2xl text-body text-white/70">
            先做一次初步诊断，判断基础、风险和投入顺序，再决定是否启动。
          </p>
        </div>
        <Link
          href="/services"
          className="inline-flex w-fit rounded-lg bg-white px-4 py-2.5 text-meta font-semibold text-ink transition hover:bg-surface"
        >
          预约一次初步诊断
        </Link>
      </div>
    </section>
  );
}
