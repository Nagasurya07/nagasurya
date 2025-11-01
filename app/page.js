"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, lazy, Suspense, useEffect } from "react";
import TextType from "../components/TextType";
import CircularText from "../components/CircularText";
import { ArrowRight, Mail, Download, Eye } from "lucide-react";

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
  
  const handleAvatarError = () => setAvatarSrc("/fallback.svg");

  // Impression counter - tracks page views
  useEffect(() => {
    const incrementViewCount = () => {
      // Get current count from localStorage
      const storedCount = localStorage.getItem('portfolio_views');
      const currentCount = storedCount ? parseInt(storedCount, 10) : 0;
      
      // Increment and save
      const newCount = currentCount + 1;
      localStorage.setItem('portfolio_views', newCount.toString());
      setViewCount(newCount);
      setIsCounterLoading(false);
    };

    // Small delay to ensure client-side rendering
    setTimeout(incrementViewCount, 100);
  }, []);

  const tags = [
    "Building Web Applications",
    "Tech Enthusiast",
    "Open Source Projects",
    "Salesforce Developer",
    "Investing Time in Tech",
    "Web3 Enthusiast",
  ];

  // Loading fallback component
  const LoadingFallback = () => (
    <div className="w-full py-12 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
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
                <span
                  key={i}
                  className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-full shadow-sm hover:bg-gray-200 transition"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="#projects"
                className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 text-white text-base font-medium rounded-full shadow-md hover:bg-purple-700 transition"
              >
                View Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-800 text-base font-medium rounded-full shadow-md hover:bg-gray-200 transition"
              >
                <Mail className="mr-2 h-5 w-5" />
                Contact Me
              </Link>
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
                  { value: "3+", label: "Years Experience", color: "text-purple-600" },
                  { value: "20+", label: "Projects Completed", color: "text-pink-600" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center bg-white px-6 py-4 rounded-xl shadow border border-gray-200 hover:border-purple-200 hover:shadow-lg transition"
                  >
                    <span className={`text-3xl font-bold ${stat.color}`}>
                      {stat.value}
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
                className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-base font-medium shadow-md hover:from-purple-500 hover:to-indigo-500 transition"
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
              Made by <span className="font-semibold text-gray-900">B N J S Narayana</span> ©{" "}
              {new Date().getFullYear()}
            </div>

            {/* View Counter */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Eye className="w-4 h-4 text-gray-600" />
              <span>
                {isCounterLoading ? (
                  <span className="inline-block w-16 h-4 bg-gray-200 animate-pulse rounded"></span>
                ) : (
                  <>
                    <span className="font-semibold text-gray-900">{viewCount.toLocaleString()}</span>
                    <span className="ml-1">
                      {viewCount === 1 ? 'impression' : 'impressions'}
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
          outerColor="#A78BFA"
          innerColor="#A78BFA"
          outerSize={40}
          innerSize={8}
          outerScale={3}
          innerScale={0.7}
          outerAlpha={0.4}
          innerAlpha={0.7}
          hideDefaultCursor={true}
        />
      </Suspense>
    </main>
  );
}
