# 版本记录：cms-admin-navigation-browser-fix

## 1. 本轮目标

本轮目标是修复 CNAS 内容控制台在真实浏览器中“登录后进入后台首页，但点击后台菜单或草稿操作又跳回登录页”的问题。

本轮属于 Bug 修复，不开发新后台能力，不修改前台页面，不修改数据库，不修改正式文章数据，只处理后台导航和会话持续识别相关问题。

## 2. 背景与上下文

本轮承接以下历史记录：

- `custom/notes/cms-article-draft-v1.md`
- `custom/notes/cms-login-redirect-fix.md`
- `custom/notes/cms-session-cookie-domain-fix.md`

前两轮已经修复了登录后跳转到 `localhost:3100`、以及 `www.cnaszhinan.com` 与 `cnaszhinan.com` 之间 cookie 域名不共享的问题。命令行 curl 验证显示后台页面和草稿操作可访问，但用户在真实浏览器中仍然遇到点击后台菜单后跳回登录页的问题。

因此本轮不再只依赖 curl，而是使用 Playwright 真实浏览器自动化复现完整流程。

## 3. 问题分析

Playwright 打开 `https://www.cnaszhinan.com/admin/login` 后执行登录，服务端正确返回 `303` 到 `/admin`。但进入 `/admin` 后，浏览器网络记录立即出现：

- 请求：`/admin/logout?_rsc=...`
- 状态：`307`
- 跳转目标：`/admin/login`

这说明后台首页渲染后，Next.js 对导航中的 `Link href="/admin/logout"` 做了 RSC 预取。由于 `/admin/logout` 当前是 GET 路由，并且访问该路由会清除 `cnas_admin_session` cookie，导致浏览器刚进入后台就被预取请求退出登录。

这也是 curl 验证不容易发现的问题：curl 不会像真实浏览器一样执行 Next.js 链接预取。

## 4. 候选方案比较

### 方案一：把退出登录改成 POST 表单

优点：语义更正确，避免 GET 请求产生副作用。

缺点：需要改动退出登录组件和路由方法，影响面比本轮所需更大。

结论：暂不采用。

### 方案二：保留 Next Link，但关闭 prefetch

优点：改动小。

缺点：退出登录仍然是带副作用的 GET 路由，后续若其它机制触发预取或扫描，仍有风险。

结论：不是最稳的最小修复。

### 方案三：退出登录使用普通 `<a>` 链接

优点：改动极小；普通锚点不会触发 Next.js RSC 预取；点击时仍能正常退出登录。

缺点：退出登录仍然是 GET 路由，长期看不如 POST 严谨。

结论：本轮采用。它能最小范围修复真实浏览器中的误退出问题，同时不重构后台。

## 5. 最终决策

在 `components/admin/AdminShell.tsx` 中仅针对 `logout` 导航项使用普通 `<a href="/admin/logout">`，其它后台导航仍保持 Next `Link`。

这样可以阻止 Next.js 对退出路由做 RSC 预取，避免用户登录后 cookie 被自动清除。

## 6. 具体实现

涉及文件：

- `components/admin/AdminShell.tsx`
  - 抽出导航按钮公共 `className`。
  - 当导航项为 `logout` 时渲染普通 `<a>`。
  - 其它导航项继续使用 `Link`。

## 7. 本轮优点

- 修复了真实浏览器才能稳定复现的后台自动退出问题。
- 不改前台页面。
- 不改正式文章数据。
- 不改草稿数据结构。
- 不改数据库和 webhook。
- 不影响 `/admin/leads` 的现有逻辑。

## 8. 本轮缺点与代价

当前退出登录仍然是 GET 路由，虽然普通 `<a>` 已经避免 Next.js 预取误触发，但从长期设计看，退出登录更适合改成 POST 表单。

本轮为了保持最小修复，没有重构 logout 路由。后续如果继续增强后台安全性，可以单独把退出登录调整为 POST。

## 9. 验证与结果

本轮计划验证：

- Playwright 真实浏览器流程：登录、进入文章管理、新建草稿、保存、查看、预览。
- `npm run build`
- `npm run typecheck`
- `git diff --check`
- 部署后再次运行 Playwright 流程确认线上可用。

最终验证结果以本轮完成后的命令输出和线上复测为准。

## 10. 本轮结论

本轮确认真实问题不是账号密码、不是 `ADMIN_KEY` 兼容逻辑、不是草稿保存 action 单独失效，而是后台导航中的退出登录 `Link` 被 Next.js 自动预取，触发了带副作用的 GET logout。

后续遇到“curl 正常、浏览器点击异常”的后台问题，应优先检查前端框架预取、客户端导航和 cookie 是否在浏览器环境中被额外请求改变。

## 11. 下一轮建议

1. 如果继续增强后台安全性，建议把 `/admin/logout` 从 GET 改为 POST。
2. 后续可增加后台端到端测试脚本，固定验证登录、导航、草稿保存、查看、预览和退出流程。
3. 若 CMS 要继续扩展编辑能力，应先补草稿备份和发布前审核流程。
