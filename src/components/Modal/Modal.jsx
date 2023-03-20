import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Modal.css";

const Modal = ({ onCloseModal }) => {
  const [formFirstName, setFirstName] = useState("");
  const [formLastName, setLastName] = useState("");
  const [formEmail, setEmail] = useState("");
  const [formPhone, setPhone] = useState("");
  const [formSubscriptionType, setSubscriptionType] = useState("standard");

  useEffect(() => {
    const handleEscapePress = (e) => {
      if (e.key === "Escape") {
        onCloseModal();
      }
    };

    window.addEventListener("keydown", handleEscapePress);

    return () => {
      window.removeEventListener("keydown", handleEscapePress);
    };
  }, [onCloseModal]);

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };
  const handleSave = (event) => {
    event.preventDefault();

    if (
      !formFirstName ||
      !formLastName ||
      !formPhone ||
      !formEmail ||
      !formSubscriptionType
    ) {
      alert("Fill all fields");
      return;
    }
    const user = {
      firstName: formFirstName,
      lastName: formLastName,
      email: formEmail,
      phone: formPhone,
      subscription: formSubscriptionType,
    };
    console.log("kkk", onCloseModal);
    fetch("http://localhost:3003/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unexpected server error");
        }
        return response.json();
      })
      .then(() => {
        onCloseModal();
      })
      .catch((error) => console.log("error:", error));
  };

  return (
    <div onCloseModal={onCloseModal} contentLabel="Modal" className="modal">
      <form onSubmit={handleSave}>
        <h2>Add User</h2>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          value={formFirstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          value={formLastName}
          onChange={(event) => setLastName(event.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={formEmail}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          value={formPhone}
          onChange={(event) => setPhone(event.target.value)}
        />
        <label htmlFor="subscriptionType">Subscription Type</label>
        <select
          id="subscriptionType"
          value={formSubscriptionType}
          onChange={(event) => setSubscriptionType(event.target.value)}
        >
          <option value="standard">No Subscription</option>
          <option value="premium">Standard Subscription</option>
          <option value="no">Premium Subscription</option>
        </select>
        <button type="submit">Save</button>
        <button type="button" onClick={onCloseModal}>
          Cancel
        </button>
      </form>
    </div>
  );
};
Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
};
export default Modal;
