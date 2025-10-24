import { Room } from "@/model/Room";
import { Carousel } from 'antd';
import Image from 'next/image';
interface MyBookingProps {
    datedif: number;
    start: Date;
    end: Date;
    room?: Room;
    guest?: number;
}

export default function MyBooking({ datedif, start, end, room, guest }: MyBookingProps) {
    // const totalPrice = room ? room.basePrice * datedif : 0;

    // Hàm chuyển số tháng sang chữ
    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short", // "short" → Jan, Feb | "long" → January, February
        });
    };

    return (
        <div className="col-span-3 border border-gray-200 bg-white rounded-lg shadow-md">
            {/* Header */}
            <div className="bg-[rgb(253,233,230)] p-4 rounded-t-lg font-semibold text-xl">
                My Booking
            </div>

            {/* Date & Nights */}
            <div className="p-5">
                <div className="font-semibold bg-[rgb(253,233,230)] p-2 rounded text-center text-xl font-medium mb-4">
                    {datedif} Night{datedif > 1 ? "s" : ""}
                </div>

                <div className="grid grid-cols-2 text-center text-gray-700 text-lg mb-6">
                    <div>
                        <div className="font-semibold">Check-in</div>
                        <div>{formatDate(start)}</div>
                    </div>
                    <div>
                        <div className="font-semibold">Check-out</div>
                        <div>{formatDate(end)}</div>
                    </div>
                </div>

                {room ? (
                    <div className="flex flex-col items-center">
                        <div className="w-[200px] h-[150px] overflow-hidden rounded-lg">
                            <Carousel autoplay dots={false}>
                                {room.imageUrl.map((url, index) => (
                                    <div key={index} className="flex justify-center items-center h-[150px]">
                                        <Image
                                            src={url}
                                            alt={`Room image ${index}`}
                                            width={200}
                                            height={150}
                                            className="object-cover rounded-lg w-[200px] h-[150px]"
                                        />
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                        <div className="text-xl font-semibold">{room.roomName}</div>
                        <div className="text-gray-600 text-lg">
                            Guests: {(guest !== 0) ? guest : (room.adult + room.children)} | {room.bedType}
                        </div>
                        <div className="text-gray-500 text-lg mt-1">
                            {room.space} m²
                        </div>

                        <div className="mt-4 w-full border-t pt-3 text-right">
                            <div className="text-lg text-gray-500">Price per night</div>
                            <div className="text-rose-500 font-bold text-lg line-through">
                                {room.basePrice.toLocaleString()} đ
                            </div>
                            <div className="text-lg mt-2">
                                Total:{" "}
                                <span className="font-semibold">
                                    {(room.basePrice * 0.9).toLocaleString()} đ
                                </span>
                            </div>
                        </div>
                        <div className="bg-rose-400 px-10 py-3 rounded-lg text-white font-bold text-xl cursor-pointer hover:bg-blue-900" >Continue</div>
                    </div>
                ) : (
                    <div className="text-gray-500 text-center">No room selected</div>
                )}
            </div>
        </div>
    );
}
