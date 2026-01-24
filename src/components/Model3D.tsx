// Model.tsx
import { useGLTF } from "@react-three/drei"
import type { Group } from "three"

type ModelProps = {
  path: string
  position?: [number, number, number]
  scale?: number
}

export function Model3D({path, position = [0, 0, 0], scale = 1 }: ModelProps) {
  const { scene } = useGLTF(path) as { scene: Group }

  return (
    <primitive
      object={scene}
      position={position}
      scale={scale}
    />
  )
}
