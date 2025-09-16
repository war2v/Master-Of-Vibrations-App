import { Rubik_Glitch } from "next/font/google";
import RecentSongs from "./_components/RecentSongs";
import getSongs from "@/actions/getSongs";
import Link from "next/link";

export const revalidate = 0;

const rubicGlitch = Rubik_Glitch({
  weight: "400",
  subsets: ["latin"],
})

export default async function Home() {
  const songs = await getSongs();
  return (
    <div className="flex flex-col items-center w-screen my-2">
      <div className="w-full max-w-screen-2xl">
        <div
          className="
          rounded-lg
          h-full
          w-full
          overflow-hidden
          overflow-y-auto
        "
        >
          <div className="flex flex-col bg-neutral-900 items-center justify-center h-screen rounded-xl">
              <div className={`text-9xl ${rubicGlitch.className} motion-scale-in-[0.07] motion-translate-x-in-[-121%] motion-translate-y-in-[-7%] motion-opacity-in-[46%] motion-rotate-in-[37deg] motion-blur-in-[15px] motion-duration-[1.50s] motion-duration-[1.60s]/opacity motion-duration-[1.56s]/blur motion-ease-spring-bouncy`}>
                <h1 className="text-purple-500 hover:scale-110 transition">
                  <Link href={"/music"} className="animate-pulse">MOV DARIU</Link>
                </h1>
              </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className={`py-5 text-3xl ${rubicGlitch.className}`}>New Releases</h1>
          <RecentSongs songs={songs} />
        </div>
      </div>
    </div>
  );
}
