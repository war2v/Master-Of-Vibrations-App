import { Video } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getVideos from "./getVideos";


const getVideosByTitle = async (title: string): Promise<Video[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    if (!title) {
        const allVideos = await getVideos();
        return allVideos
    }
    const {data, error} = await supabase
        .from('videos')
        .select('*')
        .ilike('title', `%${title}%`)
        .order('created_at', { ascending: false });

    if (error) {
        console.log(error);
    }

    return (data as any) || [];
}

export default getVideosByTitle;