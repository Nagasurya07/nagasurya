"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, CheckCircle2, ExternalLink, Briefcase } from 'lucide-react';

const Experience = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardRefs = useRef([]);

  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => new Set([...prev, index]));
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -150px 0px' }
      );

      if (ref) observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const experiences = [
    {
      id: 1,
      title: "Technical Content Writer Intern",
      company: "GeeksForGeeks",
      location: "India",
      duration: "May 2024 - November 2024",
      description: [
        "Authored and published 20+ comprehensive technical articles on Artificial Intelligence and Full-Stack Web Development, reaching thousands of developers worldwide.",
        "Translated complex technical concepts including React Hooks, Firebase Integration, and AI APIs into clear, actionable tutorials for developers at all skill levels.",
      ],
      type: "Paid Internship",
      color: "from-purple-500 to-pink-500",
      icon: "🤖",
      skills: ["JavaScript", "React", "Express", "node.js", "AI/ML"]
    },
    {
      id: 2,
      title: "Open Source Contributor",
      company: "GirlScript Summer of Code (GSSoC)",
      location: "India",
      duration: "September 2024 - December 2024",
      description: [
        "Contributed to multiple high-impact open-source repositories, improving code quality, performance optimization, and comprehensive documentation.",
        "Collaborated effectively with maintainers and developers across the globe through GitHub, implementing best practices in version control and code review."
      ],
      type: "contribution",
      color: "from-cyan-500 to-blue-500",
      icon: "⚙️",
      skills: ["Python", "web development", "Git", "Open Source" ]
    },
    {
      id: 3,
      title: "Full-Stack Developer",
      company: "Finxpert - AI-Driven Financial Management Platform",
      location: "Independent Project",
      duration: "2023 - 2024",
      description: [
        "Architected and developed a production-ready financial management system leveraging Next.js, Prisma ORM, and Gemini AI for intelligent financial insights.",
        "Implemented robust CI/CD pipelines on Vercel, ensuring seamless deployment, automatic testing, and zero-downtime updates for continuous delivery."
      ],
      type: "Academic Project",
      color: "from-green-500 to-emerald-500",
      icon: "📚",
      skills: ["JavaScript", "Next.js", "Web Development", "AI Integration", "Prisma" ]
    },
    {
      id: 4,
      title: "Frontend Developer",
      company: "IBM-SkillBuild",
      location: "Remote",
      duration: "May 2025 - Nov 2025",
      description: [
        "Mastered modern frontend development by building responsive, pixel-perfect web interfaces using React and Tailwind CSS through IBM's professional training platform.",
        "Applied industry best practices through hands-on projects, developing production-grade applications with focus on performance, accessibility, and user experience."
      ],
      type: "Unpaid Internship",
      color: "from-orange-500 to-red-500",
      icon: "🧠",
      skills: ["AI/ML", "Data Annotation", "Quality Assurance", "LLMs"]
    }
  ];

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative px-3 sm:px-4 md:px-6 lg:px-8 scroll-mt-20 sm:scroll-mt-24 md:scroll-mt-28 py-6 sm:py-8 md:py-10 lg:py-12"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/30 to-transparent pointer-events-none"></div>

      <div className="relative z-10">
        {/* Heading */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-3 md:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-100 rounded-full">
            <Briefcase size={16} className="text-purple-600 flex-shrink-0" />
            <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-purple-700 uppercase tracking-wider">Career Journey</span>
          </div>

          <h2 id="experience-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 tracking-tight mb-2 sm:mb-3 md:mb-4">
            My <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">Experience</span>
          </h2>

          <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed px-2">
            A comprehensive timeline showcasing my professional journey, impactful contributions, and continuous growth in software development. Each experience has refined my technical expertise and strengthened my passion for building innovative solutions.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Desktop Animated Timeline */}
          <div className="hidden md:block relative py-8">
            {/* Vertical Progress Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 via-pink-400 to-orange-400 opacity-50"></div>
            
            <div className="space-y-16">
              {experiences.map((exp, index) => (
                <div
                  key={exp.id}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className={`relative transition-all duration-1000 ease-out ${
                    visibleCards.has(index)
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-24'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Alternating Layout */}
                  <div className={`flex items-start gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    {/* Icon Badge */}
                    <div className="flex-shrink-0 relative">
                      {/* Glow Effect */}
                      <div className={`absolute inset-0 w-20 h-20 rounded-2xl bg-gradient-to-br ${exp.color} opacity-30 blur-lg`}></div>
                      
                      {/* Icon Container */}
                      <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${exp.color} shadow-lg flex items-center justify-center text-white transform transition-all duration-700 ${
                        visibleCards.has(index) ? 'scale-100 rotate-0' : 'scale-0 rotate-90'
                      } hover:scale-110 hover:-rotate-6 cursor-pointer`}
                        style={{ transitionDelay: `${index * 150 + 100}ms` }}
                      >
                        <span className="text-3xl">{exp.icon}</span>
                      </div>
                      
                      {/* Connecting Line Dot */}
                      <div className={`absolute top-1/2 ${index % 2 === 0 ? 'right-0' : 'left-0'} transform ${index % 2 === 0 ? 'translate-x-1/2' : '-translate-x-1/2'} -translate-y-1/2 w-3 h-3 bg-purple-500 rounded-full border-2 border-white transition-all duration-500 shadow-md`}
                        style={{ transitionDelay: `${index * 150 + 300}ms` }}
                      ></div>
                    </div>

                    {/* Content Card */}
                    <div className={`flex-1 max-w-xl bg-white rounded-2xl border border-gray-200 hover:border-purple-300 shadow-md hover:shadow-xl transition-all duration-700 overflow-hidden group ${
                      visibleCards.has(index) ? 'translate-x-0' : index % 2 === 0 ? '-translate-x-16' : 'translate-x-16'
                    } hover:-translate-y-1`}
                      style={{ transitionDelay: `${index * 150 + 200}ms` }}
                    >
                      {/* Compact Header */}
                      <div className={`bg-gradient-to-r ${exp.color} p-5 text-white relative overflow-hidden`}>
                        {/* Shimmer */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        
                        <div className="relative z-10">
                          <div className="flex justify-between items-start mb-3">
                            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-xs font-bold">
                              {exp.type}
                            </span>
                            <div className="flex items-center gap-2 text-xs bg-white/15 px-3 py-1 rounded-lg backdrop-blur-sm">
                              <Calendar size={14} />
                              <span>{exp.duration}</span>
                            </div>
                          </div>
                          
                          <h3 className="text-2xl font-bold mb-1">{exp.title}</h3>
                          <p className="text-sm font-semibold opacity-90 mb-2">{exp.company}</p>
                          <div className="flex items-center gap-1.5 text-xs opacity-85">
                            <MapPin size={12} />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Compact Body */}
                      <div className="p-5">
                        <ul className="space-y-2.5 mb-5">
                          {exp.description.map((point, idx) => (
                            <li key={idx} className="flex gap-2.5 text-gray-700 text-sm group/item transition-all duration-300 hover:translate-x-1">
                              <CheckCircle2 size={16} className="text-purple-500 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                              <span className="leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Compact Skills */}
                        <div className="pt-4 border-t border-gray-200">
                          <div className="flex flex-wrap gap-2">
                            {exp.skills.map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1.5 bg-gray-50 text-gray-700 text-xs font-medium rounded-lg border border-gray-200 hover:border-purple-400 hover:bg-purple-50 hover:text-purple-700 transition-all duration-300 hover:scale-105 cursor-pointer"
                                style={{ 
                                  animation: visibleCards.has(index) ? `fadeInUp 0.4s ease-out ${idx * 40 + 500}ms both` : 'none'
                                }}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline (Vertical) */}
          <div className="md:hidden relative pl-7 sm:pl-10">
            <div className="absolute left-2.5 sm:left-3.5 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 via-pink-400 to-orange-400 shadow-lg"></div>

            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="relative mb-6 sm:mb-8 last:mb-0 group cursor-pointer touch-manipulation"
                onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                aria-expanded={expandedId === exp.id}
              >
                {/* Dot */}
                <div
                  className={`absolute -left-6.5 sm:-left-9 top-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${exp.color} shadow-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 min-h-[40px] min-w-[40px]`}
                >
                  <span className="text-base sm:text-lg">{exp.icon}</span>
                </div>

                {/* Card */}
                <div className="bg-white/90 backdrop-blur-md rounded-lg sm:rounded-xl border border-gray-200/80 hover:border-purple-300/80 shadow-md hover:shadow-lg transition-all duration-300 p-3 sm:p-4 md:p-6 group-hover:translate-y-[-2px]">
                  <span className={`inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold rounded-full bg-gradient-to-r ${exp.color} text-white mb-2 sm:mb-2.5`}>
                    {exp.type}
                  </span>

                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-0.5">{exp.title}</h3>
                  <p className="text-xs sm:text-sm text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-semibold mb-2 sm:mb-3">
                    {exp.company}
                  </p>

                  <div className="flex flex-col gap-1.5 sm:gap-2 mb-3 sm:mb-4 text-[10px] sm:text-xs text-gray-600">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Calendar size={14} className="text-purple-500 flex-shrink-0" />
                      <span className="font-medium">{exp.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <MapPin size={14} className="text-pink-500 flex-shrink-0" />
                      <span className="font-medium">{exp.location}</span>
                    </div>
                  </div>

                  {/* Expandable content */}
                  {expandedId === exp.id && (
                    <>
                      <ul className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                        {exp.description.map((point, idx) => (
                          <li key={idx} className="flex gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-700 leading-relaxed">
                            <CheckCircle2 size={14} className="text-purple-500 flex-shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-2 sm:pt-3 border-t border-gray-100">
                        <p className="text-[9px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5 sm:mb-2">Skills</p>
                        <div className="flex flex-wrap gap-1 sm:gap-1.5">
                          {exp.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-2 sm:px-2.5 py-0.5 bg-gray-100 text-gray-700 text-[9px] sm:text-xs font-medium rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex items-center gap-2 text-purple-600 font-semibold text-xs sm:text-sm mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100">
                    <span className="text-lg leading-none">{expandedId === exp.id ? '−' : '+'}</span>
                    <span>{expandedId === exp.id ? 'Show less' : 'Show more'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-14 text-center px-3">
          <div className="inline-flex flex-col items-center gap-3 sm:gap-4">
            <p className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg font-medium max-w-xl px-2">
              Excited to collaborate on innovative projects or discuss how my experience can contribute to your team's success?
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
              <a
                href="mailto:bassanagasurya@gmail.com"
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg md:rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 text-xs sm:text-sm md:text-base whitespace-nowrap group min-h-[44px]"
              >
                Let's Connect
                <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg md:rounded-xl border-2 border-purple-600 text-purple-600 font-semibold hover:bg-purple-50 transition-all duration-200 text-xs sm:text-sm md:text-base whitespace-nowrap min-h-[44px]"
              >
                Explore My Work
              </a>
            </div>
          </div>
          

        </div>
      </div>
    </section>
  );
};

export default Experience;