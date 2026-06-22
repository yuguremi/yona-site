/**
 * Central registry for all external / social links (SPEC §5.2).
 * Replace the placeholder `href` values with the real account URLs.
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

// No social links for now. Add entries here (label + real href) and they will
// automatically reappear in the footer and mobile menu.
export const socialLinks: SocialLink[] = [];
