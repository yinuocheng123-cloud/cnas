/*
 * 文件说明：该文件实现 CMS v1.2 FAQ 更新接口。
 * 功能说明：校验后台权限后，更新 data/faqs.json 中的指定 FAQ。
 *
 * 结构概览：
 *   第一部分：导入依赖
 *   第二部分：更新 FAQ 处理
 */

// ========== 第一部分：导入依赖 ==========
import { NextRequest, NextResponse } from "next/server";
import { getAdminRedirectUrl, hasRequestAdminAccess } from "@/lib/admin-auth";
import { getCmsFaqsSync, parseCmsFaqForm, saveCmsFaq } from "@/lib/cms-content";

// ========== 第二部分：更新 FAQ 处理 ==========
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
  const current = getCmsFaqsSync().find((faq) => faq.id === id);
  const keyQuery = key ? `&key=${encodeURIComponent(key)}` : "";

  if (!current) {
    return NextResponse.redirect(getAdminRedirectUrl(request, `/admin/faqs?error=${encodeURIComponent("未找到 FAQ")}${keyQuery}`), 303);
  }

  const faq = parseCmsFaqForm(formData, current);
  const result = await saveCmsFaq(faq);

  if (!result.ok) {
    return NextResponse.redirect(getAdminRedirectUrl(request, `/admin/faqs/edit/${id}?error=${encodeURIComponent(result.message ?? "保存失败")}${keyQuery}`), 303);
  }

  return NextResponse.redirect(getAdminRedirectUrl(request, `/admin/faqs/edit/${faq.id}?saved=1${keyQuery}`), 303);
}
