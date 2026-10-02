import assert from "node:assert/strict";
import test from "node:test";
import {
  createCollectionTimeline,
  getLookScrollProgress,
  getTimelineState,
  TIMELINE_DEFAULTS,
} from "../src/lib/collection-timeline.ts";

const ids = ["look-01", "look-02", "look-03", "look-04", "look-05"];
const chapters = createCollectionTimeline(ids);
const approximately = (actual: number, expected: number, epsilon = 1e-10) =>
  assert.ok(Math.abs(actual - expected) < epsilon, `${actual} ≠ ${expected}`);

test("five looks form nine consecutive chapters covering the whole video", () => {
  assert.equal(chapters.length, 9);
  assert.equal(chapters[0].start, 0);
  assert.equal(chapters[0].videoStart, 0);
  assert.equal(chapters.at(-1)?.end, 1);
  assert.equal(chapters.at(-1)?.videoEnd, 1);
  chapters.forEach((chapter, index) => {
    assert.equal(chapter.type, index % 2 === 0 ? "look" : "transition");
    assert.ok(chapter.end > chapter.start);
    assert.ok(chapter.videoEnd > chapter.videoStart);
    if (index > 0) {
      assert.equal(chapter.start, chapters[index - 1].end);
      assert.equal(chapter.videoStart, chapters[index - 1].videoEnd);
    }
  });
});

test("chapter boundaries resolve to the next chapter without showing text", () => {
  for (const chapter of chapters) {
    const state = getTimelineState(chapter.start, chapters);
    assert.equal(state.chapter.id, chapter.id);
    assert.equal(state.infoOpacity, 0);
    approximately(state.videoProgress, chapter.videoStart);
  }
  const final = getTimelineState(1, chapters);
  assert.equal(final.lookId, "look-05");
  assert.equal(final.infoOpacity, 0);
  assert.equal(final.videoProgress, 1);
});

test("transformations never display product information", () => {
  for (const chapter of chapters.filter((entry) => entry.type === "transition")) {
    for (let index = 0; index < 100; index += 1) {
      const progress = chapter.start + (chapter.end - chapter.start) * index / 100;
      const state = getTimelineState(progress, chapters);
      assert.equal(state.infoOpacity, 0);
      assert.equal(state.lookId, chapter.from);
    }
  }
});

test("video seeking stays monotonic and continuous across holds and transitions", () => {
  let previous = -1;
  for (let index = 0; index <= 10000; index += 1) {
    const state = getTimelineState(index / 10000, chapters);
    assert.ok(state.videoProgress >= previous);
    assert.ok(state.videoProgress >= 0 && state.videoProgress <= 1);
    assert.ok(state.infoOpacity >= 0 && state.infoOpacity <= 1);
    previous = state.videoProgress;
  }
  for (const chapter of chapters.slice(1)) {
    const before = getTimelineState(chapter.start - 1e-9, chapters);
    const after = getTimelineState(chapter.start + 1e-9, chapters);
    approximately(before.videoProgress, after.videoProgress, 1e-7);
  }
});

test("backward scrolling reproduces every forward frame and opacity", () => {
  const forward = Array.from({ length: 501 }, (_, index) =>
    getTimelineState(index / 500, chapters),
  );
  for (let index = 500; index >= 0; index -= 1) {
    assert.deepEqual(getTimelineState(index / 500, chapters), forward[index]);
  }
});

test("the presentation hold is slower than entering and leaving a look", () => {
  const chapter = chapters[0];
  const sample = (local: number) =>
    getTimelineState(chapter.start + (chapter.end - chapter.start) * local, chapters)
      .videoProgress;
  const entryMotion = sample(0.2) - sample(0.1);
  const holdMotion = sample(0.5) - sample(0.4);
  const exitMotion = sample(0.95) - sample(0.85);
  assert.ok(holdMotion < entryMotion);
  assert.ok(holdMotion < exitMotion);
});

test("the final look slows progressively into its closing pose", () => {
  const chapter = chapters.at(-1)!;
  const sample = (local: number) =>
    getTimelineState(chapter.start + (chapter.end - chapter.start) * local, chapters)
      .videoProgress;
  assert.ok(sample(0.5) - sample(0.4) < sample(0.2) - sample(0.1));
  assert.ok(sample(0.95) - sample(0.85) < sample(0.5) - sample(0.4));
});

test("look navigation lands where information is fully visible", () => {
  for (const id of ids) {
    const state = getTimelineState(getLookScrollProgress(id, chapters), chapters);
    assert.equal(state.lookId, id);
    assert.equal(state.infoOpacity, 1);
  }
  assert.throws(() => getLookScrollProgress("missing", chapters), /Unknown/);
});

test("two-look prototype uses the same mapping with one transition", () => {
  const prototype = createCollectionTimeline(ids.slice(0, 2));
  assert.equal(prototype.length, 3);
  assert.equal(prototype[1].type, "transition");
  assert.equal(prototype[1].from, "look-01");
  assert.equal(prototype[1].to, "look-02");
  assert.equal(getTimelineState(1, prototype).videoProgress, 1);
  assert.equal(getTimelineState(1, prototype).lookId, "look-02");
});

test("scroll weights reserve more travel for looks than transitions", () => {
  const lookLength = chapters[0].end - chapters[0].start;
  const transitionLength = chapters[1].end - chapters[1].start;
  approximately(
    lookLength / transitionLength,
    TIMELINE_DEFAULTS.lookScrollWeight / TIMELINE_DEFAULTS.transitionScrollWeight,
  );
});

test("progress clamps and malformed input fails explicitly", () => {
  assert.equal(getTimelineState(-10, chapters).videoProgress, 0);
  assert.equal(getTimelineState(10, chapters).videoProgress, 1);
  assert.equal(getTimelineState(Number.NaN, chapters).videoProgress, 0);
  assert.equal(getTimelineState(Number.POSITIVE_INFINITY, chapters).videoProgress, 1);
  assert.equal(getTimelineState(Number.NEGATIVE_INFINITY, chapters).videoProgress, 0);
  assert.throws(() => createCollectionTimeline([]), /at least one/);
  assert.throws(() => createCollectionTimeline([""]), /at least one/);
  assert.throws(() => createCollectionTimeline(["same", "same"]), /unique/);
  assert.throws(() => getTimelineState(0, []), /empty/);
});

test("custom chapter settings move the reading window and video hold", () => {
  const custom = createCollectionTimeline(["single"]);
  Object.assign(custom[0], {
    infoStart: 0.1,
    infoFull: 0.2,
    infoFadeStart: 0.5,
    infoEnd: 0.6,
    holdStart: 0.2,
    holdEnd: 0.8,
    holdVideoStart: 0.4,
    holdVideoEnd: 0.5,
  });
  approximately(getTimelineState(0.15, custom).infoOpacity, 0.5);
  approximately(getTimelineState(0.55, custom).infoOpacity, 0.5);
  assert.equal(getTimelineState(0.7, custom).infoOpacity, 0);
  approximately(getTimelineState(0.5, custom).videoProgress, 0.45);
});
