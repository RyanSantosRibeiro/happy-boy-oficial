/**
 * A chapter's start/end and videoStart/videoEnd refer to the full 0–1 timeline.
 * Information and hold positions are local to that chapter (also 0–1).
 * The same configuration drives scroll navigation, video seeking and HTML.
 */
export type TimelineChapter = {
  id: string;
  type: "look" | "transition";
  lookId?: string;
  from?: string;
  to?: string;
  start: number;
  end: number;
  infoStart?: number;
  infoFull?: number;
  infoFadeStart?: number;
  infoEnd?: number;
  videoStart: number;
  videoEnd: number;
  holdStart?: number;
  holdEnd?: number;
  holdVideoStart?: number;
  holdVideoEnd?: number;
};

export type TimelineState = {
  chapter: TimelineChapter;
  /** During a transformation, this remains the outgoing look. */
  lookId: string;
  videoProgress: number;
  infoOpacity: number;
  localProgress: number;
};

export const TIMELINE_DEFAULTS = {
  lookScrollWeight: 1.6,
  transitionScrollWeight: 0.45,
  lookVideoWeight: 1,
  transitionVideoWeight: 0.55,
  infoStart: 0.04,
  infoFull: 0.18,
  infoFadeStart: 0.72,
  infoEnd: 0.86,
  holdStart: 0.3,
  holdEnd: 0.78,
  holdVideoStart: 0.46,
  holdVideoEnd: 0.6,
  finalHoldVideoStart: 0.82,
  finalHoldVideoEnd: 0.96,
} as const;

const clamp = (value: number, minimum = 0, maximum = 1): number =>
  Math.max(minimum, Math.min(maximum, Number.isNaN(value) ? minimum : value));

const interpolate = (
  value: number,
  inputStart: number,
  inputEnd: number,
  outputStart: number,
  outputEnd: number,
): number => {
  if (inputEnd <= inputStart) return outputEnd;
  const progress = clamp((value - inputStart) / (inputEnd - inputStart));
  return outputStart + (outputEnd - outputStart) * progress;
};

/** Supports the complete five-look collection or a two-look prototype. */
export function createCollectionTimeline(
  lookIds: readonly string[],
): TimelineChapter[] {
  if (!lookIds.length || lookIds.some((id) => !id.trim())) {
    throw new Error("The collection timeline requires at least one named look.");
  }
  if (new Set(lookIds).size !== lookIds.length) {
    throw new Error("Collection look IDs must be unique.");
  }

  const settings = TIMELINE_DEFAULTS;
  const transitionCount = lookIds.length - 1;
  const totalScroll =
    lookIds.length * settings.lookScrollWeight +
    transitionCount * settings.transitionScrollWeight;
  const totalVideo =
    lookIds.length * settings.lookVideoWeight +
    transitionCount * settings.transitionVideoWeight;

  const chapters: TimelineChapter[] = [];
  let scrollCursor = 0;
  let videoCursor = 0;

  lookIds.forEach((lookId, index) => {
    const last = index === lookIds.length - 1;
    const end = last ? 1 : scrollCursor + settings.lookScrollWeight / totalScroll;
    const videoEnd = last ? 1 : videoCursor + settings.lookVideoWeight / totalVideo;

    chapters.push({
      id: lookId,
      type: "look",
      lookId,
      start: scrollCursor,
      end,
      videoStart: videoCursor,
      videoEnd,
      infoStart: settings.infoStart,
      infoFull: settings.infoFull,
      infoFadeStart: settings.infoFadeStart,
      infoEnd: settings.infoEnd,
      holdStart: settings.holdStart,
      holdEnd: settings.holdEnd,
      holdVideoStart: last
        ? settings.finalHoldVideoStart
        : settings.holdVideoStart,
      holdVideoEnd: last
        ? settings.finalHoldVideoEnd
        : settings.holdVideoEnd,
    });
    scrollCursor = end;
    videoCursor = videoEnd;

    if (!last) {
      const transitionEnd =
        scrollCursor + settings.transitionScrollWeight / totalScroll;
      const transitionVideoEnd =
        videoCursor + settings.transitionVideoWeight / totalVideo;
      chapters.push({
        id: `transition-${lookId}-${lookIds[index + 1]}`,
        type: "transition",
        from: lookId,
        to: lookIds[index + 1],
        start: scrollCursor,
        end: transitionEnd,
        videoStart: videoCursor,
        videoEnd: transitionVideoEnd,
      });
      scrollCursor = transitionEnd;
      videoCursor = transitionVideoEnd;
    }
  });

  return chapters;
}

