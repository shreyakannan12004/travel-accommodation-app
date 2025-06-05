import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-gray-100 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-700">
        <div>
          <h3 className="font-bold text-gray-900">Support</h3>
          <ul className="mt-2 space-y-2">
            <li>Help Center</li>
            <li>Safety information</li>
            <li>Cancellation options</li>
            <li>Our COVID-19 Response</li>
            <li>Supporting people with disabilities</li>
            <li>Report a neighborhood concern</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-gray-900">Community</h3>
          <ul className="mt-2 space-y-2">
            <li>Airbnb.org: disaster relief housing</li>
            <li>Support Afghan refugees</li>
            <li>Combating discrimination</li>
          </ul>
          <h3 className="font-bold text-gray-900 mt-6">Hosting</h3>
          <ul className="mt-2 space-y-2">
            <li>Try hosting</li>
            <li>AirCover: protection for Hosts</li>
            <li>Explore hosting resources</li>
            <li>Visit our community forum</li>
            <li>How to host responsibly</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-gray-900">About</h3>
          <ul className="mt-2 space-y-2">
            <li>Newsroom</li>
            <li>Learn about new features</li>
            <li>Letter from our founders</li>
            <li>Careers</li>
            <li>Investors</li>
            <li>Airbnb Luxe</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-gray-900">Connect with us</h3>
          <div className="flex space-x-4 mt-2">
            <FaFacebook className="text-gray-600 text-xl" />
            <FaTwitter className="text-gray-600 text-xl" />
            <FaInstagram className="text-gray-600 text-xl" />
            <FaYoutube className="text-gray-600 text-xl" />
          </div>

          <h3 className="font-bold text-gray-900 mt-6">Download the app</h3>
          <div className="mt-2 space-y-2">
            <button className="w-full border border-gray-300 py-2 px-4 rounded-lg flex items-center justify-center">
              <span>📱</span> App Store
            </button>
            <button className="w-full border border-gray-300 py-2 px-4 rounded-lg flex items-center justify-center">
              <span>📲</span> Google Play
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-300 pt-4 text-sm text-gray-600 text-center">
        © 2023 Airbnb, Inc. · <a href="">Privacy</a> · <a href="">Terms</a> · <a href=" ">Sitemap</a>
        <br />
        <span className="mt-2 inline-block">🌍 English (US) &nbsp; 💲 USD</span>
      </div>
    </div>
  );
};

export default Footer;
