/*
 * 文件说明：该文件实现 CNAS 内容控制台的轻量登录会话。
 * 功能说明：使用 ADMIN_USERNAME、ADMIN_PASSWORD 校验登录，并用 httpOnly cookie 保存服务端签名会话；同时保留 ADMIN_KEY 兼容访问。
 *
 * 结构概览：
 *   第一部分：导入依赖
 *   第二部分：账号与签名工具
 *   第三部分：cookie 会话工具
 *   第四部分：页面与接口访问保护
 */

// ========== 第一部分：导入依赖 ==========
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest, NextResponse } from "next/server";

// ========== 第二部分：账号与签名工具 ==========
export const adminSessionCookieName = "cnas_admin_session";

const sessionMaxAge = 60 * 60 * 8;

function getSessionSecret() {
  return process.env.ADMIN_KEY?.trim() || process.env.ADMIN_PASSWORD?.trim() || "cnas-admin-session-fallback";
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function signPayload(payload: string) {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("base64url");
}

function getAdminCookieDomain() {
  const siteUrl = process.env.SITE_URL?.trim();

  if (!siteUrl) {
    return undefined;
  }

  try {
    const hostname = new URL(siteUrl).hostname;

    if (hostname === "cnaszhinan.com" || hostname.endsWith(".cnaszhinan.com")) {
      return ".cnaszhinan.com";
    }
  } catch {
    return undefined;
  }

  return undefined;
}

export function verifyAdminCredentials(username: string, password: string) {
  const configuredUsername = process.env.ADMIN_USERNAME?.trim();
  const configuredPassword = process.env.ADMIN_PASSWORD?.trim();

  if (!configuredUsername || !configuredPassword) {
    return false;
  }

  return safeEqual(username, configuredUsername) && safeEqual(password, configuredPassword);
}

export function isValidAdminKey(key: string | undefined) {
  const adminKey = process.env.ADMIN_KEY?.trim();

  return Boolean(adminKey && key === adminKey);
}

// ========== 第三部分：cookie 会话工具 ==========
export function createAdminSessionValue(username: string) {
  const payload = JSON.stringify({
    username,
    issuedAt: Date.now(),
  });
  const encodedPayload = Buffer.from(payload).toString("base64url");
  const signature = signPayload(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function verifyAdminSessionValue(value: string | undefined) {
  if (!value) {
    return false;
  }

  const [encodedPayload, signature] = value.split(".");

  if (!encodedPayload || !signature || signPayload(encodedPayload) !== signature) {
    return false;
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as {
      username?: string;
      issuedAt?: number;
    };

    if (!payload.username || typeof payload.issuedAt !== "number") {
      return false;
    }

    return Date.now() - payload.issuedAt <= sessionMaxAge * 1000;
  } catch {
    return false;
  }
}

export async function hasAdminSession() {
  const cookieStore = await cookies();

  return verifyAdminSessionValue(cookieStore.get(adminSessionCookieName)?.value);
}

export function setAdminSessionCookie(response: NextResponse, username: string) {
  response.cookies.set(adminSessionCookieName, createAdminSessionValue(username), {
    domain: getAdminCookieDomain(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionMaxAge,
  });
}

export function clearAdminSessionCookie(response: NextResponse) {
  response.cookies.set(adminSessionCookieName, "", {
    domain: getAdminCookieDomain(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

// ========== 第四部分：页面与接口访问保护 ==========
export async function ensureAdminAccess(key: string | undefined) {
  if (isValidAdminKey(key)) {
    return { mode: "key" as const, adminKey: key };
  }

  if (await hasAdminSession()) {
    return { mode: "session" as const, adminKey: undefined };
  }

  redirect("/admin/login");
}

export function hasRequestAdminAccess(request: NextRequest, key: string | undefined) {
  if (isValidAdminKey(key)) {
    return true;
  }

  return verifyAdminSessionValue(request.cookies.get(adminSessionCookieName)?.value);
}

export function getAdminRedirectUrl(request: NextRequest, path: string) {
  const forwardedHost = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const forwardedProto = request.headers.get("x-forwarded-proto") ?? "https";
  const isInternalHost = !forwardedHost || forwardedHost.startsWith("localhost") || forwardedHost.startsWith("127.0.0.1");
  const baseUrl = isInternalHost ? (process.env.SITE_URL ?? request.url) : `${forwardedProto}://${forwardedHost}`;

  return new URL(path, baseUrl);
}
