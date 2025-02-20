import { Video } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


const getVideosByID = async (id: string): Promise<Video[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });
    

    const { data, error } = await supabase
        .from('videos')
        .select('*')
        .eq('id', id);

    if (error) {
        console.log(error.message);
    }

    return (data as any) || [];
};

export default getVideosByID;