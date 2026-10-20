import assert from "node:assert/strict";
import test from "node:test";
import { previewCountdown } from "../src/lib/preview-countdown.ts";

test("preview countdown uses the Brasília release instant and never goes negative", () => {
  const date = "2026-11-01T00:00:00-03:00";
  assert.deepEqual(previewCountdown(date, Date.parse("2026-10-31T01:58:57-03:00")), { days: 0, hours: 22, minutes: 1, seconds: 3, finished: false });
  assert.deepEqual(previewCountdown(date, Date.parse("2026-11-01T03:00:00Z")), { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true });
  assert.equal(previewCountdown(date, Date.parse("2026-11-02T03:00:00Z")).finished, true);
  assert.throws(() => previewCountdown("invalid", Date.now()), /Invalid preview release date/);
});
