"use client";

import React, { useRef, useState, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  PerspectiveCamera, 
  ContactShadows, 
  Float, 
  PresentationControls,
  Environment,
  useTexture,
  Html
} from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Текстуры для разных материалов
const TEXTURES = {
  osb: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=1000&auto=format&fit=crop", 
  eps: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?q=80&w=1000&auto=format&fit=crop",
  csp: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop",
  pir: "https://images.unsplash.com/photo-1590069230002-70cc8341053a?q=80&w=1000&auto=format&fit=crop",
  sml: "https://images.unsplash.com/photo-1517055727180-d15bb74f7be4?q=80&w=1000&auto=format&fit=crop"
};

const MATERIAL_TYPES = {
  standard: {
    id: "standard",
    name: "ОСП + ППС",
    facingName: "ОСП-3 12мм",
    insulationName: "Пенополистирол",
    facingColor: "#e3b67f",
    insulationColor: "#ffffff",
    facingTex: TEXTURES.osb,
    insulationTex: TEXTURES.eps,
    facingRepeat: [1.5, 3],
    insulationRepeat: [4, 4],
    roughness: 0.9,
    thickness: 174,
    facingT: 12,
    insulationT: 150,
    description: "Стандартная СИП-панель для стен и перекрытий.",
  },
  csp: {
    id: "csp",
    name: "ЦСП + ППС",
    facingName: "ЦСП 12мм",
    insulationName: "Пенополистирол",
    facingColor: "#999999",
    insulationColor: "#ffffff",
    facingTex: TEXTURES.csp,
    insulationTex: TEXTURES.eps,
    facingRepeat: [1, 1],
    insulationRepeat: [4, 4],
    roughness: 0.8,
    thickness: 174,
    facingT: 12,
    insulationT: 150,
    description: "Огнестойкая панель с цементно-стружечной плитой.",
  },
  pir: {
    id: "pir",
    name: "ОСП + PIR",
    facingName: "ОСП-3 12мм",
    insulationName: "PIR плита",
    facingColor: "#e3b67f",
    insulationColor: "#fff89e",
    facingTex: TEXTURES.osb,
    insulationTex: TEXTURES.pir,
    facingRepeat: [1.5, 3],
    insulationRepeat: [2, 2],
    roughness: 0.9,
    thickness: 124,
    facingT: 12,
    insulationT: 100,
    description: "Максимальная энергоэффективность с PIR-утеплителем.",
  },
  sml: {
    id: "sml",
    name: "СМЛ + ППС",
    facingName: "СМЛ 10мм",
    insulationName: "Пенополистирол",
    facingColor: "#ffffff",
    insulationColor: "#ffffff",
    facingTex: TEXTURES.sml,
    insulationTex: TEXTURES.eps,
    facingRepeat: [1, 1],
    insulationRepeat: [4, 4],
    roughness: 0.5,
    thickness: 170,
    facingT: 10,
    insulationT: 150,
    description: "Экологичная влагостойкая панель со стекломагниевым листом.",
  }
};

const SIPPanelModel = ({ exploded, config }: { exploded: boolean; config: typeof MATERIAL_TYPES.standard }) => {
  const meshFront = useRef<THREE.Mesh>(null);
  const meshBack = useRef<THREE.Mesh>(null);
  const labelsRef = useRef<THREE.Group>(null);
  
  const textures = useTexture([config.facingTex, config.insulationTex]);
  const facingMap = textures[0];
  const insulationMap = textures[1];

  useEffect(() => {
    if (facingMap) {
      facingMap.wrapS = facingMap.wrapT = THREE.RepeatWrapping;
      facingMap.repeat.set(config.facingRepeat[0], config.facingRepeat[1]);
      facingMap.anisotropy = 16;
    }
    if (insulationMap) {
      insulationMap.wrapS = insulationMap.wrapT = THREE.RepeatWrapping;
      insulationMap.repeat.set(config.insulationRepeat[0], config.insulationRepeat[1]);
      insulationMap.anisotropy = 16;
    }
  }, [facingMap, insulationMap, config]);

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
        <meshStandardMaterial map={facingMap} color={config.facingColor} roughness={config.roughness} metalness={0.1} />
      </mesh>

      {/* Middle */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[w - 0.005, h - 0.005, foamT]} />
        <meshStandardMaterial map={insulationMap} color={config.insulationColor} roughness={0.9} />
      </mesh>

      {/* Back */}
      <mesh ref={meshBack} position={[0, 0, -initialOffset]} castShadow receiveShadow>
        <boxGeometry args={[w, h, osbT]} />
        <meshStandardMaterial map={facingMap} color={config.facingColor} roughness={config.roughness} metalness={0.1} />
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
                    "{material.description}"
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
