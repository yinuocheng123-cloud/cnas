import { articles } from "./articles";

/*
 * 文件说明：该文件维护 CNAS 常见问题聚合数据。
 * 功能说明：聚合文章 FAQ，并补充首页与咨询承接更常见的独立判断型问题。
 *
 * 结构概览：
 *   第一部分：FAQ 类型与辅助函数
 *   第二部分：独立 FAQ 数据
 *   第三部分：文章 FAQ 聚合与去重导出
 */

// ========== 第一部分：FAQ 类型与辅助函数 ==========
export type FaqItem = {
  question: string;
  answer: string;
  articleSlug: string;
  articleTitle: string;
};

type ManualFaqInput = {
  question: string;
  answer: string;
  articleSlug: string;
};

function getArticleTitle(articleSlug: string) {
  return articles.find((article) => article.slug === articleSlug)?.title ?? "CNAS知识库文章";
}

function dedupeFaqs(items: FaqItem[]) {
  const seen = new Set<string>();

  return items.filter((item) => {
    const key = item.question.trim();

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

// ========== 第二部分：独立 FAQ 数据 ==========
const manualFaqs: ManualFaqInput[] = [
  {
    question: "CNAS认可预算里，最容易被低估的成本是什么？",
    answer: "通常是试运行、能力验证和整改成本，因为这些环节往往发生在企业已经投入很多之后。",
    articleSlug: "cnas-recognition-cost",
  },
  {
    question: "周期能不能只按提交申请后的时间来估？",
    answer: "不建议。真正拉长周期的，常常是申请前的建设、记录和问题闭环。",
    articleSlug: "cnas-recognition-cycle",
  },
  {
    question: "认可范围没定，能先买设备吗？",
    answer: "可以先看方向，但不建议先大批量采购，否则最容易出现设备和方法不匹配。",
    articleSlug: "lab-construction",
  },
  {
    question: "没有稳定检测需求，还值得现在启动吗？",
    answer: "通常不建议。需求都不稳定时，范围、投入和运行节奏也很难稳定。",
    articleSlug: "when-to-delay-cnas",
  },
  {
    question: "体系文件能不能先套模板，后面再慢慢改？",
    answer: "可以参考模板，但不建议脱离真实流程直接套用，否则后面几乎一定返工。",
    articleSlug: "cnas-application-mistakes",
  },
  {
    question: "实验室还没完全建好，能不能先进入申请阶段？",
    answer: "可以先规划和诊断，但关键能力没跑起来前，不建议直接进入正式申请。",
    articleSlug: "can-start-cnas-before-lab-ready",
  },
  {
    question: "申请资料是不是准备得越多越稳？",
    answer: "不是。资料最重要的是和范围、能力、记录彼此对应，而不是单纯堆数量。",
    articleSlug: "cnas-required-documents",
  },
  {
    question: "评审失败后最先要补什么？",
    answer: "先补根因判断，再补能证明整改有效的运行证据，不要只补文件。",
    articleSlug: "why-cnas-assessment-fails",
  },
  {
    question: "正式申请前，要不要先做一轮内部试运行？",
    answer: "要。没有试运行，就很难知道记录、授权和质控是否真的能站住。",
    articleSlug: "cnas-process",
  },
  {
    question: "首批范围是不是报得越大越划算？",
    answer: "通常不是。范围越大，越容易把当前接不住的风险一起报进去。",
    articleSlug: "cnas-application-mistakes",
  },
  {
    question: "人员还没配齐，能不能先启动后面再补？",
    answer: "可以先做可行性判断，但如果关键岗位没有补齐路径，不建议正式推进。",
    articleSlug: "when-to-delay-cnas",
  },
  {
    question: "管理层只想尽快出结果，不愿意长期投入，适合做吗？",
    answer: "通常不适合。CNAS认可不是一次性动作，后续运行和监督评审同样需要资源。",
    articleSlug: "suitable-companies-for-cnas",
  },
  {
    question: "能不能先报项目，后面再慢慢定方法和记录？",
    answer: "不建议。项目、方法和记录本来就要一起闭环，拆开推进很容易反复返工。",
    articleSlug: "cnas-recognition-process-entry",
  },
  {
    question: "内审和管理评审能不能在申请前临时补一次？",
    answer: "可以补动作，但如果前面没有真实运行，它们就很难真正发现关键问题。",
    articleSlug: "cnas-risk",
  },
  {
    question: "现有实验室基础一般，最该优先补哪一块？",
    answer: "先补首批范围对应的关键能力，再补能支撑运行和追溯的记录链条。",
    articleSlug: "before-cnas-three-judgments",
  },
  {
    question: "为什么很多企业不是做不下来，而是一开始就走错了？",
    answer: "因为需求、范围、负责人和投入顺序没有先判断清楚，后面的每一步都会跟着偏掉。",
    articleSlug: "why-enterprises-rework-cnas",
  },
  {
    question: "设备先采购、体系后补，为什么风险这么大？",
    answer: "因为设备一旦脱离范围规划，后面的体系、记录和评审准备都会被迫围着错误前提返工。",
    articleSlug: "cnas-doing-it-wrong-costs-more",
  },
  {
    question: "内部没有明确负责人，还适合现在启动吗？",
    answer: "通常不建议。没有明确负责人时，范围、预算和跨部门协调很难真正落地。",
    articleSlug: "which-companies-should-not-start-cnas-now",
  },
  {
    question: "实验室没规划清楚，最容易在哪一步出问题？",
    answer: "最容易先在设备和范围上出问题，后面又会连带影响体系和评审准备。",
    articleSlug: "lab-not-planned-cannot-start-cnas",
  },
  {
    question: "为什么说做 CNAS 的第一步不是申请？",
    answer: "因为申请只是流程动作，真正决定后面顺不顺的是前面的判断是否到位。",
    articleSlug: "cnas-first-step-is-judgment",
  },
  {
    question: "制造企业做 CNAS，最容易高估自己的地方是什么？",
    answer: "最容易高估的是现有实验室基础，觉得有实验室就等于已经具备认可条件。",
    articleSlug: "manufacturing-enterprise-cnas-path",
  },
  {
    question: "预算有限时，先判断范围和负责人有意义吗？",
    answer: "非常有意义。范围和负责人不清楚时，再精打细算的预算也容易花错地方。",
    articleSlug: "three-things-before-cnas-start",
  },
  {
    question: "不确定能不能做时，先看四点和先看流程，哪个更重要？",
    answer: "先看四点更重要，因为那是在判断现在该不该走这条流程。",
    articleSlug: "check-four-points-before-cnas",
  },
  {
    question: "如果现在判断下来不适合启动，下一步最该做什么？",
    answer: "先把不稳定的需求、范围、资源或负责人问题补齐，再决定是否进入正式推进。",
    articleSlug: "which-companies-should-not-start-cnas-now",
  },
  {
    question: "返工最容易把哪些成本一起放大？",
    answer: "最容易一起放大设备投入、环境改造、记录补做和整改周期这几类成本。",
    articleSlug: "cnas-doing-it-wrong-costs-more",
  },
];

// ========== 第三部分：文章 FAQ 聚合与去重导出 ==========
const manualFaqItems: FaqItem[] = manualFaqs.map((faq) => ({
  ...faq,
  articleTitle: getArticleTitle(faq.articleSlug),
}));

const articleFaqItems: FaqItem[] = articles.flatMap((article) =>
  article.faqs.map((faq) => ({
    ...faq,
    articleSlug: article.slug,
    articleTitle: article.title,
  })),
);

// 先放独立 FAQ，再放文章 FAQ，优先保留更适合聚合页阅读的提问写法。
export const faqs = dedupeFaqs([...manualFaqItems, ...articleFaqItems]);
