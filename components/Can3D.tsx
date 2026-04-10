"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";

const FONT_FAMILY = '"Space Grotesk", system-ui, sans-serif';

function renderLabelCanvas(color: string): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;

  ctx.clearRect(0, 0, 512, 256);

  // "Oh Belly." text — same as the site logo
  ctx.font = `600 72px ${FONT_FAMILY}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Measure "Oh Belly" to position the dot right after it
  const mainText = "Oh Belly";
  const mainWidth = ctx.measureText(mainText).width;
  const dotText = ".";
  const startX = 256;

  // Draw "Oh Belly" in dark
  ctx.fillStyle = "#111111";
  ctx.fillText(mainText, startX - 8, 110);

  // Draw "." in accent color, right after
  ctx.fillStyle = color;
  const dotX = startX - 8 + mainWidth / 2;
  ctx.fillText(dotText, dotX + ctx.measureText(dotText).width / 2, 110);

  // Subtitle
  ctx.fillStyle = "#11111177";
  ctx.font = `400 24px ${FONT_FAMILY}`;
  ctx.fillText("PREBIOTIC SODA", 256, 168);

  return canvas;
}

/**
 * Creates a canvas texture using the display font.
 * Waits for fonts to load then re-renders so the right typeface appears.
 */
function useLabelTexture(color: string) {
  const [texture, setTexture] = useState<THREE.CanvasTexture>(() => {
    const canvas = renderLabelCanvas(color);
    return new THREE.CanvasTexture(canvas);
  });

  useEffect(() => {
    // Re-render once fonts are loaded to ensure Space Grotesk is used
    document.fonts.ready.then(() => {
      const canvas = renderLabelCanvas(color);
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      setTexture(tex);
    });
  }, [color]);

  return texture;
}

function SodaCan({
  color = "#FF6B4A",
  labelColor = "#fff",
  rotation = [0, 0, 0] as [number, number, number],
  autoRotate = true,
  floatIntensity = 1,
}: {
  color?: string;
  labelColor?: string;
  rotation?: [number, number, number];
  autoRotate?: boolean;
  floatIntensity?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const labelTexture = useLabelTexture(color);

  const canGeometry = useMemo(() => {
    const points: THREE.Vector2[] = [];
    const h = 2.4;
    const r = 0.7;
    const lipR = 0.62;
    const topR = 0.55;

    // Bottom dome
    for (let i = 0; i <= 10; i++) {
      const t = (i / 10) * Math.PI * 0.5;
      points.push(
        new THREE.Vector2(
          Math.sin(t) * r,
          -h / 2 + (1 - Math.cos(t)) * 0.12
        )
      );
    }

    // Body
    points.push(new THREE.Vector2(r, -h / 2 + 0.15));
    points.push(new THREE.Vector2(r, h / 2 - 0.3));

    // Shoulder curve
    for (let i = 0; i <= 8; i++) {
      const t = (i / 8) * Math.PI * 0.5;
      const blend = Math.sin(t);
      points.push(
        new THREE.Vector2(
          r - (r - lipR) * blend,
          h / 2 - 0.3 + 0.2 * blend
        )
      );
    }

    // Lip
    points.push(new THREE.Vector2(lipR, h / 2 - 0.08));
    points.push(new THREE.Vector2(lipR, h / 2 - 0.04));

    // Top indent
    points.push(new THREE.Vector2(topR, h / 2));

    return new THREE.LatheGeometry(points, 64);
  }, []);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.3 * floatIntensity}
      floatIntensity={0.5 * floatIntensity}
    >
      <group ref={groupRef} rotation={rotation}>
        {/* Main can body */}
        <mesh geometry={canGeometry}>
          <meshStandardMaterial
            color={color}
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>

        {/* Label band — plain color */}
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.71, 0.71, 1.2, 64, 1, true]} />
          <meshStandardMaterial
            color={labelColor}
            metalness={0.05}
            roughness={0.35}
          />
        </mesh>

        {/* Label text — flat plane, front side */}
        <mesh position={[0, -0.15, 0.715]} rotation={[0, 0, 0]}>
          <planeGeometry args={[1.1, 0.6]} />
          <meshBasicMaterial
            map={labelTexture}
            transparent
            depthWrite={false}
          />
        </mesh>

        {/* Label text — flat plane, back side */}
        <mesh position={[0, -0.15, -0.715]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[1.1, 0.6]} />
          <meshBasicMaterial
            map={labelTexture}
            transparent
            depthWrite={false}
          />
        </mesh>

        {/* Top rim */}
        <mesh position={[0, 1.12, 0]}>
          <cylinderGeometry args={[0.54, 0.54, 0.04, 64]} />
          <meshStandardMaterial
            color="#d0d0d0"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Pull tab */}
        <group position={[0, 1.16, 0.15]} rotation={[-0.1, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.12, 0.02, 0.28]} />
            <meshStandardMaterial
              color="#c0c0c0"
              metalness={0.95}
              roughness={0.05}
            />
          </mesh>
          <mesh position={[0, 0, -0.08]}>
            <torusGeometry args={[0.06, 0.015, 8, 16]} />
            <meshStandardMaterial
              color="#c0c0c0"
              metalness={0.95}
              roughness={0.05}
            />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

export default function Can3D({
  color = "#FF6B4A",
  labelColor = "#fff",
  className = "",
  rotation,
  autoRotate = true,
  floatIntensity = 1,
  canvasScale = 1,
}: {
  color?: string;
  labelColor?: string;
  className?: string;
  rotation?: [number, number, number];
  autoRotate?: boolean;
  floatIntensity?: number;
  canvasScale?: number;
}) {
  // canvasScale < 1 means the can takes up less of the canvas (more padding around it)
  const cameraZ = 5.5 / canvasScale;
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, cameraZ], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(0x000000, 0);
          scene.background = null;
        }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <directionalLight
          position={[-3, 2, -2]}
          intensity={0.6}
          color="#ffe0d0"
        />
        <pointLight position={[0, -3, 3]} intensity={0.5} color="#ff8866" />
        <pointLight position={[2, 3, -2]} intensity={0.4} color="#ffffff" />
        <SodaCan
          color={color}
          labelColor={labelColor}
          rotation={rotation}
          autoRotate={autoRotate}
          floatIntensity={floatIntensity}
        />
      </Canvas>
    </div>
  );
}
