import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';

interface LoaderProps {
  onComplete: () => void;
}

const Lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function hexToVec3(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return new THREE.Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
}

const SNOISE = `
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0); const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy)); vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz); vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy); vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + 1.0 * C.xxx; vec3 x2 = x0 - i2 + 2.0 * C.xxx; vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0; vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
    vec4 x_ = floor(j * ns.z); vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy; vec4 y = y_ *ns.x + ns.yyyy; vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy); vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0; vec4 s1 = floor(b1)*2.0 + 1.0; vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy; vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy,h.x); vec3 p1 = vec3(a0.zw,h.y); vec3 p2 = vec3(a1.xy,h.z); vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0); m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
`;

const FinalPass = {
  uniforms: {
    iTime: { value: 0 },
    tDiffuse: { value: null },
    torusTexture: { value: null },
    bloomTexture: { value: null },
    haloTexture: { value: null },
    uBg: { value: hexToVec3('#0a0524') },
    uFlameA: { value: hexToVec3('#2bf0ff') },
    uFlameB: { value: hexToVec3('#7a3cff') },
    uFlameAmt: { value: 0.2 }
  },
  vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }`,
  fragmentShader: `
    uniform float iTime; uniform sampler2D tDiffuse; uniform sampler2D bloomTexture; uniform sampler2D torusTexture; uniform sampler2D haloTexture;
    uniform vec3 uBg; uniform vec3 uFlameA; uniform vec3 uFlameB; uniform float uFlameAmt;
    varying vec2 vUv;
    vec3 warp3d(vec3 pos, float t){ float curv=.8,a=1.9,b=0.7; pos*=2.;
      pos.x+=curv*sin(t+a*pos.y)+t*b; pos.y+=curv*cos(t+a*pos.x);
      pos.y+=curv*sin(t+a*pos.z)+t*b; pos.z+=curv*cos(t+a*pos.y);
      pos.z+=curv*sin(t+a*pos.x)+t*b; pos.x+=curv*cos(t+a*pos.z);
      return 0.5+0.5*cos(pos.xyz+vec3(1,2,4)); }
    void main(){
      vec2 uv = 2.*vUv - 1.;
      vec3 w = pow(warp3d(vec3(uv.x, sin(uv.y), uv.y), iTime*1.5), vec3(1.5));
      vec3 flame = 1.5*uFlameA*w.x; flame*=w.y; flame += uFlameB*w.z;
      flame *= smoothstep(0.25, 1., abs(uv.y));
      float md = smoothstep(-0.7, 1., -uv.y*uv.x); flame *= md*md;
      vec3 bg = uBg * (1.0 - 0.4 * length(uv));
      vec3 halo = texture2D(haloTexture, vUv).xyz;
      gl_FragColor = vec4(bg + flame*uFlameAmt + texture2D(bloomTexture, vUv).xyz + texture2D(torusTexture, vUv).xyz + texture2D(tDiffuse, vUv).xyz + halo, 1.);
    }
  `
};

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
              onComplete();
            }, 800);
          }, 200);
          return 100;
        }
        const increment = Math.floor(Math.random() * 8) + 4;
        const next = Math.min(prev + increment, 100);
        progressRef.current = next;
        return next;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Three.js Tunnel Intro Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    const dpr = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(0x000000, 0, 15);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 400);
    camera.position.set(0, 0, 20);

    const LAYERS = { NONE: 0, TORUS_SCENE: 1, BLOOM_SCENE: 2, ENTIRE_SCENE: 3 };
    camera.layers.enable(LAYERS.TORUS_SCENE);
    camera.layers.enable(LAYERS.BLOOM_SCENE);
    camera.layers.enable(LAYERS.ENTIRE_SCENE);
    scene.add(camera);

    const renderScene = new RenderPass(scene, camera);

    const torusComposer = new EffectComposer(renderer);
    torusComposer.renderToScreen = false;
    torusComposer.addPass(renderScene);
    torusComposer.addPass(new ShaderPass(GammaCorrectionShader));
    torusComposer.addPass(new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.22, 0.2, 0));
    torusComposer.addPass(new ShaderPass(CopyShader));

    const bloomComposer = new EffectComposer(renderer);
    bloomComposer.renderToScreen = false;
    bloomComposer.addPass(renderScene);
    bloomComposer.addPass(new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.55, 0.5, 0));
    bloomComposer.addPass(new ShaderPass(GammaCorrectionShader));

    const finalPass = new ShaderPass(FinalPass);
    finalPass.uniforms.bloomTexture.value = bloomComposer.renderTarget1.texture;
    finalPass.uniforms.torusTexture.value = torusComposer.renderTarget1.texture;
    const finalComposer = new EffectComposer(renderer);
    finalComposer.addPass(renderScene);
    finalComposer.addPass(finalPass);

    const tunnelGeometry = new THREE.SphereGeometry(4.2, 200, 600);
    const uniforms = {
      uTime:       { value: 0 },
      uAppear:     { value: 1 },
      uColLow:     { value: hexToVec3('#180a3a') },
      uColHigh:    { value: hexToVec3('#2bf0ff') },
      uOpacity:    { value: 1.44 },
      uSize:       { value: 5 },
      uBrightness: { value: 0.4 },
      uSwirl:      { value: 0.39 },
      uScale:      { value: 0.17 },
      uCursor:        { value: new THREE.Vector3() },
      uRepelRadius:   { value: 2.4 },
      uRepelStrength: { value: 0.8 },
      uActivity:      { value: 0 }
    };

    const tunnelMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: uniforms,
      vertexShader: `
        uniform float uTime; uniform float uSize; uniform float uSwirl; uniform float uScale;
        uniform vec3 uColLow; uniform vec3 uColHigh;
        uniform vec3 uCursor; uniform float uRepelRadius; uniform float uRepelStrength; uniform float uActivity;
        varying float vFade; varying vec3 vColor;
        ${SNOISE}
        void main() {
          vec3 wp = vec3(position.x * 7.0, 0.0, position.z * 25.0);
          wp.x += position.y * 6.0;
          float wn = snoise(vec3(wp.x * 0.08, wp.z * 0.08, uTime * 0.15)) * 2.0;
          wn += snoise(vec3(wp.x * 0.16, wp.z * 0.16, uTime * 0.3)) * 0.8;

          float tunnelR = 12.0;
          float currentSliceRadius = sqrt(max(0.0, 17.64 - position.z * position.z));
          float maxSliceWidth = 9.2195 * currentSliceRadius;
          float normalizedX = wp.x / (maxSliceWidth + 0.001);
          float tunnelAngle = normalizedX * 3.14159265;

          float jitterAngle = snoise(vec3(position.x * 15.0, position.y * 15.0, uTime * 0.1)) * 0.35;
          float jitterZ = snoise(vec3(position.y * 15.0, position.z * 15.0, uTime * 0.1)) * 4.0;
          float ambientSwirl = snoise(vec3(position.x * 5.0, position.y * 5.0, uTime * 0.2)) * 3.0;
          tunnelAngle += jitterAngle + ambientSwirl * uSwirl;

          float dynamicR = tunnelR - wn;
          vec3 tunnelPos = vec3(dynamicR * sin(tunnelAngle), -dynamicR * cos(tunnelAngle), wp.z + jitterZ);

          vec3 finalPos = tunnelPos * uScale;
          vec4 modelPosition = modelMatrix * vec4(finalPos, 1.0);
          vec3 toP = modelPosition.xyz - uCursor;
          float cd = length(toP);
          float fall = smoothstep(uRepelRadius, 0.0, cd);
          modelPosition.xyz += normalize(toP + vec3(0.0001)) * fall * uRepelStrength * uActivity;
          vec4 mvPosition = viewMatrix * modelPosition;

          float colMix = smoothstep(-3.0, 3.0, position.y + position.x * 0.5);
          vColor = mix(uColLow, uColHigh, clamp(colMix, 0.0, 1.0));
          vFade = 1.0;

          gl_PointSize = uSize * (10.0 / -mvPosition.z);
          gl_PointSize = max(gl_PointSize, 1.5);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float uOpacity; uniform float uBrightness; uniform float uAppear;
        varying float vFade; varying vec3 vColor;
        void main() {
          vec2 xy = gl_PointCoord - 0.5;
          float ll = length(xy);
          if (ll > 0.5) discard;
          float a = smoothstep(0.5, 0.1, ll);
          gl_FragColor = vec4(vColor * uBrightness, vFade * a * uOpacity * uAppear);
        }
      `
    });

    const tunnelPoints = new THREE.Points(tunnelGeometry, tunnelMaterial);
    tunnelPoints.frustumCulled = false;
    tunnelPoints.layers.enable(LAYERS.TORUS_SCENE);
    tunnelPoints.layers.enable(LAYERS.BLOOM_SCENE);
    tunnelPoints.layers.enable(LAYERS.ENTIRE_SCENE);

    const group = new THREE.Group();
    group.add(tunnelPoints);
    scene.add(group);

    const N = 300;
    const positions = new Float32Array(N * 3), sizes = new Float32Array(N), seeds = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      positions[i * 3] = 2 * Math.random() - 1;
      positions[i * 3 + 1] = 2 * Math.random() - 1;
      positions[i * 3 + 2] = 2 * Math.random() - 1;
      sizes[i] = 24 * (0.4 + Math.random());
      seeds[i] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    g.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
    g.setAttribute('seed', new THREE.Float32BufferAttribute(seeds, 1));

    const atmosphereMaterial = new THREE.ShaderMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: hexToVec3('#8fe6ff') },
        uRes: { value: new THREE.Vector2(window.innerWidth * dpr, window.innerHeight * dpr) }
      },
      vertexShader: `
        attribute float size; attribute float seed; uniform float uTime; uniform vec2 uRes;
        varying float vA;
        vec3 warp(vec3 p, float t){ float c=0.9,a=1.9,b=0.02,s=0.05; p*=2.;
          p.x+=c*sin(s*t+a*p.y)+t*b; p.y+=c*cos(s*t+a*p.x); p.y+=c*sin(s*t+a*p.z)+t*b;
          p.z+=c*cos(s*t+a*p.y); p.z+=c*sin(s*t+a*p.x)+t*b; p.x+=c*cos(s*t+a*p.z);
          return cos(p+vec3(1,2,4)); }
        void main(){
          vec3 v = position*4.0 + warp(position, uTime)*1.2;
          vec4 mv = modelViewMatrix * vec4(v, 1.0);
          float r = length(v); float farF = 1.0 - smoothstep(5.0, 6.5, r); float nearF = smoothstep(0.0, 0.5, -mv.z);
          vA = farF * nearF;
          gl_PointSize = size * uRes.y / 900.0 / -mv.z; gl_PointSize = max(gl_PointSize, 1.0);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor; varying float vA;
        void main(){ vec2 p = gl_PointCoord - 0.5; float l = length(p); if (l > 0.5) discard;
          float tex = smoothstep(0.5, 0.0, l); gl_FragColor = vec4(uColor * tex, tex * vA * 0.6); }
      `
    });

    const atmoPoints = new THREE.Points(g, atmosphereMaterial);
    atmoPoints.frustumCulled = false;
    atmoPoints.layers.enable(LAYERS.TORUS_SCENE);
    atmoPoints.layers.enable(LAYERS.BLOOM_SCENE);
    atmoPoints.layers.enable(LAYERS.ENTIRE_SCENE);
    scene.add(atmoPoints);

    atmoPoints.onBeforeRender = () => {
      const t = performance.now() / 1000;
      atmosphereMaterial.uniforms.uTime.value = t * 8.0;
      atmoPoints.position.copy(camera.position);
      finalPass.uniforms.iTime.value = t;
    };

    const mouse = new THREE.Vector2();
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    let animId: number;
    let t0 = performance.now() / 1000;
    let rollPhase = 0;
    let currZ = 20;

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);

      const t = performance.now() / 1000;
      const dt = Math.min(0.05, t - t0);
      t0 = t;
      uniforms.uTime.value = t;

      const pFrac = progressRef.current / 100;
      const targetZ = 20 - pFrac * 34;
      currZ = Lerp(currZ, targetZ, 0.08);

      camera.position.set(mouse.x * 0.15, mouse.y * 0.15, currZ);
      camera.lookAt(mouse.x * 0.5, mouse.y * 0.5, camera.position.z - 12);

      uniforms.uSwirl.value = 0.39 * (1 + pFrac * 1.5);
      rollPhase += dt * (0.065 + pFrac * 0.1);
      group.rotation.z = rollPhase;

      camera.layers.set(LAYERS.TORUS_SCENE);  torusComposer.render();
      camera.layers.set(LAYERS.BLOOM_SCENE);  bloomComposer.render();
      camera.layers.set(LAYERS.ENTIRE_SCENE); finalComposer.render();
    };

    renderLoop();

    const onResize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      const d = Math.min(window.devicePixelRatio, 2);
      renderer.setPixelRatio(d);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      torusComposer.setPixelRatio(d);
      torusComposer.setSize(w, h);
      bloomComposer.setPixelRatio(d);
      bloomComposer.setSize(w, h);
      finalComposer.setPixelRatio(d);
      finalComposer.setSize(w, h);
      atmosphereMaterial.uniforms.uRes.value.set(w * d, h * d);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      tunnelGeometry.dispose();
      tunnelMaterial.dispose();
      g.dispose();
      atmosphereMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-[#0a0524] flex flex-col items-center justify-center transition-all duration-800 ease-in-out ${
        isExiting ? 'opacity-0 scale-110 blur-lg pointer-events-none' : 'opacity-100 scale-100 blur-0'
      }`}
    >
      {/* 3D GetLayers Tunnel Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block pointer-events-none z-0"
      />

      {/* Cinematic Overlay UI */}
      <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 pointer-events-none">
        {/* AglowX Luxury Emblem */}
        <div className="relative mb-6 transform transition-all duration-700 hover:scale-105">
          <img
            src="/aglowx-logo.png"
            alt="AglowX"
            className="h-16 md:h-20 w-auto object-contain filter drop-shadow-[0_0_25px_rgba(43,240,255,0.85)] animate-pulse-glow"
          />
        </div>

        {/* Cinematic Tagline */}
        <p className="text-xs uppercase tracking-[0.35em] text-[#8fe6ff]/80 font-sans mb-8 text-center font-medium drop-shadow-[0_0_10px_rgba(43,240,255,0.4)]">
          Where Brands Rise in Brilliance
        </p>

        {/* Progress Bar Container */}
        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative mb-4 backdrop-blur-md">
          <div
            className="h-full bg-gradient-to-r from-[#7a3cff] via-[#2bf0ff] to-[#8fe6ff] transition-all duration-150 ease-out shadow-[0_0_15px_#2bf0ff]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Status Counter */}
        <div className="w-full flex justify-between items-center text-[11px] font-mono text-white/50">
          <span className="tracking-widest uppercase text-[#8fe6ff]/70 font-semibold">ENTERING VORTEX</span>
          <span className="text-[#2bf0ff] font-bold tracking-wider">{progress}%</span>
        </div>
      </div>
    </div>
  );
};
