"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Menu,
  X,
  UserRoundCheck,
  Home,
  BookOpen,
  Folder,
  Mail,
} from "lucide-react";
import Link from "next/link";

const navigationItems = [
  { name: "Home", href: "#top", icon: Home },
  { name: "Experience", href: "#experience", icon: UserRoundCheck },
  { name: "Certificates", href: "#certifications", icon: BookOpen },
  { name: "Projects", href: "#projects", icon: Folder },
  { name: "Contact me", href: "#contact", icon: Mail },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeHash, setActiveHash] = useState("#top");

  const navRef = useRef(null);
  const toggleBtnRef = useRef(null);

  const isClient =
    typeof window !== "undefined" && typeof document !== "undefined";

  const toggleMenu = () => setIsMenuOpen((v) => !v);

  // Resize observer for responsive breakpoint
  useEffect(() => {
    if (!isClient) return;
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [isClient]);

  // Active section observer
  useEffect(() => {
    if (!isClient) return;

    const ids = navigationItems.map((n) => n.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    let raf = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        // Batch updates via rAF to reduce layout thrash
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (visible?.target?.id) {
            setActiveHash(`#${visible.target.id}`);
          }
        });
      },
      {
        // Top 20% acts as early trigger; bottom 60% ignores footer overlap
        root: null,
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((el) => observer.observe(el));
    return () => {
      if (raf) cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [isClient]);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    if (!isClient) return;

    let ticking = false;
    const THRESHOLD = 100;

    const onScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (Math.abs(currentScrollY - lastScrollY) > THRESHOLD) {
            setIsVisible(
              // Show navbar when:
              // 1. Scrolling up
              // 2. Near the top of the page
              currentScrollY < lastScrollY || currentScrollY < THRESHOLD
            );
            setLastScrollY(currentScrollY);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isClient, lastScrollY]);

  // Close on outside click (for mobile dropdown)
  useEffect(() => {
    if (!isClient || !isMenuOpen) return;

    const onDown = (e) => {
      if (
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(e.target) &&
        navRef.current &&
        !navRef.current.contains(e.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    // Add both mouse and touch events for better mobile support
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);

    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [isClient, isMenuOpen]);

  // Lock body scroll when menu open on mobile
  useEffect(() => {
    if (!isClient) return;
    const original = document.body.style.overflow;
    if (isMenuOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = original || "";
    }
    return () => {
      document.body.style.overflow = original || "";
    };
  }, [isClient, isMenuOpen, isMobile]);

  const handleNavClick = useCallback(
    (href) => {
      setIsMenuOpen(false);
      // Native smooth scroll for in-page anchors
      if (isClient && href.startsWith("#")) {
        const target = document.querySelector(href);
        if (target) {
          const navHeight = navRef.current?.offsetHeight || 0;
          const targetPosition =
            target.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: targetPosition - navHeight - 20, // 20px extra padding
            behavior: "smooth",
          });
        }
      }
    },
    [isClient]
  );

  return (
    <nav
      ref={navRef}
      role="navigation"
      aria-label="Primary"
      className={`fixed top-3 sm:top-6 right-3 sm:right-6 z-50 font-medium transition-transform duration-300 ease-in-out
        ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }
        motion-reduce:transition-none`}
    >
      <style jsx>{`
        .nav-backdrop {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.03) 0%,
            rgba(255, 255, 255, 0.07) 100%
          );
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          backdrop-filter: blur(16px) saturate(180%);
          /* Fallback for browsers without backdrop-filter support */
          @supports not (backdrop-filter: blur(16px)) {
            background: linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.7) 0%,
              rgba(255, 255, 255, 0.8) 100%
            );
          }
        }
        
        .glass-highlight {
          position: relative;
          overflow: hidden;
        }
        
        .glass-highlight::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          transition: 0.5s;
        }
        
        .glass-highlight:hover::before {
          left: 100%;
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.25s ease both;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in-up {
            animation: none !important;
          }
        }
      `}</style>

      {/* Desktop */}
      <div className="hidden lg:block">
        <ul className="flex flex-row gap-2 lg:gap-3 p-2 lg:p-3 nav-backdrop rounded-2xl border border-white/10 shadow-lg">
          {navigationItems.map((item) => {
            const isActive = activeHash === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`cursor-target flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-xl text-sm lg:text-base transition-all duration-500 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300/50 glass-highlight hover:scale-105 transform
                    ${
                      isActive
                        ? "bg-gradient-to-r from-purple-500/20 to-purple-400/10 text-purple-300 font-medium backdrop-blur-md"
                        : "text-gray-400 hover:text-purple-300"
                    }`}
                  aria-label={`Navigate to ${item.name}`}
                  aria-current={isActive ? "page" : undefined}
                  onClick={(e) => {
                    if (item.href.startsWith("#")) {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }
                  }}
                >
                  <item.icon
                    size={18}
                    className={`${
                      isActive ? "text-purple-300" : "text-gray-400"
                    } transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3`}
                    aria-hidden="true"
                  />
                  <span className="whitespace-nowrap hidden xl:inline">
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Tablet (md-lg) */}
      <div className="hidden md:block lg:hidden">
        <ul className="flex flex-row gap-2 p-2 nav-backdrop rounded-2xl border border-white/10 shadow-lg flex-wrap justify-end">
          {navigationItems.map((item) => {
            const isActive = activeHash === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`cursor-target flex items-center justify-center gap-1 px-2 py-2 rounded-xl text-xs transition-all duration-500 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300/50 min-h-[44px] min-w-[44px] glass-highlight hover:scale-105 transform group
                    ${
                      isActive
                        ? "bg-gradient-to-r from-purple-500/20 to-purple-400/10 text-purple-300 font-medium backdrop-blur-md"
                        : "text-gray-400 hover:text-purple-300"
                    }`}
                  aria-label={`Navigate to ${item.name}`}
                  aria-current={isActive ? "page" : undefined}
                  onClick={(e) => {
                    if (item.href.startsWith("#")) {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }
                  }}
                >
                  <item.icon
                    size={16}
                    className={`${
                      isActive ? "text-white" : "text-gray-600"
                    } transition-transform flex-shrink-0`}
                    aria-hidden="true"
                  />
                  <span className="hidden sm:inline whitespace-nowrap">
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <button
          ref={toggleBtnRef}
          onClick={toggleMenu}
          className="cursor-target p-2 sm:p-2.5 rounded-xl bg-gradient-to-r from-purple-500/20 to-purple-400/10 text-purple-300 shadow-lg backdrop-blur-md hover:bg-purple-500/15 active:bg-purple-500/20 transition-all duration-500 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-300/50 min-h-[44px] min-w-[44px] flex items-center justify-center hover:scale-105 transform glass-highlight"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? (
            <X size={20} aria-hidden="true" />
          ) : (
            <Menu size={20} aria-hidden="true" />
          )}
        </button>

        <div
          id="mobile-menu"
          className={`absolute top-14 sm:top-16 right-0 w-screen sm:w-64 rounded-xl sm:rounded-xl overflow-hidden transition-all duration-300 ease-in-out transform origin-top-right
            ${
              isMenuOpen
                ? "scale-100 opacity-100"
                : "scale-95 opacity-0 pointer-events-none"
            }
            nav-backdrop shadow-xl border border-white/10 max-h-[calc(100vh-120px)] overflow-y-auto`}
          role="menu"
          aria-hidden={!isMenuOpen}
        >
          <ul className="flex flex-col gap-1 p-3 sm:p-4">
            {navigationItems.map((item, index) => {
              const isActive = activeHash === item.href;
              return (
                <li
                  key={item.name}
                  style={{ animationDelay: `${index * 0.05}s` }}
                  className="animate-fade-in-up"
                >
                  <Link
                    href={item.href}
                    className={`cursor-target group flex items-center gap-3 px-3 sm:px-4 py-3 sm:py-3 rounded-xl transition-all duration-500 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300/50 min-h-[44px] text-sm sm:text-base glass-highlight hover:translate-x-1 transform
                      ${
                        isActive
                          ? "bg-gradient-to-r from-purple-500/20 to-purple-400/10 text-purple-300 font-medium backdrop-blur-md"
                          : "text-gray-400 hover:text-purple-300"
                      }`}
                    aria-label={`Navigate to ${item.name}`}
                    aria-current={isActive ? "page" : undefined}
                    role="menuitem"
                    onClick={(e) => {
                      if (item.href.startsWith("#")) {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }
                      setIsMenuOpen(false);
                    }}
                  >
                    <item.icon
                      size={20}
                      className={`${
                        isActive ? "text-purple-400" : "text-gray-400"
                      } transition-transform group-hover:scale-110 group-hover:text-purple-400 flex-shrink-0`}
                      aria-hidden="true"
                    />
                    <span className="flex-1">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
