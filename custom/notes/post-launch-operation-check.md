# CNAS认可指南主站上线后运营检查

## 检查时间

2026-05-25 22:24:55 CST

## 当前上线状态

- 主站地址：https://cnaszhinan.com
- www 地址：https://www.cnaszhinan.com
- 部署目录：/www/wwwroot/cnas-main
- PM2 进程：cnas-main
- 端口：3100
- 当前状态：已上线，HTTPS 可访问，PM2 online。

## HTTPS 状态

- http://cnaszhinan.com：301 跳转 HTTPS。
- http://www.cnaszhinan.com：301 跳转 HTTPS。
- https://cnaszhinan.com：200 OK。
- https://www.cnaszhinan.com：200 OK。
- SSL 证书已配置，到期时间：2026-08-23。

## 主站接口状态

- 真实线索接口：https://cnaszhinan.com/api/lead
- 接口可接收成交页字段格式。
- /api/lead 已允许 https://path.cnaszhinan.com 跨域 POST。

## 成交页提交状态

- 成交页已配置提交到 https://cnaszhinan.com/api/lead。
- 已用成交页字段格式提交联调测试线索。
- 接口返回 success: true。
- 当前 deliveryStatus 为 local_backup_only。

## 后台查看状态

- 后台地址格式：https://cnaszhinan.com/admin/leads?key=ADMIN_KEY
- ADMIN_KEY 已配置，但不写入本记录。
- 后台可看到测试线索。
- 最近测试线索包含“成交页联调测试企业”。

## webhook 状态

- SITE_URL：已配置。
- ADMIN_KEY：已配置。
- LEAD_WEBHOOK_FEISHU：未配置。
- LEAD_WEBHOOK_WECHAT：未配置。
- NEXT_PUBLIC_GA_ID：未配置。

结论：当前线索只能进入本地备份和后台，不会主动通知运营人员。上线运营前应至少配置一个 webhook。

## 占位信息状态

成交页仍存在占位信息：企业微信二维码、电话、微信 / 企业微信、邮箱。主站后台与接口不依赖这些占位信息，但真实运营前需要统一替换。

## 备案号状态

未检测到备案号。不要编造备案号。待用户提供真实备案号后，应在主站 footer 添加备案号，并链接到 https://beian.miit.gov.cn/。

## 服务器资源状态

- 磁盘：/ 总容量 118G，已用 47G，可用 67G，使用率 41%。空间充足。
- 内存：总计 7.4GiB，可用约 4.1GiB。内存充足。
- /www/wwwroot/cnas-main：约 667M。
- PM2 cnas-main：online。
- 端口：80、443、3100 正常监听。
- 未发现本轮检查对其它网站造成影响。

## 下一步需要用户补齐的真实资料

1. LEAD_WEBHOOK_FEISHU 或 LEAD_WEBHOOK_WECHAT，至少配置一个。
2. 真实企业微信二维码。
3. 真实电话。
4. 真实邮箱。
5. 真实微信 / 企业微信文案。
6. 真实备案号。
7. 浏览器端真实表单提交复测。

## 真实运营配置补齐记录：2026-05-25 22:44:38 CST

本轮只处理真实运营入口，不新增功能、不重构系统、不修改其它网站。

### webhook 状态

- LEAD_WEBHOOK_FEISHU：未配置。
- LEAD_WEBHOOK_WECHAT：未配置。
- webhook 测试：未执行，原因是用户尚未提供真实 webhook。
- deliveryStatus：仍为 local_backup_only。

结论：当前线索可以进入主站本地备份和后台，但不会主动通知运营人员。

### 企业微信二维码状态

- 成交页企业微信二维码已替换为用户提供的真实二维码图片。
- 原占位图已备份为 /www/wwwroot/cnas-path/assets/wecom-qr-placeholder.backup.png。
- 线上图片 https://path.cnaszhinan.com/assets/wecom-qr-placeholder.png 返回 200，且与服务器文件一致。
- 手机扫码：服务器侧无法代替用户手机扫码，仍需用户用手机确认是否能识别并正常添加企业微信。

### 表单链路状态

- 成交页表单仍提交到 https://cnaszhinan.com/api/lead。
- 二维码替换后已提交测试线索。
- 后台已能看到“二维码替换后成交页测试企业”测试线索。

### 仍待用户补齐

- LEAD_WEBHOOK_FEISHU 或 LEAD_WEBHOOK_WECHAT，至少配置一个。
- 真实电话。
- 真实邮箱。
- 真实微信 / 企业微信文案。
- 真实备案号，并链接到 https://beian.miit.gov.cn/。
- 用户手机扫码确认二维码可识别并能正常添加企业微信。

## ICP 备案号补充记录：2026-05-25

本轮只补充备案号展示与链接，不新增功能、不重构系统、不修改密钥、不修改 webhook、不改动其它网站。

### 备案号信息

- 用户提供备案号：浙ICP备2020044218号-3。
- 链接地址：https://beian.miit.gov.cn/。
- 本轮按用户提供文本添加，不编造 “-1” 或其它网站序号。
- 提醒：用户已补充准确完整网站备案号为“浙ICP备2020044218号-3”，当前页面已按该编号展示；后续如备案信息发生变化，再以工信部备案系统查询结果为准替换。

### 主站处理结果

