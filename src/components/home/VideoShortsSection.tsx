"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoShort {
  readonly id: string;
  readonly title: string;
}

interface VideoShortsSectionProps {
  videos: readonly VideoShort[];
}

// Generate YouTube thumbnail URL
function getYouTubeThumbnail(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/oar2.jpg`;
}

export function VideoShortsSection({ videos }: VideoShortsSectionProps) {
  const t = useTranslations("common");
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openVideo = useCallback((videoId: string) => {
    setActiveVideo(videoId);
  }, []);

  const closeVideo = useCallback(() => {
    setActiveVideo(null);
  }, []);

  const nextVideo = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  }, [videos.length]);

  const prevVideo = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  }, [videos.length]);

  if (!videos || videos.length === 0) return null;

  return (
    <section className="py-12 md:py-16 bg-background-secondary overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-500 text-sm font-medium mb-4">
            <Play className="h-4 w-4" fill="currentColor" />
            YouTube Shorts
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {t("watchInAction")}
          </h2>
          <p className="text-foreground-muted max-w-2xl mx-auto">
            {t("expertRepairs")}
          </p>
        </div>

        {/* Desktop: Side by side grid */}
        <div className="hidden md:flex justify-center gap-6 max-w-3xl mx-auto">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onPlay={() => openVideo(video.id)}
            />
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden relative">
          <div className="flex justify-center">
            <VideoCard
              video={videos[currentIndex]}
              onPlay={() => openVideo(videos[currentIndex].id)}
              isMobile
            />
          </div>

          {/* Navigation arrows */}
          {videos.length > 1 && (
            <>
              <button
                onClick={prevVideo}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-card-border flex items-center justify-center text-foreground-muted hover:text-primary hover:border-primary/50 transition-colors"
                aria-label="Previous video"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextVideo}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-card-border flex items-center justify-center text-foreground-muted hover:text-primary hover:border-primary/50 transition-colors"
                aria-label="Next video"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Dots indicator */}
          {videos.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {videos.map((video, index) => (
                <button
                  key={video.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex
                      ? "bg-primary"
                      : "bg-foreground-muted/30"
                  }`}
                  aria-label={`Go to video ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={closeVideo}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeVideo}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Close video"
              >
                <X className="h-5 w-5" />
              </button>

              {/* YouTube Shorts embed */}
              <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                  title="YouTube Shorts video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Video Card Component
interface VideoCardProps {
  video: VideoShort;
  onPlay: () => void;
  isMobile?: boolean;
}

function VideoCard({ video, onPlay, isMobile }: VideoCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden bg-card border border-card-border shadow-lg cursor-pointer group ${
        isMobile ? "w-[280px]" : "w-[280px]"
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onPlay}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[9/16] bg-gradient-to-br from-primary/10 to-cyan/10">
        {!imageError ? (
          <Image
            src={getYouTubeThumbnail(video.id)}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="280px"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-cyan/20">
            <Play className="h-12 w-12 text-white/60" />
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Play button */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: isHovered ? 1.1 : 1 }}
        >
          <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:bg-white transition-colors">
            <Play className="h-7 w-7 text-red-500 ml-1" fill="currentColor" />
          </div>
        </motion.div>

        {/* YouTube Shorts badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm">
          <svg
            className="h-4 w-4 text-red-500"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M17.77 10.32l-1.2-.5L18.21 6a1.05 1.05 0 00-.38-1.19 10.39 10.39 0 00-11.66 0A1.05 1.05 0 005.79 6l1.64 3.82-1.2.5A2.61 2.61 0 004.5 12.8c.52 1.73 2.15 2.94 3.96 2.94a4.01 4.01 0 003.15-1.53l1.39 3.23a1.05 1.05 0 001.91 0l1.39-3.23a4.01 4.01 0 003.15 1.53c1.81 0 3.44-1.21 3.96-2.94a2.61 2.61 0 00-1.73-2.48z" />
          </svg>
          <span className="text-white text-xs font-medium">Shorts</span>
        </div>

        {/* Video title */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-white text-sm font-medium line-clamp-2">
            {video.title}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
