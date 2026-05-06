import type { Metadata } from "next";
import Script from "next/script";
import { defaultPageTitle, siteName, siteUrl } from "@/lib/seo";
import "./globals.css";

/*
 * 文件说明：该文件定义杭育 CNAS 内容站的全局 HTML 外壳。
 * 功能说明：负责站点元信息与全局样式接入。
 *
 * 结构概览：
 *   第一部分：站点元信息
 *   第二部分：根布局组件
 */

// ========== 第一部分：站点元信息 ==========
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: defaultPageTitle,
  description: "围绕CNAS认可、实验室建设、体系运行、评审风险与持续改进，提供系统化知识、判断工具与解决方案参考。",
  openGraph: {
    title: siteName,
    description: "围绕CNAS认可、实验室建设、体系运行、评审风险与持续改进，提供系统化知识、判断工具与解决方案参考。",
    url: siteUrl,
    siteName,
    locale: "zh_CN",
    type: "website",
  },
};

// ========== 第二部分：根布局组件 ==========
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim();

  return (
    <html lang="zh-CN">
      <body>
        {children}
        {gaId ? <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" /> : null}
        {gaId ? (
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        ) : null}
        <Script id="analytics-helper" strategy="afterInteractive">
          {`
            window.trackAnalyticsEvent = function(eventName, params) {
              if (typeof window.gtag === 'function') {
                window.gtag('event', eventName, params || {});
              } else {
                console.info('[analytics]', eventName, params || {});
              }
            };

            document.addEventListener('click', function(event) {
              var target = event.target instanceof Element ? event.target.closest('[data-track-event]') : null;
              if (!target) return;

              var eventName = target.getAttribute('data-track-event');
              if (!eventName) return;

              var location = target.getAttribute('data-track-location');
              window.trackAnalyticsEvent(eventName, location ? { location: location } : {});
            });
          `}
        </Script>
      </body>
    </html>
  );
}
