import getVideosByTitle from "@/actions/getVideosByTitle";
import Header from "@/components/Header";
import VideoInput from "@/components/VideoInput";
import VideoContent from "./_components/VideosContent";


interface VideoProps {
    searchParams: Promise <{
        title: string
    }>;
};

export const revalidate = 0;

const Videos = async ({searchParams}: VideoProps) => {
    const videos = await getVideosByTitle((await searchParams).title);
    return ( 
        <div className="bg-neutral-900 p-4 h-full w-full rounded-xl">
            <Header className="bg-neutral-900">
                <div className="mb-2 flex flex-col gap-y-6">
                    <h1 className="text-white text-3xl font-semibold">
                        Recent Videos
                    </h1>
                </div>
            </Header>
            
            <div className="mb-2 p-6 flex gap-y-6">
                <div className="mb-2 flex flex-col gap-y-6 w-1/4">
                    <h1 className="text-white text-3xl font-semibold">
                        Search
                    </h1>
                    <VideoInput />
                </div>
                <div>
                    <VideoContent videos={videos} />
                </div>
            </div>
                
            
            <div>
                
            </div>
        </div>
     );
}
 
export default Videos;