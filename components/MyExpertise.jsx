"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Zap, Rocket, Target, Brain } from "lucide-react";

function Bullet({ icon, title, children, color = "bg-sky-500" }) {
  return (
    <li className="flex gap-4">
      <span
        className={`shrink-0 h-10 w-10 rounded-xl ${color}/20 border border-gray-200 grid place-items-center text-black`}
        aria-hidden
      >
        <span className={`h-8 w-8 rounded-lg ${color} grid place-items-center`}>
          {icon}
        </span>
      </span>
      <div className="pt-0.5">
        <h4 className="text-base sm:text-lg font-semibold text-gray-900">
          {title}
        </h4>
        <p className="text-sm sm:text-[15px] text-gray-700 leading-relaxed">
          {children}
        </p>
      </div>
    </li>
  );
}

export default function MyExpertise() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const [pathLen, setPathLen] = useState(0);
  const [progress, setProgress] = useState(0); // 0..1

  // Scroll progress along the section to "draw" the route
  useEffect(() => {
    const path = pathRef.current;
    if (path) setPathLen(path.getTotalLength());

    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // progress from 0 when section bottom hits viewport top to 1 when section top passes viewport bottom
      const total = window.innerHeight + rect.height;
      const visible = window.innerHeight - rect.top;
      const p = Math.min(1, Math.max(0, visible / total));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Skills list; positions (cy) and side are computed to fill the space evenly
  const skills = [
    { label: "HTML", color: "#F97316" },
    { label: "CSS", color: "#06B6D4" },
    { label: "JavaScript", color: "#EAB308" },
    { label: "Node.js", color: "#16A34A" },
    { label: "React", color: "#3B82F6" },
    { label: "Next.js", color: "#111827" },
    { label: "Supabase", color: "#10B981" },
    { label: "Firebase", color: "#F59E0B" },
    { label: "Python", color: "#2563EB" },
    { label: "Java", color: "#DC2626" },
    { label: "Docker", color: "#0db7ed" },
    { label: "AWS", color: "#FF9900" },
  ];

  const points = useMemo(() => {
    const VIEW_H = 740; // matches SVG viewBox height
    const TOP = 40;
    const BOTTOM = 40;
    const n = skills.length;
    const step = n > 1 ? (VIEW_H - TOP - BOTTOM) / (n - 1) : 0;
    return skills.map((s, i) => ({
      cy: Math.round(TOP + i * step),
      label: s.label,
      color: s.color,
      side: i % 2 === 0 ? "left" : "right",
    }));
  }, [skills]);
  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="relative mt-4 sm:mt-6 lg:mt-8 mb-6 sm:mb-8 lg:mb-10 rounded-2xl sm:rounded-3xl overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center">
          {/* === Illustration column (connected S-map) === */}
          <div className="relative flex justify-center order-2 md:order-1">
            <div className="aspect-[3/2] w-full max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-2xl">
              <svg
                viewBox="0 0 400 740"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                {/* S-shaped path */}
                <defs>
                  <linearGradient id="sPath" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                  <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {/* S-curve passing through all checkpoints */}
                <path
                  ref={pathRef}
                  d={(() => {
                    if (!points.length) return "";
                    const leftX = 60;
                    const rightX = 340;
                    let d = `M 200 ${points[0].cy}`;
                    for (let i = 0; i < points.length - 1; i++) {
                      const p0 = points[i];
                      const p1 = points[i + 1];
                      const midY = (p0.cy + p1.cy) / 2;
                      const cp1x = i % 2 === 0 ? leftX : rightX;
                      const cp2x = i % 2 === 0 ? rightX : leftX;
                      d += ` C ${cp1x} ${midY}, ${cp2x} ${midY}, 200 ${p1.cy}`;
                    }
                    return d;
                  })()}
                  stroke="url(#sPath)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                  filter="url(#softGlow)"
                  style={{
                    strokeDasharray: pathLen || undefined,
                    strokeDashoffset: pathLen ? pathLen * (1 - progress) : undefined,
                    transition: "stroke-dashoffset 60ms linear",
                  }}
                />

                {/* Anchors along the path */}
                {points.map((p, i) => {
                  const boxW = 170; // keep < 184 to stay left of center on left side
                  const boxH = 38;
                  const padding = 10;
                  const rx = 10;
                  const boxX = p.side === "left" ? 16 : 400 - 16 - boxW;
                  const boxY = p.cy - boxH / 2;
                  const lineX = p.side === "left" ? boxX + boxW : boxX;
                  const norm = p.cy / 740; // 0..1 position along viewBox height
                  const active = progress >= Math.max(0.05, Math.min(0.98, norm - 0.05));
                  return (
                    <g key={i}>
                      {/* connector */}
                      <line
                        x1={200}
                        y1={p.cy}
                        x2={lineX}
                        y2={p.cy}
                        stroke={active ? p.color : "#E5E7EB"}
                        strokeWidth="3"
                        opacity={active ? 1 : 0.6}
                      />
                      {/* anchor */}
                      <circle cx={200} cy={p.cy} r="10" fill={active ? p.color : "#FFFFFF"} stroke={active ? p.color : "#CBD5E1"} strokeWidth="3" />
                      {/* label box */}
                      <rect x={boxX} y={boxY} width={boxW} height={boxH} rx={rx} ry={rx} fill="#FFFFFF" stroke={active ? p.color : "#E5E7EB"} />
                      <text
                        x={boxX + padding}
                        y={boxY + boxH / 2 + 5}
                        fontSize="13"
                        fontWeight="700"
                        fill="#111827"
                      >
                        {p.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* === Content column === */}
          <div className="order-1 md:order-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black mb-4 sm:mb-6">
              My <span className="text-black">Expertise</span>
            </h2>

            <ul className="space-y-4 sm:space-y-6">
              <Bullet
                icon={<Zap size={20} className="text-white" />}
                title="Frontend Development"
                color="bg-purple-600"
              >
                Creating responsive and interactive user interfaces using React,
                Next.js, and modern CSS frameworks like Tailwind CSS.
              </Bullet>

              <Bullet
                icon={<Rocket size={20} className="text-white" />}
                title="Backend Development"
                color="bg-indigo-600"
              >
                Building robust APIs and server-side applications using Node.js,
                Express, and database management systems.
              </Bullet>

              <Bullet
                icon={<Brain size={20} className="text-white" />}
                title="Machine Learning"
                color="bg-fuchsia-600"
              >
                Developing intelligent systems using deep learning frameworks
                for computer vision, NLP, and predictive modeling.
              </Bullet>

              <Bullet
                icon={<Target size={20} className="text-white" />}
                title="Problem Solving"
                color="bg-violet-600"
              >
                Analyzing complex problems and implementing efficient solutions
                with clean, maintainable code.
              </Bullet>
            </ul>

            <div className="mt-8">
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 px-6 py-3 text-black border-2 border-black rounded-md tracking-widest uppercase text-xs font-semibold hover:bg-black/5 transition-colors"
              >
                <span className="absolute -bottom-2 left-2 right-6 h-px bg-black/60" />
                <span className="absolute -bottom-3 left-10 right-0 h-px bg-black/30" />
                View My Work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
