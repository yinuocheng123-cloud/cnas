import Image from "next/image";

/*
 * 文件说明：该文件实现 CNAS认可指南主站的底部转化区。
 * 功能说明：提供品牌信任、服务内容、企业微信承接和备案号展示。
 *
 * 结构概览：
 *   第一部分：服务内容配置
 *   第二部分：Footer 组件
 */

// ========== 第一部分：服务内容配置 ==========
const serviceItems = ["CNAS认可流程", "CNAS认可路径判断", "评审准备", "认可后维护"];

// ========== 第二部分：Footer 组件 ==========
export function Footer() {
  return (
    <footer className="bg-[#071e3f] text-white">
      <div className="site-shell grid gap-8 border-t border-white/10 py-10 md:grid-cols-[1.15fr_0.75fr_0.9fr] md:items-start md:py-12">
        <section className="min-w-0 text-center md:text-left">
          <Image src="/brand/cnas-logo.png" alt="CNAS认可指南" width={1415} height={404} sizes="168px" className="mx-auto h-auto w-[168px] md:mx-0" />
          <p className="mt-4 text-body text-slate-300">先判断路径，再决定怎么推进。</p>
          <p className="mt-2 max-w-sm text-body text-slate-400">专注实验室CNAS认可路径判断与评审准备。</p>
          <p className="mt-2 text-meta font-semibold text-[#d8ad63] md:hidden">CNAS行业服务平台</p>
        </section>

        <section className="min-w-0 text-center md:text-left">
          <h2 className="text-base font-semibold text-white">服务内容</h2>
          <ul className="mx-auto mt-4 grid max-w-xs gap-2 text-body text-slate-300 md:mx-0">
            {serviceItems.map((item) => (
              <li key={item} className="flex items-center justify-center gap-2 md:justify-start">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4ECDC4]" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="footer-wecom" className="mx-auto grid max-w-xs scroll-mt-20 justify-items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4 text-center text-body text-slate-300 md:mx-0 md:justify-items-start md:justify-self-end md:text-left">
          <h2 className="text-base font-semibold text-white">添加CNAS认可指南顾问</h2>
          <img src="/wecom-qr.png" alt="企业微信顾问二维码" className="h-40 w-40 rounded-lg bg-white p-2 md:h-36 md:w-36" />
          <p className="font-semibold text-white">扫码领取《CNAS认可路径判断问卷》</p>
          <p>建议先判断路径，再决定怎么启动。</p>
        </section>
      </div>

      <div className="site-shell border-t border-white/10 py-4 text-center text-meta text-slate-400">
        <nav className="mb-4 flex flex-wrap justify-center gap-x-5 gap-y-2 md:hidden" aria-label="底部平台链接">
          <a href="/about" className="transition hover:text-white">
            关于我们
          </a>
          <a href="/faqs" className="transition hover:text-white">
            常见问题
          </a>
          <a href="/" className="transition hover:text-white">
            返回首页
          </a>
        </nav>
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
          浙ICP备2020044218号-3
        </a>
        <p className="mt-3 md:hidden">Copyright © CNAS认可指南</p>
      </div>
    </footer>
  );
}
