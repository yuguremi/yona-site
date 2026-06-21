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

export const socialLinks: SocialLink[] = [
  { label: "Instagram", href: "#", handle: "@yona" },
  { label: "X", href: "#", handle: "@yona" },
  { label: "YouTube", href: "#", handle: "yona" },
  { label: "Spotify", href: "#", handle: "yona" },
  { label: "Email", href: "mailto:contact@yona.example.com", handle: "contact@yona.example.com" },
];
