import { Video } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadImage = (video: Video) => {
    const supabaseClient = useSupabaseClient();
    if (!video) {
        return null;
    }

    const {data: imageData} = supabaseClient
        .storage
        .from('images')
        .getPublicUrl(video.image_path);

    return imageData.publicUrl;
};

export default useLoadImage;