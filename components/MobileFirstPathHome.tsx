"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

/*
 * 文件说明：该文件实现主站首页的手机优先路径判断转化体验。
 * 功能说明：承接成交页核心逻辑，提供路径判断问卷、A/B/C 初步诊断、线索提交和企业微信承接。
 *
 * 结构概览：
 *   第一部分：数据配置
 *   第二部分：诊断与提交辅助函数
 *   第三部分：页面组件
 */

// ========== 第一部分：数据配置 ==========
type DiagnosisGrade = "A" | "B" | "C";

type Diagnosis = {
  grade: DiagnosisGrade;
  title: string;
  description: string;
  current: string;
  risk: string;
  action: string;
  next: string;
};

type FormPayload = {
  company: string;
  contact: string;
  phone: string;
  labType: string;
  stage: string;
  scopeClarity: string;
  resourceReadiness: string;
  concerns: string[];
  timeline: string;
  wecomAdded: string;
  notes: string;
};

const painCards = [
  {
    title: "认可范围没定清",
    summary: "材料做得越早，后面越容易推倒重来。",
  },
  {
    title: "人员设备没准备好",
    summary: "评审前才发现能力、授权、设备、环境不匹配，整改成本会更高。",
  },
  {
    title: "体系文件和现场运行脱节",
    summary: "文件看起来完整，但现场记录、内审、管理评审和运行证据跟不上。",
  },
  {
    title: "路径没判断清楚",
    summary: "该先补基础，还是可以进入申请准备，必须先判断。",
  },
];

const checkItems = [
  ["实验室类型", "先明确检测、校准、企业内部或第三方实验室的适用路径。"],
  ["认可范围", "确认项目、方法、标准和报告用途是否能被资源支撑。"],
  ["人员能力", "看授权、培训、能力确认和关键岗位是否闭环。"],
  ["设备环境", "核对设备配置、校准状态、环境条件和期间核查。"],
  ["体系运行", "确认文件、记录、内审和管理评审是否真实运行。"],
  ["评审准备", "提前扫描现场评审和整改闭环的高风险点。"],
];

const maintenanceItems = [
  ["体系运行维护", "持续检查体系文件、运行记录、内审和管理评审是否真实有效。"],
  ["监督评审与复评审准备", "提前梳理历史问题、运行证据和现场评审准备状态。"],
  ["扩项与变更支持", "发生新增项目、范围调整、人员设备变化时，先判断扩项和变更路径。"],
  ["年度合规维护包", "围绕人员授权、设备校准、能力验证、质量控制和评审前风险排查形成年度节奏。"],
];

const trustEntries = [
  {
    title: "CNAS认可知识库",
    summary: "继续查看流程、周期、费用和常见问题。",
    href: "/knowledge",
  },
  {
    title: "行业路径方案",
    summary: "按检测、校准、制造业、新能源等场景看路径差异。",
    href: "/solutions",
  },
  {
    title: "案例与风险",
    summary: "了解哪些问题适合在启动前先排查。",
    href: "/cases",
  },
];

const faqItems = [
  ["CNAS认可一般要多久？", "通常受实验室基础、认可范围、人员设备和体系运行成熟度影响。先做路径判断，才能更接近真实周期。"],
  ["CNAS认可费用为什么差异大？", "差异主要来自认可范围、设备与人员基础、体系建设工作量、评审准备难度和整改成本。"],
  ["CNAS认可前最容易错在哪里？", "最容易一开始就做材料，却没有先判断范围、资源和评审准备路径。"],
  ["CNAS认可通过后还需要维护吗？", "需要。后续仍要持续做好体系运行、监督评审、复评审、扩项变更和整改闭环。"],
  ["现在只是了解阶段，能不能先做路径判断？", "可以。越早判断路径，越容易避免后面范围调整、资源补配和材料返工。"],
];

