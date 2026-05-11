"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

const videos = [
  {
    id: 1,
    title: "Viral Hook Series #1",
    platform: "TikTok / Reels",
    views: "2.4M views",
    thumbnail: "/images/video-1.jpg",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID_1?autoplay=1&mute=0",
    duration: "0:15",
  },
  {
    id: 2,
    title: "Trend Jacking Campaign",
    platform: "TikTok / Reels",
    views: "1.8M views",
    thumbnail: "/images/video-2.jpg",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID_2?autoplay=1&mute=0",
    duration: "0:22",
  },
  {
    id: 3,
    title: "UGC Remix Edit",
    platform: "Instagram / YouTube Shorts",
    views: "890K views",
    thumbnail: "/images/video-3.jpg",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID_3?autoplay=1&mute=0",
    duration: "0:18",
  },
  {
    id: 4,
    title: "Product Teaser",
    platform: "TikTok / Reels",
    views: "3.1M views",
    thumbnail: "/images/video-4.jpg",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID_4?autoplay=1&mute=0",
    duration: "0:30",
  },
  {
    id: 5,
    title: "Behind the Scenes",
    platform: "Instagram / YouTube Shorts",
    views: "1.2M views",
    thumbnail: "/images/video-5.jpg",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID_5?autoplay=1&mute=0",
    duration: "0:45",
  },
  {
    id: 6,
    title: "Day in the Life",
    platform: "TikTok / Reels",
    views: "5.7M views",
    thumbnail: "/images/video-6.jpg",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID_6?autoplay=1&mute=0",
    duration: "0:20",
  },
];

// 5 identical sets for seamless infinite loop
const allVideos = [...videos, ...videos, ...videos, ...videos, ...videos];

function VideoModal({ video, onClose }: { video: typeof videos[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
      
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        <X className="h-5 w-5 text-white" />
      </button>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="relative z-10 w-full max-w-[400px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={video.videoUrl}
          title={video.title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="absolute bottom-8 left-0 right-0 text-center z-10"
      >
        <p className="text-xs text-white/50 tracking-wider uppercase mb-1">{video.platform}</p>
        <h3 className="text-lg font-semibold text-white">{video.title}</h3>
        <p className="text-sm text-white/60 mt-1">{video.views}</p>
      </motion.div>
    </motion.div>
  );
}

function VideoCard({ video, onClick }: { video: typeof videos[0]; onClick: () => void }) {
  return (
    <motion.div
      className="relative flex-shrink-0 w-[260px] md:w-[300px] cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      onClick={onClick}
    >
      <div className="relative aspect-[9/16] rounded-3xl overflow-hidden bg-muted">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs text-muted-foreground/50">[{video.thumbnail}]</span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
            <Play className="h-5 w-5 fill-white text-white ml-0.5" />
          </div>
        </div>
        <div className="absolute bottom-3 left-3 z-20">
          <span className="text-[10px] font-medium text-white/80 tracking-wider uppercase">
            {video.duration}
          </span>
        </div>
      </div>

      <div className="mt-3 px-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-medium text-accent tracking-wider uppercase">
            {video.platform}
          </span>
          <span className="text-[10px] text-muted-foreground">{video.views}</span>
        </div>
        <h3 className="text-sm font-semibold leading-snug text-foreground/90">{video.title}</h3>
      </div>
    </motion.div>
  );
}

export function SampleWorks() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null);
  
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const hasModalRef = useRef(false);
  const dragStartRef = useRef(0);
  const translateStartRef = useRef(0);
  const didDragRef = useRef(false);
  const translateXRef = useRef(0);
  const setWidthRef = useRef(0);

  useEffect(() => {
    hasModalRef.current = !!selectedVideo;
  }, [selectedVideo]);

  // Calculate set width after mount
  useEffect(() => {
    const calculateWidth = () => {
      const totalWidth = trackRef.current?.scrollWidth || 0;
      setWidthRef.current = totalWidth / 5;
      // Start at set 3 (middle)
      translateXRef.current = -setWidthRef.current * 2;
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${translateXRef.current}px)`;
      }
    };
    setTimeout(calculateWidth, 100);
  }, []);

  // Smooth auto-scroll with transform (no scrollLeft = no mirage)
  useEffect(() => {
    let animationId: number;

    const animate = () => {
      if (!isHoveredRef.current && !hasModalRef.current && !isDraggingRef.current) {
        const W = setWidthRef.current;
        if (W > 0) {
          translateXRef.current -= 0.4; // Constant speed, no jumps
          
          // Seamless wrap: when we scroll past set 4, jump back to set 3
          if (translateXRef.current <= -W * 4) {
            translateXRef.current += W;
          }
          // Seamless wrap: when we scroll before set 2, jump forward to set 3
          if (translateXRef.current > -W) {
            translateXRef.current -= W;
          }
          
          if (trackRef.current) {
            trackRef.current.style.transform = `translateX(${translateXRef.current}px)`;
          }
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDraggingRef.current = true;
    didDragRef.current = false;
    dragStartRef.current = e.pageX;
    translateStartRef.current = translateXRef.current;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    
    const walk = (e.pageX - dragStartRef.current) * 1.5;
    if (Math.abs(e.pageX - dragStartRef.current) > 5) {
      didDragRef.current = true;
    }
    
    const W = setWidthRef.current;
    translateXRef.current = translateStartRef.current + walk;
    
    // Wrap during drag
    if (W > 0) {
      if (translateXRef.current <= -W * 4) translateXRef.current += W;
      if (translateXRef.current > -W) translateXRef.current -= W;
    }
    
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${translateXRef.current}px)`;
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  const handleClick = useCallback((video: typeof videos[0]) => {
    if (!didDragRef.current) {
      setSelectedVideo(video);
    }
  }, []);

  return (
    <>
      <section className="py-24 bg-background">
        <div className="px-6 max-w-7xl mx-auto mb-10">
          <p className="text-xs font-medium text-muted-foreground tracking-[0.2em] uppercase mb-3">
            Sample Works
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            The edit room.
          </h2>
        </div>

        {/* Carousel Container */}
        <div
          className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
          onMouseEnter={() => { isHoveredRef.current = true; }}
          onMouseLeave={() => { 
            isHoveredRef.current = false; 
            isDraggingRef.current = false; 
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <div
            ref={trackRef}
            className="flex gap-4 px-6 will-change-transform"
            style={{ transform: "translateX(0px)" }}
          >
            {allVideos.map((video, index) => (
              <VideoCard
                key={`${video.id}-${index}`}
                video={video}
                onClick={() => handleClick(video)}
              />
            ))}
          </div>
        </div>

        <div className="px-6 max-w-7xl mx-auto mt-8">
          <p className="text-xs text-muted-foreground/40 tracking-wide">
            Drag to explore · Click to watch
          </p>
        </div>
      </section>

      <AnimatePresence>
        {selectedVideo && (
          <VideoModal
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}