import { Video } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


const getVideos = async (): Promise<Video[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const {data, error} = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.log(error);
    }

    return (data as any) || [];
}

export default getVideos;