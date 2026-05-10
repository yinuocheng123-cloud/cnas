# DEPLOY_LOG

## 2026-05-09 v1

### 1) 目标与约束
- 目标：将当前项目部署到 `218.244.153.121`，并可通过 `http://218.244.153.121` 直接访问。
- 约束：不重装 nginx、不删除系统文件、最小改动、Node 项目使用 PM2。

### 2) 项目结构分析结果
- 技术栈：`Next.js 15 + React 19 + TypeScript + Tailwind`
- 运行方式：`npm run build` + `npm run start`
- 服务类型：Node Web 服务（需反向代理）
- 进程守护：PM2（符合要求）
- 端口建议：应用运行在 `127.0.0.1:3000`，Nginx 监听 `80` 反代到 `3000`

### 3) 部署方案（先输出后执行）
1. 连接服务器并创建应用目录（例如 `/www/wwwroot/cnas-site`）。
2. 上传代码（`git clone` 或 `rsync/scp`）。
3. 安装 Node.js 运行环境（仅在缺失时安装，不重装已有）。
4. 安装项目依赖：`npm ci`（无 lock 时退回 `npm install`）。
5. 构建：`npm run build`。
6. 用 PM2 启动：`pm2 start npm --name cnas-site -- start`。
7. 设置 PM2 开机自启：`pm2 save` + `pm2 startup`（按输出执行）。
8. 配置 Nginx 站点（IP 站点）：
   - `listen 80;`
   - `server_name 218.244.153.121;`
   - `location / { proxy_pass http://127.0.0.1:3000; ... }`
9. `nginx -t` 验证并 `nginx -s reload`。
10. 本机与服务器双侧验证：
   - `curl -I http://127.0.0.1:3000`（应用本地）
   - `curl -I http://218.244.153.121`（公网）
11. 验收：
   - 页面可访问
   - 静态资源正常
   - 无 502
   - PM2 正常运行
   - Nginx 配置通过

### 4) 待执行前置条件
- 需要服务器登录凭据（SSH 用户名 + 密码或密钥 + 端口）。
- 如宝塔限制 SSH，还需宝塔终端或面板登录信息。

### 5) 执行状态
- 当前状态：`WAITING_FOR_SERVER_CREDENTIALS`
- 原因：尚未收到可登录服务器的凭据，无法执行远程部署命令。

---

## 2026-05-09 v2（远程连接探测）

### 已执行步骤（仅探测，无服务器改动）
1. 本地确认 `ssh` 可用：
   - `C:\WINDOWS\System32\OpenSSH\ssh.exe`
2. 本地 SSH 目录检查：
   - 仅发现 `known_hosts`
   - 未发现可直接使用的私钥文件
3. 对目标服务器做无交互连接测试：
   - 命令：`ssh -o BatchMode=yes ... 218.244.153.121`
   - 初始结果：`Host key verification failed`
4. 做一次最小本机修复：
   - 添加主机指纹（仅本机 known_hosts）
5. 再次无交互测试并临时跳过 host key 校验：
   - 结果：`Permission denied (publickey,password)`

### 结论
- 网络可达，SSH 服务可达，主机键可识别。
- 当前执行环境缺少可用登录凭据（公钥或密码注入）。
- 阻塞发生在认证阶段，不在部署步骤阶段。

### 风险判断
- 当前未对服务器执行任何改动命令。
- 未修改 nginx 配置、未安装依赖、未创建目录、未影响其他站点。

### 下一步（待凭据）
拿到可用 SSH 凭据后，按 v1 方案继续执行：
- 环境检测
- 上传/拉取代码
- 安装依赖
- build
- PM2 启动
- Nginx 站点配置（独立文件）
- 验证公网访问

---

## 2026-05-09 v3（收到凭据后的首次部署尝试）

### 已确认环境
- SSH 登录成功：`root@218.244.153.121:22`
- 系统：`Alibaba Cloud Linux 3`
- Node.js：`v20.20.0`
- npm：`10.8.2`
- Nginx：`1.20.1`，状态 `active`
- 80 端口监听正常
- Nginx 主配置使用：`/etc/nginx/conf.d/*.conf`
- 现有站点配置：`/etc/nginx/conf.d/nextapp.conf`
- 当前 `nextapp.conf` 已将 `80` 默认流量反代到 `127.0.0.1:3000`

