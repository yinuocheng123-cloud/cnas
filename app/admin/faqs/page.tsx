/*
 * 文件说明：该文件实现 CNAS 内容控制台 FAQ 管理只读页。
 * 功能说明：聚合展示平台页、GEO 文章和问答库中的 FAQ，支持按分类筛选。
 *
 * 结构概览：
 *   第一部分：导入依赖
 *   第二部分：FAQ 只读页面
 */

// ========== 第一部分：导入依赖 ==========
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { ensureAdminAccess, getAdminFaqItems } from "@/lib/admin";

// ========== 第二部分：FAQ 只读页面 ==========
export default async function AdminFaqsPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string; category?: string }>;
}) {
  noStore();

  const params = await searchParams;
  ensureAdminAccess(params.key);

  const faqItems = getAdminFaqItems();
  const categories = Array.from(new Set(faqItems.map((item) => item.category)));
  const filteredFaqs = params.category ? faqItems.filter((item) => item.category === params.category) : faqItems;

  return (
    <AdminShell
      active="faqs"
      adminKey={params.key}
      title="FAQ管理"
      description="只读聚合当前站内 FAQ，便于内容运营查看问题、分类、首页展示状态和来源页面。"
    >
      <form className="flex flex-col gap-3 rounded-3xl border border-[#e4ded2] bg-white p-4 md:flex-row md:items-center" method="get">
        <input type="hidden" name="key" value={params.key ?? ""} />
        <select
          className="min-w-0 rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm outline-none focus:border-[#d1a35d] md:w-72"
          name="category"
          defaultValue={params.category ?? ""}
        >
          <option value="">全部分类</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button className="rounded-2xl bg-[#0b1d35] px-5 py-3 text-sm font-semibold text-white" type="submit">
          筛选
        </button>
        <p className="text-sm text-[#667085]">当前显示 {filteredFaqs.length} 条 FAQ</p>
      </form>

      <div className="mt-6 overflow-x-auto rounded-3xl border border-[#e4ded2] bg-white">
        <table className="min-w-[920px] w-full text-left text-sm">
          <thead className="bg-[#f7f2e9] text-[#657184]">
            <tr>
              <th className="px-4 py-3 font-semibold">问题</th>
              <th className="px-4 py-3 font-semibold">分类</th>
              <th className="px-4 py-3 font-semibold">是否首页展示</th>
              <th className="px-4 py-3 font-semibold">来源页面</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eee6d8]">
            {filteredFaqs.map((faq) => (
              <tr key={`${faq.sourcePage}-${faq.question}`} className="align-top text-[#344054]">
                <td className="px-4 py-4">
                  <p className="font-medium text-[#0b1d35]">{faq.question}</p>
                  <p className="mt-2 line-clamp-2 text-[#667085]">{faq.answer}</p>
                </td>
                <td className="px-4 py-4">{faq.category}</td>
                <td className="px-4 py-4">{faq.isHomeShown ? "是" : "否"}</td>
                <td className="px-4 py-4">
                  <Link href={faq.sourcePage} className="font-semibold text-[#b78b49]">
                    {faq.sourcePage}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
