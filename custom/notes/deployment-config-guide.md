# CNAS认可指南主站部署配置说明

## 1. 本轮目标

本轮进入上线配置阶段，只整理部署配置说明和真实配置替换准备，不新增业务功能，不接增长中台，不新增数据库，不重构后台。

主站推荐作为 `https://cnaszhinan.com` 的正式入口，承载 CNAS认可指南内容、诊断表单、线索 webhook 通知和临时后台线索查看。

## 2. 推荐部署平台

推荐优先使用支持 Next.js App Router 的托管平台：

- Vercel
- Netlify
- Cloudflare Pages，需确认 Next.js SSR/API Route 支持方式
- 自有服务器，使用 Node.js 运行 Next.js

如果希望最快试运行，优先选择 Vercel 或已有可稳定运行 Next.js 的平台。

## 3. GitHub 仓库与部署分支

- GitHub 仓库地址：`https://github.com/yinuocheng123-cloud/cnas`
- 部署分支：`master`
- 部署平台需要从 GitHub 仓库 `yinuocheng123-cloud/cnas` 拉取代码。

部署平台构建命令建议使用：

```bash
npm run build
```

启动命令按平台默认 Next.js 配置执行；自有服务器部署时可使用：

```bash
npm run start
```

## 4. 必填环境变量

不要把真实密钥写入仓库。以下变量必须在部署平台的环境变量面板中配置。

```bash
SITE_URL=https://cnaszhinan.com
ADMIN_KEY=<由用户提供的复杂随机密钥>
LEAD_WEBHOOK_FEISHU=<飞书群机器人 webhook，二选一或同时配置>
LEAD_WEBHOOK_WECHAT=<企业微信群机器人 webhook，二选一或同时配置>
```

配置说明：

- `SITE_URL` 必须配置为 `https://cnaszhinan.com`，用于 canonical、Open Graph、JSON-LD、sitemap 和 robots。
- `ADMIN_KEY` 需要由用户提供复杂密钥，用于临时访问 `/admin/leads?key=ADMIN_KEY`。
- `LEAD_WEBHOOK_FEISHU` 与 `LEAD_WEBHOOK_WECHAT` 至少配置一个，否则线索只能写入本地兜底文件，无法稳定通知运营人员。
- webhook 值属于敏感信息，只能配置在部署平台，不要提交到 Git。

## 5. 可选环境变量

```bash
NEXT_PUBLIC_GA_ID=<Google Analytics Measurement ID>
```

`NEXT_PUBLIC_GA_ID` 可选。需要访问统计时再配置，不影响主站上线试运行。

## 6. 上线后测试步骤

1. 打开 `https://cnaszhinan.com`，确认首页正常展示。
2. 打开 `https://cnaszhinan.com/diagnosis`，确认诊断表单正常展示。
3. 提交一条测试线索，使用明显测试内容，避免混入真实客户。
4. 确认页面返回提交成功。
5. 确认飞书或企业微信群机器人收到线索通知。
6. 打开 `https://cnaszhinan.com/admin/leads?key=ADMIN_KEY`，确认后台可临时查看线索。
7. 打开 `https://cnaszhinan.com/sitemap.xml`，确认 sitemap 域名为正式域名。
8. 打开 `https://cnaszhinan.com/robots.txt`，确认 robots 中 sitemap 域名为正式域名。
9. 查看首页源码或浏览器开发者工具，确认 canonical 与 Open Graph 使用 `https://cnaszhinan.com`。
10. 手机端打开首页和诊断页，确认主要内容、按钮和表单可正常使用。

## 7. 常见错误排查

### 7.1 部署构建失败，提示 SITE_URL 缺失

原因：部署平台未配置 `SITE_URL`。

处理方式：在部署平台环境变量中添加：

```bash
SITE_URL=https://cnaszhinan.com
```

然后重新部署。

### 7.2 后台访问返回 403

原因可能是：

- 未配置 `ADMIN_KEY`。
- URL 中 `key` 参数与部署平台中的 `ADMIN_KEY` 不一致。
- 密钥前后复制了空格。

处理方式：重新确认部署平台变量值，并使用：

```text
/admin/leads?key=<实际 ADMIN_KEY>
```

### 7.3 表单提交成功但运营人员没收到通知

原因可能是：

- `LEAD_WEBHOOK_FEISHU` 和 `LEAD_WEBHOOK_WECHAT` 都未配置。
- webhook 地址配置错误。
- 群机器人权限或安全设置限制消息发送。

处理方式：至少配置一个 webhook，并使用测试线索重新提交验证。

### 7.4 sitemap、canonical 或 OG 出现 localhost

原因：`SITE_URL` 未配置为正式域名，或部署后未重新构建。

处理方式：确认 `SITE_URL=https://cnaszhinan.com`，重新部署并清理平台缓存。

### 7.5 线索后台没有数据

当前 `data/leads.json` 只适合作为上线初期兜底，不适合作为 serverless 长期主存储。若部署平台不保留运行时文件写入，后台可能无法长期稳定展示历史线索。

试运行阶段应以 webhook 通知为主，后台只作为临时辅助查看。

## 8. 上线配置结论

主站下一步可以进入域名绑定和部署配置。上线前必须由用户提供：

- `ADMIN_KEY`
- `LEAD_WEBHOOK_FEISHU` 或 `LEAD_WEBHOOK_WECHAT`
- 是否配置 `NEXT_PUBLIC_GA_ID`
