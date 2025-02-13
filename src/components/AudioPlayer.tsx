"use client";

import { useRef, useState, useEffect } from "react";
import srtParser2 from "srt-parser-2";
import Cookies from "js-cookie";
import { Button } from "./ui/button";
import { Pause, Play } from "lucide-react";

export default function AudioPlayer({
  srt,
  audio,
  questionNumber,
}: {
  srt: ReturnType<typeof srtParser2.prototype.fromSrt>;
  audio: string;
  questionNumber: string;
}) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [srtIndex, setSrtIndex] = useState(0);
  const [isFirstPlay, setIsFirstPlay] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Check if the audio has been fully played before for the given question
  useEffect(() => {
    const playedBefore = Cookies.get(`audioPlayed_${questionNumber}`);
    setIsFirstPlay(!playedBefore);

    if (audioRef.current) {
      // Set initial currentTime and duration when component mounts
      setCurrentTime(audioRef.current.currentTime || 0);
      setDuration(audioRef.current.duration || 0);
    }
  }, [questionNumber]);

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

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      setCurrentTime(current);

      srt.map((obj, index) => {
        if (current >= obj.startSeconds && current <= obj.endSeconds) {
          setSrtIndex(index);
        }
      });

      // Check if audio has been played completely
      if (current === duration) {
        Cookies.set(`audioPlayed_${questionNumber}`, "true", { expires: 1 });
        setIsFirstPlay(false);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = Number(event.target.value);
    // Only allow seeking if it's not the first play or if the seek time is backward
    if (!isFirstPlay || seekTime <= currentTime) {
      if (audioRef.current) {
        audioRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
      }
    }
  };

  // Format time in seconds to MM:SS format
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <div className="rounded-lg shadow-md">
        <div className="flex items-center space-x-4 bg-gray-900 text-white p-4 rounded-lg space-y-4">
          <audio
            ref={audioRef}
            src={audio}
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />
            <Button
              onClick={handlePlayPause}
              className="ext-white hover:text-gray-300"
              variant="ghost"
              size="icon"
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="w-full max-w-md"
              disabled={isFirstPlay && currentTime < duration}
            />
            <div className="text-sm tabular-nums whitespace-nowrap">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
        </div>
      </div>
      <div>
        {srt.map((obj, index) => {
          if (index <= srtIndex) {
            return (
              <div
                key={index}
                className={`p-2 rounded ${
                  srtIndex === index ? "border" : ""
                }`}
              >
                <div
                  className={`${
                    srtIndex === index ? "text-gray-500" : "text-gray-600"
                  }`}
                >
                  {obj.text}
                </div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
}
