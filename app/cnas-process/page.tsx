import { CategoryLanding } from "@/components/CategoryLanding";
import { getArticlesByCategory, getCategoryBySlug } from "@/lib/site-data";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "CNAS认可流程",
  description: "梳理从诊断、规划、建设、体系运行到申请评审的完整路径。",
  path: "/cnas-process",
});

export default function CnasProcessPage() {
  const category = getCategoryBySlug("cnas-process")!;
  return <CategoryLanding category={category} articles={getArticlesByCategory(category.slug)} />;
}
