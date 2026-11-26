/**
 * Central registry for all external / social links (SPEC §5.2).
 * Links whose href is empty ("") are automatically hidden in the UI.
 */
export type SocialLink = {
  /** Display label */
  label: string;
  /** Full URL, or "" to hide */
  href: string;
  /** Optional handle shown as supporting text */
  handle?: string;
};

export const socialLinks: SocialLink[] = [
  { label: "X", href: "https://x.com/yona_framyn", handle: "@yona_framyn" },
];
