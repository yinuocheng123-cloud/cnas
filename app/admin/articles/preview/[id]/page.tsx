/*
 * 文件说明：该文件实现 CMS v1.2 正式文章预览页面。
 * 功能说明：从 data/articles.json 读取文章，以接近前台的结构预览内容，不要求文章必须 published。
 *
 * 结构概览：
 *   第一部分：导入依赖
 *   第二部分：文章预览页面
 */

// ========== 第一部分：导入依赖 ==========
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ensureAdminAccess, getAdminHref } from "@/lib/admin";
import { getCmsArticleById } from "@/lib/cms-content";

// ========== 第二部分：文章预览页面 ==========
export default async function AdminArticlePreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ key?: string }>;
}) {
  noStore();

  const [{ id }, { key }] = await Promise.all([params, searchParams]);
  const access = await ensureAdminAccess(key);
  const article = getCmsArticleById(id);

  if (!article) {
    notFound();
  }

  return (
    <AdminShell active="articles" adminKey={access.adminKey} title="文章预览" description="预览只读取 JSON 内容，不改变前台发布状态。">
      <article className="rounded-3xl border border-[#e4ded2] bg-white p-6 shadow-sm">
        <div className="border-b border-[#eee6d8] pb-5">
          <p className="text-sm font-semibold text-[#b78b49]">{article.category} / {article.status}</p>
          <h3 className="mt-3 text-3xl font-semibold text-[#0b1d35]">{article.title}</h3>
          <p className="mt-3 text-sm leading-7 text-[#667085]">{article.description}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href={getAdminHref(`/admin/articles/edit/${article.id}`, access.adminKey)} className="rounded-2xl bg-[#0b1d35] px-5 py-3 text-sm font-semibold text-white">
              返回编辑
            </Link>
            <Link href={getAdminHref("/admin/articles", access.adminKey)} className="rounded-2xl border border-[#e4ded2] px-5 py-3 text-sm font-semibold text-[#344054]">
              返回列表
            </Link>
          </div>
        </div>

        <div className="mt-6 space-y-7">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h4 className="text-xl font-semibold text-[#0b1d35]">{section.heading}</h4>
              <div className="mt-3 space-y-3">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-7 text-[#667085]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </AdminShell>
  );
}
