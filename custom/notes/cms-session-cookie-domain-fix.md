# 版本记录：cms-session-cookie-domain-fix

## 1. 本轮目标

修复后台登录后点击后台子页面或草稿操作时，又被跳回登录页的问题。

本轮属于 Bug 修复，只处理后台 session/cookie 持续识别，不改数据库、不改正式文章数据、不改前台页面、不重构后台。

## 2. 背景与上下文

上一轮 `cms-login-redirect-fix` 已修复登录成功后跳转到 `localhost:3100` 的问题。修复后后台可以登录进入 `/admin`，但用户反馈点击 `/admin/articles`、新建草稿、保存、预览等操作时仍会回到登录页。

本轮继续沿用 CMS v1.1 的设计：

- 登录 cookie 名称为 `cnas_admin_session`；
- 使用 httpOnly cookie；
- 保留 `ADMIN_KEY` 兼容；
- 后台登录后应主要依赖 cookie session；
- 草稿仍只保存到 `data/article-drafts.json`。

## 3. 问题分析

服务器端复测发现：

- 同一个 cookie 下访问 `/admin`、`/admin/articles`、`/admin/faqs`、`/admin/categories`、`/admin/settings`、`/admin/leads`、`/admin/articles/new` 均正常；
- 同一个 cookie 下草稿保存、查看、编辑和预览均正常；
- cookie 设置了 `Path=/`、`Secure`、`HttpOnly`、`SameSite=Lax`，有效期为 8 小时。

进一步分别测试两个域名：

- 从 `https://www.cnaszhinan.com` 登录时，cookie 是 host-only，只属于 `www.cnaszhinan.com`；
- 访问 `https://cnaszhinan.com/admin/articles` 时不会带这个 cookie，因此返回 307；
- 从 `https://cnaszhinan.com` 登录时，cookie 只属于裸域名；
- 再访问 `https://www.cnaszhinan.com/admin/articles` 时也不会带 cookie。

根本原因是后台 session cookie 没有设置站点级 Domain，导致 `cnaszhinan.com` 和 `www.cnaszhinan.com` 之间不能共享登录态。用户浏览器只要在两个域名之间切换，就会表现为“点后台页面又跳回登录”。

## 4. 候选方案比较

### 方案一：强制后台只使用 www 域名

优点：cookie 不需要跨域共享。

缺点：需要改 Nginx 或所有后台跳转入口，且用户仍可能手动输入裸域名。

结论：不采用。

### 方案二：给后台 session cookie 设置站点级 Domain

优点：

- 改动小；
- 不改 Nginx；
- 不改业务数据；
- 同时支持 `cnaszhinan.com` 和 `www.cnaszhinan.com`；
- 符合当前主站双域名可访问状态。

缺点：

- 依赖 `SITE_URL` 能识别当前站点域名；
- 若未来迁移到其它域名，需要同步检查 cookie domain 逻辑。

结论：采用。

## 5. 最终决策

在 `lib/admin-auth.ts` 中新增 cookie domain 判断：

- 如果 `SITE_URL` 的 hostname 是 `cnaszhinan.com` 或其子域名，则后台 session cookie 设置 `Domain=.cnaszhinan.com`；
- 本地开发或其它域名不设置 Domain；
- 登录和退出登录使用同一 domain，确保清除 cookie 时一致。

## 6. 具体实现

涉及文件：

- `lib/admin-auth.ts`
  - 新增 `getAdminCookieDomain`；
  - `setAdminSessionCookie` 增加 `domain`；
  - `clearAdminSessionCookie` 增加相同 `domain`。

## 7. 本轮优点

- 修复 www 与裸域名切换导致的后台登录态丢失；
- 不改后台路由结构；
- 不改 Nginx；
- 不改前台页面；
- 不影响正式文章和草稿数据。

## 8. 本轮缺点与代价

- 当前 domain 判断写死支持 `cnaszhinan.com` 这一站点族；
- 如果后续新增其它后台域名，需要扩展配置项，例如 `ADMIN_COOKIE_DOMAIN`；
- 没有增加登录失败限流或审计，本轮只修复持续登录。

## 9. 验证与结果

本轮需验证：

- `npm run build`
- `npm run typecheck`
- `git diff --check`
- 从 `www.cnaszhinan.com` 登录后访问裸域名后台子页也不跳登录；
- 从 `cnaszhinan.com` 登录后访问 www 后台子页也不跳登录；
- 后台文章、FAQ、栏目、设置、线索、新建草稿、保存、查看、预览均可用；
- 退出登录后访问 `/admin` 会回到登录页；
- 前台首页不受影响。

最终结果以部署后的验证输出为准。

## 10. 本轮结论

本次问题的根因是 cookie 域名范围过窄，不是后台页面仍只认 `ADMIN_KEY`，也不是草稿 action 单独鉴权失败。

## 11. 下一轮建议

如果后续继续增强后台安全，可以新增 `ADMIN_COOKIE_DOMAIN` 环境变量，让 cookie domain 不再写死在代码判断中。
