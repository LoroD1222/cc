"use client";

import { useEffect, useRef, useState } from "react";

const OBSERVATORY_ORIGIN = "https://ccttfa.kalen.co.tz";
const DEFAULT_HEIGHT = 680;

type ObservatoryHeightMessage = {
  type?: unknown;
  height?: unknown;
};

export function ObservatoryEmbed() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);

  useEffect(() => {
    function resizeEmbed(event: MessageEvent<unknown>) {
      if (event.origin !== OBSERVATORY_ORIGIN || iframeRef.current?.contentWindow !== event.source) return;

      const data = event.data as ObservatoryHeightMessage | null;
      if (!data || data.type !== "ccto-embed:height" || typeof data.height !== "number" || !Number.isFinite(data.height)) return;

      setHeight(Math.max(DEFAULT_HEIGHT, Math.ceil(data.height)));
    }

    window.addEventListener("message", resizeEmbed);
    return () => window.removeEventListener("message", resizeEmbed);
  }, []);

  return <iframe ref={iframeRef} className="observatory-embed" src={`${OBSERVATORY_ORIGIN}/embed/observatory`} title="Central Corridor Transport Observatory" width="100%" height={height} loading="lazy" />;
}
