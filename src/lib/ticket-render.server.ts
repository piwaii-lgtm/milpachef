// Server-only: rasterise ticket SVGs to PNG with resvg (wasm) + web fonts.
import { initWasm, Resvg } from "@resvg/resvg-wasm";

const WASM_URL = "https://cdn.jsdelivr.net/npm/@resvg/resvg-wasm@2.6.2/index_bg.wasm";
const FONT_URLS = [
  "https://cdn.jsdelivr.net/npm/@expo-google-fonts/lora@0.2.3/Lora_700Bold.ttf",
  "https://cdn.jsdelivr.net/npm/@expo-google-fonts/lora@0.2.3/Lora_400Regular.ttf",
  "https://cdn.jsdelivr.net/npm/@expo-google-fonts/open-sans@0.4.2/700Bold/OpenSans_700Bold.ttf",
  "https://cdn.jsdelivr.net/npm/@expo-google-fonts/open-sans@0.4.2/400Regular/OpenSans_400Regular.ttf",
];

let ready: Promise<Uint8Array[]> | null = null;

async function download(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status}`);
  return new Uint8Array(await res.arrayBuffer());
}

function init() {
  if (!ready) {
    ready = (async () => {
      const [wasm, ...fonts] = await Promise.all([download(WASM_URL), ...FONT_URLS.map(download)]);
      await initWasm(wasm);
      return fonts;
    })().catch((e) => {
      ready = null;
      throw e;
    });
  }
  return ready;
}

function toBase64(bytes: Uint8Array) {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

/** Renders an SVG string to a base64 PNG. Throws if the renderer is unavailable. */
export async function renderSvgToPngBase64(svg: string): Promise<string> {
  const fontBuffers = await init();
  const resvg = new Resvg(svg, {
    font: { fontBuffers, loadSystemFonts: false, defaultFontFamily: "Open Sans" },
  });
  return toBase64(resvg.render().asPng());
}