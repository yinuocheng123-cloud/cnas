# CNAS 内容控制台使用说明

## 1. 后台登录地址

线上后台入口：

`https://www.cnaszhinan.com/admin/login`

登录成功后进入：

`https://www.cnaszhinan.com/admin`

后台当前用于 CNAS认可指南网站内容运营，不是 CRM，不做客户跟进系统，不直接发布正式文章。

## 2. 账号密码配置方式

后台账号密码通过服务器环境变量配置，不写在页面里，也不写入 Git：

```env
ADMIN_USERNAME=后台账号
ADMIN_PASSWORD=后台密码
```

服务器部署后如修改账号密码，需要重启 PM2：

```bash
pm2 restart cnas-main --update-env
```

历史兼容方式 `ADMIN_KEY` 仍保留，但日常使用建议走账号密码登录。

## 3. 文章管理怎么看

进入后台后点击“文章”，打开：

`/admin/articles`

文章管理页包含两类内容：

- 正式文章：来自 `data/articles.json`，可新增、编辑、预览和调整状态。
- 文章草稿：来自服务器本地草稿文件，只用于编辑和预览。

正式文章可以查看标题、分类、主词、发布时间、状态和前台链接。状态为 `published` 的文章会进入前台文章列表和 sitemap；`draft`、`archived` 不作为正式前台文章展示。

## 3.1 如何编辑文章

在文章管理页点击“编辑”，进入：

`/admin/articles/edit/<id>`

可编辑字段包括：

- 标题
- slug
- 分类
- 主词
- 关联词
- SEO 标题
- SEO 描述
- 摘要
- 正文
- FAQ
- 状态
- 是否推荐
- 发布时间

保存后写入：

`data/articles.json`

保存前会做基础风险词扫描，如果出现“包过、保证通过、官方指定、唯一、最权威、100%通过、必过”等表达，会拒绝保存。

## 3.2 如何新增文章

在文章管理页点击“新增文章”，进入：

`/admin/articles/new`

建议新文章先保存为 `draft` 或 `archived`，确认内容后再改为 `published`。

新增文章不会修改 TS 源码文件，也不会自动提交 Git。

## 4. 如何新建草稿

在文章管理页点击“新建草稿”，打开：

`/admin/articles/new`

填写基础字段：

- 标题
- slug
- 分类
- 状态
- 主词
- SEO 标题
- SEO 描述
- 摘要
- 正文
- FAQ

正文编辑区可以粘贴 Word 文本。系统会做基础文本清洗，保留段落并减少连续多余空行，但不会处理复杂 Word 样式、图片或表格。

## 5. 如何保存草稿

填写后点击“保存草稿”。

保存成功后会跳转到草稿查看页：

`/admin/articles/drafts/<draftId>`

草稿保存到服务器本地文件：

`data/article-drafts.json`

该文件已被 `.gitignore` 忽略，不会进入 Git 仓库。

## 6. 如何查看草稿

在文章管理页的“文章草稿”列表中点击“查看”，可以打开草稿详情页。

草稿详情页用于检查当前草稿字段和正文内容，不会改变正式文章。

## 7. 如何预览草稿

在草稿详情页点击“草稿预览”，或在草稿列表中点击“预览”。

预览页用于模拟前台阅读效果，便于检查正文层级、摘要和 FAQ。

## 8. 草稿不会自动发布

当前版本不会把草稿自动发布到正式文章列表，也不会覆盖 `lib/geo-articles.ts` 中的正式内容。

“发布”按钮目前保持禁用，提示“正式发布功能将在下一阶段开放。”

CMS v1.2 后正式文章来源已经变成 `data/articles.json`，但草稿仍然保留在 `data/article-drafts.json`。草稿转正式文章的完整流程下一阶段再做。

## 8.1 如何编辑 FAQ

进入：

`/admin/faqs`

可新增、编辑、排序和调整状态。FAQ 保存到：

`data/faqs.json`

状态为 `published` 的 FAQ 会进入前台 FAQ 聚合页。

## 8.2 如何编辑栏目

进入：

`/admin/categories`

本轮只支持编辑已有栏目，不新增动态栏目路由。可编辑：

- 栏目名称
- 栏目描述
- SEO 标题
- SEO 描述
- 排序
- 推荐状态
- 发布状态

栏目保存到：

`data/categories.json`

## 8.3 内容备份在哪里

后台每次保存正式文章、FAQ 或栏目时，会先把旧 JSON 文件备份到：

`data/backups/`

该目录不进入 Git，需要服务器层面定期备份。

## 9. 正式发布功能下一阶段再做

下一阶段建议先设计“草稿到正式文章”的安全发布流程，例如：

- 导出为待提交文章数据片段；
- 人工审核后合入 Git；
- 构建部署后上线；
- 保留发布记录和回滚方式。

不建议让服务器后台直接写 Git 跟踪源码文件。

## 10. 常见问题

### 登录后又跳回登录页怎么办？

优先确认：

- 是否使用 `https://www.cnaszhinan.com/admin/login` 登录；
- 浏览器是否禁用了 cookie；
- 服务器环境变量 `ADMIN_USERNAME`、`ADMIN_PASSWORD` 是否已配置；
- PM2 是否已经通过 `--update-env` 加载最新环境变量。

如果修改过 cookie 或后台登录逻辑，建议使用真实浏览器流程验证，不要只用 curl。

### cookie 有哪些关键设置？

后台使用 `cnas_admin_session`，并设置：

- `HttpOnly`
- `Secure`
- `SameSite=Lax`
- `Path=/`
- `Domain=.cnaszhinan.com`

这样可以支持 `www.cnaszhinan.com` 和 `cnaszhinan.com` 的后台登录态共享。

### 草稿保存在哪里？

草稿保存在服务器本地：

`data/article-drafts.json`

该文件不进入 Git。服务器迁移或重装前，需要单独备份。

### 正式内容保存在哪里？

CMS v1.2 后，正式内容保存到：

- `data/articles.json`
- `data/faqs.json`
- `data/categories.json`

这三份文件作为初始内容种子进入 Git。但服务器后台后续编辑会造成服务器本地 JSON 变化，后续重新 `git pull` 可能覆盖线上编辑内容。

下一阶段应设计内容导出、备份或同步策略，避免线上后台编辑和 Git 部署流程互相覆盖。

### 为什么草稿没有出现在前台文章列表？

这是当前版本的设计。草稿只用于后台撰写和预览，不会自动发布。正式发布功能下一阶段再开放。

### 退出登录为什么是 POST？

退出登录会清除 cookie，属于有副作用操作。使用 POST 可以避免浏览器预取、爬虫或普通链接误触发退出。
