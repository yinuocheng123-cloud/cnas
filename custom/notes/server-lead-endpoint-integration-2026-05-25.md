# 服务器联调记录：成交页进入主站线索系统

## 时间

2026-05-25 21:53:00 CST

## 目标

确认 https://path.cnaszhinan.com 的成交页表单是否真实提交到主站 https://cnaszhinan.com/api/lead，并进入主站后台线索页。

## 检查结论

- 主站真实线索接口：https://cnaszhinan.com/api/lead
- 成交页原始 LEAD_FORM_ENDPOINT：空字符串，属于模拟提交。
- 已补充 CORS：仅允许 https://path.cnaszhinan.com 对 /api/lead 发起 POST/OPTIONS。
- 已补充主站 API 字段别名兼容：支持成交页的 labType、timeline、notes、utm、concerns、diagnosisSummary 等字段映射到主站线索结构。

## 测试结果

- OPTIONS 预检：204，返回 Access-Control-Allow-Origin: https://path.cnaszhinan.com。
- 成交页字段格式 POST：200，返回 success: true。
- 后台 /admin/leads?key=ADMIN_KEY：可查到测试线索。
- 当前 webhook 未配置，deliveryStatus 为 local_backup_only。

## 未完成项

- 配置 LEAD_WEBHOOK_FEISHU 或 LEAD_WEBHOOK_WECHAT。
- 替换成交页真实企业微信二维码、电话、邮箱。
- 真实用户路径的浏览器表单提交复测。
