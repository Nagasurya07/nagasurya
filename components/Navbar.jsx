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
          background-color: rgba(255, 255, 255, 0.8);
          -webkit-backdrop-filter: blur(4px);
          backdrop-filter: blur(4px);
          /* Fallback for browsers without backdrop-filter support */
          @supports not (backdrop-filter: blur(4px)) {
            background-color: rgba(255, 255, 255, 0.95);
          }
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
        <ul className="flex flex-row gap-2 lg:gap-3 p-3 lg:p-4 nav-backdrop rounded-xl border border-gray-200/50 shadow-sm">
          {navigationItems.map((item) => {
            const isActive = activeHash === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`cursor-target flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg text-sm lg:text-base transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600
                    ${
                      isActive
                        ? "bg-purple-600 text-white font-semibold shadow-md"
                        : "text-gray-800 hover:bg-gray-100 active:bg-gray-200"
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
        <ul className="flex flex-row gap-2 p-2 nav-backdrop rounded-lg border border-gray-200/50 shadow-sm flex-wrap justify-end">
          {navigationItems.map((item) => {
            const isActive = activeHash === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`cursor-target flex items-center justify-center gap-1 px-2 py-2 rounded-lg text-xs transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 min-h-[44px] min-w-[44px]
                    ${
                      isActive
                        ? "bg-purple-600 text-white font-semibold shadow-md"
                        : "text-gray-700 hover:bg-gray-100 active:bg-gray-200"
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
          className="cursor-target p-2 sm:p-2.5 rounded-lg bg-purple-600 text-white shadow-md hover:bg-purple-700 active:bg-purple-800 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-600 min-h-[44px] min-w-[44px] flex items-center justify-center"
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
                    className={`cursor-target group flex items-center gap-3 px-3 sm:px-4 py-3 sm:py-3 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 min-h-[44px] text-sm sm:text-base
                      ${
                        isActive
                          ? "bg-purple-600 text-white font-semibold shadow-md"
                          : "text-gray-800 hover:bg-gray-100 active:bg-gray-200"
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
                        isActive ? "text-white" : "text-gray-600"
                      } transition-transform group-hover:scale-110 flex-shrink-0`}
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
