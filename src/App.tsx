import { Canvas } from "@react-three/fiber";
import { Environment } from "./components/Environment";
import { Player } from "./components/Player";
import { Suspense } from "react";

function App() {
  return (
    <div className="w-screen h-screen">
      <Canvas
        className="w-full h-full"
        // camera={{ position: [0, 2, 5], rotation: [-0.2, 0, 0] }}
      >
        <color attach="background" args={[0, 0, 0]} />

        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense>
          <Environment />
        </Suspense>
        <Player />
      </Canvas>
    </div>
  );
}

export default App;
