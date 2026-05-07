import Image from "next/image";
import Link from "next/link";
import type { Solution } from "@/lib/site-data";

/*
 * 文件说明：该文件实现行业方案卡片组件。
 * 功能说明：用图片、标题、简短说明和统一 CTA 承接方案入口。
 *
 * 结构概览：
 *   第一部分：SolutionCard 组件
 */

// ========== 第一部分：SolutionCard 组件 ==========
export function SolutionCard({ solution }: { solution: Solution }) {
  return (
    <Link href={solution.href} className="card-link gap-3">
      <div className="relative h-40 overflow-hidden rounded-xl border border-line bg-slate-100 md:h-auto md:aspect-[4/3]">
        <Image
          src={solution.imageSrc}
          alt={solution.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <h3 className="text-body font-semibold text-ink">{solution.title}</h3>
      <p className="text-copy">{solution.summary}</p>
      <div className="mt-auto pt-2">
        <span className="btn-secondary w-full sm:w-fit">获取方案</span>
      </div>
    </Link>
  );
}
