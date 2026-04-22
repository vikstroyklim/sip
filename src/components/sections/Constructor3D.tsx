"use client";

import React, { useRef, useState, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  PerspectiveCamera, 
  ContactShadows, 
  Float, 
  PresentationControls,
  Environment,
  Html
} from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type TextureKind = "csp" | "eps" | "pir" | "wool";

const hashString = (value: string) => {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

const makeRng = (seed: number) => {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0;
    return s / 4294967296;
  };
};

const makeCanvas = (size: number) => {
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  return c;
};

const fill = (ctx: CanvasRenderingContext2D, color: string, size: number) => {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, size, size);
};

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

const makeTextureFromCanvas = (canvas: HTMLCanvasElement, colorSpace: THREE.ColorSpace) => {
  const t = new THREE.CanvasTexture(canvas);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 16;
  t.colorSpace = colorSpace;
  t.needsUpdate = true;
  return t;
};

const generateCsp = (size: number, seedKey: string) => {
  const seed = hashString(seedKey);
  const rng = makeRng(seed);
  const colorCanvas = makeCanvas(size);
  const bumpCanvas = makeCanvas(size);
  const cCtx = colorCanvas.getContext("2d")!;
  const bCtx = bumpCanvas.getContext("2d")!;

  fill(cCtx, "#7f7f7f", size);
  fill(bCtx, "#808080", size);

  for (let i = 0; i < 2600; i += 1) {
    const x = rng() * size;
    const y = rng() * size;
    const w = 1 + rng() * 6;
    const h = 1 + rng() * 10;
    const rot = (rng() - 0.5) * 0.6;
    const d = (rng() - 0.5) * 70;
    const g = clamp(120 + d, 70, 200);
    const a = 0.12 + rng() * 0.22;

    cCtx.save();
    cCtx.translate(x, y);
    cCtx.rotate(rot);
    cCtx.fillStyle = `rgba(${g},${g},${g},${a})`;
    cCtx.fillRect(-w / 2, -h / 2, w, h);
    cCtx.restore();

    const hg = clamp(120 + d, 60, 200);
    bCtx.save();
    bCtx.translate(x, y);
    bCtx.rotate(rot);
    bCtx.fillStyle = `rgba(${hg},${hg},${hg},${0.18 + rng() * 0.18})`;
    bCtx.fillRect(-w / 2, -h / 2, w, h);
    bCtx.restore();
  }

  return {
    color: makeTextureFromCanvas(colorCanvas, THREE.SRGBColorSpace),
    bump: makeTextureFromCanvas(bumpCanvas, THREE.NoColorSpace)
  };
};

const generateEps = (size: number, seedKey: string) => {
  const seed = hashString(seedKey);
  const rng = makeRng(seed);
  const colorCanvas = makeCanvas(size);
  const bumpCanvas = makeCanvas(size);
  const cCtx = colorCanvas.getContext("2d")!;
  const bCtx = bumpCanvas.getContext("2d")!;

  fill(cCtx, "#f6f6f6", size);
  fill(bCtx, "#808080", size);

  for (let i = 0; i < 750; i += 1) {
    const x = rng() * size;
    const y = rng() * size;
    const r = 3 + rng() * 12;

    cCtx.beginPath();
    cCtx.arc(x, y, r, 0, Math.PI * 2);
    cCtx.fillStyle = `rgba(255,255,255,${0.65})`;
    cCtx.fill();
    cCtx.lineWidth = 1 + rng() * 1.5;
    cCtx.strokeStyle = `rgba(210,210,210,${0.35})`;
    cCtx.stroke();

    const grad = bCtx.createRadialGradient(x - r * 0.2, y - r * 0.2, r * 0.2, x, y, r);
    grad.addColorStop(0, "rgba(190,190,190,0.9)");
    grad.addColorStop(1, "rgba(90,90,90,0.9)");
    bCtx.beginPath();
    bCtx.arc(x, y, r, 0, Math.PI * 2);
    bCtx.fillStyle = grad;
    bCtx.fill();
  }

  return {
    color: makeTextureFromCanvas(colorCanvas, THREE.SRGBColorSpace),
    bump: makeTextureFromCanvas(bumpCanvas, THREE.NoColorSpace)
  };
};

