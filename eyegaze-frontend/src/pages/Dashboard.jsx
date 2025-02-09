import React, { useState, useEffect, useRef } from 'react';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { Link, useLocation, Outlet } from 'react-router-dom';
import logoIcon from '../assets/logo-icon.png';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Failed to log out.');
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { to: '/dashboard/overview', text: 'Overview' },
    { to: '/dashboard/website-testing', text: 'Website Testing' },
    { to: '/dashboard/heatmaps', text: 'Heatmaps' },
    { to: '/dashboard/prescription', text: 'Prescription' },
    { to: '/dashboard/diagnostic', text: 'Diagnostic' },
    { to: '/dashboard/help-support', text: 'Help & Support' },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-gray-900/80 backdrop-blur-lg border-r border-gray-700/50 transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:w-72 z-50`}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-gray-700/50">
          <div className="flex items-center space-x-3">
            <img src={logoIcon} alt="EYEGAZE Logo" className="w-10 h-10 rounded-lg bg-blue-500/20 p-1.5" />
            <h1 className="text-2xl font-semibold text-white">EYEGAZE</h1>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden focus:outline-none hover:bg-gray-700/30 p-1 rounded-full"
          >
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    location.pathname === item.to
                      ? 'bg-blue-500/20 text-blue-400 shadow-lg'
                      : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                  }`}
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-6 w-full px-6">
          <button
            onClick={handleLogout}
            className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>Logout</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7" />
            </svg>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72">
        {/* Header */}
        <header className="fixed top-0 left-0 w-full lg:w-[calc(100%-18rem)] lg:ml-72 bg-white border-b border-gray-300 z-40 shadow-md py-5">
          <div className="flex items-center justify-between px-6">
            {/* Left Side - Page Title */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden focus:outline-none hover:bg-gray-200 p-2 rounded-lg"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h2 className="text-xl font-semibold text-gray-800 capitalize">
                {location.pathname.split('/').pop()?.replace(/-/g, ' ') || 'Dashboard'}
              </h2>
            </div>

            {/* Right Side - User Profile & Dropdown */}
            <div className="relative flex items-center space-x-4">
              {/* Hide Name & Title on Mobile */}
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-medium text-gray-800">John Doe</span>
                <span className="text-xs text-gray-500">EYEGAZE Analytics</span>
              </div>

              {/* Clickable Profile Icon */}
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="focus:outline-none"
              >
                <img 
                  src="https://via.placeholder.com/40" 
                  alt="User Avatar" 
                  className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
                />
              </button>

              {/* Dropdown Button (Hidden on Mobile) */}
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="hidden md:block p-2 rounded-lg focus:outline-none hover:bg-gray-200"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div ref={dropdownRef} className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <ul className="py-2 text-gray-700">
                    <li>
                      <Link to="/dashboard/profile" className="block px-4 py-2 hover:bg-gray-100">My Profile</Link>
                    </li>
                    <li>
                      <Link to="/dashboard/settings" className="block px-4 py-2 hover:bg-gray-100">Account Settings</Link>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600">Log Out</button>
                    </li>
                  </ul>
                </div>
              )}

            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="pt-20">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
