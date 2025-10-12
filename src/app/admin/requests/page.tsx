"use client"
import { Pagination } from "antd";
import { useState, useEffect } from "react";
import { Request } from "@/model/Request";
import { getRequests } from "@/api/getRequest";
export default function UserMangement() {
    const [requests, setRequests] = useState<Request[]>([]);

    const totalRequests = requests.length;
    const respondedCount = requests.filter(b => b.status === 0).length;
    const pendingCount = requests.filter(b => b.status === 1).length;

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const [activeFilter, setActiveFilter] = useState<"all" | 1 | 0>("all");


    // Tính toán dữ liệu hiển thị
    const filteredByStatus =
        activeFilter === "all" ? requests : requests.filter(r => r.status === activeFilter);

    // lọc thêm theo search


    // phân trang
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentRequests = requests.slice(indexOfFirst, indexOfLast);

    const handleFilterClick = (filter: "all" | 1 | 0) => {
        setActiveFilter(filter);
        setCurrentPage(1);
    };

    const [selectedRequestResponse, setSelectedRequestResponse] = useState<Request | null>(null);
    const [selectedRequestView, setSelectedRequestView] = useState<Request | null>(null);
    useEffect(() => {
        getRequests().then(setRequests);
    }, [])
    return (
        <>
            <>

                <div className=" font-semibold text-lg">View All Request</div>
                <div className="my-3 border border-b-1 container  bg-black "></div>

                {/* Search */}
                <div className="flex justify-start gap-5   container  mb-10">
                    <input
                        type="search"
                        placeholder="Search by room number, guest name, or phone"
                        className="w-96 border p-2  rounded-md "

                    />
                </div>
                {/* Summary box */}
                <div className="flex gap-5 container mx-auto mb-10">
                    <div
                        onClick={() => handleFilterClick("all")}
                        className={`cursor-pointer flex flex-col items-center gap-2 border rounded-lg px-10 py-5 w-64 transition
                        ${activeFilter === "all" ? "bg-blue-100 border-blue-500" : "hover:bg-gray-50"}`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="w-8 h-8 bg-blue-300 rounded-full inline-block "></span>
                            <span className="inline-block w-32">Total Requests</span>
                        </div>
                        <span className="text-xl font-bold">{totalRequests}</span>
                    </div>

                    <div
                        onClick={() => handleFilterClick(1)}
                        className={`cursor-pointer flex flex-col items-center gap-2 border rounded-lg px-10 py-5 w-40 transition
                        ${activeFilter === 1 ? "bg-green-100 border-green-500" : "hover:bg-gray-50"}`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="w-8 h-8 bg-green-300 rounded-full inline-block "></span>
                            <span>Responsed</span>
                        </div>
                        <span className="text-xl font-bold">{respondedCount}</span>
                    </div>

                    <div
                        onClick={() => handleFilterClick(0)}
                        className={`cursor-pointer flex flex-col items-center gap-2 border rounded-lg px-10 py-5 w-40 transition
                        ${activeFilter === 0 ? "bg-yellow-100 border-yellow-500" : "hover:bg-gray-50"}`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="w-8 h-8 bg-yellow-300 rounded-full inline-block "></span>
                            <span>Pending</span>
                        </div>
                        <span className="text-xl font-bold">{pendingCount}</span>
                    </div>


                </div>
                {/* --- TABLE --- */}
                <table className=" w-full container mx-auto my-10 text-lg">
                    <thead >
                        <tr className="text-left ">
                            <th className=" border-b-2  border-gray-400 px-4 py-2"> ID</th>
                            <th className="border-b-2  border-gray-400 px-4 py-2">User/ Email </th>
                            <th className="border-b-2  border-gray-400 px-4 py-2">Title</th>
                            <th className="border-b-2  border-gray-400 px-4 py-2">Status</th>
                            <th className="border-b-2  border-gray-400 px-4 py-2">Created Date</th>
                            <th className="border-b-2  border-gray-400 px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRequests.map((request, index) => {
                            return (
                                <tr key={request.id}>
                                    <td className="px-4 py-2">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                    <td className="px-4 py-2">
                                        {request.userEmail}
                                    </td>
                                    <td className="px-4 py-2">{request.title}</td>
                                    <td className="px-4 py-2">
                                        <div
                                            className={`font-semibold border rounded-md p-2 w-32 text-center
              ${request.status === 0
                                                    ? "bg-yellow-100 text-yellow-700 border-yellow-400"
                                                    : "bg-green-100 text-green-700 border-green-400"
                                                }`}
                                        >
                                            {(request.status === 1) ? "Responsed" : "Pendding"}
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">{request.createdDate}</td>
                                    <td className="flex gap-5 px-4 py-2 ">
                                        <div
                                            className="bg-emerald-400 p-2 px-4 text-white rounded cursor-pointer"
                                            onClick={() => setSelectedRequestView(request)}
                                        >
                                            View
                                        </div>
                                        <div className="bg-rose-400 p-2 px-4 text-white rounded cursor-pointer">
                                            Remove
                                        </div>
                                        <div
                                            className="bg-slate-700 p-2 px-4 text-white rounded cursor-pointer"
                                            onClick={() => setSelectedRequestResponse(request)}
                                        >
                                            Response
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>

                </table>
                <Pagination
                    current={currentPage}                // Trang hiện tại
                    pageSize={itemsPerPage}              // Số item mỗi trang
                    total={filteredByStatus.length}      // Tổng item (có thể là rooms.length hoặc filteredByStatus.length)
                    showSizeChanger                      // Cho phép chọn số item/trang
                    pageSizeOptions={[5, 10, 20, 50]}    // Tùy chọn số dòng mỗi trang
                    onChange={(page, pageSize) => {
                        setCurrentPage(page);
                        setItemsPerPage(pageSize);
                    }}
                    className="text-center flex justify-end !text-lg"
                    showTotal={(total) => `Total ${total} items`}
                    showQuickJumper


                />


                {/* --- MODAL RESPONSE --- */}
                {selectedRequestResponse && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
                        <div className="bg-white text-gray-800 rounded-xl shadow-2xl p-6 w-[420px]">
                            <div className="mb-4 border-b pb-2">
                                <h2 className="text-xl font-bold">Response</h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Request ID:{" "}
                                    <span className="font-semibold text-blue-600">
                                        #{selectedRequestResponse.id}
                                    </span>
                                </p>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <input
                                    type="text"
                                    defaultValue={selectedRequestResponse.title}
                                    className="w-full p-2 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-1">Message</label>
                                <textarea
                                    placeholder="Type your response here..."
                                    className="w-full h-24 p-2 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>

                            <div className="flex justify-end gap-3">
                                <button className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow">
                                    Send
                                </button>
                                <button
                                    onClick={() => setSelectedRequestResponse(null)}
                                    className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- MODAL VIEW --- */}
                {selectedRequestView && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
                        <div className="bg-white text-gray-800 rounded-xl shadow-2xl p-6 w-[420px]">
                            <div className="mb-4 border-b pb-2">
                                <h2 className="text-xl font-bold">View Request</h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Request ID:{" "}
                                    <span className="font-semibold text-blue-600">
                                        #{selectedRequestView.id}
                                    </span>
                                </p>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <input
                                    type="text"
                                    value={selectedRequestView.title}
                                    disabled
                                    className="w-full p-2 rounded-md border border-gray-300 bg-gray-100"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    value={selectedRequestView.description}
                                    disabled
                                    className="w-full h-32 p-2 rounded-md border border-gray-300 bg-gray-100"
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    onClick={() => setSelectedRequestView(null)}
                                    className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </ >
        </>
    )
}
