import dynamic from "next/dynamic";

const ModelScene = dynamic(() => import("./ModelScene"), {
  ssr: false,
  loading: () => null,
});

export function Hero3D() {
  return <ModelScene />;
}
