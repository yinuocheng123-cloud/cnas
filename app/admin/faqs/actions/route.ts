/*
 * 文件说明：该文件实现 CMS v1.2 FAQ 新增接口。
 * 功能说明：校验后台权限后，把 FAQ 写入 data/faqs.json。
 *
 * 结构概览：
 *   第一部分：导入依赖
 *   第二部分：新增 FAQ 处理
 */

// ========== 第一部分：导入依赖 ==========
import { NextRequest, NextResponse } from "next/server";
import { getAdminRedirectUrl, hasRequestAdminAccess } from "@/lib/admin-auth";
import { parseCmsFaqForm, saveCmsFaq } from "@/lib/cms-content";

// ========== 第二部分：新增 FAQ 处理 ==========
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const key = String(formData.get("key") ?? "");

  if (!hasRequestAdminAccess(request, key)) {
    return NextResponse.redirect(getAdminRedirectUrl(request, "/admin/login"), 303);
  }

  const faq = parseCmsFaqForm(formData);
  const result = await saveCmsFaq(faq);
  const keyQuery = key ? `&key=${encodeURIComponent(key)}` : "";

  if (!result.ok) {
    return NextResponse.redirect(getAdminRedirectUrl(request, `/admin/faqs/new?error=${encodeURIComponent(result.message ?? "保存失败")}${keyQuery}`), 303);
  }

  return NextResponse.redirect(getAdminRedirectUrl(request, `/admin/faqs/edit/${faq.id}?saved=1${keyQuery}`), 303);
}
