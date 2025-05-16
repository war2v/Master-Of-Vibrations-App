"use client";

import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";

interface RecentSongProps {
    songs: Song[],
}
const RecentSongs = ({songs}: RecentSongProps) => {
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
    }

    return ( 
        <div className="w-full grid grid-cols-2 md:grid-cols-5 border-4 border-neutral-800 p-5 rounded-xl">
            {songs.map((item) => (
                <SongItem 
                    key={item.id}
                    onClick={(id: string) => onPlay(id)}
                    data={item}
                />
            ))}
        </div>
     );
}
 
export default RecentSongs;