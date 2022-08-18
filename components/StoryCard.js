import React from 'react';
import Image from 'next/image';

function StoryCard({ name, src, profile }) {
    return (
        <div className="relative flex-shrink-0 h-14 w-14 md:h-20 md:w-20 lg:h-56 lg:w-32 cursor-pointer overflow-hidden p-3 rounded-xl">
            <div className="hidden lg:inline-flex md:border-4 md:border-blue-500 absolute z-50 rounded-full leading-none">
                <Image
                    className="absolute opacity-0 lg:opacity-100 rounded-full z-50 top-10"
                    src={profile}
                    width={40}
                    height={40}
                    layout="fixed"
                    objectFit="cover"
                    alt=""
                />
            </div>
            <Image
                className="object-cover filter brightness-75 rounded-full lg:rounded-xl transform ease-in hover:scale-[1.02] transition hover:brightness-[0.65]"
                src={src}
                layout="fill"
                alt=""
            />
            <p className="absolute opacity-0 lg:opacity-100 bottom-4 w-5/6 text-white text-sm font-bold truncate">
                {name}
            </p>
        </div>
    );
}

export default StoryCard;
