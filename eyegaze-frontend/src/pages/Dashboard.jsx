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
    <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 backdrop-blur-xl bg-white/5 border-r border-white/10 transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:w-72 z-50`}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <div className="flex items-center space-x-3">
            <img src={logoIcon} alt="EYEGAZE Logo" className="w-10 h-10 rounded-lg bg-emerald-400/20 p-1.5" />
            <h1 className="text-2xl font-semibold bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
              EYEGAZE
            </h1>
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
                      ? 'bg-emerald-400/20 text-emerald-400'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
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
            className="w-full px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all duration-200 flex items-center justify-center space-x-2"
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
        <header className="fixed top-0 left-0 w-full lg:w-[calc(100%-18rem)] lg:ml-72 backdrop-blur-xl bg-white/5 border-b border-white/10 z-40 py-5">
          <div className="flex items-center justify-between px-6">
            <div className="flex items-center space-x-4">
              {/* Left Side - Page Title */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden focus:outline-none hover:bg-gray-200 p-2 rounded-lg"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h2 className="text-xl font-semibold text-white capitalize">
                {location.pathname.split('/').pop()?.replace(/-/g, ' ') || 'Dashboard'}
              </h2>
            </div>

            {/* Right Side - User Profile & Dropdown */}
            <div className="relative flex items-center space-x-4">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-medium text-white">John Doe</span>
                <span className="text-xs text-gray-400">EYEGAZE Analytics</span>
              </div>

              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full border border-white/20 overflow-hidden">
                  <img 
                    src="https://via.placeholder.com/40" 
                    alt="User Avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div ref={dropdownRef} className="absolute right-0 top-full mt-2 w-48 backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg shadow-lg">
                  <ul className="py-2 text-gray-200">
                    <li>
                      <Link to="/dashboard/profile" className="block px-4 py-2 hover:bg-white/5 transition-colors">
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard/settings" className="block px-4 py-2 hover:bg-white/5 transition-colors">
                        Account Settings
                      </Link>
                    </li>
                    <li>
                      <button 
                        onClick={handleLogout} 
                        className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        Log Out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="pt-26 p-6">
          <div className="border-white/10 rounded-2xl">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
