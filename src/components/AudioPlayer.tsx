"use client"

import {useRef, useState} from "react";
import srtParser2 from "srt-parser-2";

export default function AudioPlayer({srt, audio}: {
    srt: ReturnType<typeof srtParser2.prototype.fromSrt>,
    audio: string
}) {
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [srtIndex, setSrtIndex] = useState(0);

    const handleTimeUpdate = () => {
        if (audioRef.current && audioRef.current.currentTime) {
            srt.map((obj, index) => {
                if (audioRef.current && audioRef.current.currentTime >= obj.startSeconds && audioRef.current.currentTime <= obj.endSeconds) {
                    setSrtIndex(index);
                }
            })
            console.log(srtIndex)
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    // Format time in seconds to MM:SS format
    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="space-y-4">
                    <audio
                        ref={audioRef}
                        controls
                        onDurationChange={handleTimeUpdate}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        className="w-full"
                    >
                        <source src={audio} type="audio/wav"/>
                        Your browser does not support the audio element.
                    </audio>

                    <div className="text-center space-y-2">
                        <div className="text-lg font-medium">
                            Current Time: {formatTime(currentTime)}
                        </div>
                        <div className="text-sm text-gray-600">
                            Duration: {formatTime(duration)}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-blue-600 h-2.5 rounded-full transition-all"
                                style={{width: `${(currentTime / duration) * 100}%`}}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {
                    srt.map((obj, index) => {
                        if (index <= srtIndex) {
                            return (
                                <div key={index} className={`py-2 ${srtIndex === index ? 'bg-gray-100' : ''}`}>
                                    <div className="text-gray-600">
                                        {obj.text}
                                    </div>
                                </div>
                            );
                        }
                    })
                }
            </div>
        </>
    );
}