/*
 * 文件说明：该文件实现 CNAS 内容控制台登录提交接口。
 * 功能说明：服务端校验 ADMIN_USERNAME、ADMIN_PASSWORD，成功后写入 httpOnly cookie 并跳转后台。
 *
 * 结构概览：
 *   第一部分：导入依赖
 *   第二部分：登录处理
 */

// ========== 第一部分：导入依赖 ==========
import { NextRequest, NextResponse } from "next/server";
import { getAdminRedirectUrl, setAdminSessionCookie, verifyAdminCredentials } from "@/lib/admin-auth";

// ========== 第二部分：登录处理 ==========
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");
  const safeNext = next.startsWith("/admin") && !next.startsWith("/admin/login") ? next : "/admin";

  if (!verifyAdminCredentials(username, password)) {
    return NextResponse.redirect(getAdminRedirectUrl(request, "/admin/login?error=1"), 303);
  }

  const response = NextResponse.redirect(getAdminRedirectUrl(request, safeNext), 303);
  setAdminSessionCookie(response, username);

  return response;
}
