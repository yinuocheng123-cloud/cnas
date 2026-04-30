import { CategoryLanding } from "@/components/CategoryLanding";
import { getArticlesByCategory, getCategoryBySlug } from "@/lib/site-data";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "CNAS评审风险",
  description: "识别现场评审、体系运行和整改闭环中的常见风险。",
  path: "/cnas-risk",
});

export default function CnasRiskPage() {
  const category = getCategoryBySlug("cnas-risk")!;
  return <CategoryLanding category={category} articles={getArticlesByCategory(category.slug)} />;
}
