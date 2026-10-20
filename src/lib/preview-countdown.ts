export function previewCountdown(releaseAt: string, now: number) {
  const seconds = Math.max(0, Math.floor((Date.parse(releaseAt) - now) / 1000));
  if (!Number.isFinite(seconds)) throw new Error("Invalid preview release date");
  return { days: Math.floor(seconds / 86400), hours: Math.floor(seconds % 86400 / 3600), minutes: Math.floor(seconds % 3600 / 60), seconds: seconds % 60, finished: seconds === 0 };
}
