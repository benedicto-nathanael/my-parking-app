import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ParkingSpaceOverview() {
    const [selectedParking, setSelectedParking] = useState(null);

    const [parkingData, setParkingData] = useState(
        Array.from({ length: 40 }, (_, index) => {
            const isBooked = Math.random() < 0.5;
            return {
                id: index + 1,
                isBooked,
                bookingDetails: isBooked
                    ? {
                        name: 'John Doe',
                        vehicleNumber: 'B 1234 ABC',
                        startTime: new Date().toLocaleString(),
                        duration: 3,
                        amount: new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                        }).format(300000),
                        parkingCode: `B${index + 1}`
                    }
                    : null,
            };
        })
    );


    const handleClick = (space) => {
        if (space.isBooked) {
            setSelectedParking(space);
        } else {
            setSelectedParking({ ...space, formVisible: true });
        }
    };

    const handleFormSubmit = (e, spaceId) => {
        e.preventDefault();
        const name = e.target.name.value;
        const vehicleNumber = e.target.vehicleNumber.value;
        const duration = e.target.duration.value;

        const updatedParkingData = parkingData.map((space) =>
            space.id === spaceId
                ? {
                    ...space,
                    isBooked: true,
                    bookingDetails: {
                        name,
                        vehicleNumber,
                        startTime: new Date().toLocaleString(),
                        duration,
                        amount: new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                        }).format(parseInt(duration) * 100000),
                        parkingCode: `B${space.id}`
                    },
                }
                : space
        );
        setParkingData(updatedParkingData);
        setSelectedParking(updatedParkingData.find((space) => space.id === spaceId));
        toast.success('Booking successful !', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <main className="flex-1 p-6 w-full">
            <h2 className="text-xl font-semibold mb-4">Parking Space Overview</h2>
            <p className="text-gray-500 mb-6">
                View real-time free and occupied parking spaces.
            </p>

            <div className="flex flex-col lg:flex-row">
                {/* Parking Map */}
                <div className="w-full lg:w-[65%] bg-white shadow p-4">
                    <div className="grid grid-cols-8 gap-2">
                        {parkingData.map((space) => (
                            <div
                                key={space.id}
                                className={`p-4 border ${space.isBooked ? 'bg-blue-500 cursor-pointer' : 'bg-gray-400 cursor-pointer'
                                    }`}
                                onClick={() => handleClick(space)}
                            >
                                <p>B {space.id}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-5">
                        <div className="flex items-center">
                            <div className="grid grid-cols-1 w-10 mr-1">
                                <div className='p-4 border bg-blue-500'></div>
                            </div>
                            <div className="w-0"> Booked</div>
                        </div>

                        <div className="flex items-center mt-2">
                            <div className="grid grid-cols-1 w-10 mr-1">
                                <div className='p-4 border bg-gray-400'></div>
                            </div>
                            <div className="w-0"> Available</div>
                        </div>
                    </div>
                </div>

                {/* Details Section */}
                {
                    selectedParking && (
                        <aside className="w-full lg:w-[35%] bg-white p-6 shadow">
                            {selectedParking.isBooked ? (
                                <>
                                    <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
                                    <div className='flex flex-row gap-5 justify-center items-center'>
                                        <div className='flex flex-col gap-1'>
                                            <p className='font-semibold'>{selectedParking.bookingDetails.duration} Days</p>
                                            <p className='text-gray-400 text-sm'>DURATION</p>
                                        </div>
                                        <div className='border-l border border-gray-500 h-10'></div>
                                        <div className='flex flex-col gap-1'>
                                            <p className='font-semibold'>{selectedParking.bookingDetails.amount}</p>
                                            <p className='text-gray-400 text-sm'>AMOUNT PAYABLE</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-1 mt-2'>
                                        <p className='text-start'><strong>Name:</strong> {selectedParking.bookingDetails.name}</p>
                                        <p className='text-start'><strong>Vehicle Number:</strong> {selectedParking.bookingDetails.vehicleNumber}</p>
                                        <p className='text-start'><strong>Start Time:</strong> {selectedParking.bookingDetails.startTime}</p>
                                        <p className='text-start'><strong>Parking Place:</strong> {selectedParking.bookingDetails.parkingCode}</p>
                                    </div>
                                </>
                            ) : selectedParking.formVisible ? (
                                <>
                                    <h2 className="text-xl font-semibold mb-4">Book Parking Spot</h2>
                                    <form onSubmit={(e) => handleFormSubmit(e, selectedParking.id)}>
                                        <div className="mb-4">
                                            <label htmlFor="name" className="block">Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                className="w-full px-3 py-2 border rounded"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="vehicleNumber" className="block">Vehicle Number</label>
                                            <input
                                                type="text"
                                                name="vehicleNumber"
                                                required
                                                className="w-full px-3 py-2 border rounded"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="duration" className="block">Duration (in days)</label>
                                            <input
                                                type="number"
                                                name="duration"
                                                required
                                                className="w-full px-3 py-2 border rounded"
                                            />
                                        </div>
                                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                                            Book Now
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <p>This parking spot is available. Click to book it!</p>
                            )}
                        </aside>
                    )
                }
                <ToastContainer />
            </div >
        </main >
    )
}
