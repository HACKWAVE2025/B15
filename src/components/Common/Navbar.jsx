import React, { useState, useEffect } from 'react';
import { 
  Bell,
  User,
  Settings,
  LogOut,
  Shield,
  Clock,
  Activity,
  AlertTriangle,
  ChevronDown,
  Search,
  Menu,
} from 'lucide-react';

// ✅ Import Auth Context (important)
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ onMenuToggle, userName = 'Admin User', userRole = 'Control Room Operator' }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [systemStatus, setSystemStatus] = useState('operational');

  // ✅ use logout function from AuthContext
  const { logout } = useAuth();

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Sample notifications
  useEffect(() => {
    const sampleNotifications = [
      {
        id: 1,
        type: 'critical',
        title: 'Critical Alert',
        message: 'Overcrowding detected at Main Stage',
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        read: false
      },
      {
        id: 2,
        type: 'warning',
        title: 'High Crowd Density',
        message: 'Exit Gate B approaching capacity',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        read: false
      },
      {
        id: 3,
        type: 'info',
        title: 'System Update',
        message: 'Camera CAM-015 back online',
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        read: true
      }
    ];
    setNotifications(sampleNotifications);
    setUnreadCount(sampleNotifications.filter(n => !n.read).length);
  }, []);

  // Formatting helpers
  const formatTime = (date) =>
    date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  const formatDate = (date) =>
    date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  const formatNotificationTime = (date) => {
    const diffMins = Math.floor((new Date() - date) / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours}h ago`;
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'info':
        return <Activity className="w-5 h-5 text-blue-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = () => {
    switch (systemStatus) {
      case 'operational': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  // ✅ Corrected logout handler
  const handleLogout = () => {
    logout(); // triggers context logout and redirect
  };

  return (
    <nav className="bg-white shadow-lg border-b-2 border-gray-200 sticky top-0 z-50">
      <div className="px-6 py-3 flex items-center justify-between">
        {/* Left Section - Logo */}
        <div className="flex items-center gap-4">
          <button onClick={onMenuToggle} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
            <Menu className="w-6 h-6 text-gray-700" />
          </button>

          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">SentriAI</h1>
              <p className="text-xs text-gray-600">Crowd Safety & Alert System</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
            <div className={`w-2 h-2 rounded-full ${getStatusColor()} animate-pulse`}></div>
            <span className="text-sm font-semibold text-gray-700 capitalize">{systemStatus}</span>
          </div>
        </div>

        {/* Center - Time */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
            <Clock className="w-5 h-5 text-blue-600" />
            <div className="text-right">
              <div className="text-sm font-bold text-gray-800">{formatTime(currentTime)}</div>
              <div className="text-xs text-gray-600">{formatDate(currentTime)}</div>
            </div>
          </div>
        </div>

        {/* Right - User and Notifications */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-gray-100 rounded-lg"
            >
              <Bell className="w-6 h-6 text-gray-700" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border-2 border-gray-200">
                <div className="p-4 border-b border-gray-200 flex justify-between">
                  <h3 className="font-bold text-gray-800">Notifications</h3>
                  <button
                    onClick={() => {
                      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
                      setUnreadCount(0);
                    }}
                    className="text-xs text-blue-600 hover:text-blue-700"
                  >
                    Mark all as read
                  </button>
                </div>

                <div className="max-h-64 overflow-y-auto">
                  {notifications.map(notification => (
                    <div
                      key={notification.id}
                      onClick={() => {
                        setNotifications(prev => prev.map(n =>
                          n.id === notification.id ? { ...n, read: true } : n
                        ));
                        setUnreadCount(prev => Math.max(0, prev - 1));
                      }}
                      className={`p-4 hover:bg-gray-50 cursor-pointer ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {getNotificationIcon(notification.type)}
                        <div>
                          <h4 className="font-semibold text-sm">{notification.title}</h4>
                          <p className="text-sm text-gray-600">{notification.message}</p>
                          <span className="text-xs text-gray-500">
                            {formatNotificationTime(notification.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-semibold text-gray-800">{userName}</div>
                <div className="text-xs text-gray-600">{userRole}</div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-600 hidden md:block" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border-2 border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">{userName}</div>
                      <div className="text-sm text-gray-600">{userRole}</div>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg text-left">
                    <Settings className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-700">Settings</span>
                  </button>
                </div>

                <div className="p-2 border-t border-gray-200">
                  {/* ✅ Fixed logout logic */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-lg text-left"
                  >
                    <LogOut className="w-5 h-5 text-red-600" />
                    <span className="text-sm font-semibold text-red-600">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