const generatePir = (size: number, seedKey: string) => {
  const seed = hashString(seedKey);
  const rng = makeRng(seed);
  const colorCanvas = makeCanvas(size);
  const bumpCanvas = makeCanvas(size);
  const cCtx = colorCanvas.getContext("2d")!;
  const bCtx = bumpCanvas.getContext("2d")!;

  fill(cCtx, "#e7e0b2", size);
  fill(bCtx, "#808080", size);

  for (let i = 0; i < 2400; i += 1) {
    const x = rng() * size;
    const y = rng() * size;
    const r = 0.6 + rng() * 2.2;
    const shade = clamp(210 + (rng() - 0.5) * 30, 160, 240);

    cCtx.beginPath();
    cCtx.arc(x, y, r, 0, Math.PI * 2);
    cCtx.fillStyle = `rgba(${shade},${shade},${clamp(shade - 30, 140, 230)},${0.22})`;
    cCtx.fill();

    const g = clamp(130 + (rng() - 0.5) * 60, 80, 180);
    bCtx.beginPath();
    bCtx.arc(x, y, r, 0, Math.PI * 2);
    bCtx.fillStyle = `rgba(${g},${g},${g},${0.25})`;
    bCtx.fill();
  }

  return {
    color: makeTextureFromCanvas(colorCanvas, THREE.SRGBColorSpace),
    bump: makeTextureFromCanvas(bumpCanvas, THREE.NoColorSpace)
  };
};

const generateWool = (size: number, seedKey: string) => {
  const seed = hashString(seedKey);
  const rng = makeRng(seed);
  const colorCanvas = makeCanvas(size);
  const bumpCanvas = makeCanvas(size);
  const cCtx = colorCanvas.getContext("2d")!;
  const bCtx = bumpCanvas.getContext("2d")!;

  fill(cCtx, "#8e845f", size);
  fill(bCtx, "#808080", size);

  for (let i = 0; i < 1800; i += 1) {
    const x = rng() * size;
    const y = rng() * size;
    const len = 8 + rng() * 38;
    const ang = (rng() - 0.5) * Math.PI;
    const w = 0.6 + rng() * 1.8;
    const c = clamp(160 + (rng() - 0.5) * 60, 90, 220);

    cCtx.lineWidth = w;
    cCtx.strokeStyle = `rgba(${c},${c},${clamp(c - 30, 70, 200)},${0.25})`;
    cCtx.beginPath();
    cCtx.moveTo(x, y);
    cCtx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
    cCtx.stroke();

    const g = clamp(120 + (rng() - 0.5) * 80, 60, 200);
    bCtx.lineWidth = w * 1.2;
    bCtx.strokeStyle = `rgba(${g},${g},${g},${0.25})`;
    bCtx.beginPath();
    bCtx.moveTo(x, y);
    bCtx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
    bCtx.stroke();
  }

  return {
    color: makeTextureFromCanvas(colorCanvas, THREE.SRGBColorSpace),
    bump: makeTextureFromCanvas(bumpCanvas, THREE.NoColorSpace)
  };
};

const makeTextureSet = (kind: TextureKind, size: number, seedKey: string) => {
  if (kind === "csp") return generateCsp(size, seedKey);
  if (kind === "eps") return generateEps(size, seedKey);
  if (kind === "pir") return generatePir(size, seedKey);
  return generateWool(size, seedKey);
};

type TextureSet = {
  color: THREE.Texture;
  bump: THREE.Texture;
};

const useGeneratedTextureSet = (kind: TextureKind, size: number, seedKey: string) => {
  const [set, setSet] = useState<TextureSet | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const next = makeTextureSet(kind, size, seedKey);
    setSet(next);
    return () => {
      next.color.dispose();
      next.bump.dispose();
    };
  }, [kind, seedKey, size]);

  return set;
};

