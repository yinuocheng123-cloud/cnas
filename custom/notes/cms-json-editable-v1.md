# 版本记录：cms-json-editable-v1

## 1. 本轮目标

本轮进入 CMS v1.2，把文章、FAQ、栏目从“源码静态内容 / 只读后台”升级为“JSON 数据化 + 后台可编辑”的轻量 CMS。

目标属于功能补充与可维护性提升：不接数据库、不接 Prisma/PostgreSQL、不做 CRM、不做多角色权限，但让后台可以编辑正式内容并写入 `data/*.json`。

## 2. 背景与上下文

本轮承接以下记录：

- `custom/notes/lightweight-cms-admin-plan.md`
- `custom/notes/lightweight-cms-admin-readonly-v1.md`
- `custom/notes/cms-article-draft-v1.md`
- `custom/notes/cms-admin-final-hardening.md`
- `custom/notes/cms-admin-user-guide.md`

此前后台已经具备登录、只读内容查看、文章草稿保存、POST 退出等能力。但正式文章仍主要来自 TS 源码，FAQ 和栏目也来自静态聚合数据，后台不能直接维护正式内容。

## 3. 问题分析

当前核心矛盾是：内容需要可运营，但系统不能变复杂。

如果后台直接写 TS 源码，会让服务器运行态改动 Git 跟踪源码，部署风险高；如果直接接数据库，又超出当前轻量阶段。JSON 数据化是当前最小可控方案。

本轮还发现一个兼容问题：如果文章和 FAQ 页面继续静态预渲染，后台写入 JSON 后前台可能仍显示构建时内容。因此 `/articles`、`/articles/[slug]`、`/faq`、`/faqs` 已改为按需动态读取 JSON。

## 4. 候选方案比较

### 方案一：后台直接编辑 TS 内容文件

优点：复用当前结构最直接。

缺点：服务器后台会直接修改源码，容易和 Git 部署冲突，也不利于审计。

结论：放弃。

### 方案二：接数据库做完整 CMS

优点：长期扩展性最好。

缺点：超出“不接数据库、不做复杂后台”的边界。

结论：放弃。

### 方案三：正式内容 JSON 化

优点：改动可控；不需要数据库；后台不写源码；文章、FAQ、栏目都能编辑；旧 URL 和 sitemap 可以保持。

缺点：服务器后台编辑会造成线上 JSON 与 Git 初始种子不同，后续需要内容导出、备份或同步策略。

结论：采用。

## 5. 最终决策

新增正式内容文件：

- `data/articles.json`
- `data/faqs.json`
- `data/categories.json`

这三个 JSON 作为初始内容种子进入 Git。

继续忽略：

- `data/article-drafts.json`
- `data/leads.json`
- `data/backups/`

正式文章保留原 slug，20 篇文章 URL 仍为 `/articles/[slug]`。

## 6. 具体实现

主要改动：

- 新增 `lib/cms-content.ts`，统一读写文章、FAQ、栏目 JSON。
- `lib/geo-articles.ts` 改为兼容导出，真实来源转向 `data/articles.json`。
- `/articles`、`/articles/[slug]`、`/faq`、`/faqs` 改为动态读取 JSON。
- `app/sitemap.ts` 改为从已发布 JSON 文章读取 sitemap 文章 URL。
- `/admin/articles` 支持搜索、分类、状态筛选，支持查看前台、编辑、预览、新增文章。
- `/admin/articles/edit/[id]` 和 `/admin/articles/new` 保存到 `data/articles.json`。
- `/admin/faqs` 支持 FAQ 列表、新增、编辑、归档或发布状态维护。
- `/admin/categories` 支持栏目标题、描述、SEO、排序、状态编辑。
- 写入前生成 `data/backups/` 备份文件。
- 写入前做 slug 唯一校验、风险词拦截和“CNAS认证”语境提醒。
- 标签页 `/tags/[tag]` 增加 CMS GEO 文章关联词兼容，避免文章标签入口预取 404。
- 更新后台使用说明，补充 JSON 内容源、备份位置和部署同步风险。

## 7. 本轮优点

- 20 篇原文章完整迁移，slug 和 URL 不变。
- 后台可以维护正式文章、FAQ 和栏目，不再只是只读控制台。
- 正式内容不再写 TS 源码。
- 前台内容页动态读取 JSON，更符合 CMS 编辑预期。
- 保存前会备份原 JSON，降低误操作损失。
- 草稿系统继续保留，不影响 `data/article-drafts.json`。

## 8. 本轮缺点与代价

当前仍不是完整 CMS：

- 没有数据库。
- 没有多角色权限。
- 没有完整内容版本历史。
- 没有复杂发布审核流。
- 没有线上编辑内容自动同步 GitHub。
- 服务器后台编辑 JSON 后，后续部署如果直接拉 Git，可能与线上 JSON 改动冲突或覆盖线上内容。

这些代价是为了保持轻量、可控、不中断当前上线运营而接受的。

## 9. 验证与结果

已执行：

- `npm run build`：通过。
- `npm run typecheck`：通过。
- `git diff --check`：通过，仅有 Git 行尾提示。
- Playwright 后台流程：登录、文章编辑后恢复、新增归档测试文章、风险词拦截、FAQ 编辑后前台验证、栏目编辑后恢复、文章列表、3 篇文章详情、sitemap、退出登录均通过。

测试后已清理新增的 Playwright 测试文章，不在前台留下测试内容。

## 10. 本轮结论

CMS v1.2 已把 CNAS 主站正式内容推进到 JSON 可编辑阶段。后台不再只是只读控制台，文章、FAQ、栏目已具备轻量运营能力。

当前最重要的新约束是：`data/articles.json`、`data/faqs.json`、`data/categories.json` 是正式内容源；服务器后台编辑后，应把线上 JSON 视为线上内容资产，不能随意覆盖。

## 11. 下一轮建议

1. 设计“线上 JSON 导出 / 备份 / 回灌 Git”的内容同步流程。
2. 设计草稿转正式文章的轻量审核发布流程。
3. 当内容量继续增长后，再评估是否需要数据库化，不要过早引入复杂系统。
