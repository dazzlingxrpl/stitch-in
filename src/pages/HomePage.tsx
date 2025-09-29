import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import HeroDesign from '../components/HeroDesign';
import Footer from '../components/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

interface HomePageProps {
  darkMode: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ darkMode }) => {
  const logoRef = useRef<HTMLImageElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const aboutSectionRef = useRef<HTMLElement>(null);
  const aboutHeadingRef = useRef<HTMLHeadingElement>(null);
  const aboutText1Ref = useRef<HTMLParagraphElement>(null);
  const aboutText2Ref = useRef<HTMLParagraphElement>(null);
  
  // Services section refs
  const servicesSectionRef = useRef<HTMLElement>(null);
  const servicesHeadingRef = useRef<HTMLHeadingElement>(null);
  const servicesContentRef = useRef<HTMLDivElement>(null);
  
  // Individual service refs
  const service1Ref = useRef<HTMLDivElement>(null);
  const service1ImageRef = useRef<HTMLDivElement>(null);
  const service2Ref = useRef<HTMLDivElement>(null);
  const service2ImageRef = useRef<HTMLDivElement>(null);
  const service3Ref = useRef<HTMLDivElement>(null);
  const service3ImageRef = useRef<HTMLDivElement>(null);
  const service4Ref = useRef<HTMLDivElement>(null);
  const service4ImageRef = useRef<HTMLDivElement>(null);

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
  const galleryImage1Ref = useRef<HTMLDivElement>(null);
  const galleryImage2Ref = useRef<HTMLDivElement>(null);
  const galleryImage3Ref = useRef<HTMLDivElement>(null);
  const galleryImage4Ref = useRef<HTMLDivElement>(null);
  const galleryImage5Ref = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!logoRef.current || !logoContainerRef.current) return;

    // Set initial state - logo is visible but masked/clipped
    gsap.set(logoRef.current, {
      opacity: 1,
      scale: 1
    });

    // Create a clipping mask that starts from the right and moves left (swipe from right to left)
    gsap.set(logoContainerRef.current, {
      opacity: 1,
      clipPath: "inset(0 100% 0 0)" // Start with logo completely hidden (clipped from right)
    });

    // Logo reveal sweep synchronized with horizontal lines retrace (faster timing)
    const tl = gsap.timeline({ delay: 4.8 }); // Match the faster grid retrace timing

    // Sweep reveal from right to left (swipe direction), synchronized with horizontal line retrace
    tl.to(logoContainerRef.current, {
      clipPath: "inset(0 0% 0 0)", // Reveal the logo completely from right to left
      duration: 0.8,
      ease: "power2.in", // Match the grid retrace easing
      stagger: {
        amount: 0.2,
        from: "end" // Match the grid retrace stagger direction
      }
    });

    // Scroll-triggered animations - retrace logo and lines when scrolling
    ScrollTrigger.create({
      trigger: heroSectionRef.current,
      start: "top center",
      end: "bottom bottom",
      onEnter: () => {
        // Logo retrace (hide from right to left)
        gsap.to(logoContainerRef.current, {
          clipPath: "inset(0 100% 0 0)",
          duration: 0.8,
          ease: "power2.in"
        });
      },
      onLeave: () => {
        // Logo retrace (hide from right to left)
        gsap.to(logoContainerRef.current, {
          clipPath: "inset(0 100% 0 0)",
          duration: 0.8,
          ease: "power2.in"
        });
      },
      onEnterBack: () => {
        // Logo reveal when scrolling back up
        gsap.to(logoContainerRef.current, {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.8,
          ease: "power2.out"
        });
      }
    });


    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };

  }, [darkMode]);

  // About section animations
  useEffect(() => {
    // Add a small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      if (aboutSectionRef.current && aboutHeadingRef.current && aboutText1Ref.current && aboutText2Ref.current) {
        // Set initial state - elements start invisible
        gsap.set([aboutHeadingRef.current, aboutText1Ref.current, aboutText2Ref.current], {
          opacity: 0,
          y: 50
        });

        // Create a simple scroll-triggered animation
        ScrollTrigger.create({
          trigger: aboutSectionRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.fromTo([aboutHeadingRef.current, aboutText1Ref.current, aboutText2Ref.current], 
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
          },
          onEnterBack: () => {
            gsap.fromTo([aboutHeadingRef.current, aboutText1Ref.current, aboutText2Ref.current], 
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
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Services section animations
  useEffect(() => {
    const timer = setTimeout(() => {
      if (servicesSectionRef.current && servicesHeadingRef.current) {
        // Set initial state for heading
        gsap.set(servicesHeadingRef.current, {
          opacity: 0,
          y: 50
        });

        // Set initial state for all service items
        const serviceItems = [
          service1Ref.current, service1ImageRef.current,
          service2Ref.current, service2ImageRef.current,
          service3Ref.current, service3ImageRef.current,
          service4Ref.current, service4ImageRef.current
        ].filter(Boolean);

        gsap.set(serviceItems, {
          opacity: 0,
          y: 80,
          scale: 0.9
        });

        // Create scroll-triggered animation for services
        ScrollTrigger.create({
          trigger: servicesSectionRef.current,
          start: "top 80%",
          onEnter: () => {
            // Animate heading first
            gsap.to(servicesHeadingRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out"
            });

            // Then animate each service with fun effects
            const tl = gsap.timeline();
            
            // Service 1 - slide in from left with bounce
            tl.to(service1Ref.current, {
              opacity: 1,
              y: 0,
              x: 0,
              duration: 0.6,
              ease: "back.out(1.7)"
            })
            .to(service1ImageRef.current, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power2.out"
            }, "-=0.3");

            // Service 2 - slide in from right with bounce
            tl.to(service2Ref.current, {
              opacity: 1,
              y: 0,
              x: 0,
              duration: 0.6,
              ease: "back.out(1.7)"
            })
            .to(service2ImageRef.current, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power2.out"
            }, "-=0.3");

            // Service 3 - slide in from left with bounce
            tl.to(service3Ref.current, {
              opacity: 1,
              y: 0,
              x: 0,
              duration: 0.6,
              ease: "back.out(1.7)"
            })
            .to(service3ImageRef.current, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power2.out"
            }, "-=0.3");

            // Service 4 - slide in from right with bounce
            tl.to(service4Ref.current, {
              opacity: 1,
              y: 0,
              x: 0,
              duration: 0.6,
              ease: "back.out(1.7)"
            })
            .to(service4ImageRef.current, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power2.out"
            }, "-=0.3");
          },
          onEnterBack: () => {
            // Same animation on scroll back
            gsap.to(servicesHeadingRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out"
            });

            const tl = gsap.timeline();
            
            tl.to(service1Ref.current, {
              opacity: 1,
              y: 0,
              x: 0,
              duration: 0.6,
              ease: "back.out(1.7)"
            })
            .to(service1ImageRef.current, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power2.out"
            }, "-=0.3")
            .to(service2Ref.current, {
              opacity: 1,
              y: 0,
              x: 0,
              duration: 0.6,
              ease: "back.out(1.7)"
            })
            .to(service2ImageRef.current, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power2.out"
            }, "-=0.3")
            .to(service3Ref.current, {
              opacity: 1,
              y: 0,
              x: 0,
              duration: 0.6,
              ease: "back.out(1.7)"
            })
            .to(service3ImageRef.current, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power2.out"
            }, "-=0.3")
            .to(service4Ref.current, {
              opacity: 1,
              y: 0,
              x: 0,
              duration: 0.6,
              ease: "back.out(1.7)"
            })
            .to(service4ImageRef.current, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power2.out"
            }, "-=0.3");
          }
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Projects section animations
  useEffect(() => {
    const timer = setTimeout(() => {
      if (projectsSectionRef.current && projectsHeadingRef.current) {
        // Set initial state for heading
        gsap.set(projectsHeadingRef.current, {
          opacity: 0,
          y: 50
        });

        // Set initial state for all project images and cards
        const projectImages = [
          project1ImageRef.current, project2ImageRef.current, project3ImageRef.current
        ].filter(Boolean);

        const projectCards = [
          project1CardRef.current, project2CardRef.current, project3CardRef.current
        ].filter(Boolean);

        // Set initial state for images - start with clipPath hiding them
        gsap.set(project1ImageRef.current, {
          clipPath: "inset(0 100% 0 0)" // Project 1: hidden from right (swipe right to left)
        });
        
        gsap.set(project2ImageRef.current, {
          clipPath: "inset(0 0 0 100%)" // Project 2: hidden from left (swipe left to right)
        });
        
        gsap.set(project3ImageRef.current, {
          clipPath: "inset(0 100% 0 0)" // Project 3: hidden from right (swipe right to left)
        });

        // Set initial state for cards - start invisible and offset
        gsap.set(projectCards, {
          opacity: 0,
          y: 30,
          scale: 0.95
        });

        // Create scroll-triggered animation for projects
        ScrollTrigger.create({
          trigger: projectsSectionRef.current,
          start: "top 80%",
          onEnter: () => {
            // Animate heading first
            gsap.to(projectsHeadingRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out"
            });

            // Create timeline for project animations
            const tl = gsap.timeline();

            // Project 1 - swipe reveal from right to left
            tl.to(project1ImageRef.current, {
              clipPath: "inset(0 0% 0 0)", // Reveal the image completely
              duration: 1.2,
              ease: "power2.out"
            })
            .to(project1CardRef.current, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "back.out(1.7)"
            }, "-=0.4");

            // Project 2 - swipe reveal from left to right (delayed)
            tl.to(project2ImageRef.current, {
              clipPath: "inset(0 0 0 0%)", // Reveal from left to right
              duration: 1.2,
              ease: "power2.out"
            }, "+=0.3")
            .to(project2CardRef.current, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "back.out(1.7)"
            }, "-=0.4");

            // Project 3 - swipe reveal from right to left (delayed)
            tl.to(project3ImageRef.current, {
              clipPath: "inset(0 0% 0 0)",
              duration: 1.2,
              ease: "power2.out"
            }, "+=0.3")
            .to(project3CardRef.current, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "back.out(1.7)"
            }, "-=0.4");
          },
          onEnterBack: () => {
            // Same animation on scroll back
            gsap.to(projectsHeadingRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out"
            });

            const tl = gsap.timeline();
            
            tl.to(project1ImageRef.current, {
              clipPath: "inset(0 0% 0 0)",
              duration: 1.2,
              ease: "power2.out"
            })
            .to(project1CardRef.current, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "back.out(1.7)"
            }, "-=0.4")
            .to(project2ImageRef.current, {
              clipPath: "inset(0 0 0 0%)", // Reveal from left to right
              duration: 1.2,
              ease: "power2.out"
            }, "+=0.3")
            .to(project2CardRef.current, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "back.out(1.7)"
            }, "-=0.4")
            .to(project3ImageRef.current, {
              clipPath: "inset(0 0% 0 0)",
              duration: 1.2,
              ease: "power2.out"
            }, "+=0.3")
            .to(project3CardRef.current, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "back.out(1.7)"
            }, "-=0.4");
          }
        });
      }
    }, 100);

    return () => clearTimeout(timer);
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
        const galleryImages = [
          galleryImage1Ref.current, galleryImage2Ref.current, 
          galleryImage3Ref.current, galleryImage4Ref.current, galleryImage5Ref.current
        ].filter(Boolean);

        gsap.set(galleryImages, {
          opacity: 0,
          y: 100,
          scale: 0.8,
          rotation: 2
        });

        // Create scroll-triggered animation for gallery
        ScrollTrigger.create({
          trigger: gallerySectionRef.current,
          start: "top 80%",
          onEnter: () => {
            // Animate title first
            gsap.to(galleryTitleRef.current, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out"
            });

            // Animate gallery images with stagger
            gsap.to(galleryImages, {
              opacity: 1,
              y: 0,
              scale: 1,
              rotation: 0,
              duration: 1.2,
              ease: "back.out(1.7)",
              stagger: 0.2
            });
          },
          onEnterBack: () => {
            gsap.to(galleryTitleRef.current, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out"
            });

            gsap.to(galleryImages, {
              opacity: 1,
              y: 0,
              scale: 1,
              rotation: 0,
              duration: 1.2,
              ease: "back.out(1.7)",
              stagger: 0.2
            });
          }
        });

        // Add hover animations for each gallery image
        galleryImages.forEach((image, index) => {
          if (image) {
            const imgElement = image.querySelector('img');
            const overlay = image.querySelector('.gallery-overlay');
            
            // Hover enter animation
            image.addEventListener('mouseenter', () => {
              gsap.to(image, {
                scale: 1.05,
                rotation: 0,
                duration: 0.6,
                ease: "power2.out"
              });
              
              if (imgElement) {
                gsap.to(imgElement, {
                  scale: 1.1,
                  duration: 0.6,
                  ease: "power2.out"
                });
              }
              
              if (overlay) {
                gsap.to(overlay, {
                  opacity: 1,
                  duration: 0.3,
                  ease: "power2.out"
                });
              }
            });

            // Hover leave animation
            image.addEventListener('mouseleave', () => {
              gsap.to(image, {
                scale: 1,
                rotation: index % 2 === 0 ? 1 : -1,
                duration: 0.6,
                ease: "power2.out"
              });
              
              if (imgElement) {
                gsap.to(imgElement, {
                  scale: 1,
                  duration: 0.6,
                  ease: "power2.out"
                });
              }
              
              if (overlay) {
                gsap.to(overlay, {
                  opacity: 0,
                  duration: 0.3,
                  ease: "power2.out"
                });
              }
            });
          }
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Gallery section animations
  useEffect(() => {
    const timer = setTimeout(() => {
      if (gallerySectionRef.current) {
        // Add parallax effects to gallery images
        gsap.utils.toArray('.gallery-image').forEach((image: any, index) => {
          const speed = [2.4, 1.8, 2.2, 1.5][index] || 1.5;
          gsap.to(image, {
            yPercent: -50 * speed,
            ease: "none",
            scrollTrigger: {
              trigger: image,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          });
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Testimonials section animations
  useEffect(() => {
    const timer = setTimeout(() => {
      if (testimonialsSectionRef.current && quoteTextRef.current) {
        // Set initial state
        gsap.set([testimonialsTitleRef.current, authorRef.current], {
          opacity: 0,
          y: 50,
          scale: 0.9
        });
        
        gsap.set(quoteTextRef.current, {
          opacity: 0
        });

        // Split the text into words using SplitText
        const split = new SplitText(quoteTextRef.current, {
          type: "words",
          wordsClass: "word"
        });

        // Set initial state for split words
        gsap.set(split.words, {
          opacity: 0,
          y: 30
        });

        // Create scroll-triggered animation
        ScrollTrigger.create({
          trigger: testimonialsSectionRef.current,
          start: "top 80%",
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
            gsap.to(split.words, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              delay: 1.2,
              ease: "power2.out"
            });
          },
          onEnterBack: () => {
            // Reset and replay animations
            gsap.set([testimonialsTitleRef.current, authorRef.current], {
              opacity: 0,
              y: 50,
              scale: 0.9
            });
            
            gsap.set(quoteTextRef.current, {
              opacity: 0
            });

            gsap.set(split.words, {
              opacity: 0,
              y: 30
            });

            // Replay title animation
            gsap.to(testimonialsTitleRef.current, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.2,
              ease: "back.out(1.7)"
            });

            // Replay author animation
            gsap.to(authorRef.current, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: "power2.out",
              delay: 0.5
            });

            // Replay quote animation
            gsap.to(quoteTextRef.current, {
              opacity: 1,
              duration: 0.5,
              delay: 0.8
            });

            gsap.to(split.words, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              delay: 1.2,
              ease: "power2.out"
            });
          }
        });

        // Cleanup function
        return () => {
          if (split) {
            split.revert();
          }
        };
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // CTA section animations
  useEffect(() => {
    const timer = setTimeout(() => {
      if (ctaSectionRef.current && ctaTitleRef.current) {
        // Set initial state
        gsap.set([ctaTitleRef.current, ctaButtonRef.current], {
          opacity: 0,
          y: 50
        });
        
        gsap.set(ctaImageRef.current, {
          opacity: 0,
          scale: 0.8,
          y: 100
        });

        // Create scroll-triggered animation
        ScrollTrigger.create({
          trigger: ctaSectionRef.current,
          start: "top 80%",
          onEnter: () => {
            // Animate text elements
            gsap.to([ctaTitleRef.current, ctaButtonRef.current], {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
              stagger: 0.2
            });

            // Animate image with delay
            gsap.to(ctaImageRef.current, {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1.2,
              delay: 0.5,
              ease: "back.out(1.7)"
            });
          },
          onEnterBack: () => {
            gsap.to([ctaTitleRef.current, ctaButtonRef.current], {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
              stagger: 0.2
            });

            gsap.to(ctaImageRef.current, {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1.2,
              delay: 0.5,
              ease: "back.out(1.7)"
            });
          }
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .gallery-images {
            position: relative;
          }
        `
      }} />
      <div>
      {/* Hero Section with HeroDesign background */}
      <section ref={heroSectionRef} className="relative h-screen overflow-hidden z-10">
        {/* HeroDesign background */}
        <div className="absolute inset-0 z-0">
          <HeroDesign />
        </div>
        
        {/* Hero content */}
        <div className="relative h-full z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="text-center sm:text-left">
              <div ref={logoContainerRef} className="mb-8">
                <img
                  ref={logoRef}
                  src={darkMode ? "/images/main_logo_white.png" : "/images/main_logo_black.png"}
                  alt="Stitch In Logo"
                  className="h-20 sm:h-28 lg:h-32 w-auto mx-auto sm:mx-0"
                />
              </div>
              {/* <button className="inline-flex items-center px-6 py-2.5 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 transition-colors">
                Explore Our Portfolio
              </button> */}
            </div>
          </div>
        </div>
      </section>



      {/* Second Section - About */}
      <section ref={aboutSectionRef} className="py-20 bg-transparent backdrop-blur-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-start gap-12">
            {/* Left side - ABOUT heading */}
            <div className="flex-shrink-0">
              <h2 ref={aboutHeadingRef} className="text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white">
                ABOUT
              </h2>
            </div>
            
            {/* Right side - Two columns of text */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
              <div>
                <p ref={aboutText1Ref} className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-right">
                  Our international presence allows us to bring diverse perspectives and innovative solutions 
                  to every project. From historic European cities to dynamic Australian metropolises, 
                  we create architectural masterpieces that respect local culture while pushing design boundaries.
                </p>
              </div>
              <div>
                <p ref={aboutText2Ref} className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-right">
                  We specialize in creating sustainable, forward-thinking designs that honor cultural heritage 
                  while building for the future. Our cross-continental expertise enables us to deliver 
                  solutions that are both globally informed and locally relevant.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Third Section - Services */}
      <section ref={servicesSectionRef} className="py-20 bg-white dark:bg-gray-900 relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-start gap-48">
            {/* Left side - SERVICES heading */}
            <div className="flex-shrink-0">
              <h2 ref={servicesHeadingRef} className="text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white">
                SERVICES
              </h2>
            </div>
            
            {/* Right side - Service details */}
            <div ref={servicesContentRef} className="flex-1 max-w-4xl">
              {/* Horizontal line at top */}
              <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mb-8"></div>
              
              {/* Service content - horizontal layout */}
              <div ref={service1Ref} className="flex gap-8 items-center">
                {/* Left side - Text content */}
                <div className="flex-1 relative text-center flex flex-col h-96 justify-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-left">
                      Architecture
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-left">
                      We design buildings that are purposeful, enduring, and deeply connected to their surroundings.
                    </p>
                  </div>
                  
                  
                  {/* Bullet points at bottom */}
                  <div className="mt-auto">
                    <ul className="space-y-2 text-left">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-600 dark:text-gray-300">Concept Design</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-600 dark:text-gray-300">Architectural Planning</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-600 dark:text-gray-300">3D Visualization & Modeling</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-600 dark:text-gray-300">Construction Documentation</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Right side - Building image */}
                <div ref={service1ImageRef} className="w-80 h-96 overflow-hidden shadow-lg flex-shrink-0">
                  <img
                    src="/images/work_images/building1.jpg"
                    alt="Modern Architecture"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
               {/* Horizontal line at bottom */}
               <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mt-8"></div>

               {/* Service 2 - Interior Design */}
               {/* Horizontal line at top */}
               <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mb-8"></div>
               
              {/* Service content - horizontal layout */}
              <div ref={service2Ref} className="flex gap-8 items-center">
                {/* Left side - Text content */}
                <div className="flex-1 relative text-center flex flex-col h-96 justify-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-left">
                      Interior Design
                     </h3>
                     <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-left">
                       Creating functional and beautiful interior spaces that enhance the human experience and reflect your unique vision.
                     </p>
                   </div>
                   
                   {/* Bullet points at bottom */}
                   <div className="mt-auto">
                     <ul className="space-y-2 text-left">
                       <li className="flex items-start">
                         <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                         <span className="text-gray-600 dark:text-gray-300">Space Planning</span>
                       </li>
                       <li className="flex items-start">
                         <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                         <span className="text-gray-600 dark:text-gray-300">Material Selection</span>
                       </li>
                       <li className="flex items-start">
                         <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                         <span className="text-gray-600 dark:text-gray-300">Lighting Design</span>
                       </li>
                       <li className="flex items-start">
                         <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                         <span className="text-gray-600 dark:text-gray-300">Furniture Layout</span>
                       </li>
                     </ul>
                   </div>
                 </div>
                 
                {/* Right side - Building image */}
                <div ref={service2ImageRef} className="w-80 h-96 overflow-hidden shadow-lg flex-shrink-0">
                  <img
                    src="/images/work_images/apt1.jpg"
                     alt="Interior Design"
                     className="w-full h-full object-cover"
                   />
                 </div>
               </div>
               
               {/* Horizontal line at bottom */}
               <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mt-8"></div>

               {/* Service 3 - Urban Planning */}
               {/* Horizontal line at top */}
               <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mb-8"></div>
               
              {/* Service content - horizontal layout */}
              <div ref={service3Ref} className="flex gap-8 items-center">
                {/* Left side - Text content */}
                <div className="flex-1 relative text-center flex flex-col h-96 justify-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-left">
                      Urban Planning
                     </h3>
                     <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-left">
                       Shaping sustainable communities through thoughtful planning and design that connects people with their environment.
                     </p>
                   </div>
                   
                   {/* Bullet points at bottom */}
                   <div className="mt-auto">
                     <ul className="space-y-2 text-left">
                       <li className="flex items-start">
                         <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                         <span className="text-gray-600 dark:text-gray-300">Master Planning</span>
                       </li>
                       <li className="flex items-start">
                         <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                         <span className="text-gray-600 dark:text-gray-300">Zoning Analysis</span>
                       </li>
                       <li className="flex items-start">
                         <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                         <span className="text-gray-600 dark:text-gray-300">Community Engagement</span>
                       </li>
                       <li className="flex items-start">
                         <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                         <span className="text-gray-600 dark:text-gray-300">Sustainability Planning</span>
                       </li>
                     </ul>
                   </div>
                 </div>
                 
                {/* Right side - Building image */}
                <div ref={service3ImageRef} className="w-80 h-96 overflow-hidden shadow-lg flex-shrink-0">
                  <img
                    src="/images/work_images/building2.jpg"
                     alt="Urban Planning"
                     className="w-full h-full object-cover"
                   />
                 </div>
               </div>
               
               {/* Horizontal line at bottom */}
               <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mt-8"></div>

               {/* Service 4 - Project Management */}
               {/* Horizontal line at top */}
               <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mb-8"></div>
               
              {/* Service content - horizontal layout */}
              <div ref={service4Ref} className="flex gap-8 items-center">
                {/* Left side - Text content */}
                <div className="flex-1 relative text-center flex flex-col h-96 justify-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-left">
                      Project Management
                     </h3>
                     <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-left">
                       Ensuring seamless project delivery from concept to completion with expert coordination and oversight.
                     </p>
                   </div>
                   
                   {/* Bullet points at bottom */}
                   <div className="mt-auto">
                     <ul className="space-y-2 text-left">
                       <li className="flex items-start">
                         <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                         <span className="text-gray-600 dark:text-gray-300">Timeline Management</span>
                       </li>
                       <li className="flex items-start">
                         <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                         <span className="text-gray-600 dark:text-gray-300">Budget Control</span>
                       </li>
                       <li className="flex items-start">
                         <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                         <span className="text-gray-600 dark:text-gray-300">Quality Assurance</span>
                       </li>
                       <li className="flex items-start">
                         <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                         <span className="text-gray-600 dark:text-gray-300">Stakeholder Coordination</span>
                       </li>
                     </ul>
                   </div>
                 </div>
                 
                {/* Right side - Building image */}
                <div ref={service4ImageRef} className="w-80 h-96 overflow-hidden shadow-lg flex-shrink-0">
                  <img
                    src="/images/work_images/building3.jpg"
                     alt="Project Management"
                     className="w-full h-full object-cover"
                   />
                 </div>
               </div>
               
               {/* Horizontal line at bottom */}
               <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mt-8"></div>
             </div>
           </div>
         </div>
       </section>

      {/* Fourth Section - Projects */}
      <section ref={projectsSectionRef} className="py-20 bg-white dark:bg-gray-900 relative z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-start gap-48">
            {/* Left side - PROJECTS heading */}
            <div className="flex-shrink-0">
              <h2 ref={projectsHeadingRef} className="text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white">
                PROJECTS
              </h2>
            </div>
            
            {/* Right side - Empty space */}
            <div className="flex-1 max-w-4xl">
            </div>
          </div>
          
          {/* Project image below the title section */}
          <div ref={project1Ref} className="relative w-4/5 h-[600px] mt-24">
            <img
              ref={project1ImageRef}
              src="/images/work_images/house1.jpg"
              alt="Coastal Villa Project"
              className="w-full h-full object-cover"
            />
            
            {/* Project description card overlay */}
            <div ref={project1CardRef} className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 p-6 max-w-xs w-64 text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2 text-left">
                Coastal Villa
              </h3>
              <div className="flex items-center text-sm text-gray-600 mb-4 text-left">
                <span>Aspen</span>
                <span className="mx-2">•</span>
                <span>Residential</span>
                <span className="mx-2">•</span>
                <span>2024</span>
              </div>
              <p className="text-gray-700 leading-relaxed text-left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>

          {/* Second Project image below the first */}
          <div ref={project2Ref} className="relative w-4/5 h-[600px] mt-28 ml-auto">
            <img
              ref={project2ImageRef}
              src="/images/work_images/house2.jpg"
              alt="Modern Residence Project"
              className="w-full h-full object-cover"
            />
            
            {/* Project description card overlay - mirrored to left side */}
            <div ref={project2CardRef} className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 p-6 max-w-xs w-64 text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2 text-left">
                Modern Residence
              </h3>
              <div className="flex items-center text-sm text-gray-600 mb-4 text-left">
                <span>London</span>
                <span className="mx-2">•</span>
                <span>Commercial</span>
                <span className="mx-2">•</span>
                <span>2023</span>
              </div>
              <p className="text-gray-700 leading-relaxed text-left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>

          {/* Third Project image below the second */}
          <div ref={project3Ref} className="relative w-4/5 h-[600px] mt-28">
            <img
              ref={project3ImageRef}
              src="/images/work_images/house3.jpg"
              alt="Urban Loft Project"
              className="w-full h-full object-cover"
            />
            
            {/* Project description card overlay - same as first (right side) */}
            <div ref={project3CardRef} className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 p-6 max-w-xs w-64 text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2 text-left">
                Urban Loft
              </h3>
              <div className="flex items-center text-sm text-gray-600 mb-4 text-left">
                <span>New York</span>
                <span className="mx-2">•</span>
                <span>Residential</span>
                <span className="mx-2">•</span>
                <span>2024</span>
              </div>
              <p className="text-gray-700 leading-relaxed text-left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fifth Section - Interactive Gallery */}
      <section ref={gallerySectionRef} className="py-20 bg-white dark:bg-gray-900 relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Gallery Title */}
          <div className="text-center mb-16">
            <h2 className="text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4">
              GALLERY
            </h2>
          </div>

          {/* Gallery Grid with Parallax */}
          <div className="gallery-images grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-48">
            <div className="gallery-image group cursor-pointer">
              <div className="relative h-96 overflow-hidden  shadow-lg">
                <img
                  src="/images/work_images/building1.jpg"
                  alt="Modern Architecture"
                  className="w-full h-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <div className="text-white text-center">
                    <h3 className="text-xl font-bold mb-1">Modern Architecture</h3>
                    <p className="text-sm">Contemporary design</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="gallery-image group cursor-pointer">
              <div className="relative h-96 overflow-hidden  shadow-lg">
                <img
                  src="/images/work_images/apt1.jpg"
                  alt="Interior Design"
                  className="w-full h-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <div className="text-white text-center">
                    <h3 className="text-xl font-bold mb-1">Interior Design</h3>
                    <p className="text-sm">Elegant spaces</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="gallery-image group cursor-pointer">
              <div className="relative h-96 overflow-hidden  shadow-lg">
                <img
                  src="/images/work_images/building2.jpg"
                  alt="Urban Planning"
                  className="w-full h-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <div className="text-white text-center">
                    <h3 className="text-xl font-bold mb-1">Urban Planning</h3>
                    <p className="text-sm">Sustainable communities</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="gallery-image group cursor-pointer">
              <div className="relative h-96 overflow-hidden  shadow-lg">
                <img
                  src="/images/work_images/house1.jpg"
                  alt="Residential Design"
                  className="w-full h-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <div className="text-white text-center">
                    <h3 className="text-xl font-bold mb-1">Residential Design</h3>
                    <p className="text-sm">Dream homes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Sixth Section - Our Vision */}
      <section ref={testimonialsSectionRef} className="relative h-screen flex items-center justify-center z-50" style={{ backgroundColor: '#1e1e1e' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Section Title */}
          <div ref={testimonialsTitleRef} className="mb-16">
            <h2 className="text-6xl lg:text-8xl font-bold text-white">
              OUR VISION
            </h2>
          </div>

          {/* Company Statement */}
          <div className="mb-12">
            <blockquote ref={quoteTextRef} className="text-xl lg:text-2xl text-white italic leading-relaxed font-serif">
              We believe architecture is more than just buildings—it's about creating spaces that inspire, connect, and transform lives. Our vision is to design sustainable, innovative solutions that honor both tradition and progress, crafting environments where people thrive and communities flourish.
            </blockquote>
          </div>

          {/* Author */}
          <div ref={authorRef} className="text-white text-lg font-medium">
            — Stitch In Architecture
          </div>
        </div>
      </section>

      {/* Seventh Section - CTA with Overlapping Image */}
      <section ref={ctaSectionRef} className="relative py-20 bg-white dark:bg-gray-900 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - CTA Content */}
            <div className="space-y-8">
              <div>
                <h2 ref={ctaTitleRef} className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8 text-left">
                  Ready to Start Your Project?
                </h2>
              </div>
              
              {/* Contact Form */}
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="cta-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-left">
                      Name
                    </label>
                    <input
                      type="text"
                      id="cta-name"
                      name="name"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-colors"
                      placeholder="Your name"
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
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="cta-phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-left">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="cta-phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-colors"
                    placeholder="Your phone number"
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
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>
                
                <div className="text-left">
                  <button ref={ctaButtonRef} type="submit" className="w-full md:w-auto inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 transition-all duration-300 hover:scale-105">
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            {/* Right side - Overlapping Image */}
            <div className="relative">
              <div ref={ctaImageRef} className="relative h-[600px] lg:h-[700px] -mt-20 lg:-mt-32">
                <img
                  src="/images/work_images/building1.jpg"
                  alt="Architecture Project"
                  className="w-full h-full object-cover shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      </div>
    </>
  );
};

export default HomePage;