type MaterialConfig = {
  id: string;
  name: string;
  facingName: string;
  insulationName: string;
  facingColor: string;
  insulationColor: string;
  facingKind: TextureKind;
  insulationKind: TextureKind;
  facingRepeat: [number, number];
  insulationRepeat: [number, number];
  roughness: number;
  bumpFacing: number;
  bumpInsulation: number;
  thickness: number;
  facingT: number;
  insulationT: number;
  description: string;
};

const MATERIAL_TYPES = {
  standard: {
    id: "standard",
    name: "ЦСП + ППС",
    facingName: "ЦСП 12мм",
    insulationName: "Пенополистирол",
    facingColor: "#7c7c7c",
    insulationColor: "#ffffff",
    facingKind: "csp",
    insulationKind: "eps",
    facingRepeat: [1, 2],
    insulationRepeat: [4, 8],
    roughness: 0.9,
    bumpFacing: 0.004,
    bumpInsulation: 0.01,
    thickness: 174,
    facingT: 12,
    insulationT: 150,
    description: "СТК‑панель с ЦСП. Баланс прочности, влагостойкости и цены.",
  },
  csp: {
    id: "csp",
    name: "ЦСП + Минплита",
    facingName: "ЦСП 12мм",
    insulationName: "Каменная плита",
    facingColor: "#7c7c7c",
    insulationColor: "#8b8b7a",
    facingKind: "csp",
    insulationKind: "wool",
    facingRepeat: [1, 2],
    insulationRepeat: [2.5, 5],
    roughness: 0.95,
    bumpFacing: 0.004,
    bumpInsulation: 0.018,
    thickness: 174,
    facingT: 12,
    insulationT: 150,
    description: "ЦСП + минеральная плита для максимальной пожаробезопасности и звукоизоляции.",
  },
  pir: {
    id: "pir",
    name: "ЦСП + PIR",
    facingName: "ЦСП 12мм",
    insulationName: "PIR плита",
    facingColor: "#7c7c7c",
    insulationColor: "#e6e6ad",
    facingKind: "csp",
    insulationKind: "pir",
    facingRepeat: [1, 2],
    insulationRepeat: [2, 4],
    roughness: 0.85,
    bumpFacing: 0.004,
    bumpInsulation: 0.008,
    thickness: 124,
    facingT: 12,
    insulationT: 100,
    description: "ЦСП + PIR для максимальной энергоэффективности и долговечности.",
  },
  sml: {
    id: "sml",
    name: "ЦСП + ППС (тонкая)",
    facingName: "ЦСП 10мм",
    insulationName: "Пенополистирол",
    facingColor: "#8c8c8c",
    insulationColor: "#ffffff",
    facingKind: "csp",
    insulationKind: "eps",
    facingRepeat: [1, 2],
    insulationRepeat: [4, 8],
    roughness: 0.9,
    bumpFacing: 0.0035,
    bumpInsulation: 0.01,
    thickness: 170,
    facingT: 10,
    insulationT: 150,
    description: "Легкая версия СТК‑панели для внутренних перегородок.",
  }
} satisfies Record<string, MaterialConfig>;

