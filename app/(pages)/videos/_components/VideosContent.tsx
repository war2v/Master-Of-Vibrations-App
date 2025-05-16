"use client";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import VideoItem from "@/components/VideoItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Video } from "@/types";

interface VideosContentProps {
    videos: Video[];
}


const VideosContent: React.FC<VideosContentProps> = ({videos}) => {

    if (videos.length === 0){
        return (
            <div
                className="
                    flex
                    flex-col
                    gap-y-2
                    w-full
                    px-6
                    text-neutral-400
                "
            >
                No videos found.
            </div>
        )
    }
    return (
        <div
            className="
                        flex
                        flex-col
                        gap-y-2
                        w-full
            "
            >
                {videos.map((video) => (
                    <div
                    key={video.id}
                    className="flex items-center gap-x-4 w-full"
                    >
                        <div
                        className="
                            grid
                            grid-cols-4
                        ">
                            <VideoItem
                            onClick={(id: string) => {console.log(id)}}
                            data={video}
                            />
                        </div>

                    </div>
                ))}
            </div>
        );
    
}

export default VideosContent;
