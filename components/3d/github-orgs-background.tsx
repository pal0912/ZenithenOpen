"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GITHUB_ORG_AVATARS, GitHubOrgAvatar } from "@/lib/data/github-org-avatars";

interface AvatarSpriteEntity {
  sprite: THREE.Sprite;
  org: GitHubOrgAvatar;
  baseX: number;
  baseY: number;
  baseZ: number;
  vx: number;
  vy: number;
  vz: number;
  bobPhase: number;
  bobSpeed: number;
  repelX: number;
  repelY: number;
  repelZ: number;
  scale: number;
  currentScale: number;
}

/**
 * Creates a circular avatar texture for a GitHub organization.
 * Renders the real organization avatar inside a clean circular clip.
 */
function createOrgAvatarTexture(org: GitHubOrgAvatar): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  if (!ctx) return texture;

  // Initial placeholder while loading
  const drawPlaceholder = () => {
    ctx.clearRect(0, 0, 128, 128);

    ctx.save();
    ctx.beginPath();
    ctx.arc(64, 64, 60, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = "#111827";
    ctx.fill();

    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.font = "bold 38px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(org.login.charAt(0).toUpperCase(), 64, 64);
    ctx.restore();

    ctx.beginPath();
    ctx.arc(64, 64, 60, 0, Math.PI * 2);
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.stroke();
  };

  drawPlaceholder();

  // Load real GitHub organization avatar
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = `https://github.com/${org.login}.png?size=128`;

  img.onload = () => {
    ctx.clearRect(0, 0, 128, 128);

    // 1. Clip image into a clean circle
    ctx.save();
    ctx.beginPath();
    ctx.arc(64, 64, 60, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    ctx.fillStyle = "#ffffff";
    ctx.fill();

    ctx.drawImage(img, 4, 4, 120, 120);
    ctx.restore();

    // 2. Subtle, clean circular border
    ctx.beginPath();
    ctx.arc(64, 64, 60, 0, Math.PI * 2);
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
    ctx.stroke();

    texture.needsUpdate = true;
  };

  img.onerror = () => {
    // Keep placeholder on error
    drawPlaceholder();
    texture.needsUpdate = true;
  };

  return texture;
}

export function GitHubOrgs3DBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Accessibility: reduced motion check
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Density based on viewport size
    let count = 48;
    if (width < 640) {
      count = 22;
    } else if (width < 1024) {
      count = 34;
    }

    const orgsList = GITHUB_ORG_AVATARS.slice(0, count);

    // 1. Three.js Scene, Camera, & High-Performance Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 1, 3000);
    camera.position.set(0, 0, 650);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    // 2. Build Circular Avatar Sprites
    const avatarEntities: AvatarSpriteEntity[] = [];
    const avatarGroup = new THREE.Group();
    scene.add(avatarGroup);

    // Cache textures by organization login
    const textureCache = new Map<string, THREE.CanvasTexture>();

    // Totally random 3D spatial distribution bounds
    const rangeX = Math.min(width * 0.95, 980);
    const rangeY = Math.min(height * 0.85, 620);
    const rangeZ = 280;

    for (let i = 0; i < orgsList.length; i++) {
      const org = orgsList[i];

      let texture = textureCache.get(org.login);
      if (!texture) {
        texture = createOrgAvatarTexture(org);
        textureCache.set(org.login, texture);
      }

      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.94,
        depthWrite: false,
      });

      const sprite = new THREE.Sprite(material);

      // Random circular badge scale (38px to 54px)
      const baseScale = 38 + Math.random() * 16;
      sprite.scale.set(baseScale, baseScale, 1);

      // Totally random positions across 3D hero space
      const baseX = (Math.random() - 0.5) * rangeX;
      const baseY = (Math.random() - 0.5) * rangeY;
      const baseZ = (Math.random() - 0.5) * rangeZ;

      sprite.position.set(baseX, baseY, baseZ);
      avatarGroup.add(sprite);

      avatarEntities.push({
        sprite,
        org,
        baseX,
        baseY,
        baseZ,
        // Organic random drift velocities
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.24,
        vz: (Math.random() - 0.5) * 0.15,
        bobPhase: Math.random() * Math.PI * 2,
        bobSpeed: 0.0014 + Math.random() * 0.001,
        repelX: 0,
        repelY: 0,
        repelZ: 0,
        scale: baseScale,
        currentScale: baseScale,
      });
    }

    // 3. Mouse Tracking for 3D Repulsion
    const raycaster = new THREE.Raycaster();
    const mouseNDC = new THREE.Vector2(-9999, -9999);
    const mouse3D = new THREE.Vector3(0, 0, 0);
    let isMouseInside = false;

    // Plane at Z=0 for cursor 3D projection
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
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);

    // 4. Animation Loop with Organic Random Drift & Smooth Cursor Repulsion
    let animationFrameId: number;
    const clock = new THREE.Clock();
    const repulsionRadius = 220; // 3D units influence radius
    const maxRepulsionForce = 140; // Max repulsion impulse

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Check hovered sprite for subtle scale highlight (NO info card)
      raycaster.setFromCamera(mouseNDC, camera);
      const intersects = isMouseInside
        ? raycaster.intersectObjects(
            avatarEntities.map((e) => e.sprite),
            false
          )
        : [];
      const topHoveredSprite = intersects.length > 0 ? intersects[0].object : null;

      for (let i = 0; i < avatarEntities.length; i++) {
        const entity = avatarEntities[i];

        // Totally random organic slow drifting
        if (!prefersReducedMotion) {
          entity.baseX += entity.vx;
          entity.baseY += entity.vy;
          entity.baseZ += entity.vz;

          // Boundary bounce / wrap
          const halfX = rangeX / 2 + 30;
          const halfY = rangeY / 2 + 30;
          const halfZ = rangeZ / 2 + 25;

          if (entity.baseX > halfX) entity.vx = -Math.abs(entity.vx);
          if (entity.baseX < -halfX) entity.vx = Math.abs(entity.vx);
          if (entity.baseY > halfY) entity.vy = -Math.abs(entity.vy);
          if (entity.baseY < -halfY) entity.vy = Math.abs(entity.vy);
          if (entity.baseZ > halfZ) entity.vz = -Math.abs(entity.vz);
          if (entity.baseZ < -halfZ) entity.vz = Math.abs(entity.vz);
        }

        // Gentle sinusoidal bobbing
        const currentBob = Math.sin(elapsedTime * 1.5 + entity.bobPhase) * 6;

        const currentX = entity.baseX;
        const currentY = entity.baseY + currentBob;
        const currentZ = entity.baseZ;

        // Cursor Repulsion Calculation
        if (isMouseInside) {
          const dx = currentX - mouse3D.x;
          const dy = currentY - mouse3D.y;
          const dist2D = Math.sqrt(dx * dx + dy * dy);

          if (dist2D < repulsionRadius) {
            // Quadratic falloff: closer = stronger push
            const forceRatio = 1 - dist2D / repulsionRadius;
            const pushMagnitude = forceRatio * forceRatio * maxRepulsionForce;
            const dirX = dist2D > 0.001 ? dx / dist2D : 1;
            const dirY = dist2D > 0.001 ? dy / dist2D : 0;

            entity.repelX += (dirX * pushMagnitude - entity.repelX) * 0.22;
            entity.repelY += (dirY * pushMagnitude - entity.repelY) * 0.22;
            entity.repelZ += (forceRatio * 50 - entity.repelZ) * 0.18;
          } else {
            // Smooth ease-out float back to base position
            entity.repelX += (0 - entity.repelX) * 0.06;
            entity.repelY += (0 - entity.repelY) * 0.06;
            entity.repelZ += (0 - entity.repelZ) * 0.06;
          }
        } else {
          entity.repelX += (0 - entity.repelX) * 0.06;
          entity.repelY += (0 - entity.repelY) * 0.06;
          entity.repelZ += (0 - entity.repelZ) * 0.06;
        }

        // Apply position
        entity.sprite.position.set(
          currentX + entity.repelX,
          currentY + entity.repelY,
          currentZ + entity.repelZ
        );

        // Subtle scale highlight on hover (NO info card)
        const isHovered = entity.sprite === topHoveredSprite;
        const targetScale = isHovered ? entity.scale * 1.2 : entity.scale;
        entity.currentScale += (targetScale - entity.currentScale) * 0.18;
        entity.sprite.scale.set(entity.currentScale, entity.currentScale, 1);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 5. Responsive Resize Handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 6. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);

      avatarEntities.forEach((entity) => {
        entity.sprite.material.dispose();
      });
      textureCache.forEach((tex) => tex.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-auto"
      aria-label="Interactive 3D background with real GitHub organization circular avatars and cursor repulsion"
    >
      {/* Three.js Canvas */}
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Screen Reader Alternative */}
      <span className="sr-only">
        Interactive 3D galaxy visualization of GitHub organization avatars with cursor repulsion.
      </span>
    </div>
  );
}
