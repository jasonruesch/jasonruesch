import { Options } from "react-scan"; // Must be imported before React and React DOM

/**
 * Check if React Scan is enabled. It can be enabled by setting the `scan` query parameter to `true`.
 * React Scan can be disabled by setting the `scan` query parameter to `false`.
 * The `react-scan-options` item in the local storage keeps track of whether React Scan is enabled or disabled.
 * @returns {boolean | undefined} Whether React Scan is enabled.
 */
export function isScanEnabled() {
  // Don't ever show React Scan in standalone mode.
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
  if (isStandalone) {
    return false;
  }

  const scanOptions = window.localStorage.getItem("react-scan-options");
  const options: Options | undefined = scanOptions
    ? JSON.parse(scanOptions)
    : undefined;
  let enabled = options?.enabled;

  const searchParams = new URLSearchParams(window.location.search);
  const scanParam = searchParams.get("scan");
  if (scanParam) {
    enabled = scanParam === "true";
    window.localStorage.setItem(
      "react-scan-options",
      JSON.stringify({ ...options, enabled }),
    );
  }

  return enabled;
}
