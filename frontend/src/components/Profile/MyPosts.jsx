import React, { useState } from 'react';
import { ChevronLeft, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../../Context/GlobalContext';
import { usePosts } from '../../Context/PostContext';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import toast from 'react-hot-toast';

export default function MyPosts() {

    // eslint-disable-next-line no-unused-vars
    const { user } = useGlobal();
    const { posts, deletePost } = usePosts();
    const [deletingId, setDeletingId] = useState(null);


    const navigate = useNavigate();

    const sampleImage = 'https://i.pravatar.cc/150?img=5';

    const DeletePost = async (postId) => {
        setDeletingId(postId);
        //try {
        //    const res = await deletePost(postId)
        //    if (res.data.success) {
        //        toast.success('Post is Deleted');

        //    }
        //}
        //catch (error) {
        //    console.log('Error to delete Post', error.message);
        //}
        await toast.promise(
            deletePost(postId),   // your context function
            {
                loading: "Deleting post...",
                success: "Post deleted successfully",
                error: "Failed to delete post"
            }
        );
        setDeletingId(null);
    }


    return (
        <>
            <div className='mt-4 px-2'>
                <ChevronLeft size={30} onClick={() => { navigate('/settings') }} />
            </div>

            <div className="flex h-full w-full flex-col gap-2 px-2 pt-6 pb-2">

                <h1 className="px-2 text-2xl font-bold">MyPosts</h1>

                {/* Theme */}
                <div className="relative mt-3 flex flex-wrap gap-2.5 rounded-lg border border-gray-600 p-4">
                    {posts.length === 0 ? (
                        <p className="mx-auto text-sm text-gray-400">
                            No Posts Found
                        </p>
                    ) : (
                        posts.map((post) => (
                            <div
                                key={post._id}
                                className="relative h-24 w-24 overflow-hidden rounded-md border border-gray-600"
                            >
                                <img
                                    src={post.image}
                                    alt="post"
                                    className="h-24 w-24 rounded-md object-contain"
                                />

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Trash
                                            className="absolute right-0 bottom-0 cursor-pointer p-1"
                                            fill="red"
                                        />
                                    </AlertDialogTrigger>

                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Are you absolutely sure?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete your
                                                post and remove it from our servers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>

                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                                className="hover:bg-red-500 hover:text-white"
                                                onClick={() => DeletePost(post._id)}
                                                disabled={deletingId === post._id}
                                            >
                                                {deletingId === post._id ? "Deleting..." : "Continue"}
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        ))
                    )}
                </div>

            </div>

            <div className="flex h-full w-full flex-col gap-2 p-2">

                <h1 className="px-2 text-2xl font-bold">Following</h1>

                {/* Theme */}
                <div className="space-y-3 rounded-lg border border-gray-600 p-4">
                    <img src={sampleImage} className='h-24 w-24 rounded-md' />

                </div>
            </div>
            <div className="flex h-full w-full flex-col gap-2 p-2">

                <h1 className="px-2 text-2xl font-bold">Followers</h1>

                {/* Theme */}
                <div className="space-y-3 rounded-lg border border-gray-600 p-4">
                    <img src={sampleImage} className='h-24 w-24 rounded-md' />

                </div>
            </div>
           

        </>
    )
}