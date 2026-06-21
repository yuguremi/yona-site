/**
 * Fixed, non-interactive film grain layer (SPEC §6.6).
 * Styling lives in globals.css (.noise-overlay) so it stays static and cheap.
 */
export function NoiseOverlay() {
  return <div className="noise-overlay" aria-hidden="true" />;
}
