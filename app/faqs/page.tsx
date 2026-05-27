import { FaqLanding } from "@/components/FaqLanding";
import { unstable_noStore as noStore } from "next/cache";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "CNAS认可问答：把常见问题一次看清",
  description: "聚合 CNAS认可（CNAS认可）、实验室建设、评审风险和费用周期相关常见问题。",
  path: "/faqs",
});

export default function FaqsPage() {
  noStore();

  return <FaqLanding />;
}
