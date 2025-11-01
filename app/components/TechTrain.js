"use client";

// Tech Stack Train component
// Displays a smooth, continuous left-to-right animation of technology logos.

// Logo list
const techStack = [
  { src: "/js.png", alt: "JavaScript" },
  { src: "/python.png", alt: "Python" },
  { src: "/java.png", alt: "Java" },
  { src: "/springboot.png", alt: "Spring Boot" },
  { src: "/servicenow.png", alt: "ServiceNow" },
  { src: "/docker.png", alt: "Docker" },
  { src: "/git.png", alt: "Git" },
  { src: "/github.png", alt: "GitHub" },
  { src: "/bitbucket.png", alt: "Bitbucket" },
  { src: "/jenkins.png", alt: "Jenkins" },
];

import { motion } from "framer-motion";
import Image from "next/image";

export default function TechTrain() {
  // Animation setup
  // We render the logos twice to create a seamless loop. The track animates
  // from x: "-50%" to x: "0%" so the second copy slides into the first
  // without any visible jump. With repeat: Infinity and linear easing,
  // this creates a fluid left-to-right marquee effect.
  const trackDuration = 24; // seconds; increase for slower movement

  return (
    <section
      aria-label="Technology stack marquee"
      className="relative w-full overflow-hidden py-8 sm:py-12 lg:py-16 bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800"
    >
      {/* Container styling */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.07),transparent_60%)]" />

      {/* Track wrapper to clip overflow */}
      <div className="relative w-full">
        <motion.div
          className="flex items-center gap-6 sm:gap-8 lg:gap-10 w-[200%]"
          // Animation setup
          animate={{ x: ["-50%", "0%"] }}
          transition={{ ease: "linear", duration: trackDuration, repeat: Infinity }}
        >
          {/* One full copy */}
          <LogoRow />
          {/* Duplicate for seamless loop */}
          <LogoRow />
        </motion.div>
      </div>
    </section>
  );
}

function LogoRow() {
  return (
    <div className="flex min-w-max items-center gap-6 sm:gap-8 lg:gap-10">
      {techStack.map((tech, i) => (
        <div
          key={`${tech.alt}-${i}`}
          className="relative flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12"
        >
          <Image
            src={tech.src}
            alt={tech.alt}
            title={tech.alt}
            fill
            sizes="(max-width: 640px) 3rem, (max-width: 768px) 3.5rem, 4rem"
            className="object-contain drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)]"
            priority
          />
        </div>
      ))}
    </div>
  );
}
