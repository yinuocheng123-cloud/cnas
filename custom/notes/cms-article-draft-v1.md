# 版本记录：cms-article-draft-v1

## 1. 本轮目标

本轮目标是进入 CMS v1.1，在上一版只读 CNAS 内容控制台基础上，新增“文章草稿编辑系统”，并把后台访问方式从单纯 `ADMIN_KEY` query 访问升级为账号密码登录。

本轮属于功能补充与安全体验升级：

- 新增 `/admin/login` 登录页；
- 使用 `ADMIN_USERNAME`、`ADMIN_PASSWORD` 环境变量校验账号密码；
- 登录后写入 httpOnly cookie；
- 未登录访问后台统一跳转 `/admin/login`；
- 保留 `ADMIN_KEY` query 兼容访问；
- 新增文章草稿新建、编辑、查看、保存和预览；
- 草稿保存到 `data/article-drafts.json`；
- 不接数据库；
- 不覆盖正式 20 篇 GEO 文章；
- 不做一键发布。

## 2. 背景与上下文

本轮承接两份记录：

- `custom/notes/lightweight-cms-admin-plan.md`
- `custom/notes/lightweight-cms-admin-readonly-v1.md`

上一轮 v1 结论是：后台第一版应先做只读总览，避免服务器后台直接写 Git 跟踪源码文件。用户本轮明确进入 v1.1，允许做文章草稿编辑，但仍要求“不接数据库、不做复杂发布流、不让服务器后台直接写 Git 跟踪源码文件”。

因此本轮只把写入范围限定在非 Git 跟踪的本地草稿文件：

- `data/article-drafts.json`

正式文章仍来自 `lib/geo-articles.ts`，不被草稿系统覆盖。

## 3. 问题分析

只读后台已经能查看文章、FAQ、栏目、线索和设置，但无法承接运营人员日常写作。直接编辑正式文章源码风险较高：

- 会修改 Git 跟踪文件；
- 服务器上直接改源码会影响后续 `git pull --ff-only`；
- 正式文章静态生成后仍需要 build 和部署；
- Word 粘贴文本可能携带冗余空行和格式噪音；
- 如果直接发布，会缺少审核、回滚和记录。

本轮核心矛盾是：需要让运营人员先能写草稿，但不能把草稿误当作正式发布。

## 4. 候选方案比较

### 方案一：直接在线编辑正式文章数据

核心思路：后台表单直接改 `lib/geo-articles.ts`。

优点：

- 保存后可以直接进入正式内容链路；
- 不需要额外草稿模型。

缺点：

- 直接写 Git 跟踪源码文件；
- 容易造成服务器本地修改与 GitHub 冲突；
- 内容发布、审核、回滚不可控；
- 与用户本轮“不要让服务器后台直接写 Git 跟踪源码文件”冲突。

结论：放弃。

### 方案二：接数据库做完整 CMS

核心思路：新增数据库表，文章和草稿都进入数据库。

优点：

- 后续可扩展为完整 CMS；
- 多人协作和状态流更清晰。

缺点：

- 超出本轮范围；
- 会引入迁移、备份、权限和运维成本；
- 用户明确要求第一版不要接数据库。

结论：放弃。

### 方案三：本地非 Git 跟踪草稿 JSON

核心思路：新增 `data/article-drafts.json` 保存草稿，后台支持新建、编辑、查看和预览，正式发布下一阶段再做。

优点：

- 实现轻量；
- 不接数据库；
- 不修改正式文章源码；
- 不进入 Git；
- 能验证编辑器和 Word 文本清洗需求；
- 为下一阶段发布流保留空间。

缺点：

- 草稿只在当前服务器本地保存；
- 不适合多人同时编辑；
- 未做版本历史和恢复；
- 暂无正式发布能力。

结论：采用方案三。

## 5. 最终决策

本轮采用“账号密码登录 + httpOnly cookie + 本地草稿 JSON”的方案。

关键决策：

- 登录账号密码来自环境变量，不写入页面和 Git；
- session cookie 使用服务端签名，前端脚本不可读取；
- 仍兼容 `?key=ADMIN_KEY`，避免旧访问方式立刻失效；
- 未登录访问后台页跳转 `/admin/login`；
- 草稿保存到 `data/article-drafts.json`；
- `.gitignore` 显式忽略 `data/article-drafts.json` 和 `data/*.json`；
- 正式发布按钮先禁用，提示“正式发布功能将在下一阶段开放”；
- 正文编辑先用 textarea，保存时清洗连续多余空行并保留段落。

## 6. 具体实现

涉及文件：

