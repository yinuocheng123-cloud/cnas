/*
 * 文件说明：该文件实现 FAQ 区块组件。
 * 功能说明：统一常见问题的问答结构，帮助搜索引擎和用户理解页面重点。
 *
 * 结构概览：
 *   第一部分：类型定义
 *   第二部分：FaqBlock 组件
 */

// ========== 第一部分：类型定义 ==========
type FaqItem = {
  question: string;
  answer: string;
};

// ========== 第二部分：FaqBlock 组件 ==========
export function FaqBlock({ faqs }: { faqs: FaqItem[] }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-slate-950">常见问题 FAQ</h2>
      <div className="mt-4 grid gap-4">
        {faqs.map((faq) => (
          <div key={faq.question} className="rounded border border-slate-200 bg-white p-5">
            <h3 className="font-semibold text-slate-950">{faq.question}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
