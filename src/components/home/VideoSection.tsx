"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoSectionProps {
  videoId?: string; // YouTube video ID
  videoUrl?: string; // Direct video URL (mp4, etc.)
}

export function VideoSection({ videoId, videoUrl }: VideoSectionProps) {
  const t = useTranslations("common");
  const [isPlaying, setIsPlaying] = useState(false);

  // Don't render if no video provided
  const hasVideo = videoId || videoUrl;
  if (!hasVideo) return null;

  return (
    <section className="py-16 bg-background-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {t("watchVideo")}
          </h2>
          <p className="text-foreground-muted max-w-2xl mx-auto">
            {t("expertRepairs")}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-cyan/10 border border-card-border">
            {!isPlaying ? (
              // Thumbnail/Play Button State
              <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                onClick={() => hasVideo && setIsPlaying(true)}
              >
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-cyan/20" />

                {/* Play button */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:bg-white transition-colors"
                >
                  <Play className="h-8 w-8 md:h-10 md:w-10 text-primary ml-1" fill="currentColor" />
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-white/20 animate-pulse" />
                </div>

                {/* Brand text */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                  <span className="text-white/80 text-sm font-medium">
                    GENIUS TECH
                  </span>
                  <span className="text-white/60 text-xs">
                    Dubai&apos;s Fastest Device Repair
                  </span>
                </div>
              </div>
            ) : (
              // Video Playing State
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0"
                >
                  {/* Close button */}
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  {videoId ? (
                    // YouTube Embed
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                      title="Genius Tech Promo Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  ) : videoUrl ? (
                    // Direct Video
                    <video
                      src={videoUrl}
                      autoPlay
                      controls
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : null}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
