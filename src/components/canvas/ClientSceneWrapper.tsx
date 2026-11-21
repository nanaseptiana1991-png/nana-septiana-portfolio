"use client";

import dynamic from "next/dynamic";

const SceneManager = dynamic(() => import("./SceneManager"), {
  ssr: false,
});

export default function ClientSceneWrapper() {
  return <SceneManager />;
}