const SIPPanelModel = ({ exploded, config }: { exploded: boolean; config: MaterialConfig }) => {
  const meshFront = useRef<THREE.Mesh>(null);
  const meshBack = useRef<THREE.Mesh>(null);
  const labelsRef = useRef<THREE.Group>(null);
  
  const facing = useGeneratedTextureSet(config.facingKind, 1024, `${config.id}-facing`);
  const insulation = useGeneratedTextureSet(config.insulationKind, 1024, `${config.id}-insulation`);
  const facingMap = facing?.color;
  const facingBumpMap = facing?.bump;
  const insulationMap = insulation?.color;
  const insulationBumpMap = insulation?.bump;

  useEffect(() => {
    if (!facingMap || !facingBumpMap || !insulationMap || !insulationBumpMap) return;
    facingMap.repeat.set(config.facingRepeat[0], config.facingRepeat[1]);
    facingBumpMap.repeat.set(config.facingRepeat[0], config.facingRepeat[1]);
    insulationMap.repeat.set(config.insulationRepeat[0], config.insulationRepeat[1]);
    insulationBumpMap.repeat.set(config.insulationRepeat[0], config.insulationRepeat[1]);
  }, [config.facingRepeat, config.insulationRepeat, facingMap, facingBumpMap, insulationMap, insulationBumpMap]);

  const scale = 0.0006;
  const w = 1250 * scale;
  const h = 2500 * scale;
  const osbT = config.facingT * scale;
  const foamT = config.insulationT * scale;

  const initialOffset = foamT / 2 + osbT / 2;
  const targetOffset = exploded ? 0.3 : initialOffset;
  const currentOffset = useRef(initialOffset);

  useFrame((_, delta) => {
    const step = Math.min(delta * 8, 1);
    const nextOffset = THREE.MathUtils.lerp(currentOffset.current, targetOffset, step);
    
    if (Math.abs(nextOffset - currentOffset.current) > 0.0001) {
      currentOffset.current = nextOffset;
      
      if (meshFront.current) meshFront.current.position.z = currentOffset.current;
      if (meshBack.current) meshBack.current.position.z = -currentOffset.current;
      
      if (labelsRef.current) {
        labelsRef.current.visible = exploded && currentOffset.current > 0.15;
        const children = labelsRef.current.children;
        if (children[0]) children[0].position.z = currentOffset.current;
        if (children[2]) children[2].position.z = -currentOffset.current;
      }
    }
  });

  return (
    <group>
      {/* Front */}
      <mesh ref={meshFront} position={[0, 0, initialOffset]} castShadow receiveShadow>
        <boxGeometry args={[w, h, osbT]} />
        <meshStandardMaterial 
          map={facingMap} 
          color={config.facingColor} 
          roughness={config.roughness} 
          metalness={0.1}
          bumpMap={facingBumpMap}
          bumpScale={config.bumpFacing}
        />
      </mesh>

      {/* Middle */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[w - 0.005, h - 0.005, foamT]} />
        <meshStandardMaterial 
          map={insulationMap} 
          color={config.insulationColor} 
          roughness={1}
          bumpMap={insulationBumpMap}
          bumpScale={config.bumpInsulation}
        />
      </mesh>

      {/* Back */}
      <mesh ref={meshBack} position={[0, 0, -initialOffset]} castShadow receiveShadow>
        <boxGeometry args={[w, h, osbT]} />
        <meshStandardMaterial 
          map={facingMap} 
          color={config.facingColor} 
          roughness={config.roughness} 
          metalness={0.1}
          bumpMap={facingBumpMap}
          bumpScale={config.bumpFacing}
        />
      </mesh>

      {/* Labels */}
      <group ref={labelsRef} visible={false}>
        <group position={[w/2 + 0.1, h/3.5, initialOffset]}>
          <Html center transform scale={0.08} pointerEvents="none">
            <div className="whitespace-nowrap px-3 py-1 rounded bg-black/60 backdrop-blur-md border border-accent/20">
              <span className="text-[14px] font-black text-accent uppercase tracking-widest">{config.facingName}</span>
            </div>
          </Html>
        </group>

        <group position={[w/2 + 0.1, 0, 0]}>
          <Html center transform scale={0.08} pointerEvents="none">
            <div className="whitespace-nowrap px-3 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10">
              <span className="text-[14px] font-black text-white uppercase tracking-widest">{config.insulationName}</span>
            </div>
          </Html>
        </group>

        <group position={[w/2 + 0.1, -h/3.5, -initialOffset]}>
          <Html center transform scale={0.08} pointerEvents="none">
            <div className="whitespace-nowrap px-3 py-1 rounded bg-black/60 backdrop-blur-md border border-accent/20">
              <span className="text-[14px] font-black text-accent uppercase tracking-widest">{config.facingName}</span>
            </div>
          </Html>
        </group>
      </group>
    </group>
  );
};

