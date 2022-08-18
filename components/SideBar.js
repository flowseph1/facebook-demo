import React from 'react';
import { useSession } from 'next-auth/react';
import {
    CalendarIcon,
    ClockIcon,
    DesktopComputerIcon,
    UsersIcon,
} from '@heroicons/react/solid';
import {
    ShoppingBagIcon,
    ChevronDownIcon,
    UserGroupIcon,
} from '@heroicons/react/outline';
import SideBarRow from './SideBarRow';
import Image from 'next/image';

function SideBar() {
    const { data } = useSession();

    return (
        <div className="p-2 mt-5 max-w-[600px] xl:min-w-[300px]">
            {/* Other rows */}
            <SideBarRow src={data?.user?.image} title={data?.user?.name} />
            <SideBarRow Icon={UsersIcon} title="Friends" />
            <SideBarRow Icon={UserGroupIcon} title="Groups" />
            <SideBarRow Icon={ShoppingBagIcon} title="Marketplace" />
            <SideBarRow Icon={DesktopComputerIcon} title="Watch" />
            <SideBarRow Icon={CalendarIcon} title="Events" />
            <SideBarRow Icon={ClockIcon} title="Memories" />
            <SideBarRow Icon={ChevronDownIcon} title="See More" />
        </div>
    );
}

export default SideBar;