### 首次部署执行结果
- 已尝试通过远程脚本执行以下动作：
  - 创建应用目录 `/www/wwwroot/cnas-site`
  - 拉取仓库
  - 安装依赖
  - `npm run build`
  - 安装 PM2（缺失时）
  - 用 PM2 启动 `next start -p 3000`
  - `nginx -t` 与 reload

### 当前结果
- 部署未成功完成
- 复核结果：
  - `/www/wwwroot/cnas-site` 不存在
  - `pm2` 不存在
  - `127.0.0.1:3000` 没有服务监听
  - 公网访问结果：`502 Bad Gateway`

### 判断
- 失败发生在部署脚本较早阶段
- 因为应用目录未创建成功且 PM2 未安装，说明脚本大概率在：
  - 拉仓库
  - 网络访问 GitHub
  - 或命令执行早期
  处中断

### 风险状态
- 未修改 Nginx 主配置
- 未覆盖其他站点
- 当前仅保留原有 `nextapp.conf`
- 风险集中在“80 端口已指向 3000，但 3000 无服务”，因此公网暂时返回 502

### 下一步
- 继续做精确排障：
  - 检查服务器能否访问 GitHub
  - 检查 `git` 是否存在
  - 检查 `/www/wwwroot` 可写性
  - 必要时改为本地打包上传而不是远程拉仓库

---

## 2026-05-09 v4（分步部署进展）

### 已完成
- 代码已成功克隆到：`/www/wwwroot/cnas-site`
- `npm ci` 成功
- `npm run build` 成功
- PM2 安装命令已执行成功（从 npm 输出确认）

### 当前剩余问题
- 当前非交互 shell 中执行 `pm2` 报 `command not found`
- 判断为：PM2 已安装，但全局 npm bin 目录未进入当前 shell 的 PATH

### 处理策略
- 不修改系统全局配置
- 不重装任何组件
- 直接使用 PM2 的绝对路径启动应用

### 风险判断
- 这是低风险修正，不影响其他站点
- 不会覆盖 Nginx 配置
- 不涉及系统文件删除

### 补充发现
- 首次用 `find` 匹配 PM2 路径时，命中了 PM2 的模板文件：
  - `/usr/local/node/node-v20.20.0-linux-x64/lib/node_modules/pm2/lib/templates/logrotate.d/pm2`
- 这不是可执行文件，因此需要继续精确定位真正的 `pm2` 可执行脚本（通常位于 `bin/pm2`）。

---

## 2026-05-09 v5（部署完成）

### 最终执行结果
- 真实 PM2 可执行路径已定位：
  - `/usr/local/node/node-v20.20.0-linux-x64/lib/node_modules/pm2/bin/pm2`
- 应用已通过 PM2 启动：
  - 进程名：`cnas-site`
  - 端口：`3000`
- PM2 进程列表已保存：`pm2 save`
- PM2 开机自启已启用：
  - `systemd` 服务：`pm2-root.service`
  - 已执行 `systemctl enable pm2-root`
- 本地回源验证成功：
  - `curl -I http://127.0.0.1:3000` → `200 OK`
- 公网访问验证成功：
  - `curl -I http://218.244.153.121` → `200 OK`

### 最终部署结构
- 项目运行目录：
  - `/www/wwwroot/cnas-site`
- Nginx 配置路径：
  - `/etc/nginx/conf.d/nextapp.conf`
- 反向代理路径：
  - `Nginx :80 -> 127.0.0.1:3000`

### 本次遵守情况
- 未重装 Nginx
- 未覆盖 Nginx 主配置
- 未删除系统文件
- 未修改无关目录
- 所有变更以最小改动完成

### 风险项
- 当前 `nextapp.conf` 不是本次新建，而是服务器上原本已存在的默认 IP 站点配置
- 本次没有改写它的内容，因为它已经正确指向 `127.0.0.1:3000`
- 若未来服务器还要挂载其他 IP 默认站点，需要重新规划 80 端口默认 server 的归属

### 后续正式上线建议
1. 绑定正式域名后，将 `SITE_URL` 配置为真实域名
2. 如需 HTTPS，新增独立证书配置并保留当前反代结构
3. 建议补充 `.env.production`，集中管理：
   - `SITE_URL`
   - `ADMIN_KEY`
   - `LEAD_WEBHOOK_FEISHU`
   - `LEAD_WEBHOOK_WECHAT`
4. 建议为 `/www/wwwroot/cnas-site` 增加发布脚本，后续更新可复用 `git pull + npm ci + build + pm2 restart`
