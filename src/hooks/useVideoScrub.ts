"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

export type VideoScrubStatus =
  | "unavailable"
  | "idle"
  | "loading"
  | "ready"
  | "error";

type VideoSources = {
  desktop: string | null;
  mobile: string | null;
};

const SEEK_TOLERANCE = 1 / 60;

/**
 * React owns the selected src; the hook only seeks an already selected video.
 * Render the video even without a src so its DOM ref is available on mount.
 * Scroll updates replace a target ref, never React state.
 */
export function useVideoScrub(
  videoRef: RefObject<HTMLVideoElement | null>,
  containerRef: RefObject<HTMLElement | null>,
  { desktop, mobile }: VideoSources,
): {
  seek: (normalized: number) => void;
  status: VideoScrubStatus;
  source: string | null;
} {
  // The server and first client render deliberately have no media URL.
  const [source, setSource] = useState<string | null>(null);
  const [status, setStatus] = useState<VideoScrubStatus>(
    desktop || mobile ? "idle" : "unavailable",
  );
  const targetRef = useRef(0);
  const scheduleSeekRef = useRef<(() => void) | null>(null);

  const seek = useCallback((normalized: number) => {
    targetRef.current = Number.isFinite(normalized)
      ? Math.max(0, Math.min(1, normalized))
      : 0;
    scheduleSeekRef.current?.();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const mobileQuery = window.matchMedia("(max-width: 760px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let hasEntered = false;
    let selectedSource: string | null = null;
    let failed = false;
    let seekFrame: number | null = null;

    const cancelPendingSeek = () => {
      if (seekFrame !== null) window.cancelAnimationFrame(seekFrame);
      seekFrame = null;
    };

    // Late events from a previous source must never mark the new source ready.
    const sourceIsCurrent = () =>
      selectedSource !== null &&
      video.currentSrc === new URL(selectedSource, document.baseURI).href;

    const flushSeek = () => {
      seekFrame = null;
      if (
        disposed ||
        failed ||
        motionQuery.matches ||
        !sourceIsCurrent() ||
        video.readyState < HTMLMediaElement.HAVE_METADATA ||
        !Number.isFinite(video.duration) ||
        video.duration <= 0 ||
        video.seeking
      ) {
        return;
      }

      const targetTime = Math.max(0, Math.min(video.duration, targetRef.current * video.duration));
      if (Math.abs(video.currentTime - targetTime) <= SEEK_TOLERANCE) return;

      try {
        video.currentTime = targetTime;
      } catch {
        // A source can be emptied between metadata and this frame. The next
        // metadata/ready event retries the latest target; there is no RAF loop.
      }
    };

    const scheduleSeek = () => {
      if (disposed || failed || selectedSource === null || seekFrame !== null) return;
      seekFrame = window.requestAnimationFrame(flushSeek);
    };
    scheduleSeekRef.current = scheduleSeek;

    const handleMetadata = () => {
      if (disposed || !sourceIsCurrent() || motionQuery.matches) return;
      scheduleSeek();
    };

    const handleReady = () => {
      if (
        disposed ||
        failed ||
        motionQuery.matches ||
        !sourceIsCurrent() ||
        video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA
      ) {
        return;
      }
      setStatus("ready");
      scheduleSeek();
    };

    const handleSeeked = () => {
      if (disposed || !sourceIsCurrent()) return;
      // One follow-up seek consumes any newer scroll target that arrived while
      // decoding. Multiple updates are coalesced into that same animation frame.
      scheduleSeek();
    };

    const handleError = () => {
      const selectedAttribute = video.getAttribute("src");
      const matchesSelectedSource =
        sourceIsCurrent() || (!video.currentSrc && selectedAttribute === selectedSource);
      if (
        disposed ||
        selectedSource === null ||
        !matchesSelectedSource ||
        !video.error
      ) {
        return;
      }
      failed = true;
      cancelPendingSeek();
      setStatus("error");
    };

    const reconcileSource = () => {
      if (disposed) return;
      const availableSource = mobileQuery.matches ? mobile || desktop : desktop || mobile;
      const nextSource =
        !motionQuery.matches && hasEntered && availableSource ? availableSource : null;

      if (nextSource !== selectedSource) {
        cancelPendingSeek();
        selectedSource = nextSource;
        failed = false;
        setSource(nextSource);
        if (nextSource) {
          setStatus("loading");
          // Also handles Fast Refresh with an already loaded matching source.
          handleReady();
          scheduleSeek();
        } else {
          // Removing the attribute (instead of setting src="") avoids fetching
          // the current page and lets load() abort an in-flight media request.
          if (video.hasAttribute("src")) {
            video.removeAttribute("src");
            video.load();
          }
          setStatus(motionQuery.matches || !availableSource ? "unavailable" : "idle");
        }
      } else if (!nextSource) {
        setSource(null);
        if (video.hasAttribute("src")) {
          video.removeAttribute("src");
          video.load();
        }
        setStatus(motionQuery.matches || !availableSource ? "unavailable" : "idle");
      }
    };

    video.addEventListener("loadedmetadata", handleMetadata);
    video.addEventListener("durationchange", handleMetadata);
    video.addEventListener("loadeddata", handleReady);
    video.addEventListener("canplay", handleReady);
    video.addEventListener("seeked", handleSeeked);
    video.addEventListener("error", handleError);
    mobileQuery.addEventListener("change", reconcileSource);
    motionQuery.addEventListener("change", reconcileSource);

    const container = containerRef.current;
    const observer: IntersectionObserver | null =
      container && "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              if (disposed || !entries.some((entry) => entry.isIntersecting)) return;
              hasEntered = true;
              observer?.disconnect();
              reconcileSource();
            },
            { rootMargin: "400px" },
          )
        : null;
    if (observer && container) observer.observe(container);

    // Initialization occurs in a browser callback, with no synchronous effect
    // state update and no media download before the intersection condition.
    const initializationFrame = window.requestAnimationFrame(() => {
      if (!observer) hasEntered = true;
      reconcileSource();
    });

    return () => {
      disposed = true;
      window.cancelAnimationFrame(initializationFrame);
      cancelPendingSeek();
      observer?.disconnect();
      video.removeEventListener("loadedmetadata", handleMetadata);
      video.removeEventListener("durationchange", handleMetadata);
      video.removeEventListener("loadeddata", handleReady);
      video.removeEventListener("canplay", handleReady);
      video.removeEventListener("seeked", handleSeeked);
      video.removeEventListener("error", handleError);
      mobileQuery.removeEventListener("change", reconcileSource);
      motionQuery.removeEventListener("change", reconcileSource);
      if (scheduleSeekRef.current === scheduleSeek) scheduleSeekRef.current = null;
    };
  }, [containerRef, desktop, mobile, videoRef]);

  return { seek, status, source };
}
