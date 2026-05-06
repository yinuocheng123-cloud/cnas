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
 * 功能说明：展示分类、标签、热门问题和文章列表，支撑长期内容扩展。
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
        title="CNAS知识库"
        description="用判断型、解释型、问答型内容，帮助企业在启动 CNAS认可前看清基础、流程、风险和投入重点。"
      />

      {/* ========== 第二部分：分类与标签 ========== */}
      <section className="site-shell section-space">
        <SectionTitle title="内容分类" description="按企业决策路径组织内容，方便后续持续扩展。" />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      <section className="bg-surface">
        <div className="site-shell py-10">
          <SectionTitle title="标签索引" description="按认可范围、评审风险、实验室建设等主题交叉查找内容。" />
          <div className="mt-5">
            <TagList tags={tags} />
          </div>
        </div>
      </section>

      {/* ========== 第三部分：文章列表 ========== */}
      <section className="site-shell section-space">
        <SectionTitle title="文章列表" description="每篇文章都包含直接回答、判断清单、FAQ 和相关内容推荐。" />
        <div className="mt-6">
          <ArticleList articles={articles} />
        </div>
      </section>
      <CtaBlock />
      <Footer />
    </main>
  );
}
