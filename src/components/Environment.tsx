import { Model3D } from "./Model3D";

export function Environment() {
  return (
    <>
      <mesh position={[0, 2, 0]}>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>

      <mesh position={[1, 1, 0]}>
        <sphereGeometry />
        <meshStandardMaterial />
      </mesh>

      {/*not working*/}
      {/* <Model3D path="/models/AnimatedCube.gltf" position={[-2, 0, 0]} scale={0.01} /> */}
    </>
  );
}
