"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { diagnosisPageCopy } from "@/lib/site-data";

/*
 * 文件说明：该文件实现诊断页线索表单组件。
 * 功能说明：提供两步式表单、最小校验、提交状态与成功提示，打通前端到 /api/lead 的真实提交流程。
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
      setErrorMessage("请先完成第一步的三个判断项。");
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
      setErrorMessage("请填写联系方式，并确认信息长度有效。");
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
      <section id="diagnosis-result" className="site-shell max-w-4xl scroll-mt-28 pb-12">
        <div className="card">
          <h2 className="text-heading">{diagnosisPageCopy.successTitle}</h2>
          <div className="mt-3 grid gap-2 text-copy">
            {diagnosisPageCopy.successLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="site-shell max-w-4xl pb-12">
        <div className="card">
          <h2 className="text-heading">{diagnosisPageCopy.actionTitle}</h2>
          <p className="mt-3 text-copy">{diagnosisPageCopy.actionDescription}</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                trackEvent("start_judgment_click", { location: "diagnosis" });
                document.getElementById("diagnosis-step-one")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              {diagnosisPageCopy.actionButton}
            </button>
            <p className="text-meta-token">{diagnosisPageCopy.actionMeta}</p>
          </div>
        </div>
      </section>

      <section id="self-check" className="site-shell max-w-4xl pb-12">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <article id="diagnosis-step-one" className="card scroll-mt-28">
            <p className="text-meta-token font-semibold">STEP 1</p>
            <h2 className="mt-2 text-heading">{diagnosisPageCopy.stepOneTitle}</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {diagnosisPageCopy.stepOneFields.map((field) => (
                <label key={field.name} className="grid gap-2 text-body font-medium text-ink">
                  {field.label}
                  <select
                    name={field.name}
                    value={formData[field.name as keyof LeadFormData]}
                    onChange={(event) => updateField(field.name as keyof LeadFormData, event.target.value)}
                    className="rounded-xl border border-line bg-card px-4 py-3 text-copy text-ink outline-none transition focus:border-primary"
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
            <div className="mt-5">
              <button type="button" className="btn-secondary" onClick={handleContinue}>
                {diagnosisPageCopy.stepOneButton}
              </button>
            </div>
            {errorMessage ? <p className="mt-4 text-copy text-primary">{errorMessage}</p> : null}
          </article>

          {step === 2 ? (
            <article id="diagnosis-step-two" className="card scroll-mt-28">
              <p className="text-meta-token font-semibold">STEP 2</p>
              <h2 className="mt-2 text-heading">{diagnosisPageCopy.stepTwoTitle}</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {diagnosisPageCopy.stepTwoFields.map((field) => (
                  <label key={field.name} className="grid gap-2 text-body font-medium text-ink">
                    {field.label}
                    <select
                      name={field.name}
                      value={formData[field.name as keyof LeadFormData]}
                      onChange={(event) => updateField(field.name as keyof LeadFormData, event.target.value)}
                      className="rounded-xl border border-line bg-card px-4 py-3 text-copy text-ink outline-none transition focus:border-primary"
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
                  {diagnosisPageCopy.contactLabel}
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={(event) => updateField("contact", event.target.value)}
                    placeholder={diagnosisPageCopy.contactPlaceholder}
                    className="rounded-xl border border-line bg-card px-4 py-3 text-copy text-ink outline-none transition placeholder:text-muted focus:border-primary"
                  />
                </label>
              </div>
              <p className="mt-4 text-copy">{diagnosisPageCopy.stepTwoTip}</p>
              <div className="mt-5 rounded-2xl border border-line bg-surface p-4">
                <p className="text-meta-token font-semibold">提交前再确认一次</p>
                <div className="mt-3 grid gap-2 text-copy">
                  {diagnosisPageCopy.preSubmitLines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
              {errorMessage ? <p className="mt-4 text-copy text-primary">{errorMessage}</p> : null}
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? "提交中..." : diagnosisPageCopy.submitButton}
                </button>
                <p className="text-meta-token">{diagnosisPageCopy.actionMeta}</p>
              </div>
            </article>
          ) : null}
        </form>
      </section>
    </>
  );
}
