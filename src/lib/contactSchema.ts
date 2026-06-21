import { z } from "zod";

/** Inquiry types (SPEC §4.6) */
export const inquiryTypes = [
  "楽曲制作",
  "アーティストプロデュース",
  "クリエイティブディレクション",
  "ライブ／イベント制作",
  "出演／取材",
  "その他",
] as const;

/** Budget bands (SPEC §4.6) */
export const budgetBands = [
  "10万円未満",
  "10万〜30万円",
  "30万〜50万円",
  "50万〜100万円",
  "100万円以上",
  "未定／相談したい",
] as const;

const inquiryTypeValues: readonly string[] = inquiryTypes;
const budgetValues: readonly string[] = budgetBands;

/**
 * Contact form schema (SPEC §4.6). Shared by the client form (react-hook-form)
 * and the server route handler. Plain string fields keep form defaults simple
 * and all messages are in Japanese.
 */
export const contactSchema = z.object({
  name: z.string().min(1, "お名前を入力してください").max(100, "お名前が長すぎます"),
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .refine((v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "メールアドレスの形式が正しくありません"),
  company: z.string().max(100, "入力が長すぎます").optional(),
  phone: z.string().max(30, "電話番号が長すぎます").optional(),
  inquiryType: z
    .string()
    .min(1, "問い合わせ種別を選択してください")
    .refine((v) => inquiryTypeValues.includes(v), "問い合わせ種別を選択してください"),
  budget: z
    .string()
    .optional()
    .refine((v) => !v || budgetValues.includes(v), "予算帯を選択してください"),
  deadline: z.string().max(100, "入力が長すぎます").optional(),
  referenceUrl: z
    .string()
    .optional()
    .refine((v) => !v || /^https?:\/\/.+/.test(v), "URLは http(s):// から入力してください"),
  message: z
    .string()
    .min(10, "ご相談内容は10文字以上で入力してください")
    .max(5000, "ご相談内容が長すぎます"),
  consent: z.boolean().refine((v) => v === true, "個人情報の取り扱いへの同意が必要です"),
});

export type ContactInput = z.infer<typeof contactSchema>;
