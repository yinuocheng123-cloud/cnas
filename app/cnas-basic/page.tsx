import { CategoryLanding } from "@/components/CategoryLanding";
import { getArticlesByCategory, getCategoryBySlug } from "@/lib/site-data";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "CNAS基础认知",
  description: "解释 CNAS认可、实验室能力、认可价值和启动前基础判断。",
  path: "/cnas-basic",
});

export default function CnasBasicPage() {
  const category = getCategoryBySlug("cnas-basic")!;
  return <CategoryLanding category={category} articles={getArticlesByCategory(category.slug)} />;
}
