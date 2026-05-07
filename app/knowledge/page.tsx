import { ArticleList } from "@/components/ArticleList";
import { CategoryCard } from "@/components/CategoryCard";
import { CtaBlock } from "@/components/CtaBlock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { TagList } from "@/components/TagList";
import { articles, categories, tags } from "@/lib/site-data";
import { createPageMetadata } from "@/lib/seo";

/*
 * 文件说明：该文件实现 CNAS 知识库聚合页。
 * 功能说明：展示分类、标签和文章列表，并把知识入口改成判断型阅读入口。
 *
 * 结构概览：
 *   第一部分：知识库头部
 *   第二部分：分类与标签
 *   第三部分：文章列表
 */

export const metadata = createPageMetadata({
  title: "CNAS认可知识库：流程、费用与风险判断",
  description: "聚合 CNAS认可、实验室能力建设、申请流程、费用周期、评审风险和常见问题内容。",
  path: "/knowledge",
});

// ========== 第一部分：知识库头部 ==========
export default function KnowledgePage() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <Header />
      <HeroSection
        eyebrow="CNAS Knowledge Center"
        title="先看清判断，再决定怎么启动"
        description="这里不是单纯的内容目录，而是把企业在启动 CNAS认可前最容易判断错的问题拆开，方便你先找到最关键的一步。"
      />

      <section className="site-shell section-space">
        <SectionTitle title="按决策路径找内容" description="先判断你卡在哪一段，再去读对应内容，会比从头到尾看一遍更快。" />
        <div className="mt-4 grid gap-3 md:mt-6 md:grid-cols-3 md:gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      <section className="bg-surface">
        <div className="site-shell py-6 md:py-8">
          <SectionTitle title="按问题标签继续判断" description="按认可范围、评审风险、实验室建设和返工问题交叉查找内容。" />
          <div className="mt-4 md:mt-5">
            <TagList tags={tags} />
          </div>
        </div>
      </section>

      <section className="site-shell section-space">
        <SectionTitle title="从这些文章开始更容易看清" description="每篇文章都尽量直接回答一个关键问题，减少空泛说明和重复解释。" />
        <div className="mt-4 md:mt-6">
          <ArticleList articles={articles} />
        </div>
      </section>
      <CtaBlock />
      <Footer />
    </main>
  );
}
