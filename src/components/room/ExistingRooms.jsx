import React, { useState, useEffect } from "react";
import { Col , Row } from "react-bootstrap";
import { deleteRoom, getAllRooms } from "../utils/ApiFuntions";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa"
import { Link } from "react-router-dom"

const ExistingRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(8);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        setIsLoading(true);
        try {
            const result = await getAllRooms();
            setRooms(result);
            setFilteredRooms(result);
            setIsLoading(false);
        } catch (error) {
            setErrorMessage("Failed to fetch rooms. Please try again.");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (selectedRoomType === "") {
            setFilteredRooms(rooms);
        } else {
            const filtered = rooms.filter((room) => room.roomType === selectedRoomType);
            setFilteredRooms(filtered);
        }
        setCurrentPage(1);
    }, [rooms, selectedRoomType]);

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
        const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
        return Math.ceil(totalRooms / roomsPerPage);
    };

    const handleDelete =async(roomId)=>{
        try {
       const result = await deleteRoom(roomId) 
       if(result === ""){
        setSuccessMessage(`Room  ${roomId} was delete`)
        fetchRooms()
       }    else{
        console.error(`Error deleting room: ${result.message}`)
       }
        } catch (error) {
           setErrorMessage(error.message) 
        }

        setTimeout(()=>{
            setSuccessMessage("")
            setErrorMessage("")
        }, 3000)

    }

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

    return (
        <div className="container mt-5">
            {/* Mensajes de éxito o error */}
            {successMessage && (
                <div className="alert alert-success text-center shadow-sm rounded-3">
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="alert alert-danger text-center shadow-sm rounded-3">
                    {errorMessage}
                </div>
            )}
    
            {/* Indicador de carga */}
            {isLoading ? (
                <div className="text-center my-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <>
                    {/* Encabezado y filtro */}
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
                        <h2 className="text-primary fw-bold mb-3 mb-md-0">
                            Existing Rooms
                        </h2>
                        <div className="w-100 w-md-auto d-flex flex-column flex-md-row gap-3">
                            <RoomFilter
                                data={rooms}
                                setFilteredData={setFilteredRooms}
                                className="flex-grow-1"
                            />
                            <Link
                                to="/add-room"
                                className="btn btn-success d-flex align-items-center gap-2 shadow-sm"
                            >
                                <FaPlus /> Add Room
                            </Link>
                        </div>
                    </div>
    
                    {/* Tabla de habitaciones */}
                    <div className="table-responsive shadow-sm rounded-3">
                        <table className="table table-striped table-hover text-center align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Room Type</th>
                                    <th scope="col">Room Price</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRooms.map((room) => (
                                    <tr key={room.id}>
                                        <td>{room.id}</td>
                                        <td>{room.roomType}</td>
                                        <td>${room.roomPrice.toFixed(2)}</td>
                                        <td>
                                            <div className="d-flex justify-content-center gap-2">
                                                <Link
                                                    to={`/edit-room/${room.id}`}
                                                    className="btn btn-info btn-sm shadow-sm"
                                                >
                                                    <FaEye />
                                                </Link>
                                                <Link
                                                    to={`/edit-room/${room.id}`}
                                                    className="btn btn-warning btn-sm shadow-sm"
                                                >
                                                    <FaEdit />
                                                </Link>
                                                <button
                                                    className="btn btn-danger btn-sm shadow-sm"
                                                    onClick={() => handleDelete(room.id)}
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
    
                    {/* Paginador */}
                    <RoomPaginator
                        currentPage={currentPage}
                        totalPages={calculateTotalPages(filteredRooms, roomsPerPage, rooms)}
                        onPageChange={handlePaginationClick}
                    />
                </>
            )}
        </div>
    );
    
};

export default ExistingRooms;
