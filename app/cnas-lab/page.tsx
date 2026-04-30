import { CategoryLanding } from "@/components/CategoryLanding";
import { getArticlesByCategory, getCategoryBySlug } from "@/lib/site-data";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "实验室建设",
  description: "围绕认可范围、人员、设备、环境和方法规划实验室能力。",
  path: "/cnas-lab",
});

export default function CnasLabPage() {
  const category = getCategoryBySlug("cnas-lab")!;
  return <CategoryLanding category={category} articles={getArticlesByCategory(category.slug)} />;
}
