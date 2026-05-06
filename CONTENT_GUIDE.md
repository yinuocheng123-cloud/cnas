# 内容维护指南

本文说明当前 CNAS 专业知识与认可解决方案平台 Demo 中，文章、栏目、标签、FAQ、案例、服务和首页导航内容分别在哪里维护，以及新增内容后需要做哪些验证。

新增或修改内容后，必须执行：

```bash
npm run typecheck
npm run build
```

## 1. 文章

文章数据维护在：

```text
src/data/articles.ts
```

文章页面路由为：

```text
/knowledge/[slug]
```

新增文章时，在 `articles` 数组中追加一个 `Article` 对象。注意：

- `slug` 会成为文章 URL，例如 `cnas-scope-planning` 对应 `/knowledge/cnas-scope-planning`。
- `category` 必须对应 `src/data/categories.ts` 中已有的栏目 `slug`。
- `tags` 建议同步加入 `src/data/tags.ts`，并且至少有一个文章使用该标签，标签页才有内容。
- `faqs` 会自动汇总到 `/faqs` 和 `/cnas-faq`。
- `related` 填写其它文章的 `slug`。
- `answer` 建议控制在 50 字以内，便于 GEO 和 AI 引用。

新增示例：

```ts
{
  slug: "cnas-scope-planning",
  title: "CNAS认可范围怎么规划？",
  description: "说明企业启动 CNAS认可前，如何从检测项目、标准方法和资源条件倒推认可范围。",
  category: "cnas-basic",
  tags: ["CNAS认可", "认可范围", "启动判断"],
  keywords: ["CNAS认可范围", "CNAS认证范围", "实验室认可范围"],
  updatedAt: "2026-05-02",
  answer: "CNAS认可范围应从检测项目、标准方法、人员设备和环境条件倒推，不能一开始盲目做大。",
  sections: [
    {
      title: "一、为什么范围规划要放在前面",
      content: "认可范围会影响人员、设备、环境、方法确认和后续评审准备。如果范围过大，资源投入和评审风险都会上升。",
    },
  ],
  checklist: [
    "检测项目是否稳定",
    "标准方法是否明确",
    "人员和设备是否能支撑范围",
  ],
  faqs: [
    {
      question: "CNAS认证和CNAS认可有什么区别？",
      answer: "CNAS认可是更专业的表达，CNAS认证是企业常用说法，两者在实际使用中通常指同一件事。",
    },
  ],
  related: ["what-is-cnas", "cnas-process"],
  seoTitle: "CNAS认可范围怎么规划？企业做CNAS认证前要先判断什么",
  seoDescription: "说明 CNAS认可范围规划方法，帮助企业先判断检测项目、标准方法、人员设备和环境条件。",
}
```

## 2. 栏目

栏目数据维护在：

```text
src/data/categories.ts
```

当前已有栏目包括：

```text
/cnas-basic
/cnas-process
/cnas-cost
/cnas-risk
/cnas-lab
/cnas-faq
```

栏目有两类入口：

- 顶层栏目页：例如 `/cnas-basic`，需要 `app/cnas-basic/page.tsx` 这类页面文件承接。
- 分类聚合页：例如 `/categories/cnas-basic`，由 `app/categories/[category]` 根据数据自动生成。

新增栏目时，先在 `categories` 数组中追加栏目。如果要作为顶层栏目出现在导航或首页，还需要新增对应 `app/<slug>/page.tsx`，并复用 `CategoryLanding`。

新增示例：

```ts
{
  slug: "cnas-supervision",
  title: "CNAS监督评审",
  shortTitle: "监督评审",
  href: "/cnas-supervision",
  description: "说明 CNAS认可通过后的监督评审、持续运行和整改风险。",
}
```

对应顶层页面示例：

```tsx
import { CategoryLanding } from "@/components/CategoryLanding";
import { getArticlesByCategory, getCategoryBySlug } from "@/lib/site-data";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "CNAS监督评审",
  description: "说明 CNAS认可通过后的监督评审、持续运行和整改风险。",
  path: "/cnas-supervision",
});

export default function CnasSupervisionPage() {
  const category = getCategoryBySlug("cnas-supervision")!;
  return <CategoryLanding category={category} articles={getArticlesByCategory(category.slug)} />;
}
```

## 3. 标签

标签数据维护在：

```text
src/data/tags.ts
```

标签聚合页路由为：

```text
/tags/[tag]
```

新增标签时，在 `tags` 数组中追加字符串，并在至少一篇文章的 `tags` 字段中使用它。没有被文章使用的标签不会进入 sitemap。

新增示例：

```ts
export const tags = [
  "CNAS认可",
  "CNAS认证",
  "认可范围",
];
```

文章中使用示例：

```ts
tags: ["CNAS认可", "认可范围", "启动判断"],
```

## 4. FAQ

FAQ 主要维护在文章数据中：

```text
src/data/articles.ts
```

聚合逻辑在：

