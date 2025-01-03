import React from "react"
import { Link } from "react-router-dom"

const Admin = () => {
  return (
    <section className="container mt-5">
      <h2 className="text-center mb-4 font-weight-bold text-primary">Welcome to Admin Panel</h2>
      <hr />
      
      <div className="text-center">
        <Link to={"/existing-rooms"} className="btn btn-primary btn-lg mb-3 w-auto">
          Manage Rooms
        </Link>
        <br />
        <Link to={"/existing-bookings"} className="btn btn-warning btn-lg mb-3 w-auto">
          Manage Bookings
        </Link>
      </div>
    </section>
  )
}

export default Admin
