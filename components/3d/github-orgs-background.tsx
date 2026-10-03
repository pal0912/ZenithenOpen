"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { GITHUB_TOP_100_ORGS, GitHubOrg, getLanguageColor } from "@/lib/data/github-top-orgs";
import { ExternalLink, Star, Code2 } from "lucide-react";

interface SphereEntity {
  mesh: THREE.Mesh;
  glowMesh: THREE.Mesh;
  org: GitHubOrg;
  baseRadius: number;
  orbitRadius: number;
  orbitSpeed: number;
  angle: number;
  baseY: number;
  baseZ: number;
  bobPhase: number;
  bobSpeed: number;
  bobAmp: number;
  repelX: number;
  repelY: number;
  repelZ: number;
  currentScale: number;
  targetScale: number;
}

export function GitHubOrgs3DBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Interactive HUD tooltip state
  const [hoveredOrg, setHoveredOrg] = useState<{
    org: GitHubOrg;
    screenX: number;
    screenY: number;
  } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // 1. Accessibility: Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 2. Responsive sphere count
    const width = container.clientWidth;
    const height = container.clientHeight;
    let sphereCount = 100;
    if (width < 640) {
      sphereCount = 32;
    } else if (width < 1024) {
      sphereCount = 65;
    }

    const orgsList = GITHUB_TOP_100_ORGS.slice(0, sphereCount);

    // 3. Scene, Camera & Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 1, 3000);
    camera.position.set(0, 0, 680);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00d4ff, 3.2, 1200);
    cyanLight.position.set(280, 240, 400);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 2.8, 1200);
    purpleLight.position.set(-280, -200, 350);
    scene.add(purpleLight);

    const frontLight = new THREE.DirectionalLight(0xffffff, 0.45);
    frontLight.position.set(0, 200, 500);
    scene.add(frontLight);

    // 5. Build Spheres for GitHub Organizations
    const sphereEntities: SphereEntity[] = [];
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    // Reusable geometries
    const baseSphereGeom = new THREE.IcosahedronGeometry(1, 2);
    const haloGeom = new THREE.IcosahedronGeometry(1.2, 1);

    orgsList.forEach((org, index) => {
      // Calculate sphere radius based on star count (range ~7 to ~26 units)
      const starRatio = Math.sqrt(org.stars / 405000);
      const baseRadius = 7 + starRatio * 19;

      const langColorHex = getLanguageColor(org.language);
      const color = new THREE.Color(langColorHex);

      // Core Mesh Material
      const material = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.18,
        metalness: 0.35,
        emissive: color,
        emissiveIntensity: 0.38,
      });

      const mesh = new THREE.Mesh(baseSphereGeom, material);
      mesh.scale.set(baseRadius, baseRadius, baseRadius);

      // Outer glow halo mesh
      const haloMaterial = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.16,
        wireframe: true,
      });
      const glowMesh = new THREE.Mesh(haloGeom, haloMaterial);
      mesh.add(glowMesh);

      // Orbital distribution parameters
      // Arranged in layered elliptical orbits around the hero center
      const angle = (index / sphereCount) * Math.PI * 4;
      const orbitLayer = index % 5;
      const orbitRadius = 220 + orbitLayer * 65 + (index % 3) * 25;
      const baseY = ((index % 7) - 3) * 55 + (Math.sin(index) * 30);
      const baseZ = ((index % 5) - 2) * 80 + (Math.cos(index) * 40);

      // Initial entrance position (flying in from outer depth)
      mesh.position.set(
        Math.cos(angle) * orbitRadius * (prefersReducedMotion ? 1 : 1.8),
        baseY + (prefersReducedMotion ? 0 : 200),
        baseZ - (prefersReducedMotion ? 0 : 450)
      );

      mesh.userData = { org, index };
      sphereGroup.add(mesh);

      sphereEntities.push({
        mesh,
        glowMesh,
        org,
        baseRadius,
        orbitRadius,
        orbitSpeed: (0.0007 + (index % 4) * 0.0003) * (index % 2 === 0 ? 1 : -0.85),
        angle,
        baseY,
        baseZ,
        bobPhase: Math.random() * Math.PI * 2,
        bobSpeed: 0.0018 + (index % 5) * 0.0004,
        bobAmp: 14 + (index % 4) * 5,
        repelX: 0,
        repelY: 0,
        repelZ: 0,
        currentScale: 1.0,
        targetScale: 1.0,
      });
    });

    // 6. Mouse Tracking & Raycasting
    const raycaster = new THREE.Raycaster();
    const mouseNDC = new THREE.Vector2(-9999, -9999);
    const mouse3D = new THREE.Vector3(0, 0, 0);
    let isMouseInside = false;

    // Unproject mouse coordinates onto Z=0 plane for 3D repulsion
    const planeZ0 = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const updateMouse3D = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((clientY - rect.top) / rect.height) * 2 - 1);
      mouseNDC.set(x, y);

      raycaster.setFromCamera(mouseNDC, camera);
      const intersectPoint = new THREE.Vector3();
      raycaster.ray.intersectPlane(planeZ0, intersectPoint);
      if (intersectPoint) {
        mouse3D.copy(intersectPoint);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      isMouseInside = true;
      updateMouse3D(e.clientX, e.clientY);
    };

    const handlePointerLeave = () => {
      isMouseInside = false;
      mouseNDC.set(-9999, -9999);
      setHoveredOrg(null);
      container.style.cursor = "default";
    };

    // Click handler to open organization page
    const handleClick = () => {
      if (mouseNDC.x < -100) return;
      raycaster.setFromCamera(mouseNDC, camera);
      const intersects = raycaster.intersectObjects(
        sphereEntities.map((e) => e.mesh),
        false
      );

      if (intersects.length > 0) {
        const clickedOrg = intersects[0].object.userData.org as GitHubOrg;
        if (clickedOrg?.url) {
          window.open(clickedOrg.url, "_blank", "noopener,noreferrer");
        }
      }
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);
    container.addEventListener("click", handleClick);

    // 7. Animation Loop & Repulsion Physics
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let entranceProgress = prefersReducedMotion ? 1 : 0;
    const repulsionRadius = 240; // Pixel / 3D influence radius
    const maxRepulsionForce = 130; // Max repulsion distance

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const delta = Math.min(clock.getDelta(), 0.05);

      // Entrance animation progression (smooth ease-out over ~2.2 seconds)
      if (entranceProgress < 1) {
        entranceProgress = Math.min(1, entranceProgress + delta * 0.7);
      }
      // Ease out cubic
      const easeT = 1 - Math.pow(1 - entranceProgress, 3);

      // Continuous orbital slow rotation of the overall galaxy
      if (!prefersReducedMotion) {
        sphereGroup.rotation.y = elapsedTime * 0.035;
        sphereGroup.rotation.x = Math.sin(elapsedTime * 0.02) * 0.08;
      }

      // Check hovered sphere for visual HUD and highlight
      raycaster.setFromCamera(mouseNDC, camera);
      const intersects = isMouseInside
        ? raycaster.intersectObjects(
            sphereEntities.map((e) => e.mesh),
            false
          )
        : [];

      let topHoveredIndex = -1;
      if (intersects.length > 0) {
        topHoveredIndex = intersects[0].object.userData.index;
        const org = intersects[0].object.userData.org as GitHubOrg;
        container.style.cursor = "pointer";

        // Convert 3D position to 2D screen coordinate for tooltip HUD
        const screenPos = intersects[0].point.clone().project(camera);
        const rect = container.getBoundingClientRect();
        const screenX = ((screenPos.x + 1) / 2) * rect.width;
        const screenY = ((-screenPos.y + 1) / 2) * rect.height;

        setHoveredOrg({
          org,
          screenX,
          screenY,
        });
      } else {
        setHoveredOrg(null);
        if (isMouseInside) {
          container.style.cursor = "default";
        }
      }

      // Update each sphere position, repulsion, and scale
      for (let i = 0; i < sphereEntities.length; i++) {
        const entity = sphereEntities[i];

        // 1. Orbital position calculation
        entity.angle += entity.orbitSpeed;
        const targetOrbitX = Math.cos(entity.angle) * entity.orbitRadius;
        const targetOrbitY = entity.baseY + Math.sin(elapsedTime * entity.bobSpeed * 50 + entity.bobPhase) * entity.bobAmp;
        const targetOrbitZ = entity.baseZ + Math.sin(entity.angle) * (entity.orbitRadius * 0.28);

        // Interpolate entrance animation
        const currentBaseX = targetOrbitX;
        const currentBaseY = targetOrbitY;
        const currentBaseZ = targetOrbitZ;

        // Transform base position into world space considering sphereGroup rotation
        const worldPos = new THREE.Vector3(currentBaseX, currentBaseY, currentBaseZ);
        worldPos.applyMatrix4(sphereGroup.matrixWorld);

        // 2. Cursor Repulsion Physics
        if (isMouseInside) {
          const dx = worldPos.x - mouse3D.x;
          const dy = worldPos.y - mouse3D.y;
          const dist2D = Math.sqrt(dx * dx + dy * dy);

          if (dist2D < repulsionRadius) {
            // Quadratic falloff: closer = stronger push
            const forceRatio = 1 - dist2D / repulsionRadius;
            const pushMagnitude = forceRatio * forceRatio * maxRepulsionForce;
            const dirX = dist2D > 0.001 ? dx / dist2D : 1;
            const dirY = dist2D > 0.001 ? dy / dist2D : 0;

            // Direct instant push
            entity.repelX += (dirX * pushMagnitude - entity.repelX) * 0.22;
            entity.repelY += (dirY * pushMagnitude - entity.repelY) * 0.22;
            entity.repelZ += (forceRatio * 60 - entity.repelZ) * 0.18;
          } else {
            // Smooth ease-out return to baseline orbit
            entity.repelX += (0 - entity.repelX) * 0.055;
            entity.repelY += (0 - entity.repelY) * 0.055;
            entity.repelZ += (0 - entity.repelZ) * 0.055;
          }
        } else {
          // No mouse in canvas: smooth return to orbit
          entity.repelX += (0 - entity.repelX) * 0.055;
          entity.repelY += (0 - entity.repelY) * 0.055;
          entity.repelZ += (0 - entity.repelZ) * 0.055;
        }

        // Apply final position to mesh
        entity.mesh.position.set(
          currentBaseX + entity.repelX,
          currentBaseY + entity.repelY,
          currentBaseZ + entity.repelZ
        );

        // 3. Hover highlight, scale, and glow
        const isHovered = i === topHoveredIndex;
        entity.targetScale = isHovered ? 1.25 : 1.0;
        entity.currentScale += (entity.targetScale - entity.currentScale) * 0.15;

        const effectiveScale = entity.baseRadius * entity.currentScale * (0.3 + 0.7 * easeT);
        entity.mesh.scale.set(effectiveScale, effectiveScale, effectiveScale);

        const mat = entity.mesh.material as THREE.MeshStandardMaterial;
        const targetEmissive = isHovered ? 0.95 : 0.35;
        mat.emissiveIntensity += (targetEmissive - mat.emissiveIntensity) * 0.15;

        const haloMat = entity.glowMesh.material as THREE.MeshBasicMaterial;
        const targetHaloOpacity = isHovered ? 0.45 : 0.15;
        haloMat.opacity += (targetHaloOpacity - haloMat.opacity) * 0.15;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 8. Resize Observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      container.removeEventListener("click", handleClick);

      // Dispose Three.js objects
      sphereEntities.forEach((entity) => {
        entity.mesh.geometry.dispose();
        if (Array.isArray(entity.mesh.material)) {
          entity.mesh.material.forEach((m) => m.dispose());
        } else {
          entity.mesh.material.dispose();
        }
        entity.glowMesh.geometry.dispose();
        if (Array.isArray(entity.glowMesh.material)) {
          entity.glowMesh.material.forEach((m) => m.dispose());
        } else {
          entity.glowMesh.material.dispose();
        }
      });
      baseSphereGeom.dispose();
      haloGeom.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden select-none"
      aria-label="Interactive 3D background showing top GitHub organizations"
    >
      {/* Three.js Canvas */}
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Screen Reader Alternative */}
      <span className="sr-only">
        Interactive 3D galaxy visualization of GitHub&apos;s top 100 organizations with cursor repulsion.
      </span>

      {/* Dynamic Hover Tooltip HUD */}
      {hoveredOrg && (
        <div
          className="pointer-events-none absolute z-20 flex flex-col -translate-x-1/2 -translate-y-[120%] transition-opacity duration-200"
          style={{
            left: `${hoveredOrg.screenX}px`,
            top: `${hoveredOrg.screenY}px`,
          }}
        >
          <div className="flex flex-col rounded-xl border border-white/[0.18] bg-slate-950/90 p-3 shadow-2xl backdrop-blur-xl min-w-[210px] text-left">
            <div className="flex items-center justify-between space-x-3 mb-1.5">
              <span className="text-xs font-bold text-white tracking-tight flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full shadow-sm"
                  style={{ backgroundColor: getLanguageColor(hoveredOrg.org.language) }}
                />
                {hoveredOrg.org.name}
              </span>
              <span className="flex items-center text-[10px] font-semibold text-amber-400 gap-0.5">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                {(hoveredOrg.org.stars / 1000).toFixed(0)}k
              </span>
            </div>

            <p className="text-[11px] text-slate-300 leading-snug line-clamp-2 mb-2">
              {hoveredOrg.org.description}
            </p>

            <div className="flex items-center justify-between pt-1.5 border-t border-white/[0.08] text-[10px] text-slate-400 font-mono">
              <span className="px-1.5 py-0.5 rounded bg-white/[0.05] text-slate-200">
                {hoveredOrg.org.language}
              </span>
              <span className="text-blue-400 flex items-center gap-1">
                <span>View on GitHub</span>
                <ExternalLink className="h-2.5 w-2.5" />
              </span>
            </div>
          </div>
          {/* Arrow indicator */}
          <div className="w-2.5 h-2.5 bg-slate-950 border-r border-b border-white/[0.18] rotate-45 mx-auto -mt-1 shadow-sm" />
        </div>
      )}
    </div>
  );
}
