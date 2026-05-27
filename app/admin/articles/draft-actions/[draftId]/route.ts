/*
 * 文件说明：该文件实现文章草稿更新接口。
 * 功能说明：校验后台访问权限后，更新指定草稿，不影响正式文章数据。
 *
 * 结构概览：
 *   第一部分：导入依赖
 *   第二部分：更新草稿处理
 */

// ========== 第一部分：导入依赖 ==========
import { NextRequest, NextResponse } from "next/server";
import { hasRequestAdminAccess } from "@/lib/admin-auth";
import { parseArticleDraftForm, updateArticleDraft } from "@/lib/article-drafts";

// ========== 第二部分：更新草稿处理 ==========
export async function POST(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ draftId: string }>;
  },
) {
  const formData = await request.formData();
  const key = String(formData.get("key") ?? "");

  if (!hasRequestAdminAccess(request, key)) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const { draftId } = await params;
  const draft = await updateArticleDraft(draftId, parseArticleDraftForm(formData));
  const keyQuery = key ? `?key=${encodeURIComponent(key)}` : "";

  if (!draft) {
    return NextResponse.redirect(new URL(`/admin/articles${keyQuery}`, request.url));
  }

  return NextResponse.redirect(new URL(`/admin/articles/drafts/${draft.id}${keyQuery}`, request.url));
}
