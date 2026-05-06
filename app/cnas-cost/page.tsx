import { CategoryLanding } from "@/components/CategoryLanding";
import { getArticlesByCategory, getCategoryBySlug } from "@/lib/site-data";
import { createPageMetadata } from "@/lib/seo";

const category = getCategoryBySlug("cnas-cost")!;

export const metadata = createPageMetadata({
  title: category.seoTitle,
  description: category.description,
  path: category.href,
});

export default function CnasCostPage() {
  return <CategoryLanding category={category} articles={getArticlesByCategory(category.slug)} />;
}
