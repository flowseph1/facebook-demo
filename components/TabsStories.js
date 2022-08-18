import React from 'react';

function TabsStories({ title, active }) {
    return (
        <div
            className={`m-0 w-60 h-20 items-center flex justify-center text-gray-500 text-lg font-semibold rounded-2xl cursor-pointer hover:bg-gray-100 flex-1 text-center border-[5px] border-white ${
                active && 'text-blue-500 hover:bg-white !rounded-none border-b-6 border-b-blue-500'
            }`}
        >
            {title}
        </div>
    );
}

export default TabsStories;
