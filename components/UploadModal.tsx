"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";
import uniqid from "uniqid";
import { useRouter } from "next/navigation";

import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";


const UploadModal = () =>{
    const song = false;
    const video = true;
    const [uploadType, setUploadType] = useState(song);
    const [isLoading, setIsLoading] = useState(false);
    const uploadModal = useUploadModal();
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const test = ""
    
    

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null,
        }
    });

    const onChange = (open: boolean) => {
        
        if (!open) {
            reset();
            uploadModal.onClose();
        }
    };

    const onSongSubmit: SubmitHandler<FieldValues> = async (values) => {
        console.log(values)
        try {
            setIsLoading(true);

            const imageFile = values.image?.[0];

            const songFile = values.song?.[0];

            const uniqueID = uniqid();

            if(!user){
                
                return toast.error("Error: Not Logged In");
            }

            if(!imageFile){
                console.log(imageFile)
                return toast.error("No Image File. Image is Required");
            }

            if(!songFile){
                
                return toast.error("No song and no video file. Must have atleast one.");
            }

            // ************************** UPLOAD IMAGE TO BUCKET *************************
            const {
                data: imageData,
                error: imageError,
            } = await supabaseClient
                .storage
                .from('images')
                .upload(`image-${values.title}-${uniqueID}`, imageFile, {
                    cacheControl: '3600',
                    upsert: false,
                });

                
            if (imageError) {
                setIsLoading(false);
                return toast.error('Failed to upload image')
            }


            // ********************* UPLOAD SONG TO BUCKET *****************************
            if (songFile) {
                
            
                const {
                    data: songData,
                    error: songError,
                } = await supabaseClient
                    .storage
                    .from('songs')
                    .upload(`song-${values.title}-${uniqueID}`, songFile, {
                        cacheControl: '3600',
                        upsert: false,
                    });

                    if (songError) {
                        setIsLoading(false);
                        return toast.error('Failed to upload song')
                    }
                
                
                
            
                

                // ********************* ADD SONG TO SONG TABLE *************************
                const {
                    error: supabaseError
                } = await supabaseClient
                                .from('songs')
                                .insert({
                                    user_id: user?.id,
                                    title: values.title,
                                    author: values.author,
                                    image_path: imageData.path,
                                    song_path: songData.path
                                });

                if (supabaseError) {
                    setIsLoading(false);
                    return toast.error(supabaseError.message);
                }

            }
            
            
            router.refresh();
            setIsLoading(false);
            toast.success('Song Created!');
            reset();
            uploadModal.onClose();

        } catch (error){
            toast.error("Oops, something went wrong...")
        } finally {
            setIsLoading(false);
        }
    };

    const onVideoSubmit: SubmitHandler<FieldValues> = async (values) => {
        console.log(values)
        try {
            setIsLoading(true);

            const imageFile = values.image?.[0];


            const videoFile = values.video?.[0];

            const uniqueID = uniqid();

            if(!user){
                
                return toast.error("Error: Not Logged In");
            }

            if(!imageFile){
                console.log(imageFile)
                return toast.error("No Image File. Image is Required");
            }

            if(!videoFile){
                
                return toast.error("No video file. Must have atleast one.");
            }

            // ************************** UPLOAD IMAGE TO BUCKET *************************
            const {
                data: imageData,
                error: imageError,
            } = await supabaseClient
                .storage
                .from('images')
                .upload(`image-${values.title}-${uniqueID}`, imageFile, {
                    cacheControl: '3600',
                    upsert: false,
                });

                
            if (imageError) {
                setIsLoading(false);
                return toast.error('Failed to upload image')
            }


            
            console.log("Before video upload")

            // ********************* UPLOAD VIDEO *******************************

            if (videoFile) {
                const {
                    data: videoData,
                    error: videoError
                } = await supabaseClient
                    .storage
                    .from('videos')
                    .upload(`video-${values.title}-${uniqueID}`, videoFile);
    
                if (videoError) {
                    setIsLoading(false);
                    return toast.error('Failed to upload video')
                }
                
                // ********************* ADD VIDEO TO VIDEO TABLE *************************
                console.log("Before video table")
                const {
                    error: supabaseError
                } = await supabaseClient
                    .from('videos')
                    .insert({
                        user_id: user?.id,
                        title: values.title,
                        author: values.author,
                        image_path: imageData.path,
                        video_path: videoData.path
                    });

                if (supabaseError) {
                    setIsLoading(false);
                    return toast.error(supabaseError.message);
                }
    

            }
            
            router.refresh();
            setIsLoading(false);
            toast.success('Video Created!');
            reset();
            uploadModal.onClose();

        } catch (error){
            toast.error("Oops, something went wrong...")
        } finally {
            setIsLoading(false);
        }
    };

     
    return  (
                <Modal 
                title="Upload"
                description="Upload mp3 or wav file"
                isOpen={uploadModal.isOpen}
                onChange={onChange}>
                    <div className="flex w-full justify-center items-center my-4">
                        <div className="flex w-fit justify-center items-center gap-x-4">
                            <Button 
                                className="rounded-xl"
                                disabled={uploadType}
                                onClick={() => {setUploadType(video); console.log(uploadType)}}
                            >
                                Video
                            </Button>
                            <Button 
                                className="rounded-xl"
                                disabled={!uploadType}
                                onClick={() => {setUploadType(song); console.log(uploadType)}}
                            >
                                Song
                            </Button>
                        </div>
                    </div>
                    {
                        uploadType ? (
                            <form
                                onSubmit={handleSubmit(onVideoSubmit)}
                                className="flex flex-col gap-y-2"
                            >
                                <Input 
                                id="title"
                                disabled={isLoading}
                                {...register('title', {required: true})}
                                placeholder="Song title"
                                />
                                <Input 
                                id="author"
                                disabled={isLoading}
                            
                                {...register('author', {required: true})}
                                placeholder="Song Author"
                                />
                                
                                <div>
                                    <div className="pb-1">
                                        Select Video File
                                    </div>
                                    <Input 
                                    id="video"
                                    type="file"
                                    disabled={isLoading}
                                    {...register('video')}
                                    accept="video/*"
                                    />
                                </div>
                                <div>
                                    <div className="pb-1">
                                        Select an Image
                                    </div>
                                    <Input 
                                    id="image"
                                    type="file"
                                                    disabled={isLoading}
                                    {...register('image', {required: true})}
                                    accept="image/*"
                                    />
                                </div>
                                <Button 
                                    disabled={isLoading}
                                    type="submit">
                                    Create
                                </Button>
                            </form>
                        )
                        
                        : 
                        
                        (
                            <form
                            onSubmit={handleSubmit(onSongSubmit)}
                            className="flex flex-col gap-y-2"
                            >
                                <Input 
                                id="title"
                                disabled={isLoading}
                                {...register('title', {required: true})}
                                placeholder="Song title"
                                />
                                <Input 
                                id="author"
                                disabled={isLoading}
                            
                                {...register('author', {required: true})}
                                placeholder="Song Author"
                                />
                                <div>
                                    <div className="pb-1">
                                        Select Song File
                                    </div>
                                    <Input 
                                    id="song"
                                    type="file"
                                                disabled={isLoading}
                                    {...register('song')}
                                    accept=".mp3"
                                    />
                                </div>
                                <div>
                                    <div className="pb-1">
                                        Select an Image
                                    </div>
                                    <Input 
                                    id="image"
                                    type="file"
                                                    disabled={isLoading}
                                    {...register('image', {required: true})}
                                    accept="image/*"
                                    />
                                </div>
                                <Button 
                                    disabled={isLoading}
                                    type="submit">
                                    Create
                                </Button>
                            </form>
                        )
                    }
                </Modal>
            );
    
    
    
};

export default UploadModal;