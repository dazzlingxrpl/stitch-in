import React, { useRef, useEffect, useState, FormEvent, useId } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Footer from '../components/Footer';
import CoverImageCard from '../components/CoverImageCard';
import GalleryLightbox from '../components/GalleryLightbox';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

/** Gallery tiles: existing portfolio images + new set (2.png–8.png) */
const GALLERY_ITEMS = [
  { src: '/images/gallery3.png', alt: 'Urban planning', title: 'Urban Planning', caption: 'Sustainable communities' },
  { src: '/images/3.png', alt: 'Modern kitchen interior', title: 'Kitchen', caption: 'Refined interiors' },
  { src: '/images/6.png', alt: 'Residential home at dusk', title: 'Evening facade', caption: 'Warm welcome' },
  { src: '/images/service2.png', alt: 'Modern architecture exterior', title: 'Modern Architecture', caption: 'Contemporary design' },
  { src: '/images/gallery2.png', alt: 'Interior design', title: 'Interior Design', caption: 'Elegant spaces' },
  { src: '/images/gallery4.png', alt: 'Residential design', title: 'Residential Design', caption: 'Dream homes' },
  { src: '/images/2.png', alt: 'Contemporary residential exterior', title: 'Contemporary Residence', caption: 'Materials & light' },
  { src: '/images/4.png', alt: 'Bathroom interior', title: 'Bathroom', caption: 'Minimal detail' },
  { src: '/images/5.png', alt: 'Modern townhouse exterior', title: 'Facade', caption: 'Clean lines' },
  { src: '/images/7.png', alt: 'Living room interior', title: 'Living space', caption: 'Indoor–outdoor' },
  { src: '/images/8.png', alt: 'Modern home at twilight', title: 'Twilight exterior', caption: 'Wood & render' },
] as const;

/** First N items use the arched “featured” frame; remaining items are square with rounded corners */
const GALLERY_FEATURED_COUNT = 3;

/** Case studies — desktop uses overlay cards; mobile uses tap-to-open modal (below `lg`) */
const CASE_STUDIES = [
  {
    title: 'One-Stop Border Post',
    location: 'Ukraine',
    type: 'Project',
    year: '2018',
    description:
      'Bilateral Customs and Border Crossing Facility designed to streamline movement, ensure security and support efficient operations for vehicles, pedestrians and staff.',
    image: '/images/projects1.png',
    imageAlt: 'Coastal Villa Project',
  },
  {
    title: 'Residential Development',
    location: 'Ukraine',
    type: 'Residential',
    year: '2022',
    description:
      'A five-storey residential development with commercial spaces on the ground floor, designed to support vibrant street life and efficient urban living',
    image: '/images/projects2.png',
    imageAlt: 'Modern Residence Project',
  },
  {
    title: 'Family dwelling',
    location: 'Ukraine',
    type: 'Residential',
    year: '2025',
    description:
      'A thoughtfully designed detached house combining functional layouts, natural light and elegant detailing to support comfortable everyday living',
    image: '/images/work_images/house3.jpg',
    imageAlt: 'Urban Loft Project',
  },
] as const;

/** Must match gallery card `aspect-[3/4.5]` → height/width = 4.5/3 (shorter body under arch than 3/5) */
const GALLERY_ASPECT_H_OVER_W = 4.5 / 3;
/**
 * objectBoundingBox Y where semicircle meets the sides: (true radius W/2 in px) / H.
 * Fixes “arch too tall” — a circle in 0–1 coords was stretched into an ellipse; ry must track aspect.
 */
const GALLERY_ARCH_CHORD_Y = 0.5 / GALLERY_ASPECT_H_OVER_W;

