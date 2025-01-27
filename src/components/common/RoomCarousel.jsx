import React, { useEffect, useState } from "react"
import { getAllRooms } from "../utils/ApiFuntions"
import { Link } from "react-router-dom"
import { Card, Carousel, Col, Container, Row } from "react-bootstrap"

const RoomCarousel = () => {
  const [rooms, setRooms] = useState([{ id: "", roomType: "", roomPrice: "", photo: "" }])
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getAllRooms()
      .then((data) => {
        setRooms(data)
        setIsLoading(false)
      })
      .catch((error) => {
        setErrorMessage(error.message)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <div className="mt-5 text-center">Loading rooms....</div>
  }
  if (errorMessage) {
    return <div className="text-danger mb-5 mt-5 text-center">Error: {errorMessage}</div>
  }

  return (
    <section className="bg-light mb-5 mt-5 shadow-lg rounded-lg">
      <Link to={"/browse-all-rooms"} className="hotel-color text-center d-block mb-4">
        <h3 className="font-weight-bold">Browse all rooms</h3>
      </Link>

      <Container>
        <Carousel indicators={false}>
          {[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
            <Carousel.Item key={index}>
              <Row>
                {rooms.slice(index * 4, index * 4 + 4).map((room) => (
                  <Col key={room.id} className="mb-4" xs={12} md={6} lg={3}>
                    <Card className="shadow-lg border-0 rounded-lg overflow-hidden">
                      <Link to={`/book-room/${room.id}`}>
                        <Card.Img
                          variant="top"
                          src={`data:image/png;base64, ${room.photo}`}
                          alt="Room Photo"
                          className="w-100"
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                      </Link>
                      <Card.Body>
                        <Card.Title className="hotel-color font-weight-bold">{room.roomType}</Card.Title>
                        <Card.Subtitle className="room-price text-muted">${room.roomPrice}/night</Card.Subtitle>
                        <div className="mt-3 text-center">
                          <Link to={`/book-room/${room.id}`} className="btn btn-primary btn-sm px-4 py-2">
                            Book Now!
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  )
}

export default RoomCarousel
