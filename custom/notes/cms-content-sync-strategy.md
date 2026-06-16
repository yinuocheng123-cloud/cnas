# CMS 内容同步策略

## 1. 文档目标

本文件用于说明 CNAS 主站 CMS 正式内容在“服务器后台编辑、GitHub 仓库、部署流程”之间如何安全流转。

当前正式内容源包括：

- `data/articles.json`
- `data/faqs.json`
- `data/categories.json`

草稿、线索和备份不属于正式内容种子，不进入 Git：

- `data/article-drafts.json`
- `data/leads.json`
- `data/backups/`

## 2. 场景一：后台编辑后，把线上内容同步回 GitHub

适用情况：运营人员已经在服务器后台修改了文章、FAQ 或栏目，希望把这些线上内容同步回 GitHub，避免下次部署被覆盖。

服务器执行：

```bash
cd /www/wwwroot/cnas-main
node scripts/backup-cms-content.mjs
node scripts/export-cms-content.mjs
```

然后将服务器 `exports/cms-content/` 中的 JSON 回灌到本地仓库：

- `exports/cms-content/articles.json` → `data/articles.json`
- `exports/cms-content/faqs.json` → `data/faqs.json`
- `exports/cms-content/categories.json` → `data/categories.json`

本地验证：

```bash
npm run build
npm run typecheck
```

提交：

```bash
git add data/articles.json data/faqs.json data/categories.json exports/cms-content
git commit -m "chore: sync CMS content from production"
git push
```

## 3. 场景二：部署新代码前保护线上内容

适用情况：准备在服务器拉取新代码，但不确定线上后台是否编辑过正式内容。

服务器先执行：

```bash
cd /www/wwwroot/cnas-main
node scripts/backup-cms-content.mjs
```

再执行：

```bash
git pull --ff-only
```

如果 Git 提示 `data/articles.json`、`data/faqs.json` 或 `data/categories.json` 有本地修改，不要强拉、不要 reset、不要删除文件。

正确做法：

```bash
node scripts/export-cms-content.mjs
```

然后人工检查并合并线上 JSON 内容，再决定是否继续部署。

## 4. 场景三：内容误改后恢复

适用情况：后台误改了正式文章、FAQ 或栏目，需要从最近备份恢复。

先查看备份：

```bash
ls -lah data/backups/manual/
```

找到最近备份后复制回正式内容文件，例如：

```bash
cp data/backups/manual/articles-YYYYMMDD-HHmmss.json data/articles.json
cp data/backups/manual/faqs-YYYYMMDD-HHmmss.json data/faqs.json
cp data/backups/manual/categories-YYYYMMDD-HHmmss.json data/categories.json
```

视情况重新构建或重启服务：

```bash
npm run build
pm2 restart cnas-main-3100 --update-env
pm2 save
```

最后验证：

- 首页是否正常；
- `/articles` 是否正常；
- 文章详情页是否正常；
- `/faq` 是否正常；
- 后台是否能正常登录。

## 5. 重要提醒

`data/articles.json`、`data/faqs.json`、`data/categories.json` 是正式内容资产。服务器后台编辑后，这三份文件可能领先于 GitHub。

后续每次部署前，都应先备份。只要发现 Git 拉取被 JSON 本地改动阻止，就先导出、人工合并，不要用 reset 覆盖线上内容。
