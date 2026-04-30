import { CtaBlock } from "@/components/CtaBlock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { RiskNotice } from "@/components/RiskNotice";
import { SectionTitle } from "@/components/SectionTitle";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/lib/site-data";
import { createPageMetadata } from "@/lib/seo";

/*
 * 文件说明：该文件实现服务咨询页面。
 * 功能说明：以 CNAS认可落地支持体系说明服务边界、风险提醒和交付结果。
 *
 * 结构概览：
 *   第一部分：服务定位
 *   第二部分：服务卡片
 *   第三部分：服务边界提示
 */

export const metadata = createPageMetadata({
  title: "CNAS认可落地支持体系",
  description: "说明 CNAS启动前诊断、实验室建设与认可范围规划、体系运行辅导、评审前风险排查与整改支持。",
  path: "/services",
});

// ========== 第一部分：服务定位 ==========
export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <Header />
      <HeroSection
        eyebrow="CNAS Service Support"
        title="CNAS认可落地支持体系"
        description="服务咨询不是简单代办证书，不是只帮企业写材料，也不是只做流程辅导，而是围绕实验室能力、体系能力、评审通过能力和长期运行能力建立支持边界。"
      />

      {/* ========== 第二部分：服务卡片 ========== */}
      <section className="mx-auto max-w-6xl px-6 py-12 md:px-8">
        <SectionTitle title="支持模块" description="每项服务都明确适合企业、常见问题、支持内容、交付结果和风险提醒。" />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      {/* ========== 第三部分：服务边界提示 ========== */}
      <section className="mx-auto max-w-4xl px-6 pb-12 md:px-8">
        <RiskNotice
          title="服务边界"
          items={[
            "CNAS认可不能只靠材料包装，必须回到实验室真实能力和体系运行证据。",
            "如果企业基础不足，应先诊断和规划，不建议盲目承诺评审结果。",
            "服务咨询可以帮助识别风险、梳理路径和支持整改，但企业仍需投入人员、设备、环境和运行资源。",
          ]}
        />
      </section>
      <CtaBlock />
      <Footer />
    </main>
  );
}
