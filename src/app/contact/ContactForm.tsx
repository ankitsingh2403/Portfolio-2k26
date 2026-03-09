"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    services: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const toastId = toast.loading("Sending message...");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Message sent successfully 🚀", { id: toastId });

        setForm({
          name: "",
          email: "",
          organization: "",
          services: "",
          message: "",
        });
      } else {
        toast.error("Failed to send message ❌", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong ⚠️");
    }

    setLoading(false);
  };

  return (
    <div className="space-y-10">
      {[
        { label: "What's your name?", name: "name" },
        { label: "What's your email?", name: "email" },
        { label: "Organization?", name: "organization" },
        { label: "What services are you looking for?", name: "services" },
      ].map((field, index) => (
        <div key={index}>
          <p className="text-gray-400 mb-2">
            {String(index + 1).padStart(2, "0")}
          </p>

          <input
            type="text"
            name={field.name}
            placeholder={field.label}
            value={form[field.name as keyof typeof form]}
            className="w-full bg-transparent border-b border-gray-600 pb-2 focus:outline-none focus:border-white"
            onChange={handleChange}
          />
        </div>
      ))}

      <div>
        <p className="text-gray-400 mb-2">05</p>

        <textarea
          name="message"
          placeholder="Your message..."
          rows={4}
          value={form.message}
          className="w-full bg-transparent border-b border-gray-600 pb-2 focus:outline-none focus:border-white"
          onChange={handleChange}
        />
      </div>

      {/* LIQUID BUTTON */}
      <div className="flex justify-center mt-16">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-40 h-40 rounded-full bg-indigo-600 hover:scale-110 transition duration-500 text-lg disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send it!"}
        </button>
      </div>
    </div>
  );
}