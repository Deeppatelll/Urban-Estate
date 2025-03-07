import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        {/* Logo (Same as Original) */}
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Urban</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-2 rounded-lg flex items-center shadow-sm transition-all hover:shadow-md hover:bg-white"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64 px-2 text-gray-700 placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="p-2 rounded-lg bg-slate-300 hover:bg-slate-400 transition-all duration-300 hover:scale-105">
            <FaSearch className="text-slate-600" />
          </button>
        </form>

        {/* Navigation with Premium Effects */}
        <ul className="flex gap-6 items-center">
          <Link to="/">
            <li className="relative hidden sm:inline text-slate-700 font-medium transition-all duration-300 group">
              <span className="group-hover:text-slate-900">Home</span>
              <div className="absolute left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></div>
            </li>
          </Link>
          <Link to="/about">
            <li className="relative hidden sm:inline text-slate-700 font-medium transition-all duration-300 group">
              <span className="group-hover:text-slate-900">About</span>
              <div className="absolute left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></div>
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-8 w-8 object-cover border-2 border-slate-400 shadow-md hover:scale-110 transition-all"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className="text-slate-700 font-medium hover:text-slate-900 transition-all duration-300 hover:underline">
                Sign in
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}

