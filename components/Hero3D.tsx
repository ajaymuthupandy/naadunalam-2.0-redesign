"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

type Props = {
  photo: string;
  /** vertical crop focus for the arch photo: 0 keeps the top, 0.5 centres, 1 keeps the bottom */
  focusY?: number;
  elements: { img: string; tint: string; ta: string; en: string; glow?: boolean; night?: boolean }[];
  label: string;
};

/** Temple-arch outline (doorway with a rounded top), centred on the origin */
function archShape(w: number, h: number) {
  const r = w / 2;
  const s = new THREE.Shape();
  s.moveTo(-r, -h / 2);
  s.lineTo(r, -h / 2);
  s.lineTo(r, h / 2 - r);
  s.absarc(0, h / 2 - r, r, 0, Math.PI, false);
  s.lineTo(-r, -h / 2);
  return s;
}

/** Normalise planar UVs to 0..1 so a photo maps across the whole shape (object-fit: cover; focusY like object-position y) */
function fitUVs(geo: THREE.BufferGeometry, imgAspect: number, focusY = 0.5) {
  geo.computeBoundingBox();
  const bb = geo.boundingBox!;
  const w = bb.max.x - bb.min.x;
  const h = bb.max.y - bb.min.y;
  const shapeAspect = w / h;
  let sx = 1, sy = 1;
  if (imgAspect > shapeAspect) sx = shapeAspect / imgAspect; else sy = imgAspect / shapeAspect;
  const v0 = (1 - sy) * (1 - focusY); // texture v runs bottom → top
  const pos = geo.attributes.position;
  const uv = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    const u = (pos.getX(i) - bb.min.x) / w;
    const v = (pos.getY(i) - bb.min.y) / h;
    uv[i * 2] = 0.5 + (u - 0.5) * sx;
    uv[i * 2 + 1] = v0 + v * sy;
  }
  geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
}

