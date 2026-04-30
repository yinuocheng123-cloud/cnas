import { CategoryLanding } from "@/components/CategoryLanding";
import { getArticlesByCategory, getCategoryBySlug } from "@/lib/site-data";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "CNAS费用周期",
  description: "拆解 CNAS认可费用构成、周期影响因素和预算投入重点。",
  path: "/cnas-cost",
});

export default function CnasCostPage() {
  const category = getCategoryBySlug("cnas-cost")!;
  return <CategoryLanding category={category} articles={getArticlesByCategory(category.slug)} />;
}
