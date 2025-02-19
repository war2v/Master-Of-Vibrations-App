"use client";

import SongItem from "@/components/SongItem";
import VideoItem from "@/components/VideoItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Song,Video } from "@/types";

interface PageContentProps {
    songs: Song[];
    videos: Video[];
}

const PageContent: React.FC<PageContentProps> = ({songs, videos}) => {

    const onPlay = useOnPlay(songs);
    
    if (songs.length === 0) {
        return (
            <div 
                className="
                    mt-4 text-neutral-400
                ">
                No Songs Available
            </div>
        );
    } else {
        return (
            <div className="flex gap-x-4  mt-4">
                <div 
                    className="
                        w-1/2
                        border-r
                        pr-4
                        border-black
                        grid
                        grid-cols-2
                        sm:grid-cols-3
                        md:grid-cols-3
                        lg:grid-cols-4
                        xl:grid-cols-4
                        2xl:grid-cols-4
                        gap-4
                    ">
                        {songs.map((item) => (
                            <SongItem
                                key={item.id}
                                onClick={(id: string) => onPlay(id)}
                                data={item}
                            />
                        ))}
                </div>
                <div 
                    className="
                    w-1/2
                    grid
                    grid-cols-2
                    sm:grid-cols-3
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-4
                    2xl:grid-cols-4
                    gap-4
                ">
                    {videos.map((item) => (
                            <VideoItem
                                key={item.id}
                                onClick={(id: string) => onPlay(id)}
                                data={item}
                            />
                        ))}
                    
                </div>
            </div>
        );
    }
}

export default PageContent;