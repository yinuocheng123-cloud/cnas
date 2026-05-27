/*
 * 文件说明：该文件实现文章草稿创建接口。
 * 功能说明：校验后台访问权限后，把表单内容保存为 data/article-drafts.json 中的新草稿。
 *
 * 结构概览：
 *   第一部分：导入依赖
 *   第二部分：创建草稿处理
 */

// ========== 第一部分：导入依赖 ==========
import { NextRequest, NextResponse } from "next/server";
import { getAdminRedirectUrl, hasRequestAdminAccess } from "@/lib/admin-auth";
import { createArticleDraft, parseArticleDraftForm } from "@/lib/article-drafts";

// ========== 第二部分：创建草稿处理 ==========
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const key = String(formData.get("key") ?? "");

  if (!hasRequestAdminAccess(request, key)) {
    return NextResponse.redirect(getAdminRedirectUrl(request, "/admin/login"), 303);
  }

  const draft = await createArticleDraft(parseArticleDraftForm(formData));
  const keyQuery = key ? `?key=${encodeURIComponent(key)}` : "";

  return NextResponse.redirect(getAdminRedirectUrl(request, `/admin/articles/drafts/${draft.id}${keyQuery}`), 303);
}
