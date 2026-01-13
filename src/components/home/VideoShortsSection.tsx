"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoShort {
  readonly id: string;
  readonly title: string;
}

interface VideoShortsSectionProps {
  videos: readonly VideoShort[];
}

// Generate YouTube thumbnail URL (maxres for hero, hq for secondary)
function getYouTubeThumbnail(videoId: string, quality: "maxres" | "hq" = "hq"): string {
  // For Shorts, use oar2 (optimized aspect ratio) or sddefault
  return quality === "maxres"
    ? `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`
    : `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

export function VideoShortsSection({ videos }: VideoShortsSectionProps) {
  const t = useTranslations("common");
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const openVideo = useCallback((videoId: string) => {
    setActiveVideo(videoId);
  }, []);

  const closeVideo = useCallback(() => {
    setActiveVideo(null);
  }, []);

  if (!videos || videos.length === 0) return null;

  const heroVideo = videos[0];
  const secondaryVideo = videos[1];

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-background to-background-secondary overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-500 text-sm font-medium mb-4"
          >
            <Play className="h-4 w-4" fill="currentColor" />
            YouTube Shorts
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            {t("watchInAction")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-foreground-muted max-w-2xl mx-auto text-lg"
          >
            {t("expertRepairs")}
          </motion.p>
        </div>

        {/* Hero Video Layout */}
        <div className="max-w-4xl mx-auto">
          {/* Main Featured Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <HeroVideoCard video={heroVideo} onPlay={() => openVideo(heroVideo.id)} />
          </motion.div>

          {/* Secondary Video */}
          {secondaryVideo && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <SecondaryVideoCard video={secondaryVideo} onPlay={() => openVideo(secondaryVideo.id)} />
            </motion.div>
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
            onClick={closeVideo}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeVideo}
                className="absolute -top-14 right-0 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Close video"
              >
                <X className="h-6 w-6" />
              </button>

              {/* YouTube Shorts embed */}
              <div className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden bg-black shadow-2xl ring-1 ring-white/10">
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

// Hero Video Card - Large featured video
interface VideoCardProps {
  video: VideoShort;
  onPlay: () => void;
}

function HeroVideoCard({ video, onPlay }: VideoCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      onClick={onPlay}
      className="relative rounded-3xl overflow-hidden cursor-pointer group bg-gradient-to-br from-primary/5 to-cyan/5 border border-card-border shadow-2xl"
    >
      {/* Aspect ratio container for Shorts (9:16) displayed horizontally */}
      <div className="relative aspect-video md:aspect-[16/10] overflow-hidden">
        {!imageError ? (
          <Image
            src={getYouTubeThumbnail(video.id, "maxres")}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 896px"
            onError={() => setImageError(true)}
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-cyan/20">
            <Play className="h-16 w-16 text-white/60" />
          </div>
        )}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

        {/* Play button - centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:bg-white transition-all duration-300"
          >
            <Play className="h-8 w-8 md:h-10 md:w-10 text-red-500 ml-1" fill="currentColor" />
          </motion.div>
        </div>

        {/* YouTube Shorts badge */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm">
          <svg className="h-5 w-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
          </svg>
          <span className="text-white text-sm font-medium">Shorts</span>
        </div>

        {/* Video title */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <h3 className="text-white text-lg md:text-2xl font-bold mb-1">
            {video.title}
          </h3>
          <p className="text-white/70 text-sm md:text-base">
            Tap to watch
          </p>
        </div>
      </div>
    </div>
  );
}

// Secondary Video Card - Smaller, below the hero
function SecondaryVideoCard({ video, onPlay }: VideoCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      onClick={onPlay}
      className="relative rounded-2xl overflow-hidden cursor-pointer group bg-card border border-card-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Thumbnail */}
        <div className="relative w-full sm:w-48 md:w-64 aspect-video sm:aspect-square overflow-hidden flex-shrink-0">
          {!imageError ? (
            <Image
              src={getYouTubeThumbnail(video.id)}
              alt={video.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, 256px"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-cyan/20">
              <Play className="h-10 w-10 text-white/60" />
            </div>
          )}

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg"
            >
              <Play className="h-5 w-5 text-red-500 ml-0.5" fill="currentColor" />
            </motion.div>
          </div>

          {/* Shorts badge */}
          <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm">
            <svg className="h-3 w-3 text-red-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
            </svg>
            <span className="text-white text-xs font-medium">Shorts</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-5 flex flex-col justify-center">
          <h3 className="font-bold text-base md:text-lg mb-2 group-hover:text-primary transition-colors">
            {video.title}
          </h3>
          <p className="text-foreground-muted text-sm">
            Watch our expert technicians in action
          </p>
          <div className="mt-3 flex items-center gap-2 text-primary text-sm font-medium">
            <Play className="h-4 w-4" fill="currentColor" />
            <span>Watch now</span>
          </div>
        </div>
      </div>
    </div>
  );
}
