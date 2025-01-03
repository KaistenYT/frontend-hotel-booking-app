import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  const isValidBase64 = (str) => {
    return typeof str === "string" && str.length > 0;
  };

  return (
    <Col className="mb-4" xs={12}>
      <Card className="shadow">
        <Card.Body className="d-flex flex-wrap align-items-center">
          <div className="flex-shrink-0 me-3 mb-3 mb-md-0">
            <Link to={`/book-room/${room.id}`}>
              {isValidBase64(room.photo) ? (
                <Card.Img
                  variant="top"
                  src={`data:image/png;base64, ${room.photo}`}
                  alt={`Photo of ${room.roomType || "room"}`}
                  style={{ width: "100%", maxWidth: "200px", height: "auto" }}
                />
              ) : (
                <p>Image not available</p>
              )}
            </Link>
          </div>
          <div className="flex-grow-1 ms-3 px-5">
            <Card.Title className="hotel-color">{room.roomType || "Room Type"}</Card.Title>
            <Card.Title className="room-price">
              {room.roomPrice ? `$${room.roomPrice} / night` : "Price unavailable"}
            </Card.Title>
            <Card.Text>
              Some room information goes here for the guest to read through.
            </Card.Text>
          </div>
          <div className="flex-shrink-0 mt-3">
            <Link to={`/book-room/${room.id}`} className="btn btn-hotel btn-sm">
              Book Now
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default RoomCard;
