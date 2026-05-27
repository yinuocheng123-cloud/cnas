/*
 * 文件说明：该文件实现 CMS v1.2 FAQ 管理页。
 * 功能说明：从 data/faqs.json 读取 FAQ，支持筛选、新增、编辑和归档状态管理。
 *
 * 结构概览：
 *   第一部分：导入依赖
 *   第二部分：FAQ 管理页面
 */

// ========== 第一部分：导入依赖 ==========
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { ensureAdminAccess, getAdminHref } from "@/lib/admin";
import { getCmsFaqsSync } from "@/lib/cms-content";

// ========== 第二部分：FAQ 管理页面 ==========
export default async function AdminFaqsPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string; category?: string; status?: string; error?: string }>;
}) {
  noStore();

  const params = await searchParams;
  const access = await ensureAdminAccess(params.key);
  const faqItems = getCmsFaqsSync().sort((left, right) => left.order - right.order);
  const categories = Array.from(new Set(faqItems.map((item) => item.category)));
  const filteredFaqs = faqItems.filter((item) => (!params.category || item.category === params.category) && (!params.status || item.status === params.status));

  return (
    <AdminShell
      active="faqs"
      adminKey={access.adminKey}
      title="FAQ管理"
      description="FAQ 已迁移到 data/faqs.json。后台可新增、编辑、排序和归档，保存前会做基础风险词扫描。"
      actions={
        <Link href={getAdminHref("/admin/faqs/new", access.adminKey)} className="rounded-2xl bg-[#0b1d35] px-5 py-3 text-sm font-semibold text-white">
          新增 FAQ
        </Link>
      }
    >
      {params.error ? <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{params.error}</div> : null}

      <form className="flex flex-col gap-3 rounded-3xl border border-[#e4ded2] bg-white p-4 md:flex-row md:items-center" method="get">
        <input type="hidden" name="key" value={access.adminKey ?? ""} />
        <select className="min-w-0 rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm outline-none focus:border-[#d1a35d] md:w-72" name="category" defaultValue={params.category ?? ""}>
          <option value="">全部分类</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select className="min-w-0 rounded-2xl border border-[#e4ded2] px-4 py-3 text-sm outline-none focus:border-[#d1a35d] md:w-48" name="status" defaultValue={params.status ?? ""}>
          <option value="">全部状态</option>
          <option value="published">published</option>
          <option value="draft">draft</option>
          <option value="archived">archived</option>
        </select>
        <button className="rounded-2xl bg-[#0b1d35] px-5 py-3 text-sm font-semibold text-white" type="submit">
          筛选
        </button>
        <p className="text-sm text-[#667085]">当前显示 {filteredFaqs.length} 条 FAQ</p>
      </form>

      <div className="mt-6 overflow-x-auto rounded-3xl border border-[#e4ded2] bg-white">
        <table className="min-w-[980px] w-full text-left text-sm">
          <thead className="bg-[#f7f2e9] text-[#657184]">
            <tr>
              <th className="px-4 py-3 font-semibold">问题</th>
              <th className="px-4 py-3 font-semibold">分类</th>
              <th className="px-4 py-3 font-semibold">状态</th>
              <th className="px-4 py-3 font-semibold">首页推荐</th>
              <th className="px-4 py-3 font-semibold">来源页面</th>
              <th className="px-4 py-3 font-semibold">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eee6d8]">
            {filteredFaqs.map((faq) => (
              <tr key={faq.id} className="align-top text-[#344054]">
                <td className="px-4 py-4">
                  <p className="font-medium text-[#0b1d35]">{faq.question}</p>
                  <p className="mt-2 line-clamp-2 text-[#667085]">{faq.answer}</p>
                </td>
                <td className="px-4 py-4">{faq.category}</td>
                <td className="px-4 py-4">{faq.status}</td>
                <td className="px-4 py-4">{faq.featured ? "是" : "否"}</td>
                <td className="px-4 py-4">
                  <Link href={faq.sourcePage} className="font-semibold text-[#b78b49]">
                    {faq.sourcePage}
                  </Link>
                </td>
                <td className="px-4 py-4">
                  <Link href={getAdminHref(`/admin/faqs/edit/${faq.id}`, access.adminKey)} className="font-semibold text-[#b78b49]">
                    编辑
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
