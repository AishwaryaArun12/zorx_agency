import dynamic from "next/dynamic";

// Lightweight wrapper that dynamically loads the client-only scene.
// This file intentionally avoids importing @react-three packages so the
// module can be safely evaluated on the server.

const ModelSceneClient = dynamic(() => import("./ModelSceneClient"), {
  ssr: false,
  loading: () => null,
});

export default function ModelScene(props: { modelPath?: string }) {
  return <ModelSceneClient {...props} />;
}
