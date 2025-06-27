import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faPhoneVolume, faLocationDot, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-gray-800 text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {/* Logo and Description */}
          <div className="flex flex-col gap-4">
            <div className="h-24 flex items-center">
              <NavLink to="/">
              <img
                src="/HackVent_logo3.png"
                alt="Event Update Logo"
                className="h-36 w-auto mb-10 object-contain mix-blend-multiply"
                />
                </NavLink>
            </div>
            <p className="text-blue-100 text-sm leading-relaxed">
              Linking Campus Life, Creating Opportunities. Your premier platform for college events and hackathons.
            </p>
            <p className="text-blue-200 text-xs mt-2">
              &copy; {new Date().getFullYear()} Event Update. All Rights Reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-xl text-white mb-2 border-b border-blue-400 pb-2">
              Quick Links
            </h3>
            <div className="flex flex-col gap-3">
              <Link 
                to="/" 
                className="text-blue-100 hover:text-white transition-colors duration-200 hover:underline underline-offset-4"
              >
                Home
              </Link>
              <Link 
                to="/events" 
                className="text-blue-100 hover:text-white transition-colors duration-200 hover:underline underline-offset-4"
              >
                Events
              </Link>
              <Link 
                to="/hackathons" 
                className="text-blue-100 hover:text-white transition-colors duration-200 hover:underline underline-offset-4"
              >
                Hackathons
              </Link>
              <Link 
                to="/about" 
                className="text-blue-100 hover:text-white transition-colors duration-200 hover:underline underline-offset-4"
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className="text-blue-100 hover:text-white transition-colors duration-200 hover:underline underline-offset-4"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-xl text-white mb-2 border-b border-blue-400 pb-2">
              Contact Us
            </h3>
            <div className="flex flex-col gap-3 text-blue-100">
              <div className="flex items-center gap-3 hover:text-white transition-colors duration-200">
                <FontAwesomeIcon icon={faPhoneVolume} className="text-blue-300" />
                <span>+91 123 456 7890</span>
              </div>
              <div className="flex items-center gap-3 hover:text-white transition-colors duration-200">
                <FontAwesomeIcon icon={faEnvelope} className="text-blue-300" />
                <span>events@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 hover:text-white transition-colors duration-200">
                <FontAwesomeIcon icon={faLocationDot} className="text-blue-300" />
                <span>Pune, Maharashtra</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-xl text-white mb-2 border-b border-blue-400 pb-2">
              Follow Us
            </h3>
            <div className="flex gap-5">
              <a 
                href="#" 
                className="text-blue-200 hover:text-white text-2xl transition-colors duration-200 hover:scale-110"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a 
                href="#" 
                className="text-blue-200 hover:text-white text-2xl transition-colors duration-200 hover:scale-110"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a 
                href="#" 
                className="text-blue-200 hover:text-white text-2xl transition-colors duration-200 hover:scale-110"
                aria-label="Twitter"
              >
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
            </div>
            
            {/* Newsletter Subscription */}
            <div className="mt-4">
              <h4 className="text-blue-100 font-medium mb-2">Subscribe to our newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-3 py-2 text-sm text-gray-800 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-r transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;