# CNAS认可指南 v1.0 试运行版上线运营清单

## 1. 当前版本定位

当前版本定位为：CNAS认可指南 v1.0 试运行版。

本轮只围绕网站能上线试运行做最终检查和配置清单整理，不新增业务功能，不新增数据库，不接企业微信增长中台，不重构客户管理系统。

## 2. 本次读取的历史记录

- `custom/notes/v0.59-production-final-cleanup.md`
- `custom/notes/v0.58-prelaunch-final-audit.md`

延续结论：

- 主站已经完成 v0.59 上线前收口。
- `SITE_URL` 必须由环境变量控制，避免正式输出 localhost 域名。
- `ADMIN_KEY` 用于临时保护 `/admin/leads`。
- `LEAD_WEBHOOK_FEISHU` 与 `LEAD_WEBHOOK_WECHAT` 至少配置一个，才能让线索稳定通知运营人员。
- `data/leads.json` 只作为上线初期本地兜底，不进入 Git 仓库，不作为长期生产主存储。

## 3. 最小上线运营闭环

```text
内容访问 → 添加企业微信 → 填写基础信息 → 生成初步诊断 → 线索通知 → 人工跟进
```

当前先保留人工跟进闭环，不做自动标签、自动分配顾问、复杂 CRM 或数据库重构。

## 4. 主站检查结果

项目目录：

```text
C:/Users/Administrator/Documents/New project 10/
```

检查结果：

- `git status`：检查前后均为干净工作区。
- `git remote -v`：远程仓库为 `https://github.com/yinuocheng123-cloud/cnas.git`。
- `npm run build`：通过，成功生成 87 个页面。
- `npm run typecheck`：通过。
- `SITE_URL`：由 `lib/seo.ts` 统一读取，供 canonical、Open Graph、JSON-LD、sitemap 和 robots 使用。
- `ADMIN_KEY`：`app/admin/leads/page.tsx` 通过 query key 校验，未配置或错误时返回 403。
- `LEAD_WEBHOOK_FEISHU` / `LEAD_WEBHOOK_WECHAT`：`lib/webhook.ts` 支持二选一或同时配置。
- 后台线索页：`/admin/leads?key=ADMIN_KEY` 仍可作为上线初期临时查看入口。
- sitemap、robots、canonical、OG：均读取 `SITE_URL`。
- 缺少 `SITE_URL`：本地 production build 会警告并 fallback 到 localhost；CI/Vercel 部署构建会主动失败，避免正式站输出错误域名。

## 5. 主站必须配置

- `SITE_URL`：真实正式域名，例如 `https://cnaszhinan.com`。
- `ADMIN_KEY`：足够长、不可猜的随机访问 key。
- `LEAD_WEBHOOK_FEISHU` 或 `LEAD_WEBHOOK_WECHAT`：至少配置一个。
- `NEXT_PUBLIC_GA_ID`：可选，如需统计访问来源再配置。

## 6. 成交页必须配置

成交页目录：

```text
D:/ceshi/shiyan/2cnas/
```

正式投放前必须配置：

- 真实企业微信二维码。
- 真实电话。
- 真实微信 / 企业微信。
- 真实邮箱。
- 真实 `LEAD_FORM_ENDPOINT`。
- 正式域名。
- 线上真实表单提交测试。

## 7. 暂缓事项

- 企业微信增长中台。
- 自动标签。
- 自动分配顾问。
- 复杂 CRM。
- 数据库重构。
- 自动报告生成。

## 8. 上线前人工测试清单

- 打开主站首页。
- 打开成交页。
- 点击添加企业微信按钮。
- 查看二维码是否正确。
- 提交一条测试线索。
- 确认 webhook 是否收到通知。
- 确认后台是否能看到线索。
- 确认手机端展示正常。
- 确认页面没有 `CNAS认证` 等错误表述。
- 确认没有 `包过`、`保证通过`、`官方指定` 等风险表述。

## 9. 当前上线建议

主站具备试运行上线基础，但必须先在部署平台配置真实 `SITE_URL`、`ADMIN_KEY` 和至少一个 webhook。

成交页具备静态上线基础，但必须先替换真实企业微信二维码、联系方式和 `LEAD_FORM_ENDPOINT`，并完成线上真实表单提交测试。

当前建议进入域名与部署配置阶段，暂不推进复杂后台或增长中台。
