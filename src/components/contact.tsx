import React, { useState } from "react";

const contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Contact Us</h2>

        {/* Contact Details */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <p className="text-gray-600">
              Have any questions? Reach out to us and we'll get back to you as soon as possible.
            </p>
            <p className="text-gray-700">
              📍 <strong>Address:</strong> 123 React Street, JavaScript City, JS 101
            </p>
            <p className="text-gray-700">
              📞 <strong>Phone:</strong> +1 (123) 456-7890
            </p>
            <p className="text-gray-700">
              📧 <strong>Email:</strong> contact@example.com
            </p>
          </div>
          <iframe
            className="w-full h-48 rounded-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.83543450969!2d144.9537363153155!3d-37.8172099797516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5df1f83b1b%3A0x82c9c90538f2b52c!2sMelbourne%2C%20Australia!5e0!3m2!1sen!2sus!4v1632203954623!5m2!1sen!2sus"
            loading="lazy"
            title="Map"
          ></iframe>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Send Message
          </button>
          {submitted && (
            <p className="text-green-600 text-center mt-2">Message sent successfully!</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default contact;
