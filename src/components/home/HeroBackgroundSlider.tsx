"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "/images/hero/shop-interior.jpg",
    alt: "Genius Tech phone repair shop in Dubai Marina with expert technicians and customers",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80",
    alt: "Dubai Marina skyline - phone repair service location",
  },
  {
    id: 3,
    image: "/images/hero/branded-marketing.jpg",
    alt: "Genius Tech Phone Repair Dubai Marina - Fast and reliable iPhone MacBook Samsung repair",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1920&q=80",
    alt: "iPhone smartphone repair Dubai - screen replacement battery fix",
  },
  {
    id: 5,
    image: "/images/hero/home-service.jpg",
    alt: "Professional phone repair home service in Dubai Marina JLT JBR - free pickup and delivery",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1920&q=80",
    alt: "MacBook laptop repair Dubai Marina - keyboard screen battery fix",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1546412414-e1885259563a?w=1920&q=80",
    alt: "Dubai JBR skyline - phone repair pickup delivery service area",
  },
];

export function HeroBackgroundSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <>
      {/* Background Slides - Only render current + adjacent for performance */}
      {slides.map((slide, index) => {
        // Only render current slide and adjacent slides for better performance
        const isVisible = index === currentSlide;
        const isAdjacent = index === (currentSlide + 1) % slides.length ||
                          index === (currentSlide - 1 + slides.length) % slides.length;

        if (!isVisible && !isAdjacent && index !== 0) return null;

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              isVisible ? "opacity-100 z-[1]" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              sizes="100vw"
              className="object-cover"
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              quality={index === 0 ? 75 : 60}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-cyan-500/10" />
          </div>
        );
      })}

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,102,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,102,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] z-10" />

      {/* Navigation Arrows */}
      <button
        onClick={() => {
          prevSlide();
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 10000);
        }}
        className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-card/80 backdrop-blur border border-card-border hover:bg-card transition-colors group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-foreground-muted group-hover:text-primary transition-colors" />
      </button>
      <button
        onClick={() => {
          nextSlide();
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 10000);
        }}
        className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-card/80 backdrop-blur border border-card-border hover:bg-card transition-colors group"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-foreground-muted group-hover:text-primary transition-colors" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-1">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="min-w-[24px] min-h-[24px] p-2 flex items-center justify-center"
            aria-label={`Go to slide ${index + 1}`}
          >
            <span className={`block rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-8 h-2 bg-primary"
                : "w-2 h-2 bg-foreground-muted/30 hover:bg-foreground-muted/50"
            }`} />
          </button>
        ))}
      </div>
    </>
  );
}
