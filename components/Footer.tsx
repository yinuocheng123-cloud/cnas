/*
 * 文件说明：该文件实现全站 Footer。
 * 功能说明：承接站点定位，并声明 Demo 阶段内容边界。
 *
 * 结构概览：
 *   第一部分：Footer 组件
 */

// ========== 第一部分：Footer 组件 ==========
export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="site-shell py-8 text-body text-slate-300">
        <p className="font-semibold text-white">CNAS专业知识与认可解决方案平台</p>
        <p className="mt-2">
          聚焦 CNAS认可、实验室能力建设、体系运行、评审风险与持续改进。
        </p>
        <p className="mt-2">
          <a href="/about" className="text-slate-200 underline underline-offset-4">
            关于平台
          </a>
        </p>
      </div>
    </footer>
  );
}
