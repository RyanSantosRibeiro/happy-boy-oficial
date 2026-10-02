// Temporary motion study from the two supplied photographs, not a campaign film.
// Run: node --experimental-strip-types scripts/render-preview.mjs <ffmpeg path>
import { spawnSync } from "node:child_process";
import { mkdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { createCollectionTimeline } from "../src/lib/collection-timeline.ts";

const workspace = fileURLToPath(new URL("../", import.meta.url));
const ffmpeg = process.argv[2] || process.env.FFMPEG_BIN || "ffmpeg";
const images = [1, 2, 1, 2, 1].map((number) =>
  path.join(workspace, `public/images/sea-sky-reference-0${number}.jpg`),
);
const chapters = createCollectionTimeline(images.map((_, i) => `look-0${i + 1}`));
const looks = chapters.filter((chapter) => chapter.type === "look");
const transitions = chapters.filter((chapter) => chapter.type === "transition");
const duration = 18;
const fps = 30;
const outputDirectory = path.join(workspace, "public/videos");
mkdirSync(outputDirectory, { recursive: true });

for (const [name, width, height] of [["desktop", 1280, 720], ["mobile", 720, 1280]]) {
  const clips = looks.map((look, index) => ({
    start: index === 0 ? 0 : transitions[index - 1].videoStart * duration,
    end: index === looks.length - 1 ? duration : transitions[index].videoEnd * duration,
  }));
  const args = ["-hide_banner", "-loglevel", "warning", "-y"];
  const filters = [];
  images.forEach((image, index) => {
    const seconds = clips[index].end - clips[index].start;
    args.push("-loop", "1", "-framerate", String(fps), "-t", String(seconds), "-i", image);
    const fit = name === "desktop"
      ? `scale=${width}:${height}:force_original_aspect_ratio=decrease,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2:color=black`
      : `scale=${width}:${height}:force_original_aspect_ratio=increase,crop=${width}:${height}`;
    filters.push(
      `[${index}:v]${fit},zoompan=z='1+0.035*on/${seconds * fps}':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=1:s=${width}x${height}:fps=${fps},setsar=1,setpts=PTS-STARTPTS,fps=${fps},settb=AVTB[v${index}]`,
    );
  });
  let previous = "v0";
  transitions.forEach((transition, index) => {
    const next = `blend${index}`;
    filters.push(`[${previous}][v${index + 1}]xfade=transition=fade:duration=${(transition.videoEnd - transition.videoStart) * duration}:offset=${transition.videoStart * duration},fps=${fps},settb=AVTB[${next}]`);
    previous = next;
  });
  const output = path.join(outputDirectory, `sea-sky-preview-${name}.mp4`);
  args.push(
    "-filter_complex_threads", "2", "-filter_complex", filters.join(";"),
    "-map", `[${previous}]`, "-an", "-t", String(duration),
    "-c:v", "libx264", "-preset", "fast", "-crf", "24", "-pix_fmt", "yuv420p",
    "-g", "6", "-keyint_min", "6", "-sc_threshold", "0", "-bf", "0",
    "-movflags", "+faststart", "-threads", "2", output,
  );
  const result = spawnSync(ffmpeg, args, { stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`Preview encoding failed: ${name}`);
  console.log(`${name}: 18 seconds, ${(statSync(output).size / 1024 / 1024).toFixed(2)} MB`);
}
