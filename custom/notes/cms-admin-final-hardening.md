# 版本记录：cms-admin-final-hardening

## 1. 本轮目标

本轮目标是继续收尾处理 CNAS CMS 后台，让现有后台更适合长期稳定使用。

本轮属于 Bug 风险收口与文档补齐，不新增复杂功能，不修改前台，不修改正式文章数据，不接数据库，不改草稿系统的数据结构。

具体目标：

- 把 `/admin/logout` 从 GET 退出改为 POST 退出；
- 后台导航中的“退出登录”改成 `form + button`；
- 补齐后台使用说明；
- 补齐服务器部署说明；
- 继续保持文章草稿功能不变。

## 2. 背景与上下文

本轮承接：

- `custom/notes/cms-admin-navigation-browser-fix.md`
- `custom/notes/cms-session-cookie-domain-fix.md`
- `custom/notes/cms-login-redirect-fix.md`
- `custom/notes/cms-article-draft-v1.md`

上一轮通过 Playwright 确认后台异常跳登录的原因是 Next `Link` 对 `/admin/logout` 进行 RSC 预取，误触发 GET 退出。上一轮已先把退出入口改成普通 `<a>`，避免预取。

但退出登录本质上是清除 cookie 的有副作用操作，长期保留 GET 路由仍有理论风险，因此本轮进一步收口为 POST 退出。

## 3. 问题分析

GET 退出存在两个长期风险：

- 浏览器、框架或工具可能预取 GET 链接；
- 爬虫、监控或误点 GET 地址可能触发退出。

虽然普通 `<a>` 已经避免 Next `Link` 预取，但最稳定的设计仍是让退出登录只通过 POST 表单触发。

## 4. 候选方案比较

### 方案一：保留 GET，依赖普通 `<a>`

优点：上一轮已可用，改动最小。

缺点：GET 仍然有副作用，未来仍可能被其它预取或探测误触发。

结论：不再保留。

### 方案二：改成 POST 表单退出

优点：

- 退出动作不再暴露为普通可预取 GET 链接；
- 符合有副作用操作用 POST 的基本约束；
- 不影响其它后台导航；
- 改动范围小。

缺点：

- 后台导航渲染略微复杂，需要在 `AdminShell` 中对 logout 特殊处理。

结论：采用。

## 5. 最终决策

`/admin/logout` 只保留 `POST` handler。

后台导航中 `logout` 项渲染为：

- `<form action="/admin/logout" method="post">`
- 表单内使用 button 提交。

退出成功后继续清除 `cnas_admin_session` cookie，并使用 `303` 跳转到 `/admin/login`。

## 6. 具体实现

涉及文件：

- `components/admin/AdminShell.tsx`
  - 把退出登录入口改为 POST 表单按钮；
  - 其它后台导航继续使用 `Link`。

- `app/admin/logout/route.ts`
  - 把 `GET` 改为 `POST`；
  - 保持 `clearAdminSessionCookie` 清理逻辑不变；
  - 退出后 `303` 跳转 `/admin/login`。

- `custom/notes/cms-admin-user-guide.md`
  - 新增后台使用说明。

- `DEPLOY.md`
  - 新增服务器标准部署流程。

## 7. 本轮优点

- 消除了 logout 被预取或误触发的理论风险；
- 仍保持后台整体结构不变；
- 保持文章草稿功能不变；
- 增加了运营使用说明；
- 固化了服务器部署命令，避免继续混用 `npm install`。

## 8. 本轮缺点与代价

当前后台仍是轻量 CMS，不具备完整内容发布流。

草稿仍保存在服务器本地 `data/article-drafts.json`，不进入 Git。这个设计简单稳定，但迁移服务器时需要单独备份。

本轮没有增加多账号、多角色、登录失败限流或审计日志，这些都属于后续安全增强范围。

## 9. 验证与结果

本轮需要验证：

- `npm run build`
- `npm run typecheck`
- `git diff --check`
- Playwright 真实浏览器流程：
  - 登录；
  - 进入 `/admin`；
  - 进入文章管理；
  - 新建草稿；
  - 保存草稿；
  - 查看草稿；
  - 预览草稿；
  - 点击 POST 退出登录；
  - 退出后访问 `/admin` 回到 `/admin/login`；
  - 全程不异常跳登录。

最终结果以本轮命令输出和部署后线上复测为准。

## 10. 本轮结论

本轮把 CMS 后台从“可用”进一步推进到“更稳妥可长期使用”：退出动作不再依赖 GET，后台使用说明和部署流程也已补齐。

## 11. 下一轮建议

1. 下一阶段再设计草稿正式发布流程。
2. 为 `data/article-drafts.json` 建立定期备份策略。
3. 后续如后台使用频率提高，再补登录失败限流、操作日志和多账号权限。