export const Constructor3D = () => {
  const [activeType, setActiveType] = useState<keyof typeof MATERIAL_TYPES>("standard");
  const [exploded, setExploded] = useState(false);
  const material = MATERIAL_TYPES[activeType];

  return (
    <section className="py-32 bg-[#050A18] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left: 3D Visualization */}
          <div className="w-full lg:w-1/2 h-[500px] relative">
            <div className="absolute inset-0 bg-white/[0.02] border border-white/5 rounded-[60px] backdrop-blur-3xl overflow-hidden group">
              {/* Interaction Hint */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center w-full">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Кликните для разбора</span>
                </div>
              </div>

              <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={35} />
                <ambientLight intensity={0.7} />
                <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
                <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
                <directionalLight position={[0, 5, 5]} intensity={0.5} />
                
                <Suspense fallback={<Html center><div className="text-accent animate-pulse font-black text-[10px] uppercase tracking-[0.2em]">Загрузка материалов...</div></Html>}>
                  <Environment preset="apartment" />
                  
                  <PresentationControls
                    global
                    config={{ mass: 2, tension: 500 }}
                    snap={{ mass: 4, tension: 1500 }}
                    rotation={[0, -0.5, 0]}
                    polar={[-Math.PI / 4, Math.PI / 4]}
                    azimuth={[-Math.PI / 4, Math.PI / 4]}
                  >
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                      <group 
                        onClick={(e) => {
                          e.stopPropagation();
                          setExploded(!exploded);
                        }} 
                        onPointerOver={() => (document.body.style.cursor = 'pointer')}
                        onPointerOut={() => (document.body.style.cursor = 'auto')}
                      >
                        <SIPPanelModel key={activeType} exploded={exploded} config={material} />
                      </group>
                    </Float>
                  </PresentationControls>
                  
                  <ContactShadows 
                    position={[0, -1.5, 0]} 
                    opacity={0.4} 
                    scale={10} 
                    blur={2.5} 
                    far={4} 
                  />
                </Suspense>
              </Canvas>

              {/* Reset View Button */}
              {exploded && (
                <button 
                  onClick={() => setExploded(false)}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 px-6 py-2 rounded-full bg-accent text-white text-[10px] font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-transform"
                >
                  Собрать панель
                </button>
              )}
            </div>
          </div>

          {/* Right: Controls */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-xl"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                Материалы и технологии
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight uppercase">
                Выберите состав <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-orange-400 to-accent bg-[length:200%_auto] animate-gradient-x">
                  вашей панели
                </span>
              </h2>
              
              <p className="text-white/40 text-lg mb-12 leading-relaxed">
                Разные задачи требуют разных решений. Сравните наши материалы по теплоэффективности, огнестойкости и прочности.
              </p>

              {/* Selection Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                {Object.values(MATERIAL_TYPES).map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      setActiveType(type.id as any);
                      setExploded(false);
                    }}
                    className={cn(
                      "p-6 rounded-[32px] border transition-all duration-300 flex flex-col items-center gap-3 text-center group",
                      activeType === type.id
                        ? "bg-accent border-accent shadow-[0_10px_30px_rgba(255,107,53,0.3)]"
                        : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
                    )}
                  >
                    <span className={cn(
                      "text-xs font-black uppercase tracking-widest",
                      activeType === type.id ? "text-white" : "text-white/40"
                    )}>
                      {type.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* Specs Table */}
              <div className="grid grid-cols-2 gap-6 p-8 rounded-[40px] bg-white/[0.03] border border-white/10 backdrop-blur-md">
                <div className="space-y-1">
                  <div className="text-[10px] text-white/40 uppercase font-black tracking-widest">Обшивка</div>
                  <div className="text-xl font-black text-white">{material.facingName}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-white/40 uppercase font-black tracking-widest">Утеплитель</div>
                  <div className="text-xl font-black text-white">{material.insulationName}</div>
                </div>
                <div className="col-span-2 pt-4 border-t border-white/10">
                  <p className="text-white/60 text-sm leading-relaxed italic">
                    «{material.description}»
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
