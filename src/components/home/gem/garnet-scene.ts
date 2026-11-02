/**
 * Real-time 3D garnet for the homepage hero.
 *
 * Loaded on demand (see GemShowcase.tsx) so three.js never blocks the first paint.
 *
 * A round brilliant built from standard cut proportions. Because a cut gem is a
 * convex solid, light inside it can be traced exactly against its facet planes:
 * refraction on entry, internal reflection off the pavilion, absorption along the
 * path (garnet's deep red body colour, darker where the stone is thicker), slight
 * dispersion on exit, and faint needle inclusions fixed inside the stone. A soft
 * studio keeps the facets readable rather than glittering.
 *
 * It turns slowly on its own and can be rotated by dragging.
 */
import {
  BufferGeometry,
  Group,
  Matrix3,
  Mesh,
  NeutralToneMapping,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  SRGBColorSpace,
  Vector3,
  Vector4,
  WebGLRenderer,
} from "three";
import { ConvexGeometry } from "three/examples/jsm/geometries/ConvexGeometry.js";

type MountOptions = {
  reducedMotion: boolean;
  onFirstFrame?: () => void;
};

const SYMMETRY = 8;
const AUTO_SPIN = 0.3; // radians per second: one turn roughly every 20 seconds
const BASE_TILT = 0.42; // shows the crown and pavilion profile
const MAX_TILT_OFFSET = 0.55;
const DRAG_SENSITIVITY = 0.008;

const MAX_PLANES = 96;
const BOUNCES = 4;

// Almandine garnet: refractive index ~1.79, dispersion ~0.027.
const IOR = 1.79;
const DISPERSION = 0.012;
// Absorption per unit length (girdle radius = 1): strong in green and blue.
const ABSORPTION = new Vector3(0.42, 2.6, 1.95);

function ring(count: number, radius: number, y: number, offset = 0) {
  return Array.from({ length: count }, (_, i) => {
    const angle = offset + (i / count) * Math.PI * 2;
    return new Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
  });
}

/**
 * Round brilliant (girdle radius 1): ~55% table, ~34.5° crown, ~40.8° pavilion.
 * Each ring of points lies on the crown or pavilion cone, so the convex hull
 * produces table, star, bezel, girdle and pavilion facets.
 */
function brilliantCutGeometry() {
  const half = Math.PI / SYMMETRY;
  const girdle = 0.025;
  const crownSlope = Math.tan((34.5 * Math.PI) / 180);
  const pavilionSlope = Math.tan((40.8 * Math.PI) / 180);
  const crownY = (r: number) => girdle + (1 - r) * crownSlope;
  const pavilionY = (r: number) => -girdle - (1 - r) * pavilionSlope;

  return new ConvexGeometry([
    ...ring(SYMMETRY, 0.55, crownY(0.55)), // table
    ...ring(SYMMETRY, 0.79, crownY(0.79), half), // star facet tips
    ...ring(SYMMETRY * 2, 1, girdle, half / 2), // upper girdle
    ...ring(SYMMETRY * 2, 1, -girdle, half / 2), // lower girdle
    ...ring(SYMMETRY, 0.24, pavilionY(0.24), half), // lower-girdle facet tips
    new Vector3(0, pavilionY(0) + 0.01, 0), // culet
  ]);
}

/** Unique facet planes (outward normal, offset) from the hull's triangles. */
function facetPlanes(geometry: BufferGeometry) {
  const position = geometry.getAttribute("position");
  const planes: Vector4[] = [];
  const a = new Vector3();
  const b = new Vector3();
  const c = new Vector3();

  for (let i = 0; i < position.count; i += 3) {
    a.fromBufferAttribute(position, i);
    b.fromBufferAttribute(position, i + 1);
    c.fromBufferAttribute(position, i + 2);
    const normal = new Vector3().subVectors(c, b).cross(new Vector3().subVectors(a, b)).normalize();
    const offset = normal.dot(a);
    const known = planes.some(
      (p) => p.x * normal.x + p.y * normal.y + p.z * normal.z > 0.9999 && Math.abs(p.w - offset) < 1e-3,
    );
    if (!known) planes.push(new Vector4(normal.x, normal.y, normal.z, offset));
  }

  return planes.slice(0, MAX_PLANES);
}

