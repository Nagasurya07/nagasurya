"use client";
import React, { useMemo, useRef, useState, useEffect } from "react";
import CardSwap, { Card } from "./CardSwap";
import { ArrowLeft, ArrowRight, Github, ExternalLink } from "lucide-react";

const ProjectLayout = () => {
  const projects = useMemo(
    () => [
      {
        title: "Doctors Appointment Platform",
        description:
          "A comprehensive full-stack healthcare appointment booking platform built with modern web technologies, featuring real-time video consultations, secure payment processing, and intuitive user management.",
        tags: ["Next.js 14", "TailwindCSS", "Clerk", "shadcn/ui", "Lucide React","Neon (PostgreSQL)"],
        github: "https://github.com/Nagasurya07/-Doctors-Appointment-Platform",
        demo: "https://doctors-appointment-platform-zeta.vercel.app/",
        bg: "bg-[linear-gradient(to_bottom_right,rgba(2,6,23,0.35),rgba(2,6,23,0.6)),url('/illustrations/dev-portfolio.svg')] bg-cover bg-center bg-no-repeat",
      },
      {
        title: "FinXpert – AI-Powered Finance Tracker 🔥",
        description:
          "Manage your expenses effortlessly with FinXpert, a full-stack AI Finance Platform built using modern technologies like Next.js, Supabase, Prisma, Tailwind CSS, Clerk, ArcJet, Inngest, and Gemini AI.Think of it as your PhonePe Expense Tracker 2.0, designed for personal financial control, smart insights, and a seamless experience.",
        tags: ["React", "Next.js", "Gemini AI.", "ArcJet", "Supabase"],
        github: "https://github.com/Nagasurya07/Finxpert",
        demo: "https://finxpert.vercel.app/",
          bg: "bg-[linear-gradient(to_bottom_right,rgba(2,6,23,0.35),rgba(2,6,23,0.6)),url('/illustrations/dev-port.svg')] bg-cover bg-center bg-no-repeat",
      },
      {
        title: "Smart Tools Station",
        description:
          "Smart Tools Station is a multi-tool web application designed to provide various utilities at your fingertips. The platform includes tools such as a QR Code Generator, Password Generator, To-Do List, Quote Generator, Timer, Password Strength Checker, and Notes App.",
        tags: ["html", "css", "javascript"],
        github: "https://github.com/Nagasurya07/Smart-tools",
        demo: "https://nagasurya07.github.io/Smart-tools/",
         bg: "bg-[linear-gradient(to_bottom_right,rgba(2,6,23,0.35),rgba(2,6,23,0.6)),url('/illustrations/dev.svg')] bg-cover bg-center bg-no-repeat",
      },
    ],
    []
  );

  const swapRef = useRef(null);
  const [active, setActive] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);
  const [cardDimensions, setCardDimensions] = useState({
    width: 650,
    height: 480,
    cardDistance: 60,
    verticalDistance: 40,
    // default desktop height — use a viewport-based height so cards can "fill" laptop screens
    containerHeight: "calc(100vh - 120px)"
  });

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      
      if (width < 640) {
        // Mobile
        setCardDimensions({
          width: Math.min(width - 40, 350),
          height: 280,
          cardDistance: 30,
          verticalDistance: 20,
          containerHeight: "350px"
        });
      } else if (width < 768) {
        // Tablet
        setCardDimensions({
          width: 450,
          height: 360,
          cardDistance: 40,
          verticalDistance: 30,
          containerHeight: "450px"
        });
      } else if (width < 1024) {
        // Small laptop
        setCardDimensions({
          width: 500,
          height: 400,
          cardDistance: 50,
          verticalDistance: 35,
          // For small laptops we still provide a tall container but avoid full viewport
          containerHeight: "min(600px, calc(100vh - 120px))"
        });
      } else {
        // Desktop
        setCardDimensions({
          width: 650,
          height: 480,
          cardDistance: 60,
          verticalDistance: 40,
          // On true desktop/laptop screens, allow the project area to fill the viewport height
          containerHeight: "calc(100vh - 120px)"
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // One-time animation on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      aria-labelledby="projects-heading" 
      className="px-4 sm:px-6 lg:px-8 scroll-mt-20 sm:scroll-mt-28 py-6 sm:py-8 lg:py-10"
    >
      {/* Heading Section */}
      <div className={`text-center mb-8 sm:mb-10 transition-all duration-1000 ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
        
        <h1 id="projects-heading" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight mb-4 sm:mb-5">
          My <span className="relative inline-block">
            <span className="text-blue-600">Projects</span>
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 8 Q50 2, 100 8 T200 8" stroke="currentColor" strokeWidth="3" fill="none" className="text-blue-400" strokeLinecap="round"/>
            </svg>
          </span>
        </h1>
        <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
          Explore my latest work — crafted with <span className="font-semibold text-gray-800">creativity</span>, <span className="font-semibold text-gray-800">logic</span>, and <span className="font-semibold text-gray-800">code</span>.
        </p>
      </div>

      {/* Two-column layout */}
      <div className={`mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-start lg:items-center transition-all duration-1000 delay-300 ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Left: Details panel */}
        <div className="order-2 md:order-1 w-full">
          <div className="rounded-xl sm:rounded-2xl border border-gray-200 bg-white/70 backdrop-blur p-4 sm:p-6 lg:p-8 shadow-sm hover:shadow-md transition duration-200">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 sm:mb-3 lg:mb-4">
              {projects[active]?.title}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
              {projects[active]?.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
              {projects[active]?.tags?.map((t) => (
                <span
                  key={t}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full bg-gray-100 text-gray-700 border border-gray-200 hover:border-gray-300 transition"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href={projects[active]?.github}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg border border-gray-200 bg-white/70 text-gray-800 hover:bg-white shadow-sm hover:shadow-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 text-sm"
              >
                <Github size={14} className="opacity-80 group-hover:opacity-100" />
                <span>View Code</span>
              </a>
              <a
                href={projects[active]?.demo}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-md hover:shadow-lg hover:from-sky-500 hover:to-indigo-500 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 text-sm"
              >
                <span>Live Demo</span>
                <ExternalLink size={14} className="transition-transform group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
            <button
              onClick={() => swapRef.current?.prev?.()}
              className="group flex items-center justify-center sm:justify-start gap-2 rounded-md sm:rounded-full border border-gray-200 bg-white/70 backdrop-blur px-3 sm:px-4 py-1.5 sm:py-2 text-gray-700 shadow-sm hover:shadow-md hover:bg-white transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 text-sm"
              aria-label="Previous project"
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => swapRef.current?.next?.()}
              className="group flex items-center justify-center sm:justify-start gap-2 rounded-md sm:rounded-full border border-gray-200 bg-white/70 backdrop-blur px-3 sm:px-4 py-1.5 sm:py-2 text-gray-700 shadow-sm hover:shadow-md hover:bg-white transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 text-sm"
              aria-label="Next project"
            >
              <span>Next</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* More on GitHub CTA */}
          <div className="mt-6 sm:mt-8">
            <a
              href="https://github.com/Nagasurya07"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white/70 px-4 py-2 text-gray-800 shadow-sm hover:bg-white hover:shadow-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 text-sm sm:text-base"
            >
              <Github size={18} className="opacity-80 group-hover:opacity-100" />
              <span className="font-medium">Visit My GitHub</span>
            </a>
          </div>

          {/* Dots indicator */}
          <div className="mt-6 sm:mt-8 flex items-center gap-2" aria-label="Project position" role="tablist">
            {projects.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={active === i}
                aria-label={`Go to project ${i + 1}`}
                onClick={() => {
                  // find how many steps to move; choose shortest direction
                  const len = projects.length;
                  const diff = (i - active + len) % len;
                  if (diff === 0) return;
                  if (diff <= Math.floor(len / 2)) {
                    // move forward diff times
                    for (let k = 0; k < diff; k++) swapRef.current?.next?.();
                  } else {
                    // move backward len - diff times
                    for (let k = 0; k < len - diff; k++) swapRef.current?.prev?.();
                  }
                }}
                className={`h-2.5 w-2.5 rounded-full transition-all ${active === i ? 'bg-sky-600 w-6' : 'bg-gray-300 hover:bg-gray-400'}`}
              />
            ))}
          </div>
        </div>

        {/* Right: Card Swap Section - Hidden on Mobile, Show on md+ */}
        <div className="hidden md:flex order-1 md:order-2 w-full justify-center" style={{ height: cardDimensions.containerHeight, position: "relative" }}>
          <CardSwap
            ref={swapRef}
            width={cardDimensions.width}
            height={cardDimensions.height}
            cardDistance={cardDimensions.cardDistance}
            verticalDistance={cardDimensions.verticalDistance}
            delay={4500}
            pauseOnHover={true}
            onActiveChange={(idx) => setActive(idx)}
          >
            {projects.map((p) => (
              <Card
                key={p.title}
                className={`p-4 sm:p-6 overflow-hidden ${p.bg?.includes("url(") ? '' : 'bg-gradient-to-br'} ${p.bg} text-white shadow-2xl`}
              >
                <div className="flex h-full flex-col">
                  <div className="mb-1 sm:mb-2 text-xs tracking-widest uppercase opacity-90">
                    Featured Project
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold leading-tight drop-shadow-sm">
                    {p.title}
                  </h3>
                 
                  <div className="mt-auto pt-3 sm:pt-4 flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    {p.tags.map((t) => (
                      <span key={t} className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md bg-white/20 backdrop-blur border border-white/25">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>
    </section>
  );
};

export default ProjectLayout;
