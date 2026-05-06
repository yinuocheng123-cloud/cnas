import { CategoryLanding } from "@/components/CategoryLanding";
import { getArticlesByCategory, getCategoryBySlug } from "@/lib/site-data";
import { createPageMetadata } from "@/lib/seo";

const category = getCategoryBySlug("cnas-basic")!;

export const metadata = createPageMetadata({
  title: category.seoTitle,
  description: category.description,
  path: category.href,
});

export default function CnasBasicPage() {
  return <CategoryLanding category={category} articles={getArticlesByCategory(category.slug)} />;
}
