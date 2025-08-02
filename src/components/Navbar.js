import React from "react";
import logo from "../assests/TAXERPAYlogo1.png"
 const Navbar = () => {
    return (
        <header className="bg-white shadow-sm py-4 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="md:hidden text-gray-700 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
          <img
            src={logo} // Placeholder for e-filing logo
            alt="e-Filing Logo"
            className="h-10"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center text-gray-700 text-sm hover:text-blue-600 focus:outline-none">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684L10.5 9l2.592-2.592a1 1 0 01.684-.948H19a2 2 0 012 2v11a2 2 0 01-2 2h-5.72a1 1 0 01-.948-.684L13.5 15l-2.592 2.592a1 1 0 01-.684.948H5a2 2 0 01-2-2V5z"></path></svg>
            Call Us
          </button>
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 rounded-md py-1 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>English</option>
              <option>Hindi</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
          <button className="text-gray-700 hover:text-blue-600 focus:outline-none">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
          </button>
          <button className="text-gray-700 hover:text-blue-600 focus:outline-none">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </button>
          <button className="text-gray-700 hover:text-blue-600 focus:outline-none">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          </button>
        </div>
      </header>
    )
 }
 export default Navbar;