export default function Hero3D({ photo, focusY = 0.5, elements, label }: Props) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    el.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0.2, 11);

    // Light: warm sun key, gold rim, soft ambient
    scene.add(new THREE.AmbientLight(0xfff0d8, 0.75));
    const key = new THREE.DirectionalLight(0xffe2a8, 2.2);
    key.position.set(-4, 6, 8);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xf5b335, 1.6);
    rim.position.set(5, 2, -6);
    scene.add(rim);
    const fireLight = new THREE.PointLight(0xff9a3c, 0, 6);
    scene.add(fireLight);

    const loader = new THREE.TextureLoader();
    const disposables: { dispose: () => void }[] = [];
    const tex = (src: string, onLoad?: (t: THREE.Texture) => void) => {
      const t = loader.load(src, (tt) => onLoad?.(tt));
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
      disposables.push(t);
      return t;
    };

    const stage = new THREE.Group();
    scene.add(stage);

    // --- the arch with the family photograph
    const AW = 3.3, AH = 4.5;
    const frameShape = archShape(AW + 0.34, AH + 0.34);
    frameShape.holes.push(new THREE.Path(archShape(AW, AH).getPoints(64).reverse()));
    const frameGeo = new THREE.ExtrudeGeometry(frameShape, { depth: 0.22, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.05, bevelSegments: 4, curveSegments: 64 });
    frameGeo.translate(0, 0, -0.11);
    const copper = new THREE.MeshStandardMaterial({ color: 0xc27a4e, metalness: 1, roughness: 0.26, envMapIntensity: 1.2 });
    const frame = new THREE.Mesh(frameGeo, copper);
    stage.add(frame);

    const backGeo = new THREE.ExtrudeGeometry(archShape(AW + 0.34, AH + 0.34), { depth: 0.1, bevelEnabled: false, curveSegments: 64 });
    backGeo.translate(0, 0, -0.22);
    const back = new THREE.Mesh(backGeo, new THREE.MeshStandardMaterial({ color: 0x5a270d, roughness: 0.8 }));
    stage.add(back);

    const photoGeo = new THREE.ShapeGeometry(archShape(AW, AH), 64);
    const photoMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const photoTex = tex(photo, (t) => {
      const img = t.image as HTMLImageElement;
      fitUVs(photoGeo, img.width / img.height, focusY);
      photoMat.map = t;
      photoMat.needsUpdate = true;
    });
    void photoTex;
    const photoMesh = new THREE.Mesh(photoGeo, photoMat);
    photoMesh.position.z = 0.02;
    stage.add(photoMesh);

    // kalasam finial on the arch
    const finial = new THREE.Mesh(
      new THREE.LatheGeometry(
        [[0, 0], [0.22, 0.02], [0.26, 0.12], [0.16, 0.24], [0.2, 0.34], [0.12, 0.5], [0.05, 0.62], [0, 0.7]].map(([x, y]) => new THREE.Vector2(x, y)),
        32
      ),
      copper
    );
    finial.position.set(0, AH / 2 + 0.17, 0);
    stage.add(finial);

    // --- orbit of the five elements
    const orbit = new THREE.Group();
    orbit.rotation.x = 0.32;
    orbit.rotation.z = -0.12;
    stage.add(orbit);
    const R = 3.05;
    const ring = new THREE.Mesh(new THREE.TorusGeometry(R, 0.012, 8, 200), new THREE.MeshBasicMaterial({ color: 0xfbf1de, transparent: true, opacity: 0.45 }));
    ring.rotation.x = Math.PI / 2;
    orbit.add(ring);

    // HTML name tags that follow each orb (Tamil + English), so the five elements read at a glance
    const tagLayer = document.createElement("div");
    tagLayer.style.cssText = "position:absolute;inset:0;pointer-events:none;overflow:hidden";
    el.appendChild(tagLayer);

    const orbs = elements.map((e, i) => {
      // self-lit with its own photo, so the shaded side never turns black
      const mat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.45,
        metalness: 0.05,
        // a night-sky photo is mostly black, so it glows in its own twilight tint instead
        emissive: new THREE.Color(e.night ? e.tint : 0xffffff),
        emissiveIntensity: e.night ? 0.55 : e.glow ? 0.75 : 0.5,
      });
      tex(e.img, (t) => {
        mat.map = t;
        if (!e.night) mat.emissiveMap = t;
        mat.needsUpdate = true;
      });
      const g = new THREE.Group();
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.6, 48, 48), mat);
      const halo = new THREE.Mesh(new THREE.TorusGeometry(0.74, 0.016, 8, 80), new THREE.MeshBasicMaterial({ color: new THREE.Color(e.tint) }));
      g.add(m, halo);
      orbit.add(g);

      const tag = document.createElement("div");
      tag.className = "nn-orb-tag";
      const ta = document.createElement("span");
      ta.className = "ta";
      ta.textContent = e.ta;
      tag.append(ta);
      tagLayer.appendChild(tag);
      return { g, m, halo, tag, a: (i / elements.length) * Math.PI * 2 };
    });
    const tmp = new THREE.Vector3();
    let vw = 1, vh = 1;

    // --- sizing
    const section = el.closest("section") as HTMLElement | null;
    // text blocks marked data-orbit-clear that sit beside the stage: the orbit must never pass under them
    const clearEls = section ? Array.from(section.querySelectorAll<HTMLElement>("[data-orbit-clear]")) : [];
    const ORBIT_HALF = 3.95; // orbit radius + orb + halo + its name tag, world units
    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      if (!w || !h) return;
      vw = w;
      vh = h;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // keep the arch + orbit in frame whatever the aspect
      const fit = Math.max(1, 1.18 / camera.aspect);
      let z = 12.2 * fit;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      let room = Infinity;
      for (const c of clearEls) {
        const b = c.getBoundingClientRect();
        if (!b.width || b.bottom <= r.top || b.top >= r.bottom) continue; // stacked above/below, not beside
        const gap = b.right <= cx ? cx - b.right : b.left >= cx ? b.left - cx : 0;
        room = Math.min(room, gap - 20);
      }
      // pull the camera back just enough that the orbit's half-width fits inside the free room
      if (Number.isFinite(room) && room > 60) {
        const tanHalf = Math.tan((camera.fov * Math.PI) / 360);
        z = Math.max(z, (ORBIT_HALF * h) / (2 * tanHalf * room));
      }
      camera.position.z = z;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    clearEls.forEach((c) => ro.observe(c));
    resize();

    // --- loop
    let visible = true;
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting), { threshold: 0 });
    io.observe(el);
    const clock = new THREE.Clock();
    let intro = 0;
    let raf = 0;

    const frameFn = () => {
      raf = requestAnimationFrame(frameFn);
      if (!visible) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;
      intro = Math.min(1, intro + dt / 1.6);
      const ease = 1 - Math.pow(1 - intro, 4);

      const h = section?.offsetHeight || window.innerHeight;
      const p = Math.min(1, Math.max(0, window.scrollY / h)); // 0 → 1 while the hero scrolls away

      stage.position.y = -4.5 * (1 - ease) - p * 1.2;
      stage.rotation.y = (1 - ease) * -1.2 + Math.sin(t * 0.35) * 0.14 + p * 1.1;
      stage.rotation.x = -0.05 - p * 0.35 + Math.sin(t * 0.27) * 0.03;
      stage.rotation.z = p * -0.12;

      orbs.forEach((o) => {
        o.a += dt * 0.32;
        o.g.position.set(Math.cos(o.a) * R, 0, Math.sin(o.a) * R);
        o.m.rotation.y += dt * 0.5;
        o.halo.lookAt(camera.position);
      });
      stage.updateMatrixWorld();
      orbs.forEach((o) => {
        o.g.getWorldPosition(tmp);
        // hide the tag only while its orb passes behind the arch
        const behind = Math.min(1, Math.max(0, (-tmp.z - 0.1) / 0.5));
        const overArch = Math.min(1, Math.max(0, (2.5 - Math.abs(tmp.x)) / 0.6));
        tmp.y -= 0.95;
        tmp.project(camera);
        const x = (tmp.x * 0.5 + 0.5) * vw;
        const y = (-tmp.y * 0.5 + 0.5) * vh;
        o.tag.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translateX(-50%)`;
        o.tag.style.opacity = String(((1 - behind * overArch) * ease).toFixed(2));
      });
      const fire = orbs[2];
      if (fire) {
        fire.g.getWorldPosition(fireLight.position);
        fireLight.intensity = 3 + Math.sin(t * 9) * 0.6;
      }

      renderer.render(scene, camera);
      if (reduce) cancelAnimationFrame(raf);
    };
    if (reduce) intro = 1;
    frameFn();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      disposables.forEach((d) => d.dispose());
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose?.();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose?.();
      });
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      tagLayer.remove();
    };
  }, [photo, focusY, elements]);

  return <div ref={host} className="absolute inset-0" role="img" aria-label={label} />;
}
