"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── Mouse tracking state shared across components ─────────────────────────
const mouse = { x: 0, y: 0 };

function trackMouse(e: MouseEvent) {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
}

// ─── Particle field component (rendered inside Canvas) ─────────────────────
function ParticleField() {
  const meshRef = useRef<THREE.Points>(null);
  const { size } = useThree();

  const COUNT = 1800;

  // Generate random particle positions and base velocities
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      velocities[i * 3 + 0] = (Math.random() - 0.5) * 0.003;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      velocities[i * 3 + 2] = 0;
    }
    return { positions, velocities };
  }, []);

  // Vertex shader — color particles by height
  const shaderMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColor1: { value: new THREE.Color("#60a5fa") },  // primary blue
      uColor2: { value: new THREE.Color("#22d3ee") },  // secondary cyan
    },
    vertexShader: `
      uniform float uTime;
      uniform vec2 uMouse;
      attribute float aSize;
      varying float vY;

      void main() {
        vec3 pos = position;
        // gentle drift
        pos.x += sin(uTime * 0.3 + pos.y * 0.5) * 0.08;
        pos.y += cos(uTime * 0.2 + pos.x * 0.4) * 0.06;

        // mouse repulsion
        vec3 worldPos = (modelMatrix * vec4(pos, 1.0)).xyz;
        vec2 diff = worldPos.xy - uMouse * vec2(10.0, 6.0);
        float dist = length(diff);
        if (dist < 2.5) {
          pos.xy += normalize(diff) * (2.5 - dist) * 0.18;
        }

        vY = pos.y;
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = mix(1.2, 2.8, (pos.z + 4.0) / 8.0) * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      varying float vY;

      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        float alpha = smoothstep(0.5, 0.1, dist) * 0.75;
        float t = clamp((vY + 6.0) / 12.0, 0.0, 1.0);
        vec3 color = mix(uColor1, uColor2, t);
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    shaderMaterial.uniforms.uTime.value = clock.getElapsedTime();
    shaderMaterial.uniforms.uMouse.value.set(mouse.x, mouse.y);
  });

  return (
    <points ref={meshRef} material={shaderMaterial}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={COUNT}
        />
      </bufferGeometry>
    </points>
  );
}

// ─── Connection lines between close particles (WebGL lines) ────────────────
function ConnectionLines() {
  const ref = useRef<THREE.LineSegments>(null);
  const COUNT = 220;

  const positions = useMemo(() => {
    const pts = new Float32Array(COUNT * 6);
    for (let i = 0; i < COUNT; i++) {
      pts[i * 6 + 0] = (Math.random() - 0.5) * 18;
      pts[i * 6 + 1] = (Math.random() - 0.5) * 10;
      pts[i * 6 + 2] = (Math.random() - 0.5) * 4;
      pts[i * 6 + 3] = pts[i * 6 + 0] + (Math.random() - 0.5) * 4;
      pts[i * 6 + 4] = pts[i * 6 + 1] + (Math.random() - 0.5) * 3;
      pts[i * 6 + 5] = pts[i * 6 + 2];
    }
    return pts;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = clock.getElapsedTime() * 0.015;
  });

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={COUNT * 2} />
      </bufferGeometry>
      <lineBasicMaterial color="#60a5fa" transparent opacity={0.06} />
    </lineSegments>
  );
}

// ─── Main exported component ────────────────────────────────────────────────
export default function ParticleBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    window.addEventListener("mousemove", trackMouse, { passive: true });
    return () => window.removeEventListener("mousemove", trackMouse);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="absolute inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ParticleField />
        <ConnectionLines />
      </Canvas>
    </div>
  );
}
