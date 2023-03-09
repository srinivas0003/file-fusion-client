import React from "react";
import "../styles/Contact.css";

function Contact() {
  return (
    <div className="contact">
      <div className="container">
        <h1>Contact Us</h1>
        <form>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />

          <label htmlFor="message">Message</label>
          <textarea id="message" name="message"></textarea>

          <input type="submit" value="Send" />
        </form>
      </div>
    </div>
  );
}

export default Contact;
