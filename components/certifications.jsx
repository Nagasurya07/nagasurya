'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Award, BookOpen, X, CheckCircle, Calendar, Shield, ExternalLink } from 'lucide-react';

const certifications = () => {
  const scrollContainerRef = useRef(null);
  const [selectedCert, setSelectedCert] = useState(null);
  const [hoveredCert, setHoveredCert] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const leaveTimeoutRef = useRef(null);
  const horizontalScrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Intersection Observer for animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
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
  }, []);

  // Infinite auto-scroll effect
  useEffect(() => {
    const scrollContainer = horizontalScrollRef.current;
    if (!scrollContainer) return;

    let animationId;
    const scrollSpeed = 1; // pixels per frame

    const autoScroll = () => {
      if (!isPaused && scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeed;

        // Reset to beginning when we've scrolled past half
        // (since we duplicate the items, we reset at halfway point)
        const maxScroll = scrollContainer.scrollWidth / 2;
        if (scrollContainer.scrollLeft >= maxScroll) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPaused]);

  // Smooth hover handlers
  const handleCardHover = (cert) => {
    clearTimeout(leaveTimeoutRef.current);
    setIsPaused(true); // Pause auto-scroll on hover
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredCert(cert);
    }, 300); // Small delay before showing preview
  };

  const handleCardLeave = () => {
    clearTimeout(hoverTimeoutRef.current);
    setIsPaused(false); // Resume auto-scroll
    leaveTimeoutRef.current = setTimeout(() => {
      setHoveredCert(null);
    }, 200);
  };

  const certs = [
    {
      id: 1,
      title: 'Zscaler Zero Trust Associate (ZTCA) Certification',
      issuer: 'Zscaler',
      date: '2025',
      icon: '🛡️',
      color: 'from-blue-500 to-cyan-500',
      verificationCode: 'ZTCA',
      description: 'Achieved professional certification demonstrating comprehensive knowledge of Zero Trust security architecture and Zscaler cloud security platform. Validated expertise in implementing secure access controls, protecting applications, and securing user connectivity across distributed environments using industry-leading security frameworks.',
      issued: '22 May 2025',
      json: 'https://drive.google.com/file/d/1U0e66fZGAZzZp4WYC3Sev9SERtXeo1vA/view?usp=sharing',
      image: '/certifications/zscaler.png',
      category: 'Security'
    },
    {
      id: 2,
      title: 'Salesforce Developer Virtual Internship',
      issuer: 'Salesforce',
      date: '2023',
      icon: '☁️',
      color: 'from-sky-500 to-blue-600',
      verificationCode: 'SISFVIPAD2023',
      description: 'Completed intensive virtual internship program gaining hands-on experience with Salesforce development platform, including Apex programming, Lightning Web Components, SOQL queries, and declarative automation tools. Developed proficiency in building scalable CRM solutions and customizing Salesforce applications for business process optimization.',
      issued: 'December 12, 2023',
      json:'https://drive.google.com/file/d/16PCZuyxbfLsMyPfFrS9MraabdeJLQDfq/view?usp=sharing',
      image: '/certifications/salesforce.png',
      category: 'Cloud Development'
    },
    {
      id: 3,
      title: 'AWS Certified AI Practitioner',
      issuer: 'AWS',
      date: '2025',
      icon: '🤖',
      color: 'from-orange-500 to-red-500',
      verificationCode: 'b644f1bdbec34f10b671fc13403cefa8',
      description: 'Earned AWS certification validating foundational knowledge in artificial intelligence, machine learning services, and responsible AI practices. Demonstrated proficiency in Amazon SageMaker, AWS AI services, understanding ML workflows, model deployment strategies, and implementing AI solutions aligned with business objectives and ethical guidelines.',
      issued: 'July 15, 2025',
      json: 'https://drive.google.com/file/d/1ufptIa9Cgjg3CrIsrl5zOfv0QQU76-NA/view?usp=sharing',
      image: '/certifications/aws_ai.png',
      category: 'AI & ML'
    },
    {
      id: 4,
      title: 'ServiceNow Virtual Internship',
      issuer: 'Smartbridge',
      date: '2025',
      icon: '⚙️',
      color: 'from-green-500 to-emerald-600',
      verificationCode: 'csds-1',
      description: 'Successfully completed comprehensive ServiceNow development internship program through Smartbridge, acquiring practical experience in IT Service Management (ITSM), workflow automation, and ServiceNow platform customization. Gained expertise in creating custom applications, implementing business rules, and developing client/server scripts for enterprise solutions.',
      issued: 'September 1, 2025',
      json:'https://drive.google.com/file/d/1KrXMxOniDrNunbOxc0JgBUaTyoHMbuOl/view?usp=sharing',
      image: '/certifications/servicenow.png',
      category: 'Platform Development'
    },
    {
      id: 5,
      title: 'Web Development Basics',
      issuer: 'IBM SkillsBuild',
      date: '2025',
      icon: '🌐',
      color: 'from-purple-500 to-pink-500',
      verificationCode: 'MDL-261',
      description: 'Completed IBM SkillsBuild professional certification program mastering fundamental web development concepts including HTML5, CSS3, JavaScript ES6+, responsive design principles, and modern web standards. Developed practical skills in creating accessible, mobile-friendly websites and implementing best practices for web performance and user experience optimization.',
      issued: 'September 1, 2025',
      json:'https://drive.google.com/file/d/1JpMZYF7ruLVvbE2kF8LvgVx-KeeAdrN7/view?usp=sharing',
      image: '/certifications/web_ibm.png',
      category: 'Web Development'
    },
    {
      id: 6,
      title: 'Java Programming Fundamentals',
      issuer: 'Edx',
      date:'2024',
      icon: '☕',
      color: 'from-red-500 to-orange-500',
      verificationCode: 'Progra001',
      description: 'Successfully completed comprehensive Java programming certification through edX, mastering core object-oriented programming concepts, data structures, algorithms, exception handling, and Java Collections Framework. Developed strong foundation in writing efficient, maintainable code and implementing design patterns for scalable software development.',
      issued: 'June 1, 2024',
      json:'https://drive.google.com/file/d/1h2GsGR_Ja-SZb_f7v8HNeGktoMnLAVtd/view?usp=sharing',
      image: '/certifications/edx_java.png',
      category: 'Programming'
    },
    {
      id: 7,
      title:'Data Analytics Job Simulation',
      issuer:'Deloitte',
      date:'2025',
      icon:'📊',
      color: 'from-indigo-500 to-purple-600',
      verificationCode: 'DataAna001',
      description: 'Completed Deloitte\'s rigorous data analytics job simulation program, gaining real-world experience in data analysis methodologies, statistical modeling, data visualization using industry-standard tools, and deriving actionable business insights. Applied analytical frameworks to solve complex business problems and communicate findings through compelling data storytelling.',
      issued: 'July 1, 2025',
      json:'https://drive.google.com/file/d/1OwjCboOzMsNZWelBcAhQU3q-gfRn9X2i/view?usp=sharing',
      image: '/certifications/deloitte.png',
      category: 'Data Analytics'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="certifications" 
      className="px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12 scroll-mt-20 bg-gradient-to-b from-white via-purple-50/30 to-white relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Container */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className={`mb-8 sm:mb-10 md:mb-12 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-2 bg-purple-100 rounded-full">
            <Shield className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-semibold text-purple-700 uppercase tracking-wider">Credentials</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-3">
            My <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">Certifications</span>
          </h2>
          
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Industry-recognized professional certifications demonstrating verified expertise across cloud computing, cybersecurity, software development, and emerging technologies
          </p>
          
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600">{certs.length}+</div>
              <div className="text-xs sm:text-sm text-gray-600">Certifications</div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600">7</div>
              <div className="text-xs sm:text-sm text-gray-600">Categories</div>
            </div>
          </div>
        </div>

        {/* Horizontal Scrolling Container */}
        <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div 
            ref={horizontalScrollRef}
            className="overflow-x-hidden pb-6 scrollbar-hide"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="flex gap-4 sm:gap-5 md:gap-6 px-2">
              {/* First set of certificates */}
              {certs.map((cert, index) => (
                <div
                  key={`cert-1-${cert.id}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onMouseEnter={() => handleCardHover(cert)}
                  onMouseLeave={handleCardLeave}
                  className={`cursor-target group relative bg-white rounded-2xl border-2 border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer flex-shrink-0 w-[320px] sm:w-[360px] md:w-[380px] ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                  onClick={() => setSelectedCert(cert)}
                >
                  {/* Gradient border on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm`}></div>
                  
                  {/* Card content */}
                  <div className="relative bg-white m-[2px] rounded-2xl p-5 sm:p-6">
                    {/* Icon and Category */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center text-2xl sm:text-3xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                        {cert.icon}
                      </div>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                        {cert.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3rem] group-hover:text-purple-600 transition-colors">
                      {cert.title}
                    </h3>

                    {/* Issuer */}
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="w-4 h-4 text-gray-400" />
                      <p className="text-sm text-gray-600 font-medium">{cert.issuer}</p>
                    </div>

                    {/* Category tag */}
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {cert.category}
                      </span>
                    </div>

                    {/* Verification badge */}
                    <div className="flex items-center gap-2 mb-4 p-2 bg-green-50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-xs text-green-700 font-medium">Verified Credential</span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCert(cert);
                        }}
                        className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium text-sm transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <span>Details</span>
                      </button>
                      <a
                        href={cert.json}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className={`flex-1 px-4 py-2.5 bg-gradient-to-r ${cert.color} text-white rounded-lg font-medium text-sm hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2`}
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>View</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Duplicate set for infinite scroll */}
              {certs.map((cert, index) => (
                <div
                  key={cert.id}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onMouseEnter={() => handleCardHover(cert)}
                  onMouseLeave={handleCardLeave}
                  className={`cursor-target group relative bg-white rounded-2xl border-2 border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer flex-shrink-0 w-[320px] sm:w-[360px] md:w-[380px] ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                  onClick={() => setSelectedCert(cert)}
                >
              {/* Gradient border on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm`}></div>
              
              {/* Card content */}
              <div className="relative bg-white m-[2px] rounded-2xl p-5 sm:p-6">
                {/* Icon and Category */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center text-2xl sm:text-3xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                    {cert.icon}
                  </div>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                    {cert.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3rem] group-hover:text-purple-600 transition-colors">
                  {cert.title}
                </h3>

                {/* Issuer */}
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-4 h-4 text-gray-400" />
                  <p className="text-sm text-gray-600 font-medium">{cert.issuer}</p>
                </div>

                {/* Category tag */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {cert.category}
                  </span>
                </div>

                {/* Verification badge */}
                <div className="flex items-center gap-2 mb-4 p-2 bg-green-50 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-xs text-green-700 font-medium">Verified Credential</span>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCert(cert);
                    }}
                    className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium text-sm transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <span>Details</span>
                  </button>
                  <a
                    href={cert.json}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={`flex-1 px-4 py-2.5 bg-gradient-to-r ${cert.color} text-white rounded-lg font-medium text-sm hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2`}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>View</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
            </div>
            
            {/* Scroll Gradient Indicators */}
            <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
            <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
          </div>
          
          {/* Scroll Hint */}
          <div className="text-center mt-4 text-sm text-gray-500 flex items-center justify-center gap-2">
            <span className="animate-pulse">∞</span>
            <span>Hover to pause • Auto-scrolling infinitely</span>
            <span className="animate-pulse">∞</span>
          </div>
        </div>

        {/* Hover Preview Overlay */}
        {hoveredCert && (
          <div 
            className="fixed inset-0 z-40 pointer-events-none"
            onMouseEnter={() => clearTimeout(leaveTimeoutRef.current)}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"></div>
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div 
                className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden animate-in zoom-in-95 duration-300 pointer-events-auto"
                onMouseLeave={handleCardLeave}
              >
                {/* Preview Header */}
                <div className={`bg-gradient-to-r ${hoveredCert.color} p-4 text-white`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl">
                      {hoveredCert.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{hoveredCert.title}</h3>
                      <p className="text-sm text-white/90">{hoveredCert.issuer}</p>
                    </div>
                  </div>
                </div>

                {/* Certificate Preview */}
                <div className="p-6 bg-gray-50">
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                    {hoveredCert.image ? (
                      // Use regular img tag for local images for better compatibility
                      <div className="relative w-full h-[70vh] flex items-center justify-center bg-gray-50 p-4">
                        <img
                          src={hoveredCert.image}
                          alt={`${hoveredCert.title} certificate`}
                          className="max-w-full max-h-full w-auto h-auto object-contain"
                          onError={(e) => {
                            console.error('Image failed to load:', hoveredCert.image);
                            // Fallback to iframe if image fails
                            e.target.style.display = 'none';
                            e.target.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <iframe
                          src={hoveredCert.json}
                          className="w-full h-[70vh] hidden"
                          title={`Certificate preview for ${hoveredCert.title}`}
                          style={{ border: 'none' }}
                        />
                      </div>
                    ) : (
                      // Fallback to iframe for Google Drive links
                      <iframe
                        src={hoveredCert.json}
                        className="w-full h-[70vh]"
                        title={`Certificate preview for ${hoveredCert.title}`}
                        style={{ border: 'none' }}
                      />
                    )}
                  </div>
                  <div className="mt-4 flex gap-3 justify-center">
                    <button
                      onClick={() => setSelectedCert(hoveredCert)}
                      className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
                    >
                      View Details
                    </button>
                    <a
                      href={hoveredCert.json}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-6 py-2.5 bg-gradient-to-r ${hoveredCert.color} text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2`}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open Certificate
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-10 sm:mt-12 text-center">
          <p className="text-sm sm:text-base text-gray-600 mb-4">
            Want to verify these credentials? Each certification includes a verification code.
          </p>
          <div className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700 transition cursor-pointer">
            <span>View All Credentials</span>
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>

        {/* Enhanced Modal */}
        {selectedCert && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setSelectedCert(null)}
          >
            <div 
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header with Gradient */}
              <div className={`relative bg-gradient-to-br ${selectedCert.color} p-6 sm:p-8 text-white`}>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-lg">
                    {selectedCert.icon}
                  </div>
                  <div className="flex-1">
                    <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold mb-3">
                      {selectedCert.category}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">
                      {selectedCert.title}
                    </h3>
                    <p className="text-white/90 text-sm flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      {selectedCert.issuer}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[calc(90vh-280px)]">
                {/* Verification Badge */}
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-green-900 text-sm">Verified Credential</p>
                      <p className="text-xs text-green-700">Authenticated by {selectedCert.issuer}</p>
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase tracking-wider">Issue Date</span>
                    </div>
                    <p className="text-base font-semibold text-gray-900">{selectedCert.issued}</p>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      <Shield className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase tracking-wider">Issuing Authority</span>
                    </div>
                    <p className="text-base font-semibold text-gray-900">{selectedCert.issuer}</p>
                  </div>

                  <div className="col-span-2">
                    <div className="text-gray-500 mb-2 text-xs font-medium uppercase tracking-wider">Verification Code</div>
                    <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg">
                      <code className="flex-1 text-sm font-mono text-gray-900 break-all">{selectedCert.verificationCode}</code>
                      <button 
                        onClick={() => navigator.clipboard.writeText(selectedCert.verificationCode)}
                        className="px-3 py-1 bg-white rounded text-xs font-medium text-gray-700 hover:bg-gray-50 transition flex-shrink-0"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">About This Certification</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{selectedCert.description}</p>
                </div>

                {/* View Certificate Button */}
                <a
                  href={selectedCert.json}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 w-full py-3 px-6 bg-gradient-to-r ${selectedCert.color} text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200`}
                >
                  <BookOpen className="w-5 h-5" />
                  <span>View Full Certificate</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Modal Footer */}
              <div className="px-6 sm:px-8 py-4 bg-gray-50 border-t border-gray-200">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="w-full py-3 px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default certifications;