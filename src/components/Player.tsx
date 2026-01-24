import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group, PerspectiveCamera } from "three";
import { Vector3 } from "three";
import { PlayerCamera } from "./PlayerCamera";

type keysState = {
  w: boolean;
  a: boolean;
  s: boolean;
  d: boolean;
  shift: boolean;
  ctrl: boolean;
};

export function Player() {
  const playerRef = useRef<Group>(null!);
  const playerCameraRef = useRef<PerspectiveCamera>(null!);

  const keys = useRef<keysState>({
    w: false,
    a: false,
    s: false,
    d: false,
    shift: false,
    ctrl: false,
  });

  const yaw = useRef(0);
  const pitch = useRef(0);

  const speed = 5;
  const movDir = new Vector3();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW":
          keys.current.w = true;
          break;
        case "KeyA":
          keys.current.a = true;
          break;
        case "KeyS":
          keys.current.s = true;
          break;
        case "KeyD":
          keys.current.d = true;
          break;
        case "ShiftLeft":
          keys.current.shift = true;
          break;
        case "ControlLeft":
          keys.current.ctrl = true;
          break;
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW":
          keys.current.w = false;
          break;
        case "KeyA":
          keys.current.a = false;
          break;
        case "KeyS":
          keys.current.s = false;
          break;
        case "KeyD":
          keys.current.d = false;
          break;
        case "ShiftLeft":
          keys.current.shift = false;
          break;
        case "ControlLeft":
          keys.current.ctrl = false;
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const sensitivity = 0.002;

      yaw.current -= e.movementX * sensitivity;
      pitch.current -= e.movementY * sensitivity;

      pitch.current = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, pitch.current),
      );
    };

    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  useFrame((_, delta) => {
    if (!playerRef.current) return;

    movDir.set(0, 0, 0);
    if (keys.current.w) movDir.z -= 1;
    if (keys.current.s) movDir.z += 1;
    if (keys.current.a) movDir.x -= 1;
    if (keys.current.d) movDir.x += 1;
    if (keys.current.shift) movDir.y += 1;
    if (keys.current.ctrl) movDir.y -= 1;

    playerRef.current.rotation.y = yaw.current;
    playerRef.current.rotation.x = pitch.current;

    if (movDir.lengthSq() > 0) {
      movDir.normalize();
      movDir.multiplyScalar(speed * delta);
      playerRef.current.position.add(movDir);
    }
  });

  return (
    <group ref={playerRef}>
      <mesh rotation={[0, 0, 0]}>
        <boxGeometry args={[1, 2, 1]} />
        <meshStandardMaterial />
      </mesh>

      <PlayerCamera ref={playerCameraRef} />
    </group>
  );
}