- 已在主站统一 Footer 组件添加备案号链接。
- https://cnaszhinan.com 已可在页面 HTML 中读取到备案号和备案链接。
- https://www.cnaszhinan.com 已可在页面 HTML 中读取到备案号和备案链接。
- 备案号位于 footer 区域，未放入隐藏区域，移动端同样会输出该 footer。
- 已执行 npm run build，并仅重启 PM2 进程 cnas-main。
- 因主站曾命中宝塔 Nginx 全局代理缓存，已仅在 /www/server/panel/vhost/nginx/cnaszhinan.com.conf 的主站 location / 中显式关闭代理缓存，并通过 nginx -t 后 reload Nginx。未修改其它站点配置。

### 未改动项

- 未修改 ADMIN_KEY。
- 未修改 LEAD_WEBHOOK_FEISHU / LEAD_WEBHOOK_WECHAT。
- 未修改其它网站目录。
- 未新增数据库。

## 主站路径判断整合记录：2026-05-26

本轮只处理 CNAS认可指南主站，不继续优化 `path.cnaszhinan.com` 成交页内容。

### 整合状态

- 主站首页已整合原成交页核心路径判断逻辑。
- 首页新增 `#path-check` 路径判断锚点，用于承接用户填写基础信息并生成 A/B/C 初步诊断。
- 企业微信二维码已复制到主站公开资源目录 `public/wecom-qr.png`，不直接引用成交页目录。
- Footer 已调整为品牌信任、服务内容、企业微信承接和备案号结构。
- 备案号仍为：`浙ICP备2020044218号-3`。
- 备案链接仍为：`https://beian.miit.gov.cn/`。

### 旧成交页处理策略

- `path.cnaszhinan.com` 不再作为独立成交系统继续运营。
- 旧成交页目录保留为服务器备份，不物理删除。
- 主站部署验证通过后，计划仅通过 `path.cnaszhinan.com` 对应 Nginx 配置做 301 跳转到 `https://cnaszhinan.com/#path-check`。
- 不改动其它网站 Nginx 配置。

### 待部署后补充

- 主站线上首页已正常显示，页面 HTML 可读取到 `#path-check`、企业微信二维码 `/wecom-qr.png` 和备案号。
- 主站表单已能提交到 `/api/lead`，测试企业名为“主站整合测试企业20260526H”。
- 后台已能看到主站测试线索，校验过程中未输出 `ADMIN_KEY`。
- `path.cnaszhinan.com` 已通过 Nginx 301 到 `https://cnaszhinan.com/#path-check`。
- HTTP 与 HTTPS 访问 `path.cnaszhinan.com` 均返回 301。
- 旧成交页目录 `/www/wwwroot/cnas-path` 保留为备份，未删除。
- PM2 `cnas-main` 已在构建和类型检查通过后重启，当前线上首页正常返回。

### Nginx 收口记录

- 仅修改 `/www/server/panel/vhost/nginx/path.cnaszhinan.com.conf`。
- 修改前已备份为 `/www/server/panel/vhost/nginx/path.cnaszhinan.com.conf.bak-main-integration-20260526`。
- 保留 ACME challenge 配置，避免影响证书续期校验。
- `nginx -t` 通过后执行 reload。
- 未修改其它网站 Nginx 配置。

## 主站首页过度整合修复记录：2026-05-26

### 修复原因

上一轮把 path 成交页逻辑过度整合进主站首页，导致电脑版首页变成成交页风格，偏离 CNAS认可指南主站的内容入口定位。

### 修复结果

- 电脑版首页主体已恢复为原 CNAS认可指南主站结构。
- 电脑版首页不再使用上一轮新增的整页成交式首页组件。
- 电脑版仅保留 footer 层面的企业微信二维码、服务内容和备案号优化。
- 手机版保留轻量路径判断引导，但不放完整长表单，不照搬成交页。
- `path.cnaszhinan.com` 已撤回 301，恢复独立成交页访问。
- 未删除 `/www/wwwroot/cnas-path`。
- 未修改成交页内容。
- 未修改主站后台、`/api/lead`、`ADMIN_KEY`、webhook、HTTPS、PM2 或其它网站。

### 当前状态

- `https://path.cnaszhinan.com` 返回 200。
- `http://path.cnaszhinan.com` 只跳转到 `https://path.cnaszhinan.com/`。
- 备案号仍为：`浙ICP备2020044218号-3`。
- 备案链接仍为：`https://beian.miit.gov.cn/`。

## 手机端首页体验优化记录：2026-05-26

本轮仅做 CNAS认可指南主站手机端体验优化，电脑版首页结构、模块顺序和桌面主体内容保持不动。

### 调整内容

- 手机首屏增加轻量路径判断视觉卡片。
- 手机痛点模块改为三条短卡片。
- 手机路径判断模块保留六项核心判断。
- 手机端新增企业微信承接卡片，使用 `/wecom-qr.png`。
- 手机 FAQ 改为折叠式，减少页面长度。
- 手机 footer 居中整理，二维码更清晰。

### 未改动项

- 未修改电脑版首页主体结构。
- 未修改 `path.cnaszhinan.com`。
- 未修改 Nginx。
- 未修改 `/api/lead`。
- 未修改后台权限和 `ADMIN_KEY`。
- 未新增外部图片或第三方依赖。

### 验证结果

- `npm run build`：服务器通过。
- `npm run typecheck`：服务器通过。
- PM2 `cnas-main`：online。
- `https://cnaszhinan.com`：返回 200。
- `https://www.cnaszhinan.com`：返回 200。
- `https://path.cnaszhinan.com`：返回 200。
- 375px 手机视口检查：未发现横向滚动，手机端关键模块和二维码可见。
