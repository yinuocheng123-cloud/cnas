# CNAS 主站部署说明

## 1. 正式部署目录

服务器主站目录：

```bash
/www/wwwroot/cnas-main
```

部署时只进入该目录，不修改其它网站目录。

## 2. 标准部署命令

正式部署统一使用以下流程：

```bash
cd /www/wwwroot/cnas-main
git restore package-lock.json
git pull --ff-only
npm ci
npm run build
pm2 restart cnas-main --update-env
```

## 3. 为什么使用 npm ci

服务器正式部署不再使用 `npm install`。

原因：

- `npm ci` 会严格按照 `package-lock.json` 安装依赖；
- 更适合线上环境复现 GitHub 仓库中的依赖状态；
- 避免服务器上因为 `npm install` 产生新的 lockfile 差异；
- 减少后续 `git pull --ff-only` 被本地文件变化阻塞的概率。

## 4. 为什么先执行 git restore package-lock.json

服务器历史上执行过 `npm install`，可能导致 `package-lock.json` 出现本地变化。

部署前执行：

```bash
git restore package-lock.json
```

只用于清理服务器上 lockfile 的本地差异，确保后续：

```bash
git pull --ff-only
```

可以正常快进拉取。

## 5. 禁止操作

线上部署不要执行：

- `git reset --hard`
- `git pull --force`
- `git push --force`
- 删除服务器文件
- 清空 `/www/wwwroot`
- 覆盖其它网站目录
- 覆盖 `.env.production`
- 提交或打印真实密钥

如果 `git pull --ff-only` 失败，应先查看错误原因，不要强行 reset。

## 6. 环境变量

服务器环境变量通常在：

```bash
/www/wwwroot/cnas-main/.env.production
```

该文件不应提交到 Git。

后台和站点运行至少需要关注：

```env
SITE_URL=
ADMIN_KEY=
ADMIN_USERNAME=
ADMIN_PASSWORD=
LEAD_WEBHOOK_FEISHU=
LEAD_WEBHOOK_WECHAT=
NEXT_PUBLIC_GA_ID=
```

不要在文档、记录或聊天中公开真实密钥。

## 7. PM2 进程

当前主站 PM2 进程名：

```bash
cnas-main
```

环境变量更新后需要使用：

```bash
pm2 restart cnas-main --update-env
```

## 8. 部署后检查

部署完成后建议检查：

```bash
pm2 list
curl -I https://www.cnaszhinan.com/
curl -I https://www.cnaszhinan.com/admin/login
```

后台功能更新后，应使用真实浏览器或 Playwright 验证：

- 登录；
- 后台导航；
- 新建草稿；
- 保存草稿；
- 查看草稿；
- 预览草稿；
- POST 退出登录；
- 退出后访问 `/admin` 是否回到登录页。

## 9. GitHub 网络失败时

如果服务器访问 GitHub 失败，不要 reset、不要 force pull、不要删除文件。

可使用之前验证过的 Git bundle 安全同步方案，把本地已验证 commit 打包上传到服务器后再快进合并。