```text
src/data/faqs.ts
```

当前 `faqs.ts` 会从所有文章的 `faqs` 字段自动汇总，因此一般不需要直接改 `faqs.ts`。新增 FAQ 的推荐方式是在相关文章中增加 `faqs` 条目。

新增示例：

```ts
faqs: [
  {
    question: "CNAS认证和CNAS认可有什么区别？",
    answer: "CNAS认可是更专业的表达，CNAS认证是企业常用说法，两者在实际使用中通常指同一件事。",
  },
  {
    question: "企业什么时候不适合启动CNAS认可？",
    answer: "如果认可范围不清、人员设备环境无法支撑检测项目，或体系没有试运行记录，就不建议盲目启动。",
  },
],
```

## 5. 案例

案例数据维护在：

```text
src/data/cases.ts
```

案例中心页面为：

```text
/cases
```

案例统一采用：

```text
问题 / 动作 / 结果
```

新增示例：

```ts
{
  slug: "scope-too-large-risk",
  title: "认可范围规划过大导致准备风险",
  tags: ["评审风险", "认可范围"],
  problem: "企业希望一次性覆盖过多检测项目，但人员、设备和方法确认无法同步支撑。",
  action: "先按业务优先级收敛首批认可范围，把暂不成熟项目放入后续扩项计划。",
  result: "首批准备工作更聚焦，评审证据链更完整，也降低了资源投入和整改压力。",
}
```

## 6. 服务

服务数据维护在：

```text
src/data/services.ts
```

服务页面为：

```text
/services
```

服务内容统一包含：

```text
适合企业 / 常见问题 / 支持内容 / 交付结果 / 风险提醒
```

新增示例：

```ts
{
  slug: "cnas-supervision-review-support",
  title: "CNAS监督评审持续运行支持",
  targetUser: "已经通过 CNAS认可，但需要准备监督评审或持续改进的实验室。",
  commonProblems: [
    "通过后体系运行松散",
    "记录连续性不足",
    "人员或设备变更未及时更新",
  ],
  supportContent: [
    "监督评审风险排查",
    "运行记录复核",
    "变更事项梳理",
  ],
  deliverables: [
    "监督评审风险清单",
    "持续运行改进建议",
    "关键记录复核意见",
  ],
  riskNotice: "CNAS认可通过后仍需要持续运行，不能把体系停留在首次评审状态。",
}
```

## 7. 首页导航与首页入口

首页导航、首页入口和解决方案入口主要维护在：

```text
lib/site-data.ts
```

常用数据包括：

- `navItems`：顶部一级导航和下拉菜单。
- `homePathways`：首页“平台路径”入口。
- `hotQuestions`：首页热门问题入口。
- `homeStats`：首页首屏右侧价值数据卡片。
- `processStages`：流程页步骤拆解。
- `solutions`：行业方案入口和方案详情页数据。

### 新增导航下拉项示例

```ts
{
  label: "CNAS监督评审",
  href: "/cnas-supervision",
  description: "通过认可后的持续运行与监督评审准备",
}
```

通常加入到 `navItems` 中对应一级导航的 `children` 内。例如放入 `CNAS知识库` 下拉菜单：

```ts
children: [
  { label: "CNAS基础认知", href: "/cnas-basic", description: "理解认可对象和能力要求" },
  { label: "CNAS监督评审", href: "/cnas-supervision", description: "通过认可后的持续运行与监督评审准备" },
],
```

### 新增首页热门问题示例

```ts
export const hotQuestions = [
  { title: "CNAS是什么", href: "/knowledge/what-is-cnas", summary: "先理解认可对象和真实能力要求。" },
  { title: "CNAS监督评审怎么准备", href: "/knowledge/cnas-supervision-review", summary: "了解通过认可后的持续运行和监督评审风险。" },
];
```

### 新增首页价值数据示例

```ts
export const homeStats = [
  { label: "CNAS常见问题", value: "60+ 个" },
  { label: "监督评审风险点", value: "15+ 个" },
];
```

## 8. sitemap 与 SEO 说明

sitemap 生成文件：

```text
app/sitemap.ts
```

当前 sitemap 会自动读取：

- 静态页面
- `categories`
- 有文章的 `/categories/[category]`
- 有文章的 `/tags/[tag]`
- `articles`
- `solutions`

因此，新增文章、标签、栏目和方案后，只要数据结构正确，通常会自动进入 sitemap。注意：

- 没有文章的标签不会进入 sitemap。
- 新增顶层栏目页面时，要确认对应页面真实存在。
- 新增页面时要补充 metadata，推荐使用 `createPageMetadata`。

## 9. 新增内容后的验证命令

每次新增文章、栏目、标签、FAQ、案例、服务或首页导航内容后，都必须执行：

```bash
npm run typecheck
npm run build
```

如果新增了可访问页面，建议再启动本地服务检查：

```bash
npm run dev
```

然后访问对应路径确认页面可打开、内容不为空、移动端没有明显错位。
