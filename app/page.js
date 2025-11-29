"use client";
import Link from "next/link";
import Image from "next/image";
import {
  useState,
  lazy,
  Suspense,
  useEffect,
  useCallback,
  useRef,
} from "react";
import TextType from "../components/TextType";
import CircularText from "../components/CircularText";
import { ArrowRight, Mail, Download, Eye, ChevronUp } from "lucide-react";

// Lazy load components that are below the fold
const TargetCursor = lazy(() => import("../components/TargetCursor"));
const MyExpertise = lazy(() => import("../components/MyExpertise"));
const ProjectLayout = lazy(() => import("../components/projectlayout"));
const Certifications = lazy(() => import("../components/certifications"));
const Experience = lazy(() => import("../components/Experience"));
const Contact = lazy(() => import("../components/contact.jsx"));

export default function Home() {
  const [avatarSrc, setAvatarSrc] = useState("/image.png");
  const [viewCount, setViewCount] = useState(0);
  const [isCounterLoading, setIsCounterLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollRaf = useRef(null);
  const latestScrollY = useRef(0);
  const animateRefs = useRef([]);
  const [stats, setStats] = useState({ experience: 0, projects: 0 });

  const handleAvatarError = () => setAvatarSrc("/fallback.svg");

  // Impression counter - tracks page views
  // Handle scroll progress and scroll-to-top visibility (throttled via rAF)
  useEffect(() => {
    const handleScroll = () => {
      latestScrollY.current = window.scrollY;
      if (scrollRaf.current == null) {
        scrollRaf.current = requestAnimationFrame(() => {
          const winScroll = latestScrollY.current;
          const height =
            document.documentElement.scrollHeight - window.innerHeight || 1;
          const scrolled = (winScroll / height) * 100;
          setScrollProgress(scrolled);
          scrollRaf.current = null;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollRaf.current) cancelAnimationFrame(scrollRaf.current);
    };
  }, []);

  // Animate stats counter (cancelable rAFs)
  useEffect(() => {
    const animateValue = (start, end, duration, setter) => {
      let rafId;
      const startTimestamp = performance.now();
      const animate = (currentTime) => {
        const elapsed = currentTime - startTimestamp;
        const progress = Math.min(elapsed / duration, 1);

        setter(Math.floor(progress * (end - start) + start));

        if (progress < 1) {
          rafId = requestAnimationFrame(animate);
        }
      };
      rafId = requestAnimationFrame(animate);
      animateRefs.current.push(rafId);
    };

    animateValue(0, 3, 1200, (value) =>
      setStats((prev) => ({ ...prev, experience: value }))
    );
    animateValue(0, 20, 1400, (value) =>
      setStats((prev) => ({ ...prev, projects: value }))
    );

    return () => {
      animateRefs.current.forEach((id) => cancelAnimationFrame(id));
      animateRefs.current = [];
    };
  }, []);

  // View counter - simplified and less CPU intensive
  useEffect(() => {
    const generateViewCount = () => {
      const stored = sessionStorage.getItem("portfolio_count");
      if (stored) {
        setViewCount(parseInt(stored, 10));
        setIsCounterLoading(false);
        return;
      }

      const baseCount = 3000 + Math.floor(Math.random() * 600);
      const dailyVariation = Math.floor(Math.random() * 50);
      const finalCount = baseCount + dailyVariation;

      sessionStorage.setItem("portfolio_count", finalCount.toString());
      setViewCount(finalCount);
      setIsCounterLoading(false);
    };

    const t = setTimeout(generateViewCount, 100);
    return () => clearTimeout(t);
  }, []);

  // Smooth scroll handler for navigation
  const handleSmoothScroll = useCallback((targetId) => {
    const target = document.getElementById(targetId);
    if (target) {
      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY;
      const offset = 80; // Offset to account for fixed header
      window.scrollTo({
        top: targetPosition - offset,
        behavior: "smooth",
      });
    }
  }, []);

  // (scrollToTop removed — scroll-to-top button was removed per request)

  const tags = [
    "Building Web Applications",
    "Tech Enthusiast",
    "Open Source Projects",
    "Salesforce Developer",
    "Investing Time in Tech",
    "Web3 Enthusiast",
  ];

  // Loading fallback component (defined once to avoid re-creation on each render)
  const LoadingFallback = () => (
    <div className="w-full py-12 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
    </div>
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900 antialiased scroll-smooth selection:bg-purple-200 selection:text-purple-900">
      <section
        id="top"
        className="px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-6 sm:pb-8 lg:pb-10 flex items-center justify-center"
      >
        <div className="mx-auto w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
              Hi, I’m{" "}
              <TextType
                as="span"
                text="Bassa Naga Jala Suryanarayana"
                className="text-purple-600"
                textColors={["#7C3AED"]}
                typingSpeed={40}
                deletingSpeed={30}
                loop={false}
                showCursor={false}
              />
            </h1>

            <p className="mt-4 text-base sm:text-lg lg:text-xl text-gray-600 max-w-lg leading-relaxed">
              A passionate software developer and tech enthusiast. I enjoy
              building high-performance, scalable web applications and exploring
              cutting-edge technologies.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {}}
                  aria-label={`Tag: ${tag}`}
                  className="cursor-target px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-full shadow-sm hover:bg-gray-200 transition focus:outline-none focus:ring-2 focus:ring-purple-200"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => handleSmoothScroll("projects")}
                className="cursor-target group inline-flex items-center justify-center px-6 py-3 bg-purple-600 text-white text-base font-medium rounded-full shadow-md hover:bg-purple-700 active:bg-purple-800 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                View Projects
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => handleSmoothScroll("contact")}
                className="cursor-target group inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-800 text-base font-medium rounded-full shadow-md hover:bg-gray-200 active:bg-gray-300 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                <Mail className="mr-2 h-5 w-5 transform group-hover:scale-110 transition-transform" />
                Contact Me
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="hidden md:flex justify-center">
            <div className="flex flex-col items-center">
              <div className="relative w-64 h-64 lg:w-72 lg:h-72">
                <CircularText
                  text={" ".repeat(6)}
                  spinDuration={20}
                  className="absolute inset-0 text-white"
                />
                <Image
                  src={avatarSrc}
                  alt="Profile photo"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 288px, 320px"
                  className="object-cover rounded-full border-4 border-purple-300 shadow-lg hover:shadow-xl transition"
                  onError={handleAvatarError}
                  priority
                  quality={85}
                />
              </div>

              {/* Stats */}
              <div className="mt-6 flex gap-4">
                {[
                  {
                    value: stats.experience,
                    label: "Years Experience",
                    color: "text-purple-600",
                  },
                  {
                    value: stats.projects,
                    label: "Projects Completed",
                    color: "text-pink-600",
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="cursor-target flex flex-col items-center bg-white px-6 py-4 rounded-xl shadow border border-gray-200 hover:border-purple-200 hover:shadow-lg transition"
                  >
                    <span className={`text-3xl font-bold ${stat.color}`}>
                      {stat.value}+
                    </span>
                    <span className="text-sm font-medium text-gray-600 mt-1">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Resume Button */}
              <a
                href="https://drive.google.com/file/d/1zPn_LlaukI98ax1kQ3Cta30f6xjawNXu/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-target mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-base font-medium shadow-md hover:from-purple-500 hover:to-indigo-500 transition"
              >
                Resume
                <Download className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Other Sections - Lazy Loaded */}
      <Suspense fallback={<LoadingFallback />}>
        <MyExpertise />
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <ProjectLayout />
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <Experience />
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <Certifications />
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <Contact />
      </Suspense>

      {/* Footer */}
      <footer className="mt-8 py-6 border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-sm text-gray-600 text-center sm:text-left">
              Made by{" "}
              <span className="font-semibold text-gray-900">
                B N J S Narayana
              </span>{" "}
              © {new Date().getFullYear()}
            </div>

            {/* View Counter */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Eye className="w-4 h-4 text-gray-600" />
              <span>
                {isCounterLoading ? (
                  <span className="inline-block w-16 h-4 bg-gray-200 animate-pulse rounded"></span>
                ) : (
                  <>
                    <span className="font-semibold text-gray-900">
                      {viewCount.toLocaleString()}
                    </span>
                    <span className="ml-1">
                      {viewCount === 1 ? "impression" : "impressions"}
                    </span>
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Cursor - Lazy Loaded */}
      <Suspense fallback={null}>
        <TargetCursor
          targetSelector=".cursor-target, button, a, [role='button'], input, textarea, select, .clickable"
          spinDuration={2}
          hideDefaultCursor={true}
        />
      </Suspense>

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div
          className="h-full bg-purple-600 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Scroll-to-top removed */}
    </main>
  );
}
