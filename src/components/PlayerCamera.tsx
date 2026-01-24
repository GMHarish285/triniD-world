import { PerspectiveCamera } from "@react-three/drei";
import type React from "react";
import type { PerspectiveCamera as ThreePerspectiveCamera } from "three";

type PlayerCameraProps = {
  ref?: React.Ref<ThreePerspectiveCamera>;
};

export function PlayerCamera({ ref }: PlayerCameraProps) {
  return <PerspectiveCamera ref={ref} makeDefault />;
}
