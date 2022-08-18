import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import {
    CameraIcon,
    EmojiHappyIcon,
    VideoCameraIcon,
} from '@heroicons/react/solid';

import { db } from '../firebase';
import {
    addDoc,
    collection,
    doc,
    getDocs,
    Timestamp,
    updateDoc,
} from 'firebase/firestore';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadString,
} from 'firebase/storage';

function InputBox() {
    // States.
    const [imageToPost, setImageToPost] = useState(null);

    // Referencias.
    const postsRef = collection(db, 'posts');
    const storageRef = getStorage();
    const inputRef = useRef();
    const filePickerRef = useRef();

    // User variable.
    const session = useSession();

    // Functions
    const sendPost = async e => {
        e.preventDefault();

        if (!inputRef.current.value) return;

        await addDoc(postsRef, {
            message: inputRef.current.value,
            name: session.data.user.name,
            email: session.data.user.email,
            image: session.data.user.image,
            timestamp: Timestamp.now(),
        }).then(async docRef => {
            if (imageToPost) {
                const imageRef = ref(storageRef, `posts/${docRef.id}`);
                uploadString(imageRef, imageToPost, 'data_url')
                    .then(async snapshot => {
                        const downloadUrl = await getDownloadURL(imageRef);
                        await updateDoc(docRef, {
                            postImage: downloadUrl,
                        });
                    })
                    .catch(err => console.log(err));
            }
        });

        // Clear Inputs and States.
        inputRef.current.value = '';
        removeImage();
    };

    const addImagenToPost = async e => {
        const reader = new FileReader();

        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = readerEvent => {
            setImageToPost(readerEvent.target.result);
        };
    };

    const removeImage = () => {
        setImageToPost(null);
    };

    // Logs.
    // console.log(process.env.FIREBASE_AUTH_DOMAIN);

    return (
        <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
            <div className="flex space-x-4 p-4 items-center">
                {session?.data && (
                    <Image
                        className="rounded-full"
                        src={session?.data?.user?.image}
                        alt=""
                        width="40"
                        height="40"
                        layout="fixed"
                    />
                )}
                <form className="flex flex-1">
                    <input
                        ref={inputRef}
                        className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
                        type="text"
                        placeholder={`What's on your mind, ${session?.data?.user?.name}?`}
                    />
                    <button hidden type="submit" onClick={sendPost}>
                        Submit
                    </button>
                </form>

                {imageToPost && (
                    <div
                        onClick={removeImage}
                        className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
                    >
                        <img
                            className="h-10 object-contain"
                            src={imageToPost}
                            alt=""
                        />
                        <p className="text-xs text-red-500 text-center">
                            Remove
                        </p>
                    </div>
                )}
            </div>

            <div className="flex justify-evenly p-3 border-t">
                <div className="inputIcon">
                    <VideoCameraIcon className="h-7 text-red-500" />
                    <p className="text-xs sm:text-sm xl:text-base">
                        Live Video
                    </p>
                </div>
                <div
                    className="inputIcon"
                    onClick={() => filePickerRef.current.click()}
                >
                    <CameraIcon className="h-7 text-green-400" />
                    <p className="text-xs sm:text-sm xl:text-base">
                        Photo/Video
                    </p>
                    <input
                        type="file"
                        hidden
                        onChange={addImagenToPost}
                        ref={filePickerRef}
                    />
                </div>
                <div className="inputIcon">
                    <EmojiHappyIcon className="h-7 text-yellow-300" />
                    <p className="text-xs sm:text-sm xl:text-base">
                        Feeling/Activity
                    </p>
                </div>
            </div>
        </div>
    );
}

export default InputBox;
