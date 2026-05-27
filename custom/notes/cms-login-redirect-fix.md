# 版本记录：cms-login-redirect-fix

## 1. 本轮目标

排查并修复 `https://www.cnaszhinan.com/admin/login` 后台登录失败问题。

本轮属于 Bug 修复，不重构后台，不改数据库，不改文章数据。

## 2. 背景与上下文

CMS v1.1 已上线到服务器，新增了账号密码登录和文章草稿系统。用户反馈后台登录失败，因此本轮只围绕登录链路排查。

## 3. 问题分析

服务器检查结果：

- `.env.production` 存在；
- `ADMIN_USERNAME` 存在且值正确；
- `ADMIN_PASSWORD` 存在且值正确；
- PM2 进程在线；
- 登录接口能成功写入 `cnas_admin_session` cookie；
- cookie 带有 `Secure`、`HttpOnly`、`SameSite=Lax`、`Path=/`；
- 未登录访问 `/admin` 会跳转登录。

真正问题是登录成功后的 `Location` 响应头被生成成 `https://localhost:3100/admin`。浏览器收到后会跳到用户本机的 localhost，而不是公网域名，因此表现为登录失败。

同时，登录表单 POST 使用默认 `307` 跳转，不适合表单登录成功后的页面跳转。更合适的是 `303 See Other`，让浏览器用 GET 打开后台页。

## 4. 候选方案比较

### 方案一：修改 Nginx 代理头

优点：能让服务端拿到更准确的公网 host。

缺点：涉及 Nginx 配置，影响范围比代码跳转修复更大；本轮用户要求不重构、不扩大范围。

结论：不采用。

### 方案二：后台 action 使用公网请求头或 SITE_URL 生成跳转

优点：改动小，只影响后台登录、退出和草稿保存后的跳转；不改 Nginx、不改数据。

缺点：依赖 `x-forwarded-host` 或 `host` 请求头，若代理头异常则回退到 `SITE_URL`。

结论：采用。

## 5. 最终决策

新增后台跳转 URL 生成 helper：

- 优先使用 `x-forwarded-host` / `host`；
- 如果拿到的是 `localhost` 或 `127.0.0.1`，再回退到 `SITE_URL`；
- 登录和草稿 POST 成功后使用 `303` 跳转。

## 6. 具体实现

涉及文件：

- `lib/admin-auth.ts`
  - 新增 `getAdminRedirectUrl`；
  - 用公网 host 或 `SITE_URL` 生成后台跳转 URL。

- `app/admin/login/actions/route.ts`
  - 登录成功和失败跳转改为 `303`；
  - 跳转 URL 改为公网 URL。

- `app/admin/logout/route.ts`
  - 退出登录跳转改为使用公网 URL。

- `app/admin/articles/draft-actions/route.ts`
  - 草稿创建后的跳转改为公网 URL 和 `303`。

- `app/admin/articles/draft-actions/[draftId]/route.ts`
  - 草稿更新后的跳转改为公网 URL 和 `303`。

## 7. 本轮优点

- 修复登录后跳到 `localhost:3100` 的问题；
- 不改 Nginx；
- 不改数据库；
- 不改文章数据；
- 不影响前台页面；
- 顺带修复草稿保存后的 POST 跳转方式。

## 8. 本轮缺点与代价

- 仍依赖代理传递正确 host；若未来多域名后台策略更复杂，可能需要统一站点 URL 配置。
- 未增加登录失败次数限制，本轮仅修复登录失败问题。

## 9. 验证与结果

本轮需验证：

- `npm run build`
- `npm run typecheck`
- 登录 POST 是否返回公网 `Location`
- 是否写入 `cnas_admin_session`
- 登录后是否能进入 `/admin/articles`
- 前台首页是否仍返回 200

最终验证结果以命令输出为准。

## 10. 本轮结论

登录失败的根本原因不是账号密码错误，也不是 cookie 没写入，而是登录成功后的跳转地址错误地指向了 `localhost:3100`。

## 11. 下一轮建议

1. 后续可以考虑统一后台登录审计和失败次数限制。
2. 如果后台要长期使用多域名，建议明确后台主域名策略。
