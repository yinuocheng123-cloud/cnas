import Image from "next/image";
import Link from "next/link";

/*
 * 文件说明：该文件实现站点底部信息区。
 * 功能说明：在移动端保持轻量结构，只保留品牌、一句话说明、核心导航和联系方式。
 *
 * 结构概览：
 *   第一部分：核心导航配置
 *   第二部分：Footer 组件
 */

// ========== 第一部分：核心导航配置 ==========
const footerLinks = [
  { label: "知识库", href: "/knowledge" },
  { label: "流程", href: "/cnas-process" },
  { label: "方案", href: "/solutions" },
  { label: "案例", href: "/cases" },
  { label: "诊断", href: "/diagnosis" },
];

// ========== 第二部分：Footer 组件 ==========
export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="site-shell border-t border-slate-700 py-6 md:py-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Image src="/brand/cnas-logo.png" alt="CNAS认可指南" width={1151} height={445} sizes="148px" className="h-auto w-[148px]" />
            <p className="mt-2 text-body text-slate-300">CNAS专业知识与认可解决方案平台，帮助企业先判断路径，再决定怎么推进。</p>
          </div>

          <div className="grid gap-1.5 text-body text-slate-300">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="grid gap-1.5 text-body text-slate-300">
            <p className="font-semibold text-white">联系方式</p>
            <p>咨询承接方：杭育科技</p>
            <p>建议先通过诊断页提交需求。</p>
            <Link href="/diagnosis" className="text-slate-100 underline underline-offset-4">
              开始诊断
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
