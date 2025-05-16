import getVideosByTitle from "@/actions/getVideosByTitle";
import Header from "@/components/Header";
import VideoInput from "@/components/VideoInput";
import VideoContent from "./_components/VideosContent";
import getVideos from "@/actions/getVideos";


interface VideoProps {
    searchParams: Promise <{
        title: string
    }>;
};

export const revalidate = 0;

const Videos = async ({searchParams}: VideoProps) => {
    const videos    = await getVideosByTitle((await searchParams).title);
    const allVideos = await getVideos();
    return ( 
        <div className="bg-neutral-900 p-4 h-full w-full rounded-xl">
            <Header className="bg-neutral-900">
                <div className="mb-2 flex flex-col gap-y-6">
                    <h1 className="text-white text-3xl font-semibold">
                        Recent Videos
                    </h1>
                </div>
            </Header>
            
            <div className="flex">
                <div className="mb-2 ml-2 px-4 flex flex-col gap-y-2 border-r border-black mr-4 w-1/2 xl:w-1/2 2xl:w-1/4">
                    <div className="mb-2 flex flex-col gap-y-6">
                        <VideoInput />
                    </div>
                    <div>
                        <VideoContent videos={videos} />
                    </div>
                </div>
                    
                
                <div>
                    <div className="mb-2 flex flex-col gap-y-6 w-1/2 lg:w-3/4">
                        <h1 className="text-white text-3xl font-semibold">
                            All Videos
                        </h1>
                    </div>
                    <div>
                        <VideoContent videos={allVideos} />
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Videos;