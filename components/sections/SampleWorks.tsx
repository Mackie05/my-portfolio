"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Volume2, VolumeX } from "lucide-react";

const videos = [
  {
    id: 1,
    title: "Storytelling Edit",
    platform: "TikTok / Reels",
    views: "2.4M views",
    src: "https://res.cloudinary.com/dtnfg5rly/video/upload/v1778550670/Crimeshort_Story_Telling_xwgugw.mp4",
    duration: "0:15",
  },
  {
    id: 2,
    title: "Talking Head Edit",
    platform: "TikTok / Reels",
    views: "1.8M views",
    src: "https://res.cloudinary.com/dtnfg5rly/video/upload/v1778550669/Short_V1_Motion_Graphics_zpetim.mp4",
    duration: "0:22",
  },
  {
    id: 3,
    title: "Podcast Edit",
    platform: "Instagram / YouTube Shorts",
    views: "890K views",
    src: "https://res.cloudinary.com/dtnfg5rly/video/upload/v1778550669/Short_V2_Podcast_xckgwf.mp4",
    duration: "0:18",
  },
  {
    id: 4,
    title: "Talking Head Edit",
    platform: "Instagram / YouTube Shorts",
    views: "890K views",
    src: "https://res.cloudinary.com/dtnfg5rly/video/upload/v1778784980/Short_V3_ei8c23.mp4",
    duration: "0:24",
  },
];

const allVideos = Array(20).fill(videos).flat();

function VideoModal({ video, onClose }: { video: typeof videos[0]; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.2);
  const [showVolume, setShowVolume] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.volume = 0.2;
      v.muted = true;
    }
    v?.play();
  }, []);

  const applyVolume = (newVol: number) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolume(clamped);
    setIsMuted(clamped === 0);
    if (videoRef.current) {
      videoRef.current.volume = clamped;
      videoRef.current.muted = clamped === 0;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        const newVol = volume > 0 ? volume : 0.2;
        applyVolume(newVol);
      } else {
        applyVolume(0);
      }
    }
  };

  const handleTrackMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = rect.bottom - e.clientY;
    const pct = Math.max(0, Math.min(1, y / 80));
    applyVolume(pct);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
      
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
        className="relative z-10 w-full max-w-[400px] rounded-3xl overflow-hidden shadow-2xl bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[9/16]">
          <video
            ref={videoRef}
            src={video.src}
            className="w-full h-full object-cover"
            loop
            playsInline
            muted={isMuted}
          />
          
          {/* Volume Control - Bottom Right */}
          <div 
            className="absolute bottom-4 right-4 z-20 flex flex-col items-center"
            onMouseEnter={() => setShowVolume(true)}
            onMouseLeave={() => setShowVolume(false)}
          >
            {/* Slider Track */}
            <motion.div
              initial={false}
              animate={{ 
                height: showVolume ? 80 : 0,
                opacity: showVolume ? 1 : 0,
                marginBottom: showVolume ? 8 : 0
              }}
              transition={{ duration: 0.15 }}
              className="relative overflow-hidden"
              style={{ width: '28px' }}
            >
              {/* Track Background */}
              <div 
                className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[3px] bg-white/25 rounded-full"
                style={{ height: '80px' }}
              />
              
              {/* Fill */}
              <div 
                className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[3px] bg-white rounded-full pointer-events-none"
                style={{ height: `${volume * 80}px` }}
              />
              
              {/* Thumb */}
              <div 
                className="absolute left-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md pointer-events-none"
                style={{ 
                  bottom: `${volume * 80 - 7}px`,
                  marginLeft: '-7px'
                }}
              />
              
              {/* Invisible Hit Area */}
              <div
                className="absolute inset-0 cursor-pointer"
                style={{ width: '28px', height: '80px' }}
                onMouseDown={handleTrackMouse}
                onMouseMove={(e) => {
                  if (e.buttons === 1) handleTrackMouse(e);
                }}
              />
            </motion.div>

            {/* Volume Icon */}
            <button
              onClick={toggleMute}
              className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4 text-white" />
              ) : (
                <Volume2 className="h-4 w-4 text-white" />
              )}
            </button>
          </div>
        </div>
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
      </motion.div>
    </motion.div>
  );
}

function VideoCard({ video, onClick }: { video: typeof videos[0]; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative flex-shrink-0 w-[260px] md:w-[300px] cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      onHoverStart={() => {
        setIsHovered(true);
        videoRef.current?.play();
      }}
      onHoverEnd={() => {
        setIsHovered(false);
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
      onClick={onClick}
    >
      <div className="relative aspect-[9/16] rounded-3xl overflow-hidden bg-black">
        <video
          ref={videoRef}
          src={video.src}
          className="absolute inset-0 w-full h-full object-cover"
          preload="metadata"
          muted
          playsInline
          loop
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none" />
        
        {!isHovered && (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Play className="h-5 w-5 fill-white text-white ml-0.5" />
            </div>
          </div>
        )}
        
        <div className="absolute bottom-3 left-3 z-20 pointer-events-none">
          <span className="text-[10px] font-medium text-white/80 tracking-wider uppercase bg-black/40 px-2 py-1 rounded-md">
            {video.duration}
          </span>
        </div>
      </div>

      <div className="mt-3 px-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-medium text-accent tracking-wider uppercase">
            {video.platform}
          </span>
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

  useEffect(() => {
    const calculateWidth = () => {
      const totalWidth = trackRef.current?.scrollWidth || 0;
      setWidthRef.current = totalWidth / 20;
      translateXRef.current = -setWidthRef.current * 10;
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${translateXRef.current}px)`;
      }
    };
    setTimeout(calculateWidth, 100);
  }, []);

  const wrapPosition = useCallback((pos: number, W: number) => {
    const min = -W * 18;
    const max = -W * 2;
    let wrapped = pos;
    while (wrapped < min) wrapped += W * 16;
    while (wrapped > max) wrapped -= W * 16;
    return wrapped;
  }, []);

  useEffect(() => {
    let animationId: number;

    const animate = () => {
      if (!isHoveredRef.current && !hasModalRef.current && !isDraggingRef.current) {
        const W = setWidthRef.current;
        if (W > 0) {
          translateXRef.current -= 0.4;
          translateXRef.current = wrapPosition(translateXRef.current, W);
          if (trackRef.current) {
            trackRef.current.style.transform = `translateX(${translateXRef.current}px)`;
          }
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [wrapPosition]);

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
    
    if (W > 0) {
      translateXRef.current = wrapPosition(translateXRef.current, W);
      translateStartRef.current = translateXRef.current - walk;
    }
    
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${translateXRef.current}px)`;
    }
  }, [wrapPosition]);

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