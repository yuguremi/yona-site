"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  budgetBands,
  contactSchema,
  inquiryTypes,
  type ContactInput,
} from "@/lib/contactSchema";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full rounded-sm border border-line bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted/60 transition-colors focus:border-foreground/50 focus-visible:outline-none";
const labelClass = "mb-2 block font-mono text-xs uppercase tracking-[0.16em] text-muted";
const errorClass = "mt-1.5 text-xs text-danger";

function RequiredMark() {
  return (
    <span className="text-danger" aria-hidden="true">
      {" "}
      *
    </span>
  );
}

export function ContactForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [succeeded, setSucceeded] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      inquiryType: "",
      budget: "",
      deadline: "",
      referenceUrl: "",
      message: "",
      consent: false,
    },
  });

  const onSubmit = async (values: ContactInput) => {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !json.ok) {
        setServerError(json.error ?? "送信に失敗しました。時間をおいて再度お試しください。");
        return;
      }
      setSucceeded(true);
      reset();
    } catch {
      setServerError("ネットワークエラーが発生しました。接続を確認して再度お試しください。");
    }
  };

  if (succeeded) {
    return (
      <div className="rounded-sm border border-line bg-surface p-8 md:p-10" role="status">
        <p className="eyebrow">Thank you</p>
        <h2 className="mt-4 font-display text-2xl font-medium tracking-tight">
          送信が完了しました。
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          お問い合わせありがとうございます。内容を確認のうえ、折り返しご連絡いたします。
        </p>
        <button
          type="button"
          onClick={() => setSucceeded(false)}
          className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-foreground underline-offset-4 hover:underline"
        >
          続けて送信する →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            お名前
            <RequiredMark />
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            className={fieldClass}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          {errors.name ? (
            <p id="name-error" role="alert" className={errorClass}>
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            メールアドレス
            <RequiredMark />
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={fieldClass}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email ? (
            <p id="email-error" role="alert" className={errorClass}>
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="company" className={labelClass}>
            会社・団体名
          </label>
          <input
            id="company"
            type="text"
            autoComplete="organization"
            className={fieldClass}
            {...register("company")}
          />
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            電話番号
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
            {...register("phone")}
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="inquiryType" className={labelClass}>
            問い合わせ種別
            <RequiredMark />
          </label>
          <select
            id="inquiryType"
            className={cn(fieldClass, "appearance-none")}
            aria-invalid={Boolean(errors.inquiryType)}
            aria-describedby={errors.inquiryType ? "inquiryType-error" : undefined}
            {...register("inquiryType")}
          >
            <option value="">選択してください</option>
            {inquiryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.inquiryType ? (
            <p id="inquiryType-error" role="alert" className={errorClass}>
              {errors.inquiryType.message}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="budget" className={labelClass}>
            予算帯
          </label>
          <select
            id="budget"
            className={cn(fieldClass, "appearance-none")}
            {...register("budget")}
          >
            <option value="">選択してください（任意）</option>
            {budgetBands.map((band) => (
              <option key={band} value={band}>
                {band}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="deadline" className={labelClass}>
            希望納期
          </label>
          <input
            id="deadline"
            type="text"
            placeholder="例: 2026年8月頃 / 未定"
            className={fieldClass}
            {...register("deadline")}
          />
        </div>

        <div>
          <label htmlFor="referenceUrl" className={labelClass}>
            参考URL
          </label>
          <input
            id="referenceUrl"
            type="url"
            inputMode="url"
            placeholder="https://"
            className={fieldClass}
            aria-invalid={Boolean(errors.referenceUrl)}
            aria-describedby={errors.referenceUrl ? "referenceUrl-error" : undefined}
            {...register("referenceUrl")}
          />
          {errors.referenceUrl ? (
            <p id="referenceUrl-error" role="alert" className={errorClass}>
              {errors.referenceUrl.message}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          相談内容
          <RequiredMark />
        </label>
        <textarea
          id="message"
          rows={7}
          className={cn(fieldClass, "resize-y")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
        {errors.message ? (
          <p id="message-error" role="alert" className={errorClass}>
            {errors.message.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="consent" className="flex items-start gap-3">
          <input
            id="consent"
            type="checkbox"
            className="mt-1 h-4 w-4 shrink-0 accent-[var(--accent)]"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            {...register("consent")}
          />
          <span className="text-sm leading-relaxed text-foreground/85">
            <Link href="/privacy" className="underline underline-offset-4 hover:text-foreground">
              プライバシーポリシー
            </Link>
            に同意します
            <RequiredMark />
          </span>
        </label>
        {errors.consent ? (
          <p id="consent-error" role="alert" className={errorClass}>
            {errors.consent.message}
          </p>
        ) : null}
      </div>

      {serverError ? (
        <p
          role="alert"
          className="rounded-sm border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-foreground"
        >
          {serverError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-background transition-opacity hover:bg-foreground/85 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "送信中…" : "Send Message"}
      </button>
    </form>
  );
}