interface HomePageProps {
  darkMode: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ darkMode }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [isHeroVideoReady, setIsHeroVideoReady] = useState(false);
  const [galleryLightboxIndex, setGalleryLightboxIndex] = useState<number | null>(null);
  /** Mobile / tablet: case study detail modal (`lg` and up use overlay cards only) */
  const [caseStudyModalIndex, setCaseStudyModalIndex] = useState<number | null>(null);

  useEffect(() => {
    if (caseStudyModalIndex === null) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCaseStudyModalIndex(null);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [caseStudyModalIndex]);
  /** Stable id for SVG clipPath (arched gallery frames) */
  const galleryArchClipId = `gallery-arch-${useId().replace(/:/g, '')}`;
  
  const heroSectionRef = useRef<HTMLElement>(null);
  const aboutSectionRef = useRef<HTMLElement>(null);
  const aboutHeadingRef = useRef<HTMLHeadingElement>(null);
  const aboutText1Ref = useRef<HTMLParagraphElement>(null);
  const aboutText2Ref = useRef<HTMLParagraphElement>(null);

  // Services section (OUR SERVICES)
  const servicesSectionRef = useRef<HTMLElement>(null);
  const servicesHeadingRef = useRef<HTMLHeadingElement>(null);
  const servicesIntroRef = useRef<HTMLParagraphElement>(null);
  const servicesIndividualsCardRef = useRef<HTMLAnchorElement>(null);
  const servicesBusinessesCardRef = useRef<HTMLAnchorElement>(null);

  // Projects section refs
  const projectsSectionRef = useRef<HTMLElement>(null);
  const projectsHeadingRef = useRef<HTMLHeadingElement>(null);
  const project1Ref = useRef<HTMLDivElement>(null);
  const project1ImageRef = useRef<HTMLImageElement>(null);
  const project1CardRef = useRef<HTMLDivElement>(null);
  const project2Ref = useRef<HTMLDivElement>(null);
  const project2ImageRef = useRef<HTMLImageElement>(null);
  const project2CardRef = useRef<HTMLDivElement>(null);
  const project3Ref = useRef<HTMLDivElement>(null);
  const project3ImageRef = useRef<HTMLImageElement>(null);
  const project3CardRef = useRef<HTMLDivElement>(null);

  // Gallery section refs
  const gallerySectionRef = useRef<HTMLElement>(null);
  const galleryTitleRef = useRef<HTMLHeadingElement>(null);
  const galleryItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Partners section refs
  const partnersSectionRef = useRef<HTMLElement>(null);

  // Testimonials section refs
  const testimonialsSectionRef = useRef<HTMLElement>(null);
  const testimonialsTitleRef = useRef<HTMLHeadingElement>(null);
  const quoteTextRef = useRef<HTMLQuoteElement>(null);
  const authorRef = useRef<HTMLParagraphElement>(null);

  // CTA section refs
  const ctaSectionRef = useRef<HTMLElement>(null);
  const ctaTitleRef = useRef<HTMLHeadingElement>(null);
  const ctaSubtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);
  const ctaImageRef = useRef<HTMLDivElement>(null);

  // Handle hash navigation on page load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Wait for page to fully load, then scroll to the section
      const scrollToHash = () => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };
      
      // Try multiple times to ensure the element is loaded
      setTimeout(scrollToHash, 100);
      setTimeout(scrollToHash, 300);
      setTimeout(scrollToHash, 500);
    }
  }, []);

  // No animation effect for the logo - static display
  useEffect(() => {
    // Nothing needed here for static logo display
  }, [darkMode]);

  // Preload the hero video so playback starts faster on first visit.
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'video';
    link.href = '/images/stitch_in_video.mp4';
    link.type = 'video/mp4';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // About section animations
  useEffect(() => {
    const setupAboutAnimations = () => {
      if (aboutSectionRef.current && aboutHeadingRef.current && aboutText1Ref.current && aboutText2Ref.current) {
        // Check if mobile device
        const isMobile = window.innerWidth < 768;
        
        // Set initial state - visible on mobile, hidden on desktop
        const aboutElements = [aboutHeadingRef.current, aboutText1Ref.current, aboutText2Ref.current].filter(Boolean);
        if (aboutElements.length > 0) {
          gsap.set(aboutElements, {
            opacity: isMobile ? 1 : 0,
            y: isMobile ? 0 : 50
          });
        }

        // Create a simple scroll-triggered animation (only on desktop)
        if (!isMobile && aboutSectionRef.current && aboutHeadingRef.current && aboutText1Ref.current && aboutText2Ref.current) {
          ScrollTrigger.create({
            trigger: aboutSectionRef.current,
            start: "top 80%",
            once: true,
            onEnter: () => {
              const elements = [aboutHeadingRef.current, aboutText1Ref.current, aboutText2Ref.current].filter(Boolean);
              if (elements.length > 0) {
                gsap.fromTo(elements, 
                  {
                    opacity: 0,
                    y: 50
                  },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    stagger: 0.2
                  }
                );
              }
            }
          });
        }
      }
    };

    const timer = setTimeout(setupAboutAnimations, 100);

    // Add resize listener for responsive behavior
    const handleResize = () => {
      setupAboutAnimations();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Services section (OUR SERVICES) — heading, intro, then two cards with stagger
  useEffect(() => {
    let servicesScrollTrigger: ScrollTrigger | null = null;

    const setupServicesAnimations = () => {
      if (!servicesSectionRef.current || !servicesHeadingRef.current) return;

      if (servicesScrollTrigger) {
        servicesScrollTrigger.kill();
        servicesScrollTrigger = null;
      }

      const isMobile = window.innerWidth < 768;
      const heading = servicesHeadingRef.current;
      const intro = servicesIntroRef.current;
      const cardIndividuals = servicesIndividualsCardRef.current;
      const cardBusinesses = servicesBusinessesCardRef.current;

      const headerEls = [heading, intro].filter(Boolean) as HTMLElement[];
      const cardEls = [cardIndividuals, cardBusinesses].filter(Boolean) as HTMLElement[];

      if (headerEls.length > 0) {
        gsap.set(headerEls, {
          opacity: isMobile ? 1 : 0,
          y: isMobile ? 0 : 36,
        });
      }
      if (cardEls.length > 0) {
        gsap.set(cardEls, {
          opacity: isMobile ? 1 : 0,
          y: isMobile ? 0 : 48,
        });
      }

      if (isMobile) return;

      servicesScrollTrigger = ScrollTrigger.create({
        trigger: servicesSectionRef.current,
        start: 'top 82%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            headerEls,
            { opacity: 0, y: 36 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              ease: 'power2.out',
              stagger: 0.12,
            }
          );
          gsap.fromTo(
            cardEls,
            { opacity: 0, y: 48 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: 'power3.out',
              stagger: 0.2,
              delay: 0.12,
            }
          );
        },
      });
    };

    const timer = setTimeout(setupServicesAnimations, 100);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      servicesScrollTrigger?.kill();
    };
  }, []);

  // Projects section animations
  useEffect(() => {
    const setupProjectsAnimations = () => {
      if (projectsSectionRef.current && projectsHeadingRef.current) {
        // Check if mobile device
        const isMobile = window.innerWidth < 768;
        
        // Set initial state for heading
        gsap.set(projectsHeadingRef.current, {
          opacity: isMobile ? 1 : 0,
          y: isMobile ? 0 : 50
        });

        // Set initial state for all project images and cards
        const projectImages = [
          project1ImageRef.current, project2ImageRef.current, project3ImageRef.current
        ].filter(Boolean);

        const projectCards = [
          project1CardRef.current, project2CardRef.current, project3CardRef.current
        ].filter(Boolean);

        // Set initial state for images - start with clipPath hiding them (only on desktop)
        if (!isMobile) {
          gsap.set(project1ImageRef.current, {
            clipPath: "inset(0 100% 0 0)" // Project 1: hidden from right (swipe right to left)
          });
          
          gsap.set(project2ImageRef.current, {
            clipPath: "inset(0 0 0 100%)" // Project 2: hidden from left (swipe left to right)
          });
          
          gsap.set(project3ImageRef.current, {
            clipPath: "inset(0 100% 0 0)" // Project 3: hidden from right (swipe right to left)
          });
        } else {
          // On mobile, images are visible immediately
          const projectImages = [project1ImageRef.current, project2ImageRef.current, project3ImageRef.current].filter(Boolean);
          if (projectImages.length > 0) {
            gsap.set(projectImages, {
              clipPath: "inset(0 0 0 0)"
            });
          }
        }

        // Set initial state for cards - visible on mobile, hidden on desktop
        gsap.set(projectCards, {
          opacity: isMobile ? 1 : 0,
          y: isMobile ? 0 : 30,
          scale: isMobile ? 1 : 0.95
        });

        // Create scroll-triggered animation for projects heading (only on desktop)
        if (!isMobile && projectsSectionRef.current && projectsHeadingRef.current) {
          ScrollTrigger.create({
            trigger: projectsSectionRef.current,
            start: "top 80%",
            once: true,
            onEnter: () => {
              // Animate heading first
              gsap.to(projectsHeadingRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out"
              });
            }
          });
        }

        // Individual ScrollTrigger for Project 1 - Coastal Villa (only on desktop)
        if (!isMobile && project1Ref.current && project1ImageRef.current && project1CardRef.current) {
          ScrollTrigger.create({
          trigger: project1Ref.current,
          start: "top 85%",
          once: true,
          onEnter: () => {
            // Project 1 - swipe reveal from right to left
            gsap.to(project1ImageRef.current, {
              clipPath: "inset(0 0% 0 0)", // Reveal the image completely
              duration: 1.2,
              ease: "power2.out"
            });
            gsap.to(project1CardRef.current, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "back.out(1.7)"
            });
          }
        });
        }

        // Individual ScrollTrigger for Project 2 - Modern Residence (desktop only)
        if (!isMobile && project2Ref.current && project2ImageRef.current && project2CardRef.current) {
          ScrollTrigger.create({
            trigger: project2Ref.current,
            start: "top 85%",
            once: true,
            onEnter: () => {
              // Project 2 - swipe reveal from left to right
              gsap.to(project2ImageRef.current, {
                clipPath: "inset(0 0 0 0%)", // Reveal from left to right
                duration: 1.2,
                ease: "power2.out"
              });
              gsap.to(project2CardRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "back.out(1.7)"
              });
            }
          });
        }

        // Individual ScrollTrigger for Project 3 - Urban Loft (desktop only)
        if (!isMobile && project3Ref.current && project3ImageRef.current && project3CardRef.current) {
          ScrollTrigger.create({
            trigger: project3Ref.current,
            start: "top 85%",
            once: true,
            onEnter: () => {
              // Project 3 - swipe reveal from right to left
              gsap.to(project3ImageRef.current, {
                clipPath: "inset(0 0% 0 0)",
                duration: 1.2,
                ease: "power2.out"
              });
              gsap.to(project3CardRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "back.out(1.7)"
              });
            }
          });
        }
      }
    };

    const timer = setTimeout(setupProjectsAnimations, 100);

    // Add resize listener for responsive behavior
    const handleResize = () => {
      setupProjectsAnimations();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Gallery section animations
  useEffect(() => {
    const timer = setTimeout(() => {
      if (gallerySectionRef.current && galleryTitleRef.current) {
        // Set initial state for title
        gsap.set(galleryTitleRef.current, {
          opacity: 0,
          y: 50
        });

        // Set initial state for all gallery images
        const galleryImages = galleryItemRefs.current.filter(Boolean) as HTMLDivElement[];

        gsap.set(galleryImages, {
          opacity: 0,
          y: 28,
        });

        // Create scroll-triggered animation for gallery
        if (gallerySectionRef.current && galleryTitleRef.current) {
          ScrollTrigger.create({
            trigger: gallerySectionRef.current,
            start: "top 80%",
            once: true,
            onEnter: () => {
              gsap.to(galleryTitleRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.55,
                ease: "power2.out"
              });

            const toAnimate = galleryItemRefs.current.filter(Boolean) as HTMLDivElement[];

            // Standard gallery reveal: fade + slight lift-in (no scale bounce)
            gsap.to(toAnimate, {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: "power2.out",
              stagger: {
                each: 0.08,
                from: "start",
              },
            });
          }
        });
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Testimonials section animations
  useEffect(() => {
    const setupTestimonialsAnimations = () => {
      const isMobile = window.innerWidth < 768;
      
      if (testimonialsSectionRef.current && quoteTextRef.current) {
        // Set initial state conditionally for mobile
        const testimonialsElements = [testimonialsTitleRef.current, authorRef.current].filter(Boolean);
        if (testimonialsElements.length > 0) {
          gsap.set(testimonialsElements, {
            opacity: isMobile ? 1 : 0,
            y: isMobile ? 0 : 50,
            scale: isMobile ? 1 : 0.9
          });
        }
        
        gsap.set(quoteTextRef.current, {
          opacity: isMobile ? 1 : 0
        });

        let split: any = null;
        
        // Only use SplitText on desktop
        if (!isMobile) {
          // Split the text into words using SplitText
          split = new SplitText(quoteTextRef.current, {
            type: "words",
            wordsClass: "word"
          });

          // Set initial state for split words
          gsap.set(split.words, {
            opacity: 0,
            y: 30
          });
        }

        // Only create scroll-triggered animation on desktop
        if (!isMobile && testimonialsSectionRef.current && testimonialsTitleRef.current && authorRef.current && quoteTextRef.current) {
          ScrollTrigger.create({
            trigger: testimonialsSectionRef.current,
            start: "top 80%",
            once: true,
            onEnter: () => {
              // Animate title with bounce effect
              gsap.to(testimonialsTitleRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.2,
                ease: "back.out(1.7)"
              });

              // Animate author with delay
              gsap.to(authorRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: "power2.out",
                delay: 0.5
              });

              // Show the quote container
              gsap.to(quoteTextRef.current, {
                opacity: 1,
                duration: 0.5,
                delay: 0.8
              });

              // Animate words with stagger
              if (split && split.words) {
                gsap.to(split.words, {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  stagger: 0.1,
                  delay: 1.2,
                  ease: "power2.out"
                });
              }
            }
          });
        }

        // Cleanup function
        return () => {
          if (split) {
            split.revert();
          }
        };
      }
    };

    const timer = setTimeout(setupTestimonialsAnimations, 100);

    // Handle resize
    const handleResize = () => {
      setupTestimonialsAnimations();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // CTA section animations
  useEffect(() => {
    const setupCTAAnimations = () => {
      const isMobile = window.innerWidth < 768;
      
      if (ctaSectionRef.current && ctaTitleRef.current) {
        // Set initial state conditionally for mobile
        const ctaElements = [ctaTitleRef.current, ctaButtonRef.current].filter(Boolean);
        if (ctaElements.length > 0) {
          gsap.set(ctaElements, {
            opacity: isMobile ? 1 : 0,
            y: isMobile ? 0 : 50
          });
        }
        
        gsap.set(ctaImageRef.current, {
          opacity: isMobile ? 1 : 0,
          scale: isMobile ? 1 : 0.8,
          y: isMobile ? 0 : 100
        });

        // Only create scroll-triggered animation on desktop
        if (!isMobile && ctaSectionRef.current && ctaTitleRef.current && ctaButtonRef.current && ctaImageRef.current) {
          ScrollTrigger.create({
            trigger: ctaSectionRef.current,
            start: "top 80%",
            once: true,
            onEnter: () => {
              // Animate text elements
              const textElements = [ctaTitleRef.current, ctaButtonRef.current].filter(Boolean);
              if (textElements.length > 0) {
                gsap.to(textElements, {
                  opacity: 1,
                  y: 0,
                  duration: 1,
                  ease: "power2.out",
                  stagger: 0.2
                });
              }

              // Animate image with delay
              if (ctaImageRef.current) {
                gsap.to(ctaImageRef.current, {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  duration: 1.2,
                  delay: 0.5,
                  ease: "back.out(1.7)"
                });
              }
            }
          });
        }
      }
    };

    const timer = setTimeout(setupCTAAnimations, 100);

    // Handle resize
    const handleResize = () => {
      setupCTAAnimations();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .gallery-images {
            position: relative;
          }
          .gallery-arch-shell {
            -webkit-clip-path: url(#${galleryArchClipId});
            clip-path: url(#${galleryArchClipId});
          }
        `
      }} />
      {/* True semicircle in *pixel* space: elliptical arcs in bbox (rx=½, ry=chordY) so stretch yields a circle */}
      <svg width={0} height={0} className="pointer-events-none fixed left-0 top-0" aria-hidden>
        <defs>
          <clipPath id={galleryArchClipId} clipPathUnits="objectBoundingBox">
            <path
              d={`M 0,1 L 0,${GALLERY_ARCH_CHORD_Y} A 0.5 ${GALLERY_ARCH_CHORD_Y} 0 0 1 0.5,0 A 0.5 ${GALLERY_ARCH_CHORD_Y} 0 0 1 1,${GALLERY_ARCH_CHORD_Y} L 1,1 Z`}
            />
          </clipPath>
        </defs>
      </svg>
      <div className="overflow-x-hidden">
      {/* Hero — rounded frame matches Individuals / Businesses hero */}
      <div className="px-4 pt-4 sm:px-6 lg:px-8">
      <section
        ref={heroSectionRef}
        className="relative z-10 flex h-[calc(100vh-2rem)] items-center overflow-hidden rounded-3xl sm:h-[calc(100vh-2.5rem)]"
      >
        {/* Hero video background for all screen sizes */}
        <div className="absolute inset-0 z-0 overflow-hidden !rounded-3xl">
          <video
            className={`h-full w-full object-cover !rounded-3xl transition-opacity duration-500 ${isHeroVideoReady ? 'opacity-100' : 'opacity-0'}`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={() => setIsHeroVideoReady(true)}
            onCanPlay={() => setIsHeroVideoReady(true)}
            aria-label="Stitch In hero video background"
          >
            <source src="/images/stitch_in_video.mp4" type="video/mp4" />
          </video>

          {!isHeroVideoReady && (
            <div className="absolute inset-0 bg-gradient-to-br from-midnight via-gray-800 to-black animate-pulse"></div>
          )}
        </div>
        
        {/* Dark overlay to ensure logo visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-30 z-0"></div>
        
        {/* Hero content — tagline center/right; logo bottom-left (aligned with nav column) */}
        <div className="relative z-10 h-full">
          <div className="mx-auto flex h-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
            <div className="flex min-h-0 flex-1 flex-col items-center justify-center sm:items-end">
              <div className="w-full text-center sm:max-w-lg sm:text-right">
                {/* Mobile / tablet: subtitle */}
                <div className="lg:hidden">
                  <h1 className="mb-4 text-2xl font-light text-white sm:text-3xl">
                    Architecture & Design
                  </h1>
                  <p className="mx-auto max-w-md text-base text-white sm:ml-auto sm:mr-0 sm:text-lg">
                    Creating spaces that inspire, connect, and transform lives through innovative design.
                  </p>
                </div>
              </div>
            </div>

            {/* Flush with main content column (max-w-7xl horizontal padding only — no extra indent) */}
            <div className="shrink-0 self-start pb-6 sm:pb-8">
              <img
                src="/images/main_logo_white.png"
                alt="Stitch In Logo"
                className="h-24 w-auto drop-shadow-lg sm:h-28 lg:h-32"
              />
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* Second Section - About */}
      <section id="about" ref={aboutSectionRef} className="py-12 sm:py-16 lg:py-20 bg-transparent backdrop-blur-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-12">
            {/* Left side - ABOUT heading */}
            <div className="flex-shrink-0 text-left">
              <h2 ref={aboutHeadingRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-midnight dark:text-white text-left">
                ABOUT US
              </h2>
            </div>
            
            {/* Right side - Two columns of text */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-2xl">
              <div>
                <p ref={aboutText1Ref} className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-left md:text-right">
                  At Stitch In, we bring fresh perspectives and thoughtful solutions to every project. Our approach combines creativity and practicality, allowing us to adapt to different contexts while delivering designs that are both functional and inspiring.
                </p>
              </div>
              <div>
                <p ref={aboutText2Ref} className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-left md:text-right">
                  We specialize in sustainable, forward-thinking architecture that respects the environment and cultural context. Our ability to work across borders offers innovative solutions globally informed yet locally relevant, ensuring each project meets its full potential.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Services Navigation Section */}
      <section
        ref={servicesSectionRef}
        className="relative z-30 bg-gray-50 py-12 sm:py-16 lg:py-20 dark:bg-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-left sm:mb-12">
            <h2
              ref={servicesHeadingRef}
              className="mb-4 text-3xl font-bold text-midnight dark:text-white sm:text-4xl md:text-5xl lg:text-6xl"
            >
              OUR SERVICES
            </h2>
            <p
              ref={servicesIntroRef}
              className="max-w-3xl text-lg text-gray-600 dark:text-gray-300 sm:text-xl"
            >
              Choose the service category that best fits your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 sm:gap-12 lg:gap-16">
            {/* Individuals Card — rectangular tile, extra-rounded corners */}
            <Link
              ref={servicesIndividualsCardRef}
              to="/individuals"
              className="group relative block overflow-hidden rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-midnight focus-visible:ring-offset-2"
            >
              <CoverImageCard
                src="/images/homepage_home_op1.png"
                alt="Residential architecture for individuals"
                className="rounded-3xl [&_img]:rounded-3xl"
              >
                <div className="pointer-events-none absolute inset-0 bg-black bg-opacity-40 transition-all duration-300 group-hover:bg-opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="text-center text-white">
                    <h3 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
                      FOR INDIVIDUALS
                    </h3>
                    <p className="mx-auto max-w-md text-lg opacity-90 transition-opacity duration-300 group-hover:opacity-100 sm:text-xl">
                      Personal architectural solutions for homes, offices, and individual projects
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 z-[4] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </CoverImageCard>
            </Link>

            {/* Businesses Card — rectangular tile, extra-rounded corners */}
            <Link
              ref={servicesBusinessesCardRef}
              to="/businesses"
              className="group relative block overflow-hidden rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-midnight focus-visible:ring-offset-2"
            >
              <CoverImageCard
                src="/images/homepage_business_op1.png"
                alt="Commercial architecture and BIM services for businesses"
                className="rounded-3xl [&_img]:rounded-3xl"
              >
                <div className="pointer-events-none absolute inset-0 bg-black bg-opacity-40 transition-all duration-300 group-hover:bg-opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="text-center text-white">
                    <h3 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
                      FOR BUSINESSES
                    </h3>
                    <p className="mx-auto max-w-md text-lg opacity-90 transition-opacity duration-300 group-hover:opacity-100 sm:text-xl">
                      Professional BIM, design, and technical services for commercial projects
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 z-[4] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </CoverImageCard>
            </Link>
           </div>
         </div>
       </section>

      {/* Fourth Section - Projects */}
      <section id="projects" ref={projectsSectionRef} className="py-12 sm:py-16 lg:py-20 relative z-40">
        {/* Mobile: Cool white gradient background */}
        <div className="lg:hidden absolute inset-0 z-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-midnight dark:to-gray-800">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gray-300 dark:bg-gray-600 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gray-400 dark:bg-gray-500 rounded-full blur-2xl"></div>
          </div>
        </div>
        
        {/* Desktop: Original background */}
        <div className="hidden lg:block absolute inset-0 z-0 bg-white dark:bg-gray-900"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-12">
            {/* Left side - CASE STUDIES heading */}
            <div className="flex-shrink-0 lg:w-auto w-full text-left">
              <h2 ref={projectsHeadingRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-midnight dark:text-white text-left">
                CASE STUDIES
              </h2>
            </div>
            
            {/* Right side - Empty space */}
            <div className="flex-1 max-w-4xl w-full">
            </div>
          </div>
          
          {/* Project 1 — mobile: tap for modal; desktop: overlay card (unchanged) */}
          <div ref={project1Ref} className="relative mx-auto mt-12 h-[300px] w-full px-4 sm:h-[400px] lg:mx-0 lg:mt-24 lg:h-[600px] lg:w-4/5 lg:px-0">
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <img
                ref={project1ImageRef}
                src={CASE_STUDIES[0].image}
                alt={CASE_STUDIES[0].imageAlt}
                className="h-full w-full rounded-3xl object-cover"
              />
            </div>
            <button
              type="button"
              className="absolute inset-0 z-[5] flex items-end justify-center rounded-3xl bg-gradient-to-t from-black/55 via-black/10 to-transparent pb-4 pt-16 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent lg:hidden"
              onClick={() => setCaseStudyModalIndex(0)}
              aria-label={`View details: ${CASE_STUDIES[0].title}`}
            >
              <span className="text-sm font-semibold text-white drop-shadow-md">Tap for details</span>
            </button>
            <div
              ref={project1CardRef}
              className="absolute top-1/2 left-1/2 z-10 hidden w-64 -translate-x-1/2 -translate-y-1/2 transform !rounded-3xl bg-zinc-950/95 p-4 text-left text-white shadow-xl ring-1 ring-white/10 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl sm:w-72 sm:p-6 lg:left-auto lg:right-0 lg:block lg:w-64 lg:translate-x-1/2 lg:-translate-x-0"
            >
              <h3 className="mb-2 text-left text-lg font-bold text-white sm:text-2xl">{CASE_STUDIES[0].title}</h3>
              <div className="mb-3 flex items-center text-left text-xs text-white/70 sm:mb-4 sm:text-sm">
                <span>{CASE_STUDIES[0].location}</span>
                <span className="mx-2">•</span>
                <span>{CASE_STUDIES[0].type}</span>
                <span className="mx-2">•</span>
                <span>{CASE_STUDIES[0].year}</span>
              </div>
              <p className="text-left text-sm leading-relaxed text-white/85 sm:text-base">{CASE_STUDIES[0].description}</p>
            </div>
          </div>

          {/* Project 2 */}
          <div
            ref={project2Ref}
            className="relative mx-auto mt-16 h-[300px] w-full px-4 sm:h-[400px] lg:mx-0 lg:mt-28 lg:ml-auto lg:mr-0 lg:h-[600px] lg:w-4/5 lg:px-0"
          >
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <img
                ref={project2ImageRef}
                src={CASE_STUDIES[1].image}
                alt={CASE_STUDIES[1].imageAlt}
                className="h-full w-full rounded-3xl object-cover"
              />
            </div>
            <button
              type="button"
              className="absolute inset-0 z-[5] flex items-end justify-center rounded-3xl bg-gradient-to-t from-black/55 via-black/10 to-transparent pb-4 pt-16 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent lg:hidden"
              onClick={() => setCaseStudyModalIndex(1)}
              aria-label={`View details: ${CASE_STUDIES[1].title}`}
            >
              <span className="text-sm font-semibold text-white drop-shadow-md">Tap for details</span>
            </button>
            <div
              ref={project2CardRef}
              className="absolute top-1/2 left-1/2 z-10 hidden w-64 -translate-x-1/2 -translate-y-1/2 transform !rounded-3xl bg-zinc-950/95 p-4 text-left text-white shadow-xl ring-1 ring-white/10 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl sm:w-72 sm:p-6 lg:left-0 lg:block lg:w-64 lg:-translate-x-1/2"
            >
              <h3 className="mb-2 text-left text-lg font-bold text-white sm:text-2xl">{CASE_STUDIES[1].title}</h3>
              <div className="mb-3 flex items-center text-left text-xs text-white/70 sm:mb-4 sm:text-sm">
                <span>{CASE_STUDIES[1].location}</span>
                <span className="mx-2">•</span>
                <span>{CASE_STUDIES[1].type}</span>
                <span className="mx-2">•</span>
                <span>{CASE_STUDIES[1].year}</span>
              </div>
              <p className="text-left text-sm leading-relaxed text-white/85 sm:text-base">{CASE_STUDIES[1].description}</p>
            </div>
          </div>

          {/* Project 3 */}
          <div ref={project3Ref} className="relative mx-auto mt-16 h-[300px] w-full px-4 sm:h-[400px] lg:mx-0 lg:mt-28 lg:h-[600px] lg:w-4/5 lg:px-0">
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <img
                ref={project3ImageRef}
                src={CASE_STUDIES[2].image}
                alt={CASE_STUDIES[2].imageAlt}
                className="h-full w-full rounded-3xl object-cover"
              />
            </div>
            <button
              type="button"
              className="absolute inset-0 z-[5] flex items-end justify-center rounded-3xl bg-gradient-to-t from-black/55 via-black/10 to-transparent pb-4 pt-16 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent lg:hidden"
              onClick={() => setCaseStudyModalIndex(2)}
              aria-label={`View details: ${CASE_STUDIES[2].title}`}
            >
              <span className="text-sm font-semibold text-white drop-shadow-md">Tap for details</span>
            </button>
            <div
              ref={project3CardRef}
              className="absolute top-1/2 left-1/2 z-10 hidden w-64 -translate-x-1/2 -translate-y-1/2 transform !rounded-3xl bg-zinc-950/95 p-4 text-left text-white shadow-xl ring-1 ring-white/10 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl sm:w-72 sm:p-6 lg:left-auto lg:right-0 lg:block lg:w-64 lg:translate-x-1/2 lg:-translate-x-0"
            >
              <h3 className="mb-2 text-left text-lg font-bold text-white sm:text-2xl">{CASE_STUDIES[2].title}</h3>
              <div className="mb-3 flex items-center text-left text-xs text-white/70 sm:mb-4 sm:text-sm">
                <span>{CASE_STUDIES[2].location}</span>
                <span className="mx-2">•</span>
                <span>{CASE_STUDIES[2].type}</span>
                <span className="mx-2">•</span>
                <span>{CASE_STUDIES[2].year}</span>
              </div>
              <p className="text-left text-sm leading-relaxed text-white/85 sm:text-base">{CASE_STUDIES[2].description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fifth Section - Interactive Gallery */}
      <section id="gallery" ref={gallerySectionRef} className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900 relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Gallery Title */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2
              ref={galleryTitleRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-midnight dark:text-white mb-4"
            >
              GALLERY
            </h2>
          </div>

          {/* Gallery grid — scroll reveal via GSAP; hover: fast overlay only */}
          <div className="gallery-images grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-12 sm:mt-24 lg:mt-48">
            {GALLERY_ITEMS.map((item, index) => {
              const isFeatured = index < GALLERY_FEATURED_COUNT;
              return (
              <div
                key={item.src}
                role="button"
                tabIndex={0}
                aria-label={`Open ${item.title} in fullscreen gallery`}
                className="gallery-image group cursor-pointer min-w-0"
                ref={(el) => {
                  galleryItemRefs.current[index] = el;
                }}
                onClick={() => setGalleryLightboxIndex(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setGalleryLightboxIndex(index);
                  }
                }}
              >
                {isFeatured ? (
                <div className="aspect-[3/4.5] w-full overflow-hidden rounded-b-xl">
                  <div className="gallery-arch-shell relative h-full w-full overflow-hidden isolate">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="h-full w-full rounded-none object-cover select-none"
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                    <div className="gallery-overlay pointer-events-none absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 group-hover:pointer-events-auto">
                      <div className="text-center text-white px-3">
                        <h3 className="mb-1 text-lg font-bold sm:text-xl">{item.title}</h3>
                        <p className="text-xs sm:text-sm">{item.caption}</p>
                      </div>
                    </div>
                  </div>
                </div>
                ) : (
                <div className="aspect-square w-full overflow-hidden rounded-xl">
                  <div className="relative h-full w-full isolate">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="h-full w-full rounded-none object-cover select-none"
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                    <div className="gallery-overlay pointer-events-none absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 group-hover:pointer-events-auto">
                      <div className="text-center text-white px-3">
                        <h3 className="mb-1 text-lg font-bold sm:text-xl">{item.title}</h3>
                        <p className="text-xs sm:text-sm">{item.caption}</p>
                      </div>
                    </div>
                  </div>
                </div>
                )}
              </div>
            );
            })}
          </div>

        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" ref={partnersSectionRef} className="py-12 sm:py-16 lg:py-20 bg-gray-200 dark:bg-gray-800 relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-midnight dark:text-white mb-4">
              OUR PARTNERS
            </h2>
          </div>
          <div className="flex justify-center items-center">
            <a
              href="https://www.consedge.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-300 hover:scale-110 hover:opacity-80 cursor-pointer"
            >
              <img
                src="/images/consedge_logo.svg"
                alt="Consedge Logo"
                className="h-12 sm:h-16 lg:h-20 w-auto"
              />
            </a>
          </div>
        </div>
      </section>

      {/* Sixth Section - Our Vision — rounded frame matches hero / service heroes */}
      <section ref={testimonialsSectionRef} className="relative z-30">
        <div className="px-4 py-4 sm:px-6 sm:py-4 lg:px-8 lg:py-4">
          <div
            id="our-vision"
            className="flex min-h-[calc(100vh-2rem)] items-center justify-center overflow-hidden rounded-3xl bg-zinc-950 py-12 sm:py-16 lg:py-0 sm:min-h-[calc(100vh-2.5rem)]"
          >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              {/* Section Title */}
              <div ref={testimonialsTitleRef} className="mb-8 sm:mb-12 lg:mb-16">
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white">
                  OUR VISION
                </h2>
              </div>

              {/* Company Statement */}
              <div className="mb-8 sm:mb-10 lg:mb-12">
                <blockquote ref={quoteTextRef} className="text-base sm:text-lg md:text-xl lg:text-2xl text-white italic leading-relaxed font-serif">
                  We believe that great design balances function, elegance, and sustainability. Every project - from the simplest layout to the most complex development - is an opportunity to create spaces that work beautifully and endure thoughtfully. We thrive on challenges that push boundaries and demand smarter solutions. The unknown doesn't intimidate us; it inspires us to explore, adapt, and innovate. Through curiosity and precision, we turn complexity into clarity - and ideas into meaningful, lasting architecture.
                </blockquote>
              </div>

              {/* Author */}
              <div ref={authorRef} className="text-white text-base sm:text-lg font-medium">
                — Stitch In Architecture
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seventh Section - CTA with Overlapping Image */}
      <section id="contact" ref={ctaSectionRef} className="relative py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            {/* Left side - CTA Content */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2 ref={ctaTitleRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-midnight dark:text-white mb-6 sm:mb-8 text-left">
                  Ready to Start Your Project?
                </h2>
              </div>
              
              {/* Contact Form with Formspree Integration */}
              <form 
                className="space-y-4 sm:space-y-6" 
                action="https://formspree.io/f/mvgvogap" 
                method="POST"
                onSubmit={(e: FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const formData = new FormData(form);
                  
                  fetch(form.action, {
                    method: form.method,
                    body: formData,
                    headers: {
                      Accept: 'application/json'
                    }
                  })
                    .then(response => {
                      if (response.ok) {
                        setFormSubmitted(true);
                        setSubmissionMessage('Thank you! Your message has been sent. We will be in touch shortly.');
                        form.reset();
                      } else {
                        setFormSubmitted(true);
                        setSubmissionMessage('Oops! There was a problem sending your message. Please try again later.');
                      }
                    })
                    .catch(() => {
                      setFormSubmitted(true);
                      setSubmissionMessage('Oops! There was a problem sending your message. Please try again later.');
                    });
                }}
              >
                <input type="hidden" name="subject" value="Website Enquiry" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="cta-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-left">
                      Name
                    </label>
                    <input
                      type="text"
                      id="cta-name"
                      name="name"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-midnight dark:text-white focus:ring-2 focus:ring-midnight dark:focus:ring-white focus:border-transparent transition-colors"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cta-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-left">
                      Email
                    </label>
                    <input
                      type="email"
                      id="cta-email"
                      name="email"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-midnight dark:text-white focus:ring-2 focus:ring-midnight dark:focus:ring-white focus:border-transparent transition-colors"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="cta-phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-left">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="cta-phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-midnight dark:text-white focus:ring-2 focus:ring-midnight dark:focus:ring-white focus:border-transparent transition-colors"
                    placeholder="Your phone number"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cta-project-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-left">
                      Project Type
                    </label>
                    <select
                      id="cta-project-type"
                      name="project-type"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-midnight dark:text-white focus:ring-2 focus:ring-midnight dark:focus:ring-white focus:border-transparent transition-colors"
                      required
                    >
                      <option value="" disabled selected>Select a project type</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Education">Education</option>
                      <option value="Hospitality">Hospitality</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Retail">Retail</option>
                      <option value="Industrial">Industrial</option>
                      <option value="Mixed-Use">Mixed-Use</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="cta-location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-left">
                    Location
                  </label>
                  <input
                    type="text"
                    id="cta-location"
                    name="location"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-midnight dark:text-white focus:ring-2 focus:ring-midnight dark:focus:ring-white focus:border-transparent transition-colors"
                    placeholder="City, Country"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="cta-message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-left">
                    Message
                  </label>
                  <textarea
                    id="cta-message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-midnight dark:text-white focus:ring-2 focus:ring-midnight dark:focus:ring-white focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us about your project..."
                    required
                  ></textarea>
                </div>
                
                <div className="text-left space-y-4">
                  <button ref={ctaButtonRef} type="submit" className="w-full md:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border border-transparent text-base sm:text-lg font-medium rounded-md text-white bg-midnight hover:bg-zinc-800 dark:bg-white dark:text-midnight dark:hover:bg-gray-200 transition-all duration-300 hover:scale-105">
                    Send Message
                  </button>
                  
                  {formSubmitted && (
                    <div className={`text-sm md:text-base mt-4 ${submissionMessage.includes('Oops') ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                      {submissionMessage}
                    </div>
                  )}
                </div>
              </form>
            </div>

            {/* Right side - Overlapping Image */}
            <div className="relative">
              <div
                ref={ctaImageRef}
                className="relative mt-8 h-[400px] overflow-hidden rounded-3xl sm:-mt-16 sm:h-[500px] lg:-mt-32 lg:h-[700px]"
              >
                <img
                  src="/images/Architectural_and_Interior_Design.png"
                  alt="Architecture Project"
                  className="h-full w-full object-cover shadow-2xl !rounded-3xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case study detail — mobile / tablet only (`lg` uses overlay cards) */}
      {caseStudyModalIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-modal-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-label="Close dialog"
            onClick={() => setCaseStudyModalIndex(null)}
          />
          <div className="relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl dark:bg-gray-900 sm:mx-4 sm:mb-6 sm:rounded-2xl">
            <div className="flex items-start justify-between gap-3 border-b border-gray-200 p-4 dark:border-gray-700">
              <h3
                id="case-study-modal-title"
                className="pr-2 text-xl font-bold text-midnight dark:text-white"
              >
                {CASE_STUDIES[caseStudyModalIndex].title}
              </h3>
              <button
                type="button"
                className="shrink-0 rounded-lg p-2 text-midnight hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
                aria-label="Close"
                onClick={() => setCaseStudyModalIndex(null)}
              >
                <span className="text-2xl leading-none" aria-hidden>
                  &times;
                </span>
              </button>
            </div>
            <div className="overflow-y-auto p-4">
              <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-600 dark:text-gray-300">
                <span>{CASE_STUDIES[caseStudyModalIndex].location}</span>
                <span aria-hidden>•</span>
                <span>{CASE_STUDIES[caseStudyModalIndex].type}</span>
                <span aria-hidden>•</span>
                <span>{CASE_STUDIES[caseStudyModalIndex].year}</span>
              </div>
              <p className="text-base leading-relaxed text-gray-700 dark:text-gray-200">
                {CASE_STUDIES[caseStudyModalIndex].description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />

      <GalleryLightbox
        items={GALLERY_ITEMS}
        activeIndex={galleryLightboxIndex}
        onClose={() => setGalleryLightboxIndex(null)}
        onNavigate={setGalleryLightboxIndex}
      />
      </div>
    </>
  );
};

export default HomePage;
