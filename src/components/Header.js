import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { useAuth } from "../AuthContext";
import { auth } from "../firebase";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { enUS } from "react-date-range/dist/locale";

import { DateRange } from "react-date-range";
import { format, addDays } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css




import { FaSearch, FaGlobe, FaUserCircle, FaBars } from "react-icons/fa";
import "./Navbar.css";

Modal.setAppElement("#root");

const Header = () => {
  const { user, googleSignIn } = useAuth();
  const [activeTab, setActiveTab] = useState("stays");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [showWhereDropdown, setShowWhereDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
  setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
};
 useEffect(() => {
  if (theme === "dark") {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
  } else {
    document.body.classList.add("light");
    document.body.classList.remove("dark");
  }
}, [theme]);


  
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateType, setDateType] = useState(""); // "checkin" or "checkout"

  
  const [guests, setGuests] = useState({
    adults: 1,
    children: 1,
    infants: 2,
    pets: 1,
  });
  const [showDropdown, setShowDropdown] = useState(false);
  

  const handleIncrement = (type) => {
    setGuests({ ...guests, [type]: guests[type] + 1 });
  };

  const handleDecrement = (type) => {
    if (guests[type] > 0) {
      setGuests({ ...guests, [type]: guests[type] - 1 });
    }
  };
  const renderRow = (label, description, type, isLink = false) => (
    <div className="flex justify-between items-center py-4 border-b last:border-none">
      <div>
        <h3 className="text-base font-medium">{label}</h3>
        {isLink ? (
          <p className="text-sm text-gray-500">
            <a href="#" className="underline">Bringing a service animal?</a>
          </p>
        ) : (
          <p className="text-sm text-gray-500">{description}</p>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => handleDecrement(type)}
          className="w-8 h-8 border rounded-full text-lg font-medium text-gray-700 disabled:text-gray-300"
          disabled={guests[type] === 0}
          >
          –
        </button>
        <span>{guests[type]}</span>
        <button
          onClick={() => handleIncrement(type)}
          className="w-8 h-8 border rounded-full text-lg font-medium text-gray-700"
        >
          +
        </button>
      </div>
    </div>
  );

  const sendOtp = async () => {
    if (!phoneNumber || !phoneNumber.startsWith("+")) {
      alert("Please enter a valid phone number in E.164 format (e.g., +919876543210)");
      return;
    }

    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
          size: "invisible",
          callback: (response) => {},
          "expired-callback": () => {
            alert("reCAPTCHA expired. Please try again.");
          },
        });
      }

      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(confirmation);
      alert("OTP sent successfully!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Try again.");
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      alert("Please enter the OTP");
      return;
    }
    try {
      const result = await confirmationResult.confirm(otp);
      alert("Phone verification successful!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Invalid OTP. Try again.");
    }
  };

  

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowWhereDropdown(false);
  };

  const toggleDropdown = () => {
    setShowWhereDropdown((prev) => !prev);
  };

  const closeDropdown = () => {
    setShowWhereDropdown(false);
  };

  // Optional: Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("#where-dropdown-container")) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="fixed-navbar flex justify-between items-center px-6 py-4 shadow-md bg-white">
        <Link to="/" className="text-red-500 text-2xl font-bold flex items-center">
          <img
            className="h-[65px] w-[105px]"
            src="https://1000logos.net/wp-content/uploads/2017/08/Airbnb-Logo.png"
            alt="Airbnb logo"
          />
        </Link>
        

        <div className="flex space-x-8 mb-2">
          {["stays", "experiences"].map((tab) => (
            <span
              key={tab}
              className={`cursor-pointer text-lg font-medium pb-2 ${
                activeTab === tab ? "text-black border-b-2 border-black shadow-md" : "text-gray-400"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-6 p-4 rounded-full border shadow-md bg-white w-full max-w-xl mx-auto">
          {/* WHERE SECTION */}
          <div className="absolute top-full left-0 z-50 bg-white shadow-md"></div>
          <div className="relative" id="where-dropdown-container">
            <div className="text-sm cursor-pointer" onClick={toggleDropdown}>
              <p className="font-bold text-gray-800">Where</p>
              <p className="text-gray-500 text-xs">{selectedLocation || "Search destinations"}</p>
            </div>

            {/* Dropdown */}
            {showWhereDropdown && (
              <div className="absolute top-[110%] left-0 bg-white rounded-3xl shadow-2xl w-[350px] p-4 z-[1050] max-h-[400px] overflow-y-auto">
                <h3 className="text-gray-600 text-sm font-semibold mb-4">Suggested destinations</h3>

                {[
                  {
                    name: "Nearby",
                    description: "Find what’s around you",
                    icon: "📍",
                  },
                  {
                    name: "Puducherry, Puducherry",
                    description: "Popular beach destination",
                    icon: "🏖️",
                  },
                  {
                    name: "Ooty, Tamil Nadu",
                    description: "For nature lovers",
                    icon: "🌲",
                  },
                  {
                    name: "Kodaikanal, Tamil Nadu",
                    description: "Known for its lakes",
                    icon: "🏞️",
                  },
                  {
                    name: "Kochi, Kerala",
                    description: "For its stunning architecture",
                    icon: "🌉",
                  },
                  {
                    name: "North Goa, Goa",
                    description: "Popular beach destination",
                    icon: "🏝️",
                  },
                ].map((place, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-100 cursor-pointer transition"
                    onClick={() => handleLocationSelect(place.name)}
                  >
                    <div className="text-2xl">{place.icon}</div>
                    <div>
                      <div className="text-base font-medium text-gray-900">{place.name}</div>
                      <div className="text-sm text-gray-900">{place.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <span className="border-l h-6"></span>

          {/* Check-in */}
          <div className="text-sm cursor-pointer" onClick={() => {
            setShowDatePicker(true);
            setDateType("checkin");
          }}>
            <p className="font-bold text-gray-800">Check in</p>
            <p className="text-gray-500 text-xs">{format(dateRange[0].startDate, "MMM dd, yyyy")}</p>
          </div>
          <span className="border-l h-6"></span>

          {/* Check-out */}
          <div className="text-sm cursor-pointer" onClick={() => {
            setShowDatePicker(true);
            setDateType("checkout");
          }}>
            <p className="font-bold text-gray-800">Check out</p>
            <p className="text-gray-500 text-xs">{format(dateRange[0].endDate, "MMM dd, yyyy")}</p>
          </div>
          <span className="border-l h-6"></span>

          {/* Guests */}
          <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="px-30 py- border rounded-xl  font text-gray-500 bg-white shadow-md"
          >
            {`${guests.adults + guests.children} guests, ${guests.infants} infants`}
          </button>

          {showDropdown && (
              <div className="fixed top-30 right-25 bg-white rounded-xl shadow-xl font-bold text-gray-200 p-10 w-70 z-[9999]">
                
              {renderRow("Adults", "Ages 13 or above", "adults")}
              {renderRow("Children", "Ages 2–12", "children")}
              {renderRow("Infants", "Under 2", "infants")}
              {renderRow("Pets", "", "pets", true)}
            </div>
          )}
        </div>
          

          {showDatePicker && (
            <div
            className="absolute top-[80px] left-1/2 transform -translate-x-1/2 z-[999]"
          >
             <DateRange
  editableDateInputs={true}
  onChange={(item) => {
    setDateRange([item.selection]);
    if (dateType === "checkout") {
      setShowDatePicker(false); // close only after checkout
    } else {
      setDateType("checkout"); // prompt for next step
    }
  }}
  moveRangeOnFirstSelection={false}
  ranges={dateRange}
  minDate={new Date()}
  locale={enUS}  // Add this line to specify the locale
/>

            </div>
          )}
            
          <button className="bg-red-500 text-white p-4 rounded-full">
            <FaSearch />
          </button>
        </div>
         
        <div className="flex items-center space-x-4">
          <Link to="/host" className="text-gray-600 hover:text-black">
            Airbnb your home
          </Link>
          <FaGlobe className="text-gray-600" />
          {/* Theme toggle button here */}
  <button
  onClick={toggleTheme}
  style={{
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    color: "var(--text-color)",
    marginLeft: "20px",
  }}
>
  {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
</button>
          <div
            className="flex items-center space-x-2 border border-gray-300 px-3 py-2 rounded-full cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <FaBars className="text-gray-600" />
            <FaUserCircle className="text-gray-600 text-xl" />
          </div>
        </div>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          <div className="p-6">
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>✖</button>
            <h2 className="text-center font-bold text-xl mb-4">Log in or sign up</h2>
            <h3 className="text-lg font-semibold mb-4">Welcome to Airbnb</h3>

            <input
              type="text"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full mb-4 p-3 border border-gray-300 rounded-md"
            />
            <button onClick={sendOtp} className="w-full bg-red-500 text-white p-3 rounded-md">
              Send OTP
            </button>
             

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full mt-4 p-3 border border-gray-300 rounded-md"
            />
            <button onClick={verifyOtp} className="w-full bg-green-500 text-white p-3 rounded-md mt-4">
              Verify OTP
            </button>
          </div>
          

        </Modal>
      </header>
    </>
  );
};

export default Header;