const vertexShader = /* glsl */ `
  varying vec3 vPosition;
  varying vec3 vNormal;

  void main() {
    vPosition = position;
    vNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  #define MAX_PLANES ${MAX_PLANES}
  #define BOUNCES ${BOUNCES}

  uniform vec4 uPlanes[MAX_PLANES];
  uniform int uPlaneCount;
  uniform vec3 uCameraObject;
  uniform mat3 uObjectToWorld;
  uniform float uIor;
  uniform float uDispersion;
  uniform vec3 uAbsorption;

  varying vec3 vPosition;
  varying vec3 vNormal;

  // Soft photographic studio: bright white sweep above, darker floor below and
  // two large, gentle softboxes. Broad light keeps facets readable.
  vec3 studio(vec3 dir) {
    float up = dir.y * 0.5 + 0.5;
    vec3 colour = mix(vec3(0.06), vec3(1.0), smoothstep(0.22, 0.85, up));
    colour += 1.3 * smoothstep(0.82, 0.97, dot(dir, normalize(vec3(0.5, 0.75, 0.45))));
    colour += 0.9 * smoothstep(0.85, 0.98, dot(dir, normalize(vec3(-0.7, 0.35, 0.6))));
    return colour;
  }

  float fresnel(float cosTheta, float ior) {
    float f0 = pow((ior - 1.0) / (ior + 1.0), 2.0);
    return f0 + (1.0 - f0) * pow(1.0 - cosTheta, 5.0);
  }

  vec3 toWorld(vec3 dir) {
    return normalize(uObjectToWorld * dir);
  }

  // Small value noise, used for natural inclusions inside the stone.
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i), hash(i + vec3(1, 0, 0)), f.x), mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
      mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x), mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y),
      f.z);
  }

  // Fine needle inclusions ("silk") lying in three directions, plus a faint haze.
  float inclusions(vec3 p) {
    float needles = 0.0;
    needles += smoothstep(0.82, 0.9, noise(vec3(p.x * 2.0, p.y * 34.0, p.z * 34.0)));
    vec3 q = vec3(p.x * 0.5 + p.z * 0.866, p.y, p.z * 0.5 - p.x * 0.866);
    needles += smoothstep(0.83, 0.9, noise(vec3(q.x * 2.0 + 7.0, q.y * 34.0, q.z * 34.0)));
    vec3 r = vec3(p.x * 0.5 - p.z * 0.866, p.y, p.z * 0.5 + p.x * 0.866);
    needles += smoothstep(0.84, 0.9, noise(vec3(r.x * 2.0 - 5.0, r.y * 34.0, r.z * 34.0)));
    float haze = noise(p * 3.0) * 0.12;
    return needles * 0.55 + haze;
  }

  vec3 findExit(vec3 point, vec3 dir, out float travel) {
    travel = 1e5;
    vec3 facet = vec3(0.0, 1.0, 0.0);
    for (int i = 0; i < MAX_PLANES; i++) {
      if (i >= uPlaneCount) break;
      vec3 n = uPlanes[i].xyz;
      float facing = dot(dir, n);
      if (facing > 1e-4) {
        float t = (uPlanes[i].w - dot(point, n)) / facing;
        if (t > 1e-4 && t < travel) {
          travel = t;
          facet = n;
        }
      }
    }
    return facet;
  }

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 view = normalize(vPosition - uCameraObject);

    // Surface reflection: gives each facet its own clean tone.
    float entryFresnel = fresnel(clamp(dot(-view, normal), 0.0, 1.0), uIor);
    vec3 colour = entryFresnel * studio(toWorld(reflect(view, normal)));

    // Light refracted into the stone and followed through internal reflections.
    vec3 dir = refract(view, normal, 1.0 / uIor);
    vec3 point = vPosition;
    vec3 throughput = vec3(1.0 - entryFresnel);
    vec3 glow = vec3(0.0);

    for (int bounce = 0; bounce < BOUNCES; bounce++) {
      float travel;
      vec3 facet = findExit(point, dir, travel);

      // Inclusions catch a little light along the first two paths through the stone.
      if (bounce < 2) {
        float scatter = 0.0;
        for (int s = 1; s <= 5; s++) {
          scatter += inclusions(point + dir * travel * (float(s) / 6.0));
        }
        glow += throughput * exp(-uAbsorption * travel * 0.5) * scatter * (travel / 5.0) * vec3(1.0, 0.55, 0.5) * 0.35;
      }

      point += dir * travel;
      throughput *= exp(-uAbsorption * travel);

      vec3 inward = -facet;
      vec3 exitG = refract(dir, inward, uIor);

      if (dot(exitG, exitG) < 1e-6) {
        // Total internal reflection: the light stays inside the gem.
        dir = reflect(dir, inward);
        continue;
      }

      vec3 exitR = refract(dir, inward, uIor - uDispersion);
      vec3 exitB = refract(dir, inward, uIor + uDispersion);
      if (dot(exitR, exitR) < 1e-6) exitR = exitG;
      if (dot(exitB, exitB) < 1e-6) exitB = exitG;

      float exitFresnel = fresnel(clamp(dot(dir, facet), 0.0, 1.0), uIor);
      vec3 seen = vec3(studio(toWorld(exitR)).r, studio(toWorld(exitG)).g, studio(toWorld(exitB)).b);
      colour += throughput * (1.0 - exitFresnel) * seen;

      throughput *= exitFresnel;
      dir = reflect(dir, inward);
    }

    colour += glow;
    gl_FragColor = vec4(colour, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

export function mountGarnet(container: HTMLElement, { reducedMotion, onFirstFrame }: MountOptions) {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = NeutralToneMapping;
  renderer.toneMappingExposure = 0.95;
  // Transparent canvas over the white page. The shader writes every gem pixel
  // fully opaque, so no facet can appear see-through.
  renderer.setClearColor(0xffffff, 0);

  const canvas = renderer.domElement;
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.display = "block";
  canvas.style.cursor = "grab";
  // Horizontal drags rotate the gem; vertical swipes still scroll the page on touch screens.
  canvas.style.touchAction = "pan-y";
  container.appendChild(canvas);

  const scene = new Scene();
  const camera = new PerspectiveCamera(30, 1, 0.1, 50);
  camera.position.set(0, 0.4, 5.4);
  camera.lookAt(0, 0, 0);

  const geometry = brilliantCutGeometry();
  const planes = facetPlanes(geometry);
  const paddedPlanes = Array.from({ length: MAX_PLANES }, (_, i) => planes[i] ?? new Vector4());

  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uPlanes: { value: paddedPlanes },
      uPlaneCount: { value: planes.length },
      uCameraObject: { value: new Vector3() },
      uObjectToWorld: { value: new Matrix3() },
      uIor: { value: IOR },
      uDispersion: { value: DISPERSION },
      uAbsorption: { value: ABSORPTION },
    },
  });

  const gem = new Mesh(geometry, material);
  const pivot = new Group();
  pivot.rotation.set(BASE_TILT, 0, -0.08);
  pivot.add(gem);
  scene.add(pivot);

  const resize = () => {
    const { clientWidth: width, clientHeight: height } = container;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  resize();

  // Rotation state: spin velocity eases back to the automatic speed after a drag.
  const autoSpin = reducedMotion ? 0 : AUTO_SPIN;
  let spinVelocity = autoSpin;
  let tiltOffset = 0;
  let dragging = false;
  let lastPointerX = 0;
  let lastPointerY = 0;
  let lastPointerTime = 0;

  let frame = 0;
  let visible = true;
  let firstFrameSent = false;
  let last = performance.now();
  const cameraInObject = new Vector3();

  const render = () => {
    scene.updateMatrixWorld();
    material.uniforms.uCameraObject.value.copy(gem.worldToLocal(cameraInObject.copy(camera.position)));
    material.uniforms.uObjectToWorld.value.setFromMatrix4(gem.matrixWorld);
    renderer.render(scene, camera);
    if (!firstFrameSent) {
      firstFrameSent = true;
      onFirstFrame?.();
    }
  };

  const isSettled = () =>
    !dragging && Math.abs(spinVelocity - autoSpin) < 0.002 && Math.abs(tiltOffset) < 0.002;

  const tick = (now: number) => {
    frame = 0;
    const delta = Math.min((now - last) / 1000, 0.05);
    last = now;

    if (!dragging) {
      // Momentum from a drag decays back towards the slow automatic turn.
      spinVelocity += (autoSpin - spinVelocity) * Math.min(1, delta * 1.6);
      gem.rotation.y += spinVelocity * delta;
      // The tilt drifts back to the presentation angle.
      tiltOffset += (0 - tiltOffset) * Math.min(1, delta * 2.2);
      pivot.rotation.x = BASE_TILT + tiltOffset;
    }

    render();

    // With reduced motion, only animate while the visitor is interacting.
    if (visible && !(reducedMotion && isSettled())) frame = requestAnimationFrame(tick);
  };

  const start = () => {
    if (frame) return;
    last = performance.now();
    frame = requestAnimationFrame(tick);
  };

  const stop = () => {
    cancelAnimationFrame(frame);
    frame = 0;
  };

  const onPointerDown = (event: PointerEvent) => {
    if (event.button !== 0) return;
    dragging = true;
    lastPointerX = event.clientX;
    lastPointerY = event.clientY;
    lastPointerTime = performance.now();
    spinVelocity = 0;
    canvas.setPointerCapture(event.pointerId);
    canvas.style.cursor = "grabbing";
    start();
  };

  const onPointerMove = (event: PointerEvent) => {
    if (!dragging) return;
    const now = performance.now();
    const dx = event.clientX - lastPointerX;
    const dy = event.clientY - lastPointerY;
    const elapsed = Math.max((now - lastPointerTime) / 1000, 1 / 240);

    gem.rotation.y += dx * DRAG_SENSITIVITY;
    tiltOffset = Math.max(-MAX_TILT_OFFSET, Math.min(MAX_TILT_OFFSET, tiltOffset + dy * DRAG_SENSITIVITY));
    pivot.rotation.x = BASE_TILT + tiltOffset;

    // Remember the drag speed so the gem keeps turning when released.
    spinVelocity = Math.max(-8, Math.min(8, (dx * DRAG_SENSITIVITY) / elapsed));
    lastPointerX = event.clientX;
    lastPointerY = event.clientY;
    lastPointerTime = now;
  };

  const endDrag = (event: PointerEvent) => {
    if (!dragging) return;
    dragging = false;
    // A pause before release means no throw.
    if (performance.now() - lastPointerTime > 80) spinVelocity = 0;
    if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    canvas.style.cursor = "grab";
    start();
  };

  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerup", endDrag);
  canvas.addEventListener("pointercancel", endDrag);

  const resizeObserver = new ResizeObserver(() => {
    resize();
    if (!frame) render();
  });
  resizeObserver.observe(container);

  // Pause rendering while the hero is off-screen.
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible && !reducedMotion) start();
    else if (!visible) stop();
  });
  intersectionObserver.observe(container);

  if (reducedMotion) {
    gem.rotation.y = 0.3;
    render();
  } else {
    start();
  }

  return () => {
    stop();
    canvas.removeEventListener("pointerdown", onPointerDown);
    canvas.removeEventListener("pointermove", onPointerMove);
    canvas.removeEventListener("pointerup", endDrag);
    canvas.removeEventListener("pointercancel", endDrag);
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    geometry.dispose();
    material.dispose();
    renderer.dispose();
    canvas.remove();
  };
}