const labTypeOptions = ["检测实验室", "校准实验室", "企业内部实验室", "第三方实验室", "暂不确定"];
const stageOptions = ["刚开始了解", "已准备建设", "已做体系文件", "准备申请", "评审后整改"];
const scopeOptions = ["已明确", "大致明确", "还不清楚"];
const resourceOptions = ["基本具备", "部分具备", "不确定", "明显不足"];
const timelineOptions = ["立即启动", "1个月内", "3个月内", "只是先了解"];
const concernOptions = ["周期太长", "费用不清楚", "不知道从哪开始", "体系文件不会做", "人员设备不清楚", "担心评审不过", "已经返工过"];

// ========== 第二部分：诊断与提交辅助函数 ==========
function getUtmParams() {
  if (typeof window === "undefined") {
    return {};
  }

  const params = new URLSearchParams(window.location.search);
  return ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].reduce<Record<string, string>>((utm, key) => {
    utm[key] = params.get(key) || "";
    return utm;
  }, {});
}

function buildDiagnosis(payload: FormPayload): Diagnosis {
  const hasHighRiskResource = payload.resourceReadiness === "不确定" || payload.resourceReadiness === "明显不足";
  const hasUnclearScope = payload.scopeClarity === "还不清楚";
  const isFastStart = payload.timeline === "立即启动" || payload.timeline === "1个月内";
  const isApplicationStage = payload.stage === "准备申请" || payload.stage === "评审后整改";
  const isBuildStage = payload.stage === "已准备建设" || payload.stage === "已做体系文件";

  // 先看高风险条件，是为了避免在资源明显不足时给出过度乐观判断。
  if ((payload.stage === "刚开始了解" && (hasUnclearScope || hasHighRiskResource)) || (hasUnclearScope && hasHighRiskResource)) {
    return {
      grade: "C",
      title: "C类：暂不适合直接启动申请",
      description: "当前更适合先补清认可范围、人员设备和基础运行条件，再判断是否进入正式申请。",
      current: "当前处于信息不完整或基础条件不稳的阶段，不建议马上投入材料和申请动作。",
      risk: "主要风险是范围、资源和体系证据没有闭环，后续容易反复调整或增加整改成本。",
      action: "优先梳理认可范围、关键人员、设备环境和现有运行证据，先形成差距清单。",
      next: "建议先添加顾问领取路径判断问卷，把启动条件补清楚后再决定推进节奏。",
    };
  }

  if (isApplicationStage || isFastStart) {
    return {
      grade: "A",
      title: "A类：适合进入认可路径设计阶段",
      description: "当前已经接近启动或评审节点，建议尽快完成完整路径设计和评审前风险扫描。",
      current: "当前适合把认可范围、资源配置、体系运行和评审准备整合成明确推进路径。",
      risk: "主要风险是时间窗口较紧，如果范围、证据链或整改清单不清，容易在评审前集中暴露问题。",
      action: "优先完成路径设计、评审前风险排查和关键证据链复核。",
      next: "建议添加顾问获取完整路径建议，确认哪些问题需要评审前优先关闭。",
    };
  }

  if (isBuildStage || payload.timeline === "3个月内") {
    return {
      grade: "B",
      title: "B类：适合先准备，不建议马上申请",
      description: "当前可以推进基础准备，但应先把范围、资源和体系运行证据收拢。",
      current: "当前适合进入建设和准备阶段，但不宜直接跳到正式申请。",
      risk: "主要风险是文件先行、现场运行跟不上，或人员设备与目标范围不匹配。",
      action: "优先建立差距清单，按范围、人员设备、体系运行和评审准备拆分任务。",
      next: "建议先完成一次路径判断，再决定是否进入体系建设或评审前准备。",
    };
  }

  return {
    grade: "C",
    title: "C类：暂不适合直接启动申请",
    description: "当前信息仍需补充，建议先完成基础路径判断。",
    current: "当前更适合先了解认可路径和启动条件。",
    risk: "主要风险是投入节奏不清，容易先做材料后改方向。",
    action: "优先确认实验室类型、认可范围和资源基础。",
    next: "建议提交基础信息并添加顾问，获取更完整的路径建议。",
  };
}

