/*
 * 文件说明：该文件封装前端埋点调用。
 * 功能说明：统一调用 gtag，并在未接入统计时退回到 console，方便本地联调。
 *
 * 结构概览：
 *   第一部分：全局类型声明
 *   第二部分：事件上报函数
 */

// ========== 第一部分：全局类型声明 ==========
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    trackAnalyticsEvent?: (eventName: string, params?: Record<string, unknown>) => void;
  }
}

// ========== 第二部分：事件上报函数 ==========
export function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") {
    return;
  }

  if (typeof window.trackAnalyticsEvent === "function") {
    window.trackAnalyticsEvent(eventName, params);
    return;
  }

  console.info("[analytics:fallback]", eventName, params);
}
