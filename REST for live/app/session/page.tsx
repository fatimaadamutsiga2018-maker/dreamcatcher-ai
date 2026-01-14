'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SessionPage() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showEndButton, setShowEndButton] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const endButtonTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Show end button after 5 seconds
    endButtonTimeoutRef.current = setTimeout(() => {
      setShowEndButton(true);
    }, 5000);

    return () => {
      if (endButtonTimeoutRef.current !== null) {
        clearTimeout(endButtonTimeoutRef.current);
      }
    };
  }, []);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleEndSession = () => {
    // Navigate to results page
    router.push('/result');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center relative">
      {/* Minimal UI - Only Play/Pause and End Button */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Play/Pause Button */}
        <button
          onClick={handlePlayPause}
          className="w-20 h-20 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center justify-center mb-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          )}
        </button>

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          src="/demo-audio.mp3"
          onEnded={() => {
            setIsPlaying(false);
            // Auto-navigate to results page after audio ends
            setTimeout(() => {
              router.push('/result');
            }, 2000);
          }}
          className="hidden"
        />

        {/* End Session Button (Hidden initially, appears after 5 seconds) */}
        {showEndButton && (
          <button
            onClick={handleEndSession}
            className="text-gray-400 hover:text-gray-300 text-sm transition-colors mt-8 focus:outline-none"
          >
            End session
          </button>
        )}
      </div>

      {/* Session Rules - No progress bar, no timer, no next button */}
      {/* Background is dark/neutral as specified */}
    </div>
  );
}

