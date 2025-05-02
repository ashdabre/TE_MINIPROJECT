import React, { useState } from "react";
// import "./contact.css"; // Importing external CSS for styling

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate sending a message (Replace this with actual API call)
    setTimeout(() => {
      setSuccessMessage("Your message has been sent successfully! ✅");
      setFormData({ name: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        {/* Left Side - Contact Info */}
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>
            Reach out to us for inquiries, support, or collaboration.
          </p>
          <div className="contact-detail">
            <i className="fas fa-envelope"></i> crce.10404.ce@gmail.com
          </div>
          <div className="contact-detail">
            <i className="fas fa-phone"></i> +91 8855014283
          </div>
          <div className="contact-detail">
            <i className="fas fa-map-marker-alt"></i> Fr. CRCE, bandra
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="contact-form">
          <h3>Get in Touch</h3>
          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />

            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />

            <label>Message</label>
            <textarea name="message" rows={4} value={formData.message} onChange={handleChange} required></textarea>

            <button type="submit">Send Message</button>
          </form>

          {successMessage && <p className="success-msg">{successMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default Contact;
