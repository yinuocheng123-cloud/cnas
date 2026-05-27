/*
 * 文件说明：该文件实现 CMS v1.2 栏目更新接口。
 * 功能说明：校验后台权限后，更新 data/categories.json 中已有栏目，不新增栏目路径。
 *
 * 结构概览：
 *   第一部分：导入依赖
 *   第二部分：更新栏目处理
 */

// ========== 第一部分：导入依赖 ==========
import { NextRequest, NextResponse } from "next/server";
import { getAdminRedirectUrl, hasRequestAdminAccess } from "@/lib/admin-auth";
import { getCmsCategoriesSync, parseCmsCategoryForm, saveCmsCategory } from "@/lib/cms-content";

// ========== 第二部分：更新栏目处理 ==========
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
  const current = getCmsCategoriesSync().find((category) => category.id === id);
  const keyQuery = key ? `&key=${encodeURIComponent(key)}` : "";

  if (!current) {
    return NextResponse.redirect(getAdminRedirectUrl(request, `/admin/categories?error=${encodeURIComponent("未找到栏目")}${keyQuery}`), 303);
  }

  const category = parseCmsCategoryForm(formData, current);
  const result = await saveCmsCategory(category);

  if (!result.ok) {
    return NextResponse.redirect(getAdminRedirectUrl(request, `/admin/categories/edit/${id}?error=${encodeURIComponent(result.message ?? "保存失败")}${keyQuery}`), 303);
  }

  return NextResponse.redirect(getAdminRedirectUrl(request, `/admin/categories/edit/${category.id}?saved=1${keyQuery}`), 303);
}
