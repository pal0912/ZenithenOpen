"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { TOP_100_ORG_LOGOS, OrgLogoBadge } from "@/lib/data/top-100-org-logos";

interface SphereEntity {
  sprite: THREE.Sprite;
  org: OrgLogoBadge;
  orbitRadius: number;
  orbitSpeed: number;
  angle: number;
  baseY: number;
  baseZ: number;
  bobPhase: number;
  repelX: number;
  repelY: number;
  repelZ: number;
  baseScale: number;
  entranceDelay: number;
}

/**
 * Creates a clean circular logo badge texture for an organization.
 * Renders a crisp solid white circle with subtle border and centered official vector logo.
 * 100% self-contained data URI with ZERO CORS errors, zero network delays, and instant 60 FPS loading.
 */
function createCircularOrgTexture(org: OrgLogoBadge): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  if (!ctx) return texture;

  // Immediate solid white circular disc (ensures zero frame flicker)
  ctx.clearRect(0, 0, 256, 256);
  ctx.save();
  ctx.beginPath();
  ctx.arc(128, 128, 120, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = "rgba(226, 232, 240, 0.95)";
  ctx.stroke();
  ctx.restore();

  // Prepare full SVG badge containing the official logo centered within the circle
  const innerSvg = org.svg.replace(/^<svg[^>]*>|<\/svg>$/gi, "");
  const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
    <defs>
      <clipPath id="circleBadgeClip_${org.rank}">
        <circle cx="128" cy="128" r="120"/>
      </clipPath>
    </defs>
    <!-- Solid white disc base -->
    <circle cx="128" cy="128" r="120" fill="#ffffff"/>
    <!-- Centered logo inside circle -->
    <g clip-path="url(#circleBadgeClip_${org.rank})">
      <g transform="translate(50, 50)">
        <svg width="156" height="156" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
          ${innerSvg}
        </svg>
      </g>
    </g>
    <!-- Crisp subtle border ring -->
    <circle cx="128" cy="128" r="120" fill="none" stroke="rgba(226, 232, 240, 0.95)" stroke-width="4"/>
  </svg>`;

  const img = new Image();
  img.onload = () => {
    ctx.clearRect(0, 0, 256, 256);
    ctx.drawImage(img, 0, 0, 256, 256);
    texture.needsUpdate = true;
  };

  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(fullSvg)}`;

  return texture;
}

