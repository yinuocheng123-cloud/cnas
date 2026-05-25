# 服务器部署记录：CNAS主站 2026-05-25

## 部署时间

2026-05-25 20:47:55 CST

## 服务器信息

- 服务器 IP：123.60.14.103
- 部署目录：/www/wwwroot/cnas-main
- Git 仓库：https://github.com/yinuocheng123-cloud/cnas.git
- 分支：master
- 最新 commit：88970abfc3a93dd927b20da1e383a3e5807f2264

## 部署方式

服务器到 GitHub HTTPS clone 连续出现 TLS 连接中断，本次改用本地已推送版本生成 git bundle，经 SCP 上传到服务器后从 bundle 克隆，并将 origin 设置回 GitHub 仓库。

## 构建与进程

- Node.js：v20.20.2
- npm：10.8.2
- PM2：7.0.1
- PM2 进程名：cnas-main
- 端口：3100
- 启动方式：PORT=3100 pm2 start npm --name cnas-main -- start

## Nginx 配置

- 配置文件：/www/server/panel/vhost/nginx/cnaszhinan.com.conf
- 监听：80
- 域名：cnaszhinan.com、www.cnaszhinan.com
- 反向代理：http://127.0.0.1:3100

## 环境变量

已创建 /www/wwwroot/cnas-main/.env.production。

- SITE_URL：已配置为 https://cnaszhinan.com
- ADMIN_KEY：已生成复杂随机密钥，未写入本记录
- LEAD_WEBHOOK_FEISHU：暂未配置
- LEAD_WEBHOOK_WECHAT：暂未配置
- NEXT_PUBLIC_GA_ID：暂未配置

说明：当前没有配置 webhook，线索通知暂不可用，只能写入本地兜底文件并通过后台临时查看。

## SSL 状态

已配置 SSL。证书路径：/etc/letsencrypt/live/cnaszhinan.com/fullchain.pem；到期时间：2026-08-23。HTTP 已跳转 HTTPS。

## 测试结果

- npm install：通过，但服务器 npm 曾改写 package-lock.json，已恢复到仓库版本。
- npm run build：通过。
- npm run typecheck：通过。
- PM2：cnas-main online。
- curl -I http://127.0.0.1:3100：200 OK。
- Nginx Host 测试 cnaszhinan.com：200 OK。
- Nginx Host 测试 www.cnaszhinan.com：200 OK。
- HTTPS 测试 cnaszhinan.com：www.cnaszhinan.com：200 OK；HTTP 已 301 跳转 HTTPS。
- 后台 /admin/leads?key=ADMIN_KEY：200 OK。
- API /api/lead：测试线索提交成功，deliveryStatus 为 local_backup_only。
- 风险词扫描：未发现包过、保证通过、官方指定、唯一、最权威、100%通过、必过；源码中保留 CNAS认证 作为搜索兼容词和解释性内容。

## 未完成项

- DNS 解析到 123.60.14.103。
- SSL 证书申请与强制 HTTPS：已完成。
- 配置 LEAD_WEBHOOK_FEISHU 或 LEAD_WEBHOOK_WECHAT。
- 如需对外共享后台地址，需要安全保存 ADMIN_KEY。
- 线上公网域名真实访问测试。
