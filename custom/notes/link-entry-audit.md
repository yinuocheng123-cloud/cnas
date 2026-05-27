# 版本记录：link-entry-audit

## 1. 本轮目标

本轮目标是对 `www.cnaszhinan.com` 主站做一次全站入口链接审计，重点确认首页、手机端首页、内容页、文章页中的按钮、卡片和文字入口都指向真实可访问页面或真实锚点。

本轮属于上线后 Bug 修复与可维护性提升，不新增业务功能，不改后台、API、webhook、数据库，也不调整首页视觉结构。

## 2. 背景与上下文

本轮承接 `custom/notes/content-pages-platform-foundation.md` 和 `custom/notes/first-20-geo-content-batch.md`。前者已经补齐 `/path`、`/prepare`、`/review`、`/maintenance`、`/faq`、`/articles` 等平台基础内容页，后者已经补齐第一批 20 篇 GEO 文章，并接入 `/articles` 和详情页。

当前主站已经从纯首页展示扩展为平台入口加内容纵深，入口链接如果仍停留在空按钮、空锚点或没有真实页面的状态，会影响上线后的可信度和用户继续浏览路径。

## 3. 问题分析

本轮审计重点检查了三类入口：

1. 页面级入口：`/path`、`/prepare`、`/review`、`/maintenance`、`/faq`、`/articles`、`/diagnosis`、`/solutions`、`/cases`、`/services` 等是否有真实页面承接。
2. 锚点入口：`#self-check`、`#solution-content`、`#footer-wecom`、案例锚点、服务锚点、流程锚点是否有对应页面内 `id`。
3. 空入口风险：是否存在 `href="#"`、空 `href`、`javascript:void` 这类上线后无法形成真实跳转的入口。

审计发现主站多数入口已经接入真实页面或真实锚点，但移动端 footer 中仍存在 `href="#"` 的“返回顶部”入口。该入口不是内容页，也没有明确目标锚点，容易被视为空按钮。

## 4. 候选方案比较

方案一：保留“返回顶部”，并在页面顶端新增统一 `id="top"`。

优点是保留原交互语义。缺点是需要扩散修改多个页面或布局入口，而且本轮目标是入口链接审计，不适合为了一个弱入口增加全站锚点约定。

方案二：把“返回顶部”改为真实首页入口。

优点是改动最小，入口目标明确，且 footer 中“关于我们 / 常见问题 / 返回首页”的组合更像平台底部导航。缺点是失去了页内回顶语义，但该入口不是核心转化动作，代价较低。

最终选择方案二。

## 5. 最终决策

将移动端 footer 中的 `href="#"` 改为 `href="/"`，文案从“返回顶部”调整为“返回首页”。

其它入口保留现有实现，因为已经能对应真实页面或真实锚点：

- 诊断页 Hero 的 `#self-check` 对应 `LeadCaptureForm` 中的 `id="self-check"`。
- 方案详情页的 `#solution-content` 对应详情正文区。
- 首页手机端企业微信入口 `#footer-wecom` 对应 Footer 企业微信承接区。
- 案例入口 `/cases#slug` 对应 `CaseCard` 根节点 `id={caseItem.slug}`。
- 服务导航 `/services#slug` 对应 `ServiceCard` 根节点 `id={service.slug}`。
- 文章列表和文章详情页均使用真实 `/articles` 与 `/articles/[slug]` 路径。

## 6. 具体实现

涉及文件：

- `components/Footer.tsx`：将移动端底部空锚点改为真实首页入口。
- `custom/notes/link-entry-audit.md`：新增本轮链接审计记录。

未修改后台、API、webhook、数据库、环境变量、Nginx 或 PM2 配置。

## 7. 本轮优点

本轮改动非常小，避免了重新组织首页或内容页结构，同时消除了空入口风险。

改动后，移动端 footer 的底部链接都指向真实页面：

- 关于我们：`/about`
- 常见问题：`/faqs`
- 返回首页：`/`

这能降低上线后用户点击无效入口的概率，也更符合“行业服务平台”的底部导航语义。

## 8. 本轮缺点与代价

本轮没有新增自动化全站链接爬虫，只做了代码级入口扫描、静态路由核对和构建验证。因此，运行时由 JavaScript 动态生成的极少数链接仍需要后续结合浏览器自动化或线上巡检进一步覆盖。

另外，“返回顶部”被改为“返回首页”后，移动端 footer 不再提供页内回顶动作。如果后续确认用户确实需要回顶，可以建立统一 `#top` 约定后再补回。

## 9. 验证与结果

本轮已执行：

- `npm run build`
- `npm run typecheck`
- `git diff --check`
- 空入口扫描：检查 `href="#"`、空 `href`、`javascript:void`。
- 锚点抽查：确认 `#self-check`、`#solution-content`、`#footer-wecom`、案例锚点、服务锚点均存在对应 `id`。
- 构建路由检查：`next build` 生成 112 个静态页面，包含 `/path`、`/prepare`、`/review`、`/maintenance`、`/faq`、`/articles`、20 篇 GEO 文章详情页和既有知识库/方案页面。

验证结果：

- `npm run build` 通过。由于本地未配置 `SITE_URL`，构建输出保留既有 `SITE_URL is not configured` 警告，线上环境仍由服务器 `.env.production` 控制。
- `npm run typecheck` 通过。
- `git diff --check` 通过，仅提示 `components/Footer.tsx` 在当前 Windows 工作区后续可能由 Git 转换为 CRLF，不属于代码错误。
- 空入口扫描未发现 `href="#"`、空 `href`、`javascript:void` 或 `void(0)`。

## 10. 本轮结论

主站当前内容入口总体已经接入真实页面和真实锚点，本轮主要修正了一个移动端 footer 空锚点。

后续如果继续新增首页卡片或内容入口，应默认遵守：没有真实承接页时，不放空按钮；确需保留入口时，先指向已有平台页或隐藏。

## 11. 下一轮建议

1. 后续可增加轻量链接巡检脚本，定期抽查内部链接是否 200。
2. 继续补充第二批 GEO 内容时，同步维护 `/articles` 列表和 sitemap。
3. 若用户希望保留“返回顶部”，建议统一建立全站 `#top` 锚点，而不是散落使用 `href="#"`。
