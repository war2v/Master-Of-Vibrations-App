"use client";


import getVideosByID from "@/actions/getVideoById";
import getVideos from "@/actions/getVideos";
import VideoItem from "@/components/VideoItem";
import { Video } from "@/types";


import { useRouter } from "next/navigation";
import { stringify } from "querystring";
import { useEffect, useState } from "react";


interface VideoContentProps {
    video: string,
}



const VideoContent: React.FC<VideoContentProps> = ({video}) => {
    
    return (
        <div
            className="
                        flex
                        flex-col
                        justify-center
                        items-center
                        gap-y-2
                        w-full
                        bg-neutral-800 
                        p-4 
                        rounded-xl
            "
            >
                <video className="rounded-xl" src={video} height={300} width={700} controls>
                    No format support
                </video>
                
                
            </div>
        );
    
}

export default VideoContent;
