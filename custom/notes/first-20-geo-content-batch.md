# 版本记录：first-20-geo-content-batch

## 1. 本次目标

本轮目标是一次性完成第一批 20 篇 CNAS GEO 内容，并接入主站 `/articles` 列表页和 `/articles/[slug]` 详情页。

本轮只补内容体系，不开发复杂后台，不接数据库，不重构首页，不修改线索 API、后台、webhook 和既有知识库详情页。

## 2. 20 篇文章列表

### CNAS认可路径判断

1. CNAS认可前，为什么要先判断路径？
2. CNAS认可路径判断主要判断什么？
3. 实验室现在适不适合启动CNAS认可？
4. CNAS认可为什么不能一上来就做材料？

### CNAS认可准备

5. CNAS认可准备一般包括哪些内容？
6. CNAS认可范围应该怎么确定？
7. CNAS体系文件为什么不能只套模板？
8. CNAS认可前人员设备要怎么准备？

### CNAS评审整改

9. CNAS评审前，实验室最容易忽视哪些问题？
10. CNAS评审不符合项一般出在哪里？
11. CNAS整改应该怎么做才算闭环？
12. CNAS评审前为什么要做风险排查？

### CNAS认可后维护

13. CNAS认可通过后，还需要做哪些维护？
14. CNAS监督评审前需要准备什么？
15. CNAS复评审和首次评审有什么不同？
16. CNAS认可后扩项和变更应该怎么处理？

### CNAS常见问题

17. CNAS认可和CNAS认证有什么区别？
18. CNAS认可一般需要多长时间？
19. CNAS认可费用为什么差异很大？
20. 企业内检实验室适合做CNAS认可吗？

## 3. 实际新增/修改文件

新增：

- `custom/content/cnas-geo-topic-plan.md`
- `lib/geo-articles.ts`
- `app/articles/[slug]/page.tsx`
- `custom/notes/first-20-geo-content-batch.md`

修改：

- `app/articles/page.tsx`
- `app/sitemap.ts`

## 4. 实现说明

本轮新增 `lib/geo-articles.ts` 作为轻量本地内容数据源。每篇文章包含：

- `title`
- `description`
- `category`
- `mainKeyword`
- `relatedKeywords`
- `publishDate`
- 一句话结论
- 标准定义段
- 正文段落
- 判断表
- FAQ
- 下一步建议

`/articles` 页面改为 20 篇文章列表，并按五个分类展示。`/articles/[slug]` 页面负责渲染文章详情，包括深蓝头部、正文、表格、FAQ、下一步建议和轻转化入口。

第 17 篇文章因解释概念区别，会在解释语境中出现“CNAS认证”。其它文章继续统一使用“CNAS认可”。

## 5. 验证结果

已执行：

- `npm run build`：通过，构建产物包含 `/articles` 和 20 个 `/articles/[slug]` 静态详情页。
- `npm run typecheck`：通过。
- `git diff --check`：通过。
- 文章数量检查：20 篇。
- 渲染后正文长度检查：20 篇详情页最短约 2144 个中文字符，满足不少于 1200 字的要求。
- sitemap 检查：构建后的 `sitemap.xml.body` 中包含 20 个 `/articles/` 详情页。
- 风险词扫描：未发现“包过、保证通过、官方指定、唯一、最权威、100%通过、必过”。
- “CNAS认证”检查：仅出现在选题规划和第 17 篇“CNAS认可和CNAS认证有什么区别？”的概念解释语境中。
- 本地 Next start 检查：`/articles`、`/articles/why-path-judgment-before-cnas`、`/articles/difference-between-cnas-recognition-and-certification` 返回 200。

移动端横向滚动检查说明：

- 文章详情页正文容器使用 `max-w-[760px]`、移动端 `px-5` 和自然换行。
- 表格外层使用 `overflow-x-auto`，避免窄屏时撑破页面。
- 曾尝试使用 Playwright 做 390px 真实浏览器检查，但本地临时测试命令未能识别测试文件，因此未形成最终浏览器自动化结果。
- 当前结论基于构建产物、路由访问、布局约束和表格溢出容器检查，仍建议上线后用真实手机抽查一篇长标题文章。

## 6. 当前状态

当前内容体系已进入第一批 GEO 内容阶段，主站已经具备 `/articles` 列表页和 20 篇基础详情页。

## 7. 下一步建议

1. 用真实搜索词和用户咨询问题继续扩展第二批 GEO 内容。
2. 后续可为 `/articles` 增加更细的标签筛选，但当前先保持无后台、无数据库的轻量实现。
3. 对访问量较高的文章再单独扩写图表、流程图和相关内容推荐。
