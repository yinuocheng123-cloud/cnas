"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { diagnosisPageCopy } from "@/lib/site-data";

/*
 * 文件说明：该文件实现诊断页线索表单组件。
 * 功能说明：提供两步式表单、轻量校验、提交状态和成功提示，承接真实咨询线索。
 *
 * 结构概览：
 *   第一部分：类型定义与初始状态
 *   第二部分：LeadCaptureForm 组件
 */

// ========== 第一部分：类型定义与初始状态 ==========
type LeadFormData = {
  enterpriseType: string;
  hasLab: string;
  stage: string;
  startTime: string;
  equipmentPlan: string;
  contact: string;
};

const initialFormData: LeadFormData = {
  enterpriseType: "",
  hasLab: "",
  stage: "",
  startTime: "",
  equipmentPlan: "",
  contact: "",
};

// ========== 第二部分：LeadCaptureForm 组件 ==========
export function LeadCaptureForm() {
  const [step, setStep] = useState<1 | 2 | "success">(1);
  const [formData, setFormData] = useState<LeadFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function updateField(name: keyof LeadFormData, value: string) {
    if (errorMessage) {
      setErrorMessage("");
    }

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function validateStepOne() {
    return formData.enterpriseType && formData.hasLab && formData.stage;
  }

  function validateStepTwo() {
    return formData.startTime && formData.equipmentPlan && formData.contact.trim().length >= 5;
  }

  function handleContinue() {
    if (!validateStepOne()) {
      setErrorMessage("请先完成第一步判断。");
      return;
    }

    setErrorMessage("");
    trackEvent("lead_step_one_complete", {
      enterpriseType: formData.enterpriseType,
      stage: formData.stage,
    });
    setStep(2);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateStepTwo()) {
      setErrorMessage("请填写有效的联系方式后再提交。");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !result.success) {
        setErrorMessage(result.message ?? "提交失败，请稍后再试。");
        setIsSubmitting(false);
        return;
      }

      trackEvent("lead_submit_success", {
        enterpriseType: formData.enterpriseType,
        hasLab: formData.hasLab,
        stage: formData.stage,
      });
      setStep("success");
    } catch {
      setErrorMessage("提交失败，请检查网络后重试。");
      setIsSubmitting(false);
    }
  }

  if (step === "success") {
    return (
      <section id="diagnosis-result" className="site-shell max-w-4xl scroll-mt-28 pb-6 md:pb-8">
        <div className="card">
          <h2 className="text-heading">已提交，我们会尽快联系你</h2>
          <div className="mt-3 grid gap-2 text-copy">
            <p>我们会根据你提供的信息给出初步判断。</p>
            <p>建议保持联系方式畅通，信息越完整，判断越准确，也越容易提前避开返工风险。</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="site-shell hidden max-w-4xl pb-6 md:block md:pb-8">
        <div className="card">
          <h2 className="text-heading">先识别风险，再决定要不要马上启动</h2>
          <p className="mt-2 text-copy">很多企业卡在启动阶段，问题往往不在执行，而在路径。越早看清误判代价，越能避免后面重复投入。</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              className="btn-primary w-full sm:w-auto"
              onClick={() => {
                trackEvent("start_judgment_click", { location: "diagnosis" });
                document.getElementById("diagnosis-step-one")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              获取初步判断
            </button>
            <p className="text-meta-token">大约 3 分钟</p>
          </div>
        </div>
      </section>

      <section id="self-check" className="site-shell max-w-4xl pb-6 md:pb-8">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <article id="diagnosis-step-one" className="card scroll-mt-28">
            <p className="text-meta-token font-semibold">STEP 1</p>
            <h2 className="mt-2 text-heading">先判断当前基础</h2>
            <div className="mt-4 grid gap-3 md:mt-5 md:grid-cols-3 md:gap-4">
              {diagnosisPageCopy.stepOneFields.map((field) => (
                <label key={field.name} className="grid gap-2 text-body font-medium text-ink">
                  {field.label}
                  <select
                    name={field.name}
                    value={formData[field.name as keyof LeadFormData]}
                    onChange={(event) => updateField(field.name as keyof LeadFormData, event.target.value)}
                    className="min-h-12 rounded-xl border border-line bg-card px-4 py-3 text-copy text-ink outline-none transition focus:border-primary"
                  >
                    <option value="" disabled>
                      请选择
                    </option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
            <div className="mt-4">
              <button type="button" className="btn-secondary w-full sm:w-auto" onClick={handleContinue}>
                继续判断
              </button>
            </div>
            {errorMessage ? <p className="mt-3 text-copy text-primary">{errorMessage}</p> : null}
          </article>

          {step === 2 ? (
            <article id="diagnosis-step-two" className="card scroll-mt-28">
              <p className="text-meta-token font-semibold">STEP 2</p>
              <h2 className="mt-2 text-heading">补充关键决策信息</h2>
              <div className="mt-4 grid gap-3 md:mt-5 md:grid-cols-2 md:gap-4">
                {diagnosisPageCopy.stepTwoFields.map((field) => (
                  <label key={field.name} className="grid gap-2 text-body font-medium text-ink">
                    {field.label}
                    <select
                      name={field.name}
                      value={formData[field.name as keyof LeadFormData]}
                      onChange={(event) => updateField(field.name as keyof LeadFormData, event.target.value)}
                      className="min-h-12 rounded-xl border border-line bg-card px-4 py-3 text-copy text-ink outline-none transition focus:border-primary"
                    >
                      <option value="" disabled>
                        请选择
                      </option>
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                ))}
                <label className="grid gap-2 text-body font-medium text-ink md:col-span-2">
                  联系方式（微信 / 电话）
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={(event) => updateField("contact", event.target.value)}
                    placeholder="方便后续给你明确判断方向"
                    className="min-h-12 rounded-xl border border-line bg-card px-4 py-3 text-copy text-ink outline-none transition placeholder:text-muted focus:border-primary"
                  />
                </label>
              </div>
              <p className="mt-3 text-copy">填写后，会给你一个明确的风险判断方向。</p>
              <div className="mt-4 rounded-2xl border border-line bg-surface p-4">
                <p className="text-meta-token font-semibold">提交前再确认一次</p>
                <div className="mt-2 grid gap-2 text-copy">
                  <p>很多企业卡在启动阶段，其实是路径问题。</p>
                  <p>这一步如果判断错，后面基本都会返工，时间和投入也会一起被拉长。</p>
                </div>
              </div>
              {errorMessage ? <p className="mt-3 text-copy text-primary">{errorMessage}</p> : null}
              <div className="sticky bottom-3 mt-4 rounded-2xl border border-line bg-white/95 p-3 backdrop-blur sm:static sm:border-0 sm:bg-transparent sm:p-0">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button type="submit" className="btn-primary w-full sm:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? "提交中..." : "获取路径建议"}
                  </button>
                  <p className="text-meta-token">大约 3 分钟</p>
                </div>
              </div>
            </article>
          ) : null}
        </form>
      </section>
    </>
  );
}
