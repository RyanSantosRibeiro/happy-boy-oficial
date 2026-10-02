import type { CSSProperties, RefObject } from "react";
import { campaign } from "@/data/sea-sky";

type Props = {
  videoRef: RefObject<HTMLVideoElement | null>;
  source: string | null;
  ready: boolean;
};

export function CollectionVideo({ videoRef, source, ready }: Props) {
  return <video
    ref={videoRef}
    className="collection-video"
    data-ready={ready}
    src={source ?? undefined}
    preload="auto"
    muted
    playsInline
    disablePictureInPicture
    disableRemotePlayback
    aria-hidden="true"
    tabIndex={-1}
    style={{ "--video-position": campaign.objectPositionDesktop, "--video-position-mobile": campaign.objectPositionMobile } as CSSProperties}
  />;
}
