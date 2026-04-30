import { FaqLanding } from "@/components/FaqLanding";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "CNAS常见问题",
  description: "聚合企业启动 CNAS认可前最常见的判断型问题。",
  path: "/cnas-faq",
});

export default function CnasFaqPage() {
  return <FaqLanding />;
}
