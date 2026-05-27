# CMS 内容导出

导出时间：2026-05-27 22:02:44

来源目录：

```text
C:\Users\Administrator\Documents\New project 10\data
```

## 用途

本目录用于临时保存线上 CMS 正式内容，方便把服务器后台编辑后的内容回灌到 GitHub 仓库。

## 包含文件

- `articles.json`：正式文章内容。
- `faqs.json`：FAQ 内容。
- `categories.json`：栏目内容。

## 不包含内容

- 不包含 `data/article-drafts.json`。
- 不包含 `data/leads.json`。
- 不包含 `data/backups/`。

## 回灌方式

如需把线上内容同步回 GitHub，请人工检查本目录 JSON 后复制到仓库正式数据文件：

- `data/articles.json`
- `data/faqs.json`
- `data/categories.json`

随后执行构建和类型检查，再提交 Git。