- `.gitignore`
  - 增加 `data/article-drafts.json`，并保留 `data/*.json`。

- `lib/admin-auth.ts`
  - 新增后台账号密码校验；
  - 新增 signed httpOnly cookie 会话；
  - 新增页面和接口访问保护；
  - 保留 `ADMIN_KEY` 兼容校验。

- `lib/admin.ts`
  - 接入新的 `ensureAdminAccess`；
  - 站点设置增加 `ADMIN_USERNAME`、`ADMIN_PASSWORD` 是否配置状态。

- `lib/article-drafts.ts`
  - 新增文章草稿类型；
  - 新增 Word 粘贴文本基础清洗；
  - 新增关联词和 FAQ 解析；
  - 新增草稿读写、创建和更新能力。

- `components/admin/AdminShell.tsx`
  - 增加退出登录入口。

- `components/admin/ArticleDraftForm.tsx`
  - 新增草稿编辑表单；
  - 支持标题、slug、分类、主词、关联词、SEO标题、SEO描述、摘要、正文、FAQ、状态；
  - 发布按钮禁用。

- `app/admin/login/page.tsx`
  - 新增登录页。

- `app/admin/login/actions/route.ts`
  - 新增登录提交接口。

- `app/admin/logout/route.ts`
  - 新增退出登录接口。

- `app/admin/articles/page.tsx`
  - 在原文章只读列表基础上增加草稿列表和新建入口。

- `app/admin/articles/new/page.tsx`
  - 新增新建草稿页。

- `app/admin/articles/draft-actions/route.ts`
  - 新增创建草稿接口。

- `app/admin/articles/draft-actions/[draftId]/route.ts`
  - 新增更新草稿接口。

- `app/admin/articles/drafts/[draftId]/page.tsx`
  - 新增草稿查看页。

- `app/admin/articles/drafts/[draftId]/edit/page.tsx`
  - 新增草稿编辑页。

- `app/admin/articles/drafts/[draftId]/preview/page.tsx`
  - 新增草稿预览页。

## 7. 本轮优点

- 后台从 `ADMIN_KEY` 链接访问升级为更自然的账号密码登录；
- 登录状态使用 httpOnly cookie，密码不暴露到前端；
- 保留 `ADMIN_KEY` 兼容，降低切换风险；
- 草稿系统满足运营写作的第一步需求；
- 草稿不进入 Git，不影响正式文章数据；
- 正文 textarea 支持粘贴 Word 文本，并做基础空行清洗；
- 预览页能让运营先检查文章层级和 FAQ；
- 发布能力被刻意禁用，避免草稿误上线。

## 8. 本轮缺点与代价

- 草稿数据只在服务器本地保存，不随 GitHub 同步；
- 没有版本历史、撤销、删除和多人协作；
- Word 文本适配只做基础段落与空行清洗，不处理复杂表格、图片和样式；
- 暂无正式发布流，仍需下一阶段设计如何从草稿进入正式文章；
- 账号密码仍是单账号模式，没有多角色权限和登录失败限流；
- 如果服务器丢失本地 `data/article-drafts.json`，草稿也会丢失，因此需要后续补备份策略。

## 9. 验证与结果

已完成本地验证：

- `npm run build` 通过；
- `npm run typecheck` 通过；
- `git diff --check` 通过；
- `git check-ignore -v data/article-drafts.json` 确认草稿文件被忽略；
- `/admin` 未登录返回 307，跳转登录；
- `/admin/login` 返回 200；
- 错误账号密码登录返回 307，不进入后台；
- 正确账号密码登录后返回 200；
- 登录后 `/admin/articles` 返回 200；
- 新建草稿提交返回 200；
- 草稿查看页返回 200；
- 草稿预览页返回 200。

本地联调生成过一条测试草稿，验证后已删除该本地测试文件，避免把测试内容留在工作区。

## 10. 本轮结论

CMS v1.1 已经把“只读内容控制台”推进到“可登录 + 可写草稿”的阶段。当前最重要的边界是：草稿可以写入，但正式文章仍不可被后台直接覆盖。

这个设计满足运营先写内容的需求，同时继续保护当前已上线的主站内容和 Git 部署流程。

## 11. 下一轮建议

1. 设计草稿到正式文章的发布流程：建议先做“导出为文章数据片段”或“生成待提交文件”，不要直接自动发布。
2. 增加草稿备份策略：例如定期备份 `data/article-drafts.json`。
3. 如果 Word 粘贴需求变强，再单独增强格式清洗：标题识别、列表识别、表格转 Markdown、图片处理。
