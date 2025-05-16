import getVideosByID from "@/actions/getVideoById";
import Header from "@/components/Header";
import VideoContent from "../_components/VideoContent";
import getVideos from "@/actions/getVideos";
import { useEffect } from "react";
import VideosContent from "../_components/VideosContent";


const Videos = async ({params}: {params: {id: string}}) => {
    const videos = await getVideos();
    const id = await params?.id
    const video = (await getVideosByID(id))[0]
   


    return ( 
        <div className="bg-neutral-900 p-4 h-full w-full rounded-xl ">
            <Header className="bg-neutral-900">
                <div 
                    className="
                        text-white
                        text-6xl
                        font-semibold
                        "
                    >
                <h1>
                    {video.title}
                </h1>
                <h3 className="font-normal text-xl">
                    By {video.author}
                </h3>
                </div>
            </Header>
            <div className="flex justify-center">
                <div>
                <VideoContent video={process.env.NEXT_SUPABASE_STORAGE_VIDEO_URL + video.video_path}/>
                </div>
            </div>
            <div className="m-4">
                <h5 className="font-semibold text-lg my-4 border-t-2 border-black">More Videos</h5>
                <VideosContent videos={videos}/>
            </div>
        </div>
     );
}
 
export default Videos;