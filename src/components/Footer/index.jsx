// src/components/Footer/index.jsx

import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-4 gap-10">

          {/* Company */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">
              My React App
            </h3>

            <p className="text-sm leading-7">
              We build modern, scalable, and user-friendly web applications
              using React, Tailwind CSS, and the latest technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/about" className="hover:text-white">
                  About
                </Link>
              </li>

              <li>
                <Link to="/dashboard" className="hover:text-white">
                  Dashboard
                </Link>
              </li>

              <li>
                <Link to="/terms" className="hover:text-white">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Services
            </h3>

            <ul className="space-y-3">
              <li>Web Development</li>
              <li>Mobile Apps</li>
              <li>UI/UX Design</li>
              <li>Cloud Solutions</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Contact
            </h3>

            <p>Email: support@example.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>Ahmedabad, Gujarat, India</p>

            <div className="flex gap-4 mt-5 text-2xl">
              <a href="#" className="hover:text-blue-500">
                <FaFacebook />
              </a>

              <a href="#" className="hover:text-sky-400">
                <FaTwitter />
              </a>

              <a href="#" className="hover:text-pink-500">
                <FaInstagram />
              </a>

              <a href="#" className="hover:text-blue-400">
                <FaLinkedin />
              </a>
            </div>
          </div>

        </div>

        <hr className="my-8 border-gray-700" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm">

          <p>
            © 2026 My React App. All Rights Reserved.
          </p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>

            <Link to="/terms" className="hover:text-white">
              Terms & Conditions
            </Link>

            <Link to="/contact" className="hover:text-white">
              Contact Us
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;