import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import "../Styles/DonationForm.css";

const DonationConfirm = () => {
  return (
    <div className="donation_container vh-100">
      <Navbar />
      <div className="container text-center position-absolute top-50 start-50 translate-middle">
        <div style={{ maxWidth: "60%", margin: "0 auto", padding: "2rem" }}>
          <h1 className="mb-4 text-success fw-bold">
            Mulțumim pentru donație!
          </h1>
          <p className="fs-2">
            Contribuția ta ne ajută să continuăm activitatea adăpostului nostru
            și să oferim condiții mai bune animalelor.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonationConfirm;
