"use client";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";
import { GiRotaryPhone } from "react-icons/gi";
import { IoMailOpenOutline } from "react-icons/io5";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const contact = "/images/sp-contact.jpg";

  type FormData = {
    name: string;
    email: string;
    phone: string;
    message: string;
    contactPreferences: string;
  };

  type FormErrors = Partial<Record<keyof FormData, string>>;

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    contactPreferences: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email.";
    if (!/^\d{10,15}$/.test(formData.phone))
      newErrors.phone = "Enter a valid phone number.";
    if (formData.message.length < 10)
      newErrors.message = "Message must be at least 10 characters.";
    if (!formData.contactPreferences)
      newErrors.contactPreferences = "Select a contact preference.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      emailjs
        .send(
          "YOUR_SERVICE_ID",
          "YOUR_TEMPLATE_ID",
          formData,
          "YOUR_PUBLIC_KEY"
        )
        .then(() => {
          alert("Your message has been sent!");
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
            contactPreferences: "",
          });
          setErrors({});
        })
        .catch((err) => {
          alert("Oops! Something went wrong. Please try again.");
          console.error(err);
        });
    }
  };

  return (
    <div className="contact_wrapper">
      {/* Contact Hero */}
      <div
        className="relative w-full object-cover h-[240px] md:h-[480px] lg:h-[520px]"
        style={{
          backgroundImage: `url(${contact})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="relative flex items-center justify-center text-center h-full w-full z-20">
          <h1 className="text-white text-6xl font-bold tracking-wide drop-shadow-md">
            CONTACT
          </h1>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="contact_informations max-w-[90vw] mx-auto my-12">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {[
            {
              icon: IoMailOpenOutline,
              title: "Email",
              value: "sphomesedm@gmail.com",
              href: "mailto:sphomesedm@gmail.com",
            },
            {
              icon: GiRotaryPhone,
              title: "Sales Manager",
              value: "780-254-4000",
              href: "tel:780-254-4000",
            },
            {
              icon: FaLocationDot,
              title: "Location",
              value: "2817 63rd Ave NE, Leduc County T4X 3A6",
              href: "https://g.co/kgs/4pJozk9",
            },
          ].map((info, idx) => (
            <Link
              key={idx}
              href={info.href}
              className="group flex flex-col items-center border-[1px] bg-gray-200 border-gray-400 rounded-lg p-8 gap-4 hover:shadow-xl transition-all duration-300"
            >
              <info.icon
                size={64}
                className="text-gray-600 group-hover:text-yellow-500 transition-colors duration-300"
              />
              <h4 className="text-xl font-semibold">{info.title}</h4>
              <p className="text-gray-700">{info.value}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="contact_sp_home max-w-[95vw] bg-gray-900 mx-auto px-8 py-12 mb-8 text-center rounded-lg shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-200 mb-6">
          Have Any Questions?
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 max-w-[70rem] mx-auto"
        >
          {/* Input fields */}
          {[
            {
              label: "Name",
              type: "text",
              name: "name",
              placeholder: "Enter your name",
            },
            {
              label: "Email",
              type: "email",
              name: "email",
              placeholder: "Enter your email",
            },
            {
              label: "Phone",
              type: "tel",
              name: "phone",
              placeholder: "Enter your phone number",
            },
          ].map(({ label, type, name, placeholder }) => (
            <div key={name} className="flex flex-col items-start w-full">
              <label
                htmlFor={name}
                className="block text-lg font-medium text-gray-200"
              >
                {label}
              </label>
              <input
                type={type}
                id={name}
                name={name}
                value={formData[name as keyof FormData]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg shadow-lg focus:ring-2 focus:ring-yellow-400 transition-all"
                placeholder={placeholder}
              />
              {errors[name as keyof FormData] && (
                <span className="text-red-500">
                  {errors[name as keyof FormData]}
                </span>
              )}
            </div>
          ))}

          {/* Contact Preference */}
          <div className="flex flex-col items-start w-full">
            <label
              htmlFor="contactPreferences"
              className="block text-lg font-medium text-gray-200"
            >
              Contact Preferences
            </label>
            <select
              id="contactPreferences"
              name="contactPreferences"
              value={formData.contactPreferences}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg shadow-lg focus:ring-2 focus:ring-yellow-400 transition-all"
            >
              <option value="">Choose a preference</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
            {errors.contactPreferences && (
              <span className="text-red-500">{errors.contactPreferences}</span>
            )}
          </div>

          {/* Message */}
          <div className="flex flex-col items-start w-full">
            <label
              htmlFor="message"
              className="block text-lg font-medium text-gray-200"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg shadow-lg focus:ring-2 focus:ring-yellow-400 transition-all"
              placeholder="Type your message here..."
            ></textarea>
            {errors.message && (
              <span className="text-red-500">{errors.message}</span>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-4 w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-lg font-semibold py-3 rounded-lg shadow-xl hover:scale-105 transition-all"
          >
            Submit Inquiry
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
