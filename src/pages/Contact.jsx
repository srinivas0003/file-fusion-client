import React, { useState } from "react";
import "../styles/Contact.css";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const {name, value} = e.target;
    setForm(() => {
      return {
        ...form,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(form);
    const res = await fetch("https://file-fusion.onrender.com/message", {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })

    const data = await res.json();
    console.log(data);
    if(data.success) {
      setResponse("Message sent successfully");
      // setForm({ name: "", email: "", message: "" });
    }else{
      setResponse("Something went wrong...!");
    }
    setLoading(false);
  };

  return (
    <div className="contact">
      <div className="container">
        {response && <p className="response">{response}</p>}
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleOnChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleOnChange}
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleOnChange}
          ></textarea>

          <input
            className={loading ? "block-cursor" : null}
            type="submit"
            value={!loading ? "Send" : "Sending..."}
          />
        </form>
      </div>
    </div>
  );
}

export default Contact;
