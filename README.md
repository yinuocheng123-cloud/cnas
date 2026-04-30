# CNAS 专业知识与认可解决方案平台

## 1. 项目定位

本项目是一个面向企业的 CNAS 专业内容平台 Demo，核心定位为：

**CNAS专业知识与认可解决方案平台**

平台围绕 CNAS认可、实验室能力建设、体系运行、认可范围规划、评审风险和持续改进，帮助企业在启动 CNAS 前看清流程、风险、投入与建设路径。

当前阶段不是普通企业站点，也不是低专业度证书结果导向页面。品牌仅作为后端咨询服务承接方，在咨询入口和关于平台页中适度出现。

## 2. 技术栈

- Next.js App Router
- TypeScript
- Tailwind CSS
- 本地 TypeScript 数据文件模拟内容
- Prisma / PostgreSQL 预留
- SEO metadata
- sitemap.ts
- robots.ts

## 3. 本地启动命令

安装依赖：

```bash
npm install
```

本地开发：

```bash
npm run dev
```

类型检查：

```bash
npm run typecheck
```

生产构建：

```bash
npm run build
```

默认本地访问地址：

```text
http://127.0.0.1:3000
```

## 4. 页面路由

核心页面：

- `/` 首页
- `/knowledge` CNAS 知识库总入口
- `/diagnosis` CNAS 启动前风险诊断
- `/solutions` 行业方案
- `/cases` 案例解析
- `/services` 服务咨询
- `/about` 关于平台
- `/faqs` CNAS 常见问题聚合

知识库文章：

- `/knowledge/what-is-cnas`
- `/knowledge/cnas-process`
- `/knowledge/cnas-cost`
- `/knowledge/cnas-cycle`
- `/knowledge/cnas-risk`
- `/knowledge/lab-construction`

栏目页：

- `/cnas-basic`
- `/cnas-process`
- `/cnas-cost`
- `/cnas-risk`
- `/cnas-lab`
- `/cnas-faq`

行业方案详情：

- `/solutions/manufacturing-lab`
- `/solutions/testing-lab`
- `/solutions/regulated-lab`

聚合页：

- `/categories/[category]`
- `/tags/[tag]`

SEO 文件：

- `/sitemap.xml`
- `/robots.txt`

## 5. 数据文件说明

主要内容数据位于 `src/data/`：

- `src/data/articles.ts`：知识库文章数据，支持分类、标签、关键词、FAQ、相关推荐和 SEO 字段。
- `src/data/categories.ts`：CNAS 内容分类数据。
- `src/data/tags.ts`：标签数据。
- `src/data/faqs.ts`：FAQ 聚合数据。
- `src/data/cases.ts`：案例解析数据，统一为“问题—动作—结果”结构。
- `src/data/services.ts`：服务咨询数据，包含适合企业、常见问题、支持内容、交付结果和风险提醒。

站点级聚合数据位于：

- `lib/site-data.ts`

SEO 配置位于：

- `lib/seo.ts`

Prisma / PostgreSQL 预留位于：

- `prisma/schema.prisma`

## 6. SEO / sitemap / robots 说明

项目已实现基础 SEO 能力：

- 每个主要页面配置 `title`、`description`、`canonical` 和 Open Graph 基础信息。
- 动态文章页根据文章数据生成 metadata。
- 分类页和标签页根据对应聚合数据生成 metadata。
- `app/sitemap.ts` 生成 sitemap。
- `app/robots.ts` 生成 robots。

当前 canonical 基准域名在 `lib/seo.ts` 中配置：

```ts
export const siteUrl = "https://www.hangyukeji.com";
```

上线前需要确认并替换为真实生产域名。

## 7. 当前版本记录

当前可上线前检查版本：

```text
v0.6 production readiness
```

上一轮确认 commit：

```text
dfb747180dcd5375044bd3897719339e79a6497b
```

当前版本完成内容：

- CNAS 专业内容平台定位收口。
- GEO 文章结构：直接回答、分类、标签、更新时间、正文、判断清单、FAQ、相关推荐和咨询入口。
- TEO 转化结构：风险提示、判断清单、服务边界、案例拆解、启动前诊断入口。
- SEO 基础设施：metadata、sitemap、robots。
- 分类、标签、FAQ、方案、案例、服务等本地数据结构。
- 全站 CNAS 用词统一：以“CNAS认可”为主，“CNAS认证”仅作为搜索兼容词。
- 上线前自检覆盖：核心页面、知识库文章、栏目页、分类页、标签页、sitemap、robots、移动端主要页面。

## 8. 后续开发建议

建议优先级：

1. 确认正式域名，替换 `lib/seo.ts` 中的 `siteUrl`。
2. 持续补充各栏目下的长尾文章，保持当前 GEO 内容结构。
3. 若内容量扩大，先将 `Article`、`Category`、`Tag`、`CaseItem`、`ServiceItem`、`Solution` 映射为 Prisma 模型。
4. 再考虑轻量内容发布后台，不建议一开始做复杂 CMS。
5. 如需转化闭环，优先新增咨询表单、线索存储和基础防垃圾提交机制。
6. 暂不建议引入会员登录、在线支付、多语言和复杂动画。
