/*
 * 文件说明：该文件实现 CMS v1.2 正式文章更新接口。
 * 功能说明：校验后台权限后，更新 data/articles.json 中的指定文章，并在写入前生成备份。
 *
 * 结构概览：
 *   第一部分：导入依赖
 *   第二部分：更新文章处理
 */

// ========== 第一部分：导入依赖 ==========
import { NextRequest, NextResponse } from "next/server";
import { getAdminRedirectUrl, hasRequestAdminAccess } from "@/lib/admin-auth";
import { getCmsArticleById, parseCmsArticleForm, saveCmsArticle } from "@/lib/cms-content";

// ========== 第二部分：更新文章处理 ==========
export async function POST(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  const formData = await request.formData();
  const key = String(formData.get("key") ?? "");

  if (!hasRequestAdminAccess(request, key)) {
    return NextResponse.redirect(getAdminRedirectUrl(request, "/admin/login"), 303);
  }

  const { id } = await params;
  const current = getCmsArticleById(id);
  const keyQuery = key ? `&key=${encodeURIComponent(key)}` : "";

  if (!current) {
    return NextResponse.redirect(getAdminRedirectUrl(request, `/admin/articles?error=${encodeURIComponent("未找到文章")}${keyQuery}`), 303);
  }

  const article = parseCmsArticleForm(formData, current);
  const result = await saveCmsArticle(article);

  if (!result.ok) {
    return NextResponse.redirect(getAdminRedirectUrl(request, `/admin/articles/edit/${id}?error=${encodeURIComponent(result.message ?? "保存失败")}${keyQuery}`), 303);
  }

  return NextResponse.redirect(getAdminRedirectUrl(request, `/admin/articles/edit/${article.id}?saved=1${keyQuery}`), 303);
}
