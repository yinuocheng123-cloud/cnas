/*
 * 文件说明：该文件实现 CNAS 内容控制台退出登录接口。
 * 功能说明：清除后台 httpOnly cookie，并跳转回登录页。
 *
 * 结构概览：
 *   第一部分：导入依赖
 *   第二部分：退出处理
 */

// ========== 第一部分：导入依赖 ==========
import { NextRequest, NextResponse } from "next/server";
import { clearAdminSessionCookie, getAdminRedirectUrl } from "@/lib/admin-auth";

// ========== 第二部分：退出处理 ==========
export function GET(request: NextRequest) {
  const response = NextResponse.redirect(getAdminRedirectUrl(request, "/admin/login"));
  clearAdminSessionCookie(response);

  return response;
}
