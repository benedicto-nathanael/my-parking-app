import MarginIcon from '@mui/icons-material/Margin';
import React, { useState } from "react";
import Parking from '../assets/parking.png';
import ParkingSpaceOverview from "./ParkingSpaceOverview";

export default function Layout() {
    const [activeComponent, setActiveComponent] = useState('overview');

    const handleMenuClick = (component) => {
        setActiveComponent(component);
    };
    return (
        <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
            <aside className="w-full lg:w-1/4 bg-white p-6 shadow">
                <div className="flex flex-row item-center gap-2">
                    <img src={Parking} alt="parking" className="w-10 h-10" />
                    <h1 className="text-2xl font-semibold mb-6">Parking</h1>
                </div>
                <div className="border-b !px-0 !mb-4 !mx-0"></div>
                <p className="flex items-start text-gray-400 text-sm">MENU</p>
                <nav className="flex flex-col gap-2 items-start mt-5">
                    <a
                        href="#overview" onClick={() => handleMenuClick('overview')} className={`hover:text-blue-600 font-semibold hover:bg-blue-50 w-full flex flex-row items-start rounded-lg p-2 cursor-pointer ${activeComponent === 'overview' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'}`}>
                        <div
                            className="inline-flex items-center gap-2"
                        >
                            <MarginIcon />
                            <p>
                                Parking Space Overview
                            </p>
                        </div>
                    </a>
                </nav>
            </aside>

            {activeComponent === 'overview' && <ParkingSpaceOverview />}
        </div>
    );
};