function getFormPayload(form: HTMLFormElement): FormPayload {
  const formData = new FormData(form);

  return {
    company: String(formData.get("company") || ""),
    contact: String(formData.get("contact") || ""),
    phone: String(formData.get("phone") || ""),
    labType: String(formData.get("labType") || ""),
    stage: String(formData.get("stage") || ""),
    scopeClarity: String(formData.get("scopeClarity") || ""),
    resourceReadiness: String(formData.get("resourceReadiness") || ""),
    concerns: formData.getAll("concerns").map(String),
    timeline: String(formData.get("timeline") || ""),
    wecomAdded: String(formData.get("wecomAdded") || ""),
    notes: String(formData.get("notes") || ""),
  };
}

// ========== 第三部分：页面组件 ==========
export function MobileFirstPathHome() {
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const payload = getFormPayload(form);
    const nextDiagnosis = buildDiagnosis(payload);
    const submittedAt = new Date().toISOString();
    const demand = [
      payload.notes,
      payload.concerns.length > 0 ? `最担心的问题：${payload.concerns.join("、")}` : "",
      `诊断等级：${nextDiagnosis.title}`,
      `是否已添加企业微信：${payload.wecomAdded}`,
    ]
      .filter(Boolean)
      .join("；");

    setDiagnosis(nextDiagnosis);
    setMessage("正在提交：已生成初步判断，正在写入线索系统。");
    setMessageType("submitting");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...payload,
          name: payload.contact,
          enterpriseType: payload.labType,
          hasLab: payload.resourceReadiness,
          startTime: payload.timeline,
          equipmentPlan: `${payload.scopeClarity} / ${payload.resourceReadiness}`,
          demand,
          source: "cnas-main-home-path-check",
          sourcePage: typeof window === "undefined" ? "/" : window.location.href,
          utm: getUtmParams(),
          utmSource: getUtmParams().utm_source || "",
          utmMedium: getUtmParams().utm_medium || "",
          utmCampaign: getUtmParams().utm_campaign || "",
          submittedAt,
          diagnosisSummary: {
            grade: { grade: nextDiagnosis.grade, title: nextDiagnosis.title, description: nextDiagnosis.description },
            current: nextDiagnosis.current,
            risk: nextDiagnosis.risk,
            action: nextDiagnosis.action,
            next: nextDiagnosis.next,
          },
        }),
      });
      const result = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !result.success) {
        throw new Error(result.message || "提交失败");
      }

      setMessage(result.message || "提交成功：已收到你的路径判断信息。");
      setMessageType("success");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "提交失败：请稍后再试。");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <section className="bg-surface">
        <div className="site-shell grid gap-6 py-8 md:grid-cols-[minmax(0,1fr)_340px] md:items-center md:py-12">
          <div>
            <p className="text-meta font-semibold uppercase tracking-[0.14em] text-primary">CNAS Recognition Path Check</p>
            <h1 className="mt-3 max-w-3xl text-[2.15rem] font-semibold leading-tight text-ink md:text-display md:leading-[1.12]">
              做CNAS认可，先判断路径，再决定怎么启动
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted md:text-[17px]">
              很多实验室一上来就做材料，后面才发现认可范围、人员设备、体系运行和评审准备都没有理清，最后容易返工、拖期、增加成本。
            </p>
            <p className="mt-3 max-w-2xl text-body text-ink">
              CNAS认可不是先做一堆材料，而是先判断当前是否适合启动，以及应该按什么路径推进。
            </p>
            <div className="mt-5 grid gap-3 sm:flex sm:flex-wrap">
              <a href="#path-check" className="btn-primary" data-track-event="start_path_check" data-track-location="home-hero">
                开始路径判断
              </a>
              <a href="#wecom" className="btn-secondary">
                添加顾问领取问卷
              </a>
            </div>
          </div>

          <aside className="hidden rounded-xl border border-line bg-white p-5 shadow-card md:block">
            <p className="text-meta font-semibold text-primary">先判断这三件事</p>
            <div className="mt-4 grid gap-3 text-body text-muted">
              <p>认可范围是否清楚</p>
              <p>人员设备是否支撑</p>
              <p>体系运行证据是否闭环</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="site-shell section-space">
        <SectionHeading title="为什么不建议一上来就做材料？" description="材料只是结果，路径判断才是启动前最值得先做的动作。" />
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {painCards.map((card) => (
            <article key={card.title} className="card">
              <h3 className="text-base font-semibold text-ink">{card.title}</h3>
              <p className="mt-2 text-body text-muted">{card.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="site-shell section-space">
        <SectionHeading title="判断之后，再看对应资料" description="首页先完成路径判断，已有知识库、行业方案和案例入口继续保留，方便后续按问题深挖。" />
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {trustEntries.map((entry) => (
            <Link key={entry.href} href={entry.href} className="card-link gap-2">
              <h3 className="text-base font-semibold text-ink">{entry.title}</h3>
              <p className="text-body text-muted">{entry.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="site-shell section-space">
          <SectionHeading title="CNAS认可路径判断，重点看这六件事" description="先把基础条件看清楚，再决定是否进入申请、建设或整改。" />
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {checkItems.map(([title, summary]) => (
              <article key={title} className="rounded-xl border border-line bg-white p-4">
                <h3 className="font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-body text-muted">{summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="path-check" className="site-shell section-space scroll-mt-20">
        <SectionHeading
          title="先做一次CNAS认可路径判断"
          description="填写基础信息后，系统会根据实验室类型、当前阶段、认可范围、人员设备和主要担心问题，给出初步判断结果。"
        />
        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <form onSubmit={handleSubmit} className="grid gap-4 rounded-xl border border-line bg-white p-4 shadow-card md:p-5">
            <div className="grid gap-4 md:grid-cols-2">
              <TextInput label="企业名称" name="company" required />
              <TextInput label="联系人" name="contact" required />
              <TextInput label="手机号" name="phone" inputMode="tel" required />
              <SelectInput label="实验室类型" name="labType" options={labTypeOptions} required />
              <SelectInput label="当前阶段" name="stage" options={stageOptions} required />
              <SelectInput label="认可范围是否明确" name="scopeClarity" options={scopeOptions} required />
              <SelectInput label="人员设备是否基本具备" name="resourceReadiness" options={resourceOptions} required />
              <SelectInput label="计划启动时间" name="timeline" options={timelineOptions} required />
              <SelectInput label="是否已添加企业微信" name="wecomAdded" options={["是", "否"]} required />
            </div>

            <fieldset>
              <legend className="mb-2 text-sm font-semibold text-ink">最担心的问题</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {concernOptions.map((option) => (
                  <label key={option} className="flex min-h-12 items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-body text-muted">
                    <input type="checkbox" name="concerns" value={option} className="h-4 w-4 accent-primary" />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="grid gap-2 text-sm font-semibold text-ink">
              补充说明
              <textarea
                name="notes"
                rows={4}
                className="min-h-28 rounded-lg border border-line px-3 py-3 text-body font-normal text-ink outline-none focus:border-primary"
                placeholder="可补充目标认可范围、当前材料准备情况或评审时间节点"
              />
            </label>

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full md:w-fit">
              {isSubmitting ? "提交中..." : "提交并生成初步判断"}
            </button>
            {message ? (
              <p
                className={`rounded-lg border px-3 py-3 text-body ${
                  messageType === "error" ? "border-red-200 bg-red-50 text-red-700" : "border-primary/20 bg-primary/5 text-ink"
                }`}
              >
                {message}
              </p>
            ) : null}
          </form>

          <aside id="wecom" className="grid gap-4 rounded-xl border border-line bg-[#071e3f] p-5 text-white shadow-card">
            <div>
              <p className="text-meta font-semibold uppercase tracking-[0.12em] text-[#4ECDC4]">企业微信承接</p>
              <h2 className="mt-2 text-xl font-semibold">添加CNAS认可指南顾问</h2>
              <p className="mt-2 text-body text-slate-300">扫码领取《CNAS认可路径判断问卷》</p>
              <p className="mt-2 text-body text-slate-300">建议先判断路径，再决定怎么启动。</p>
            </div>
            <img src="/wecom-qr.png" alt="企业微信顾问二维码" className="h-36 w-36 rounded-lg bg-white p-2" />
          </aside>
        </div>

        {diagnosis ? (
          <article className="mt-5 grid gap-4 rounded-xl border border-primary/20 bg-primary/5 p-4 md:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <span className="grid h-16 w-16 place-items-center rounded-xl bg-primary text-3xl font-semibold text-white">{diagnosis.grade}</span>
              <div>
                <p className="text-meta font-semibold text-primary">初步诊断结果</p>
                <h3 className="text-xl font-semibold text-ink">{diagnosis.title}</h3>
                <p className="mt-1 text-body text-muted">{diagnosis.description}</p>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <ResultItem title="当前判断" content={diagnosis.current} />
              <ResultItem title="主要风险" content={diagnosis.risk} />
              <ResultItem title="建议优先动作" content={diagnosis.action} />
              <ResultItem title="下一步建议" content={diagnosis.next} />
            </div>
            <a href="#wecom" className="btn-secondary w-full md:w-fit">
              添加顾问，获取完整路径建议
            </a>
          </article>
        ) : null}
      </section>

      <section className="border-y border-line bg-surface">
        <div className="site-shell section-space">
          <SectionHeading title="CNAS认可不是拿证结束，后期维护才决定持续有效" description="通过之后仍要持续做好体系运行、监督评审、复评审、扩项变更和整改闭环。" />
          <div className="mt-5 grid gap-3 md:grid-cols-4">
            {maintenanceItems.map(([title, summary]) => (
              <article key={title} className="card">
                <h3 className="text-base font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-body text-muted">{summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="site-shell section-space">
        <SectionHeading title="常见问题" description="先把关键问题说清楚，再决定怎么推进。" />
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {faqItems.map(([question, answer]) => (
            <details key={question} className="rounded-xl border border-line bg-white p-4 shadow-card">
              <summary className="cursor-pointer text-base font-semibold text-ink">{question}</summary>
              <p className="mt-3 text-body text-muted">{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}

function SectionHeading({ title, description }: { title: string; description: string }) {
  return (
    <div className="max-w-3xl">
      <h2 className="text-title text-ink md:text-[1.625rem]">{title}</h2>
      <p className="mt-2 text-body text-muted">{description}</p>
    </div>
  );
}

function TextInput({ label, name, required, inputMode }: { label: string; name: string; required?: boolean; inputMode?: "tel" }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-ink">
      {label}
      <input
        name={name}
        required={required}
        inputMode={inputMode}
        className="min-h-12 rounded-lg border border-line px-3 py-3 text-body font-normal text-ink outline-none focus:border-primary"
      />
    </label>
  );
}

function SelectInput({ label, name, options, required }: { label: string; name: string; options: string[]; required?: boolean }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-ink">
      {label}
      <select name={name} required={required} className="min-h-12 rounded-lg border border-line bg-white px-3 py-3 text-body font-normal text-ink outline-none focus:border-primary">
        <option value="">请选择</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function ResultItem({ title, content }: { title: string; content: string }) {
  return (
    <section className="rounded-lg border border-line bg-white p-4">
      <h4 className="text-sm font-semibold text-primary">{title}</h4>
      <p className="mt-2 text-body text-muted">{content}</p>
    </section>
  );
}
