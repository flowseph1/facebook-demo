import React, { useEffect, useState } from 'react';
import StoryCard from './StoryCard';
import TabsStories from './TabsStories';

function Stories() {
    // States.
    const [users, setUsers] = useState(null);

    // Effects.
    useEffect(() => {
        const getRandomData = async () => {
            const { results } = await fetch(
                'https://randomuser.me/api/?results=8'
            ).then(data => data.json());

            setUsers(() =>
                results.map(el => ({
                    src: el.picture.large,
                    name: `${el.name.first} ${el.name.last}`,
                    profile: el.picture.medium,
                }))
            );
        };

        getRandomData();
    }, []);

    // Logs.

    return (
        <div className="flex flex-col justify-center space-x-3 mx-auto bg-white rounded-xl shadow-lg">
            <div className="flex justify-around border-b border-gray-200 px-3">
                <TabsStories title={'Stories'} active />
                <TabsStories title={'Reels'} />
                <TabsStories title={'Rooms'} />
            </div>
            <div className="flex flex-nowrap overflow-x-auto space-x-3 py-4 px-2 scrollbar-hide">
                {users &&
                    users.map((story, index) => (
                        <StoryCard
                            key={`${story.src}-${index}`}
                            src={story.src}
                            name={story.name}
                            profile={story.profile}
                        />
                    ))}
            </div>
        </div>
    );
}

export default Stories;