export function GitHubOrgs3DBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Accessibility: Reduced motion check
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Responsive density: 85 on desktop, 55 on tablet, 28 on mobile
    let orgCount = 85;
    if (width < 640) {
      orgCount = 28;
    } else if (width < 1024) {
      orgCount = 55;
    }

    const orgsList: OrgLogoBadge[] = TOP_100_ORG_LOGOS.slice(0, orgCount);

    // 1. Three.js Scene, Camera, & High-Performance Renderer
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

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    // 2. Build 3D Circular Organization Sprites
    const sphereEntities: SphereEntity[] = [];
    const galaxyGroup = new THREE.Group();
    scene.add(galaxyGroup);

    // Texture cache prevents duplicate network requests
    const textureCache = new Map<string, THREE.CanvasTexture>();

    orgsList.forEach((org: OrgLogoBadge, index: number) => {
      let texture = textureCache.get(org.login);
      if (!texture) {
        texture = createCircularOrgTexture(org);
        textureCache.set(org.login, texture);
      }

      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
      });

      const sprite = new THREE.Sprite(material);

      // Sizing scaled by rank importance (top ranked orgs are slightly larger)
      const rankRatio = (orgCount - org.rank) / orgCount;
      const baseScale = 34 + rankRatio * 22; // 34px to 56px
      sprite.scale.set(baseScale, baseScale, 1);

      // Layered orbital distribution around center
      const angle = (index / orgCount) * Math.PI * 4 + (Math.random() * 0.4);
      const orbitLayer = index % 5;
      const orbitRadius = 180 + orbitLayer * 68 + (Math.random() * 30);
      const baseY = ((index % 7) - 3) * 58 + (Math.sin(index * 2) * 35);
      const baseZ = ((index % 5) - 2) * 85 + (Math.cos(index * 1.5) * 40);

      // Entrance animation initial offset
      const entranceDistance = prefersReducedMotion ? 1 : 1.9;
      sprite.position.set(
        Math.cos(angle) * orbitRadius * entranceDistance,
        baseY + (prefersReducedMotion ? 0 : 250),
        baseZ - (prefersReducedMotion ? 0 : 450)
      );

      sprite.userData = { org };
      galaxyGroup.add(sprite);

      sphereEntities.push({
        sprite,
        org,
        orbitRadius,
        orbitSpeed: (0.0006 + (index % 4) * 0.00028) * (index % 2 === 0 ? 1 : -0.85),
        angle,
        baseY,
        baseZ,
        bobPhase: Math.random() * Math.PI * 2,
        repelX: 0,
        repelY: 0,
        repelZ: 0,
        baseScale,
        entranceDelay: (index * 0.025), // Staggered entrance
      });
    });

    // 3. Mouse Tracking & Raycasting for Cursor Repulsion (NO POPUPS)
    const raycaster = new THREE.Raycaster();
    const mouseNDC = new THREE.Vector2(-9999, -9999);
    const mouse3D = new THREE.Vector3(0, 0, 0);
    let isMouseInside = false;

    // Plane at Z=0 to calculate 3D world mouse position
    const planeZ0 = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    const updateMouseCoords = (clientX: number, clientY: number) => {
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
      updateMouseCoords(e.clientX, e.clientY);
    };

    const handlePointerLeave = () => {
      isMouseInside = false;
      mouseNDC.set(-9999, -9999);
    };

    // Mobile touch handling (disables during scrolling)
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 150);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isScrolling) return;
      if (e.touches.length > 0) {
        isMouseInside = true;
        updateMouseCoords(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchEnd = () => {
      isMouseInside = false;
      mouseNDC.set(-9999, -9999);
    };

    // Optional click on circle opens official GitHub org without any popups
    const handleClick = () => {
      if (mouseNDC.x < -100) return;
      raycaster.setFromCamera(mouseNDC, camera);
      const intersects = raycaster.intersectObjects(
        sphereEntities.map((e) => e.sprite),
        false
      );

      if (intersects.length > 0) {
        const clickedOrg = intersects[0].object.userData.org as OrgLogoBadge;
        if (clickedOrg?.login) {
          window.open(`https://github.com/${clickedOrg.login}`, "_blank", "noopener,noreferrer");
        }
      }
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);
    container.addEventListener("click", handleClick);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    // 4. Animation Loop: Orbital Movement + Cursor Repulsion Physics (NO POPUPS)
    let animationFrameId: number;
    const clock = new THREE.Clock();
    let entranceTimer = prefersReducedMotion ? 3.0 : 0;
    const REPULSION_RADIUS = 260; // Distance at which repulsion starts
    const MAX_PUSH_FORCE = 150; // Maximum push distance

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const delta = Math.min(clock.getDelta(), 0.05);

      if (entranceTimer < 3.0) {
        entranceTimer += delta;
      }

      // Orbital galaxy slow drift
      if (!prefersReducedMotion) {
        galaxyGroup.rotation.y = elapsedTime * 0.025;
        galaxyGroup.rotation.x = Math.sin(elapsedTime * 0.015) * 0.06;
      }

      // Cursor pointer toggle on hover (NO INFO POPUPS)
      raycaster.setFromCamera(mouseNDC, camera);
      const intersects = isMouseInside
        ? raycaster.intersectObjects(
            sphereEntities.map((e) => e.sprite),
            false
          )
        : [];
      container.style.cursor = intersects.length > 0 ? "pointer" : "default";

      for (let i = 0; i < sphereEntities.length; i++) {
        const entity = sphereEntities[i];

        // 1. Calculate orbital position
        entity.angle += entity.orbitSpeed;
        const targetOrbitX = Math.cos(entity.angle) * entity.orbitRadius;
        const targetOrbitY = entity.baseY + Math.sin(elapsedTime * 1.57 + entity.bobPhase) * 18; // 4s cycle bobbing
        const targetOrbitZ = entity.baseZ + Math.sin(entity.angle) * (entity.orbitRadius * 0.28);

        // Staggered entrance animation
        const entityElapsed = Math.max(0, entranceTimer - entity.entranceDelay);
        const entranceProgress = Math.min(1, entityElapsed / 1.6);
        const easeOut = 1 - Math.pow(1 - entranceProgress, 3);

        const currentBaseX = targetOrbitX * (0.3 + 0.7 * easeOut);
        const currentBaseY = targetOrbitY + (1 - easeOut) * 200;
        const currentBaseZ = targetOrbitZ - (1 - easeOut) * 350;

        // Transform base position into world space considering galaxy rotation
        const worldPos = new THREE.Vector3(currentBaseX, currentBaseY, currentBaseZ);
        worldPos.applyMatrix4(galaxyGroup.matrixWorld);

        // 2. Cursor Repulsion Effect (NO INFO CARDS, JUST SMOOTH MOVEMENT)
        if (isMouseInside && !isScrolling) {
          const dx = worldPos.x - mouse3D.x;
          const dy = worldPos.y - mouse3D.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < REPULSION_RADIUS) {
            // Push circle away from cursor
            const pushRatio = (REPULSION_RADIUS - dist) / REPULSION_RADIUS;
            const pushMagnitude = pushRatio * pushRatio * MAX_PUSH_FORCE;
            const dirX = dist > 0.001 ? dx / dist : 1;
            const dirY = dist > 0.001 ? dy / dist : 0;

            entity.repelX += (dirX * pushMagnitude - entity.repelX) * 0.25;
            entity.repelY += (dirY * pushMagnitude - entity.repelY) * 0.25;
            entity.repelZ += (pushRatio * 50 - entity.repelZ) * 0.2;
          } else {
            // Return smoothly to orbital position with 0.05 lerp
            entity.repelX += (0 - entity.repelX) * 0.05;
            entity.repelY += (0 - entity.repelY) * 0.05;
            entity.repelZ += (0 - entity.repelZ) * 0.05;
          }
        } else {
          // Smooth return to orbit when mouse is outside
          entity.repelX += (0 - entity.repelX) * 0.05;
          entity.repelY += (0 - entity.repelY) * 0.05;
          entity.repelZ += (0 - entity.repelZ) * 0.05;
        }

        // Apply position
        entity.sprite.position.set(
          currentBaseX + entity.repelX,
          currentBaseY + entity.repelY,
          currentBaseZ + entity.repelZ
        );

        // Scale entrance
        const renderScale = entity.baseScale * (0.2 + 0.8 * easeOut);
        entity.sprite.scale.set(renderScale, renderScale, 1);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 5. Responsive Resize
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
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      container.removeEventListener("click", handleClick);

      sphereEntities.forEach((entity) => {
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
      aria-label="Interactive 3D background with top 100 GitHub organization circular icons and cursor repulsion"
    >
      {/* Three.js Canvas */}
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Screen Reader Alternative */}
      <span className="sr-only">
        Interactive 3D galaxy visualization of top 100 GitHub organization circular icons with cursor repulsion.
      </span>
    </div>
  );
}
