# 实验记录：Cloudflare Tunnel 临时公网预览

## 实验目标

在不改业务代码、不做正式部署的前提下，将当前本地 Next.js `npm run dev` 站点临时暴露为可发客户查看的公网链接。

## 实验设定

- 本地开发地址：`http://127.0.0.1:3000`
- 预览方式：Cloudflare Quick Tunnel
- 执行环境：Windows 本地开发机
- 代码改动：无

## 关键变量

- `winget` 是否可直接安装 `cloudflared`
- 本地 `3000` 端口是否稳定可访问
- Tunnel 建立后公网 `/`、`/solutions`、`/diagnosis` 是否能返回 `200`

## 观察结果

1. 本地 `3000` 端口正常监听，可作为 Tunnel 源站。
2. `winget install Cloudflare.cloudflared` 因本机 `winget` 源缺失数据失败，未采用系统级安装。
3. 改为下载官方便携版 `cloudflared.exe` 到 `custom/tools/cloudflared.exe`，不修改系统组件。
4. 成功建立 Quick Tunnel，得到公网预览链接：
   - `https://upload-immune-thanks-advertise.trycloudflare.com`
5. 首次公网检测中，`/` 与 `/solutions` 返回 `200`，`/diagnosis` 曾短暂返回 `500`。
6. 复测本地 `http://127.0.0.1:3000/diagnosis` 返回 `200`，再次复测公网 `/diagnosis` 也恢复为 `200`。

## 初步结论

- 本次问题不在业务代码，而在于临时 Tunnel 刚建立后的短暂访问波动。
- 便携版 `cloudflared` 是当前环境下最小改动、最低风险的临时公网预览方案。
- 当前链接已经可用于客户预览，并且本地代码更新后会继续同步到该临时链接。

## 是否值得继续

值得保留为后续“给客户临时预览”的默认方案，但应注意：

- Quick Tunnel 不是正式上线方案，稳定性没有保证。
- 若后续需要长时间稳定预览，建议改为命名 Tunnel 或正式服务器部署。
