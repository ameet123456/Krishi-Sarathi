import React from "react";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { useNavigate, useLocation } from "react-router-dom";
import { Bell, User } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (section) => {
    if (location.pathname !== "/") {
      navigate("/"); // Go to home page first
      setTimeout(() => {
        scroll.scrollTo(document.getElementById(section).offsetTop, { smooth: true });
      }, 100); // small delay to wait for page render
    } else {
      scroll.scrollTo(document.getElementById(section).offsetTop, { smooth: true });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-[#4CAF50] cursor-pointer" onClick={() => navigate('/')}>
          Krishi Sarathi
        </h1>

        {/* Links */}
        <div className="hidden md:flex items-center space-x-8">
          {["home", "services", "support", "about"].map((section) => (
            <button
              key={section}
              onClick={() => handleScroll(section)}
              className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-gray-50 rounded-full transition-colors">
            <Bell size={20} />
          </button>
          <button className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
            <User size={16} className="text-white" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
        <div className="flex flex-col space-y-2">
          {["home", "services", "support", "about"].map((section) => (
            <button
              key={section}
              onClick={() => handleScroll(section)}
              className="text-gray-700 hover:text-green-600 font-medium py-2"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;