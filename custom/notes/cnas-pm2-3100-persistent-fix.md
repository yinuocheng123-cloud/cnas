# 版本记录：cnas-pm2-3100-persistent-fix

## 1. 本轮目标

本轮目标是把 CNAS 主站从“手动启动后暂时恢复”推进到“后续部署和运维都能稳定复用”的状态。重点不是新增功能，而是统一 CNAS 主站的 PM2 进程名、运行目录、端口和部署文档，避免后续误重启服务器上其它项目。

本轮优先处理的原因是：线上曾出现 `502 Bad Gateway`，直接原因是 Nginx 代理到 `127.0.0.1:3100`，但当时没有正确的 CNAS Next.js 服务监听 3100。

## 2. 背景与上下文

本轮承接 `custom/notes/cms-content-backup-export-v1.md` 和当前 `DEPLOY.md` 的部署流程。CMS v1.3 已要求部署前保护 JSON 内容，但此前文档中仍存在旧 PM2 进程名 `cnas-main`。

服务器排查时确认：原 `cnas-main` 进程实际运行目录是 `/home/web1`，不是 `/www/wwwroot/cnas-main`。因此它不应再被当作 CNAS 主站进程，也不应被 CNAS 部署流程重启。

## 3. 问题分析

表面现象是公网返回 502。核心矛盾是 Nginx 与 PM2 进程认知不一致：

- CNAS 主站 Nginx 配置代理到 `127.0.0.1:3100`；
- 原 `cnas-main` PM2 进程实际目录是 `/home/web1`，且不是 CNAS 主站；
- 正确 CNAS 项目目录应为 `/www/wwwroot/cnas-main`；
- 如果后续部署仍执行 `pm2 restart cnas-main --update-env`，可能重启错误项目，CNAS 站点也可能再次无人监听 3100。

因此本轮必须把 CNAS 主站固化为独立进程 `cnas-main-3100`。

## 4. 候选方案比较

### 方案一：继续沿用 `cnas-main`

优点是命令变化少。

缺点是该进程实际属于 `/home/web1`，继续沿用会影响其它项目，也无法保证 CNAS 主站监听 3100。

结论：放弃。

### 方案二：停止或重命名原 `cnas-main`

优点是 PM2 列表更干净。

缺点是原进程属于其它项目，停止、删除或重命名都有跨项目风险，不符合“不要影响其它网站”的要求。

结论：放弃。

### 方案三：保留原 `cnas-main`，新增并固化 CNAS 专用进程 `cnas-main-3100`

优点是边界清楚，不影响 `/home/web1`，也能与 CNAS Nginx 的 3100 端口保持一致。

缺点是 PM2 中会同时存在旧进程和新进程，后续操作人员必须看清进程名。

结论：采用。

## 5. 最终决策

CNAS 主站统一使用：

- PM2 进程名：`cnas-main-3100`
- 运行目录：`/www/wwwroot/cnas-main`
- 端口：`3100`
- 环境：`NODE_ENV=production`

原 `cnas-main` 不是 CNAS 主站进程，不在本轮停止、删除或重命名，后续 CNAS 部署也不得重启它。

## 6. 具体实现

本轮实际改动：

- 更新 `DEPLOY.md`，把 CNAS 部署、重启、异常恢复和验证命令统一改为 `cnas-main-3100`。
- 在 `DEPLOY.md` 中明确标注：原 `cnas-main` 实际目录是 `/home/web1`，不是 CNAS 主站，不要重启。
- 检查项目根目录，未发现正式 `ecosystem.config.*`。
- 检查 `package.json`，确认构建命令为 `next build`，启动命令为 `next start`。
- 更新当前仍具指导意义的 CMS 使用与同步说明，把重启命令改为 `pm2 restart cnas-main-3100 --update-env` 并补 `pm2 save`。

## 7. 本轮优点

- CNAS 主站进程名与端口绑定更清晰。
- 避免后续误重启 `/home/web1` 项目。
- `DEPLOY.md` 中的恢复、部署、验证命令可以直接用于后续运维。
- 保留原进程不动，降低对其它站点的影响。

## 8. 本轮缺点与代价

当前方案没有清理原 `cnas-main`，因此 PM2 列表中仍可能同时出现 `cnas-main` 和 `cnas-main-3100`。这是为了避免误伤其它项目而接受的代价。

另外，本轮没有新增正式 `ecosystem.config.js`。这样可以减少部署方式变化，但后续如果希望更强固化，可以单独新增 CNAS 专用 ecosystem 配置。

## 9. 验证与结果

本轮需要验证：

- `pm2 list` 中存在 `cnas-main-3100`；
- `pm2 describe cnas-main-3100` 的运行目录是 `/www/wwwroot/cnas-main`；
- `PORT` 为 `3100`；
- `NODE_ENV` 为 `production`；
- `https://cnaszhinan.com/` 返回 `200 OK`；
- `https://www.cnaszhinan.com/articles` 返回 `200 OK`；
- `https://www.cnaszhinan.com/admin/login` 返回 `200 OK`。

已完成验证：

- 服务器当前目录确认是 `/www/wwwroot/cnas-main`；
- 服务器当前代码提交为 `e4f9f73`；
- `package.json` 中 `build` 为 `next build`，`start` 为 `next start`；
- 未发现正式 `ecosystem.config.*`；
- 已执行 `PORT=3100 NODE_ENV=production pm2 restart cnas-main-3100 --update-env`；
- 已执行 `pm2 save`；
- `pm2 describe cnas-main-3100` 显示状态为 `online`；
- `pm2 describe cnas-main-3100` 显示 `exec cwd` 为 `/www/wwwroot/cnas-main`；
- `pm2 env 22` 显示 `PORT=3100`、`NODE_ENV=production`；
- `ss -lntp` 显示 3100 端口由 Next 服务监听；
- `https://cnaszhinan.com/` 返回 `200 OK`；
- `https://www.cnaszhinan.com/articles` 返回 `200 OK`；
- `https://www.cnaszhinan.com/admin/login` 返回 `200 OK`。

## 10. 本轮结论

CNAS 主站后续不应再依赖原 `cnas-main`。正确运维对象是 `cnas-main-3100`，它必须运行在 `/www/wwwroot/cnas-main` 并监听 3100。

## 11. 下一轮建议

1. 如需进一步固化，可新增 CNAS 专用 `ecosystem.config.js`，但要先确认不会改变现有部署习惯。
2. 后续每次部署前继续先执行 CMS JSON 备份。
3. 服务器上旧 `cnas-main` 归属其它项目，除非确认该项目负责人和用途，否则不要操作。
