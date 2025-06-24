"use client";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";
import { GiRotaryPhone } from "react-icons/gi";
import { IoMailOpenOutline } from "react-icons/io5";
import { useState } from "react";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email";
    if (!/^\d{10,15}$/.test(formData.phone))
      newErrors.phone = "Enter a valid phone number";
    if (formData.message.length < 10)
      newErrors.message = "Message must be at least 10 characters";
    if (!formData.contactPreferences)
      newErrors.contactPreferences = "Select a contact preference";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          contactPreferences: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
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
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide drop-shadow-md">
            CONTACT US
          </h1>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="contact_informations max-w-6xl mx-auto my-12 px-4">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {[
            {
              icon: IoMailOpenOutline,
              title: "Email",
              value: "info@sphomesyeg.com",
              href: "mailto:info@sphomesyeg.com",
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
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center bg-gray-100 border border-gray-200 rounded-xl p-6 gap-4 hover:shadow-lg transition-all duration-300 hover:border-yellow-400"
            >
              <div className="p-4 bg-gray-100 rounded-full group-hover:bg-yellow-50 transition-colors duration-300">
                <info.icon
                  size={48}
                  className="text-gray-600 group-hover:text-yellow-500 transition-colors duration-300"
                />
              </div>
              <h4 className="text-xl font-semibold text-gray-800">
                {info.title}
              </h4>
              <p className="text-gray-600 text-center">{info.value}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="contact_sp_home mx-4 md:mx-auto max-w-4xl bg-gray-900 px-6 py-10 md:px-10 md:py-12 mb-12 rounded-xl shadow-xl">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Have Any Questions?
        </h2>
        <p className="text-gray-300 mb-8">
          Fill out the form below and we&#39;ll get back to you soon
        </p>

        {submitStatus === "success" && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
            Thank you! Your message has been sent successfully.
          </div>
        )}
        {submitStatus === "error" && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
            Something went wrong. Please try again later.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                {label}
              </label>
              <input
                type={type}
                id={name}
                name={name}
                value={formData[name as keyof FormData]}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                placeholder={placeholder}
              />
              {errors[name as keyof FormData] && (
                <span className="text-red-400 text-sm mt-1">
                  {errors[name as keyof FormData]}
                </span>
              )}
            </div>
          ))}

          {/* Contact Preference */}
          <div className="flex flex-col items-start w-full">
            <label
              htmlFor="contactPreferences"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Preferred Contact Method
            </label>
            <select
              id="contactPreferences"
              name="contactPreferences"
              value={formData.contactPreferences}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
            >
              <option value="">How should we contact you?</option>
              <option value="email">Email</option>
              <option value="phone">Phone Call</option>
              <option value="text">Text Message</option>
            </select>
            {errors.contactPreferences && (
              <span className="text-red-400 text-sm mt-1">
                {errors.contactPreferences}
              </span>
            )}
          </div>

          {/* Message */}
          <div className="flex flex-col items-start w-full">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
              placeholder="Tell us about your inquiry..."
            ></textarea>
            {errors.message && (
              <span className="text-red-400 text-sm mt-1">
                {errors.message}
              </span>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-medium py-3 px-6 rounded-lg shadow hover:shadow-lg transition-all hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Submit Inquiry"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
