"use client";

import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";

interface PageContentProps {
    songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({songs}) => {

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
                    grid
                    grid-cols-2
                    sm:grid-cols-3
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-4
                    2xl:grid-cols-4
                    gap-4
                ">
                    <video className="relative
                                        group
                                        flex
                                        flex-col
                                        items-center
                                        justify-center
                                        rounded-md
                                        overflow-hidden
                                        gap-x-4
                                        bg-neutral-400/5
                                        cursor-pointer
                                        hover:bg-neutral-400/10
                                        transition
                                        p-3" width={300} height={300} controls>
                            <source src="/test.mp4" type="video/mp4"/>
                        No support for vid tag
                    </video>
                    <video width={300} height={300} controls>
                        <source src="/test.mp4" type="video/mp4"/>
                        No support for vid tag
                    </video>
                </div>
            </div>
        );
    }
}

export default PageContent;