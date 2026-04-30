import { FaqLanding } from "@/components/FaqLanding";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "CNAS常见问题聚合",
  description: "聚合 CNAS认可、CNAS认证、实验室建设、评审风险和费用周期相关常见问题。",
  path: "/faqs",
});

export default function FaqsPage() {
  return <FaqLanding />;
}
