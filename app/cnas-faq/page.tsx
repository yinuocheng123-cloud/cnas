import { FaqLanding } from "@/components/FaqLanding";
import { getCategoryBySlug } from "@/lib/site-data";
import { createPageMetadata } from "@/lib/seo";

const category = getCategoryBySlug("cnas-faq")!;

export const metadata = createPageMetadata({
  title: category.seoTitle,
  description: category.description,
  path: category.href,
});

export default function CnasFaqPage() {
  return <FaqLanding />;
}
