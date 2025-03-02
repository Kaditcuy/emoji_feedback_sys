"use client";

import { useState } from "react";
import { ThemeProvider, Button } from "@material-tailwind/react";
import Navbar from "@/components/navbar";
import Link from "next/link";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // Reset form
      } else {
        setStatus("Failed to send message. Please try again.");
      }
    } catch (error) {
      setStatus("Something went wrong.");
    }
  };

  return (
    <ThemeProvider>
      <Navbar />
      <section className="container mx-auto px-6 py-16">
        <div className="bg-black-100 p-8 rounded-2xl">
          <p className="text-[18px] text-secondary uppercase tracking-wider">Get in touch</p>
          <h3 className="text-white font-black text-[40px]">Contact</h3>

          <form className="mt-12 flex flex-col gap-8" onSubmit={handleSubmit}>
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="What's your good name?"
                className="bg-tertiary py-4 px-6 text-white rounded-lg outline-none border-none font-medium"
                required
              />
            </label>

            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="What's your email address?"
                className="bg-tertiary py-4 px-6 text-white rounded-lg outline-none border-none font-medium"
                required
              />
            </label>

            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Message</span>
              <textarea
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="What do you want to say?"
                className="bg-tertiary py-4 px-6 text-white rounded-lg outline-none border-none font-medium"
                required
              />
            </label>

            <button
              type="submit"
              className="bg-tertiary py-3 px-8 rounded-xl w-fit text-white font-bold shadow-md"
            >
              Send
            </button>
          </form>

          {status && <p className="mt-4 text-white">{status}</p>}

          <Link href="/">
            <Button color="gray" className="mt-6 w-full sm:w-auto"  placeholder="" 
                  onPointerEnterCapture={() => {}} 
                  onPointerLeaveCapture={() => {}}>Visit Homepage</Button>
          </Link>
        </div>
      </section>
    </ThemeProvider>
  );
}