function getLocalVideoProgress(
  progress: number,
  chapter: TimelineChapter,
): number {
  const { holdStart, holdEnd, holdVideoStart, holdVideoEnd } = chapter;
  if (
    chapter.type === "transition" ||
    holdStart === undefined ||
    holdEnd === undefined ||
    holdVideoStart === undefined ||
    holdVideoEnd === undefined
  ) {
    return progress;
  }

  if (progress <= holdStart) {
    return interpolate(progress, 0, holdStart, 0, holdVideoStart);
  }
  if (progress <= holdEnd) {
    return interpolate(progress, holdStart, holdEnd, holdVideoStart, holdVideoEnd);
  }
  return interpolate(progress, holdEnd, 1, holdVideoEnd, 1);
}

function getInfoOpacity(progress: number, chapter: TimelineChapter): number {
  if (chapter.type === "transition") return 0;

  const start = chapter.infoStart ?? TIMELINE_DEFAULTS.infoStart;
  const full = chapter.infoFull ?? TIMELINE_DEFAULTS.infoFull;
  const fadeStart = chapter.infoFadeStart ?? TIMELINE_DEFAULTS.infoFadeStart;
  const end = chapter.infoEnd ?? TIMELINE_DEFAULTS.infoEnd;

  if (progress <= start || progress >= end) return 0;
  if (progress < full) return interpolate(progress, start, full, 0, 1);
  if (progress <= fadeStart) return 1;
  return interpolate(progress, fadeStart, end, 1, 0);
}

/**
 * Pure and direction-independent: scrolling backward resolves the exact same
 * frame and text state. No React state updates or animation objects are needed.
 */
export function getTimelineState(
  progress: number,
  chapters: readonly TimelineChapter[],
): TimelineState {
  if (!chapters.length) {
    throw new Error("Cannot sample an empty collection timeline.");
  }

  const normalized = clamp(progress);
  const chapter =
    chapters.find((entry) => normalized >= entry.start && normalized < entry.end) ??
    (normalized < chapters[0].start ? chapters[0] : chapters[chapters.length - 1]);
  const localProgress = clamp(
    (normalized - chapter.start) / (chapter.end - chapter.start),
  );
  const localVideoProgress = getLocalVideoProgress(localProgress, chapter);

  return {
    chapter,
    lookId: chapter.lookId ?? chapter.from ?? chapter.to ?? "",
    videoProgress:
      chapter.videoStart +
      (chapter.videoEnd - chapter.videoStart) * localVideoProgress,
    infoOpacity: getInfoOpacity(localProgress, chapter),
    localProgress,
  };
}

/** Navigation lands on the reading/observation hold, with the title visible. */
export function getLookScrollProgress(
  lookId: string,
  chapters: readonly TimelineChapter[],
): number {
  const chapter = chapters.find(
    (entry) => entry.type === "look" && entry.lookId === lookId,
  );
  if (!chapter) throw new Error(`Unknown collection look: ${lookId}`);
  const readingPosition = Math.max(
    chapter.infoFull ?? TIMELINE_DEFAULTS.infoFull,
    chapter.holdStart ?? TIMELINE_DEFAULTS.holdStart,
  );
  return chapter.start + (chapter.end - chapter.start) * readingPosition;
}
