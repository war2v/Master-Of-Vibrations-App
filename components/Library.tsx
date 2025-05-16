"use client";
import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist, TbPlaylistAdd, } from "react-icons/tb";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/types";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { PiPlaylist } from "react-icons/pi";

interface LibraryProps {
    songs: Song[];
}

const Library: React.FC<LibraryProps> = ({songs}) => {
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const { user } = useUser();
    const onPlay = useOnPlay(songs);

    const onClick = () => {
        if (!user) {
            return authModal.onOpen();
        }

        // check subs

        return uploadModal.onOpen();
    };

    return (
        <div className="
            flex
            flex-col
        ">
            <div className="
                flex
                flex-col
                gap-y-2
                mt-4
                px-3
            ">
                <div
                    className="
                        flex items-center
                        bg-neutral-800
                        opacity-50
                        rounded-md
                        p-2
                    "
                >
                    <p className=" flex items-center w-full"><PiPlaylist className="text-neutral-400" size={26}/>Library</p> 
                    <div className="flex w-full justify-end">
                        {user?.id === "6ada5bf5-d7eb-46a5-b237-30adeb732a63" &&
                            <TbPlaylistAdd 
                            onClick={onClick}
                            size={20}
                            className="
                                text-purple-400
                                cursor-pointer
                                hover:text-white
                                transition
                            "
                            />
                        }
                    </div>
                </div>
                {songs.map((item) => (
                    <MediaItem 
                        onClick={(id: string) => onPlay(id)}
                        key={item.id}
                        data={item}
                    />
                ))}
            </div>
        </div>
    );
}

export default Library;