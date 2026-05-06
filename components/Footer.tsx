/*
 * 文件说明：该文件实现全站 Footer。
 * 功能说明：承接站点定位，并声明内容平台的专业方向。
 *
 * 结构概览：
 *   第一部分：Footer 组件
 */

// ========== 第一部分：Footer 组件 ==========
export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="site-shell border-t border-slate-700 pt-4 pb-8 text-body text-slate-300">
        <p className="font-semibold text-white">CNAS认可指南</p>
        <p className="mt-2">CNAS专业知识与认可解决方案平台，聚焦 CNAS认可、实验室能力建设、体系运行、评审风险与持续改进。</p>
        <p className="mt-2">
          <a href="/about" className="text-slate-200 underline underline-offset-4">
            关于平台
          </a>
        </p>
      </div>
    </footer>
  );
}
