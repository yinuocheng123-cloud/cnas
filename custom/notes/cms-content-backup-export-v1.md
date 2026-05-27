# 版本记录：cms-content-backup-export-v1

## 1. 本轮目标

本轮进入 CMS v1.3，目标是建立线上 JSON 内容备份、导出、回灌 GitHub 的安全流程。

本轮不新增复杂功能，不接数据库，不重构 CMS，不修改前台结构，也不修改后台编辑逻辑。重点是保护 `data/articles.json`、`data/faqs.json`、`data/categories.json` 这三份正式内容资产。

## 2. 背景与上下文

本轮承接 `custom/notes/cms-json-editable-v1.md`。

CMS v1.2 已经把文章、FAQ、栏目升级为 JSON 数据源，并允许后台编辑。新的风险是：服务器后台编辑后，线上 JSON 会产生本地变化；如果后续部署直接从 GitHub 拉取，可能发生冲突或覆盖线上编辑内容。

## 3. 问题分析

当前问题不是内容编辑能力不足，而是内容资产流转缺少明确流程。

核心矛盾：

- GitHub 中的 `data/*.json` 是初始内容种子；
- 服务器后台编辑后的 `data/*.json` 是线上真实内容；
- 两者如果缺少备份和导出流程，部署时容易分叉或丢内容。

因此本轮只补脚本和文档，让后续部署前能先备份，发生冲突时能导出线上内容，再人工回灌 GitHub。

## 4. 候选方案比较

### 方案一：后台自动 Git commit / push

优点：线上编辑后能自动回流仓库。

缺点：风险高，需要服务器保存 Git 凭据，也容易产生不可控提交。

结论：放弃。

### 方案二：接数据库并做内容同步

优点：长期更规范。

缺点：超出当前“不接数据库、不做复杂 CMS”的边界。

结论：放弃。

### 方案三：脚本化备份与导出

优点：实现轻、风险低、容易审计；不改变现有 CMS 和前台逻辑。

缺点：回灌 GitHub 仍需要人工确认。

结论：采用。

## 5. 最终决策

新增两个脚本：

- `scripts/backup-cms-content.mjs`
- `scripts/export-cms-content.mjs`

新增两个 npm 命令：

- `npm run cms:backup`
- `npm run cms:export`

部署流程中要求在 `git pull --ff-only` 前先执行 CMS 备份。

## 6. 具体实现

实际改动：

- 新增 `scripts/backup-cms-content.mjs`，把正式内容 JSON 复制到 `data/backups/manual/`。
- 新增 `scripts/export-cms-content.mjs`，把正式内容 JSON 导出到 `exports/cms-content/`，并生成导出说明。
- 更新 `package.json`，加入 `cms:backup` 和 `cms:export`。
- 更新 `DEPLOY.md`，明确部署前备份、遇到 JSON 本地改动时先导出、禁止 reset 和 force pull。
- 新增 `custom/notes/cms-content-sync-strategy.md`，说明三种内容同步场景。

## 7. 本轮优点

- 后台编辑后的线上内容可以在部署前被手动备份。
- 线上内容可以导出为可回灌 GitHub 的 JSON 文件。
- 部署文档明确了不要覆盖正式内容 JSON。
- 没有引入数据库或复杂后台逻辑。
- 没有改变前台和后台编辑功能。

## 8. 本轮缺点与代价

当前方案仍然不是自动同步系统：

- 线上内容回灌 GitHub 需要人工执行和检查。
- 导出内容进入 Git 前需要人工确认。
- 如果多人同时编辑线上后台，仍需要人工约定操作窗口。
- 备份文件默认存放在服务器本地，仍需要服务器层面的长期备份策略。

这些代价是为了避免服务器自动提交 Git 和避免过早引入数据库。

## 9. 验证与结果

本轮已完成验证：

- `npm run cms:backup`：PowerShell 直接调用 `npm` 被执行策略拦截，改用 `npm.cmd run cms:backup` 后通过，并生成 `data/backups/manual/` 下三份时间戳备份。
- `npm run cms:export`：PowerShell 直接调用 `npm` 被执行策略拦截，改用 `npm.cmd run cms:export` 后通过，并生成 `exports/cms-content/` 下三份 JSON 和 README。
- `npm run build`：通过。
- `npm run typecheck`：通过。曾与 build 并行执行时因 `.next/types` 被刷新出现临时缺文件报错，build 完成后单独重跑通过。
- `git diff --check`：通过，仅有 Git 行尾提示。

检查结果：

- `data/backups/` 仍被 `.gitignore` 忽略。
- `data/article-drafts.json` 和 `data/leads.json` 仍被忽略。
- `data/articles.json`、`data/faqs.json`、`data/categories.json` 仍被 Git 跟踪。
- `exports/cms-content/` 未被忽略，可以进入 Git。
- 本轮未修改前台结构、后台编辑逻辑、API、数据库或 webhook。

## 10. 本轮结论

CMS v1.3 的核心不是新增编辑能力，而是补上“线上内容资产保护”这一层。部署前备份、冲突时导出、人工回灌 GitHub，是当前轻量 CMS 阶段最稳妥的内容安全流程。

## 11. 下一轮建议

1. 给服务器增加定时备份策略，周期性保存 `data/backups/`。
2. 设计一个人工确认的“导出内容回灌 GitHub”操作清单。
3. 等内容运营更频繁后，再评估是否需要数据库或对象存储。
