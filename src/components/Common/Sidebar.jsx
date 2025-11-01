import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Map,
  Bell,
  Flame,
  Users,
  Video,
  MessageSquare,
  FileText,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Activity,
  Shield,
  Camera,
  TrendingUp,
  AlertTriangle,
  Upload
} from 'lucide-react';

const Sidebar = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  // Navigation items with routes
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
      badge: null,
      color: 'blue'
    },
    {
      id: 'live-map',
      label: 'Live Event Map',
      icon: Map,
      path: '/live-monitoring',
      badge: null,
      color: 'green'
    },
    {
      id: 'alerts',
      label: 'Anomaly Alerts',
      icon: Bell,
      path: '/alerts',
      badge: 5,
      badgeColor: 'bg-red-600',
      color: 'red'
    },
    {
      id: 'heatmap',
      label: 'Crowd Heatmap',
      icon: Flame,
      path: '/heatmap',
      badge: null,
      color: 'orange'
    },
    {
      id: 'sentiment',
      label: 'Panic Sentiment',
      icon: MessageSquare,
      path: '/sentiment',
      badge: 2,
      badgeColor: 'bg-yellow-600',
      color: 'yellow'
    },
    {
      id: 'responders',
      label: 'Responder Status',
      icon: Shield,
      path: '/responders',
      badge: null,
      color: 'purple'
    },
    {
      id: 'cameras',
      label: 'Video Feeds',
      icon: Video,
      path: '/cameras',
      badge: 23,
      badgeColor: 'bg-blue-600',
      color: 'indigo'
    },
    {
      id: 'video-analysis',
      label: 'Video Analysis',
      icon: Upload,
      path: '/video-analysis',
      badge: null,
      color: 'cyan'
    }
  ];

  const secondaryItems = [
    {
      id: 'reports',
      label: 'Event Reports',
      icon: FileText,
      path: '/reports',
      badge: null,
      color: 'gray'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      path: '/analytics',
      badge: null,
      color: 'teal'
    }
  ];

 
  const bottomItems = [
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      path: '/settings',
      badge: null,
      color: 'gray'
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: HelpCircle,
      path: '/help',
      badge: null,
      color: 'gray'
    }
  ];

  const getIconColor = (color, isActive) => {
    if (isActive) {
      const colorMap = {
        blue: 'text-blue-600',
        green: 'text-green-600',
        red: 'text-red-600',
        orange: 'text-orange-600',
        yellow: 'text-yellow-600',
        purple: 'text-purple-600',
        indigo: 'text-indigo-600',
        teal: 'text-teal-600',
        cyan: 'text-cyan-600',
        gray: 'text-gray-600'
      };
      return colorMap[color] || 'text-blue-600';
    }
    return 'text-gray-600';
  };

  const getActiveBg = (color) => {
    const colorMap = {
      blue: 'bg-blue-50 border-blue-600',
      green: 'bg-green-50 border-green-600',
      red: 'bg-red-50 border-red-600',
      orange: 'bg-orange-50 border-orange-600',
      yellow: 'bg-yellow-50 border-yellow-600',
      purple: 'bg-purple-50 border-purple-600',
      indigo: 'bg-indigo-50 border-indigo-600',
      teal: 'bg-teal-50 border-teal-600',
      cyan: 'bg-cyan-50 border-cyan-600',
      gray: 'bg-gray-50 border-gray-600'
    };
    return colorMap[color] || 'bg-blue-50 border-blue-600';
  };

  const renderNavItem = (item) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.path || location.pathname === item.path + '/';

    return (
      <NavLink
        key={item.id}
        to={item.path}
        onMouseEnter={() => setHoveredItem(item.id)}
        onMouseLeave={() => setHoveredItem(null)}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative ${
          isActive
            ? `${getActiveBg(item.color)} border-l-4 font-semibold`
            : 'hover:bg-gray-100 border-l-4 border-transparent'
        }`}
      >
        <Icon
          className={`w-5 h-5 flex-shrink-0 ${getIconColor(item.color, isActive)} transition-colors`}
        />
        {isOpen && (
          <>
            <span className={`flex-1 text-left text-sm ${
              isActive ? 'text-gray-900' : 'text-gray-700'
            }`}>
              {item.label}
            </span>
            {item.badge && (
              <span className={`${item.badgeColor} text-white text-xs font-bold px-2 py-1 rounded-full`}>
                {item.badge}
              </span>
            )}
          </>
        )}

        {!isOpen && item.badge && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {item.badge}
          </span>
        )}
      </NavLink>
    );
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-white shadow-xl border-r-2 border-gray-200 transition-all duration-300 z-50 flex flex-col ${
          isOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Header */}
        <div className={`p-4 border-b-2 border-gray-200 flex items-center ${
          isOpen ? 'justify-between' : 'justify-center'
        }`}>
          {isOpen && (
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-gray-800">SentriAI</span>
            </div>
          )}
          <button
            onClick={onToggle}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isOpen ? (
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-2">
          {/* Main Navigation */}
          <div className="mb-6">
            {isOpen && (
              <div className="px-4 mb-2">
                <span className="text-xs font-semibold text-gray-500 uppercase">Main Menu</span>
              </div>
            )}
            <div className="space-y-1">
              {navItems.map(item => renderNavItem(item))}
            </div>
          </div>

          {/* Secondary Navigation */}
          <div className="mb-6">
            {isOpen && (
              <div className="px-4 mb-2">
                <span className="text-xs font-semibold text-gray-500 uppercase">Reports & Data</span>
              </div>
            )}
            <div className="space-y-1">
              {secondaryItems.map(item => renderNavItem(item))}
            </div>
          </div>

          {/* System Status */}
          {isOpen && (
            <div className="mx-2 mb-4 p-3 bg-green-50 border-2 border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-green-600" />
                <span className="text-xs font-bold text-green-900">System Status</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-green-700">All Systems</span>
                  <span className="font-bold text-green-900">Operational</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-green-700">Active Cameras</span>
                  <span className="font-bold text-green-900">23/24</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-green-700">Responders</span>
                  <span className="font-bold text-green-900">45 Online</span>
                </div>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          {isOpen && (
            <div className="mx-2 mb-4 space-y-2">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-semibold text-blue-900">Live Attendees</span>
                  </div>
                  <span className="text-sm font-bold text-blue-600">12,450</span>
                </div>
              </div>
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                    <span className="text-xs font-semibold text-orange-900">Active Alerts</span>
                  </div>
                  <span className="text-sm font-bold text-orange-600">5</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="border-t-2 border-gray-200 p-2">
          <div className="space-y-1">
            {bottomItems.map(item => renderNavItem(item))}
          </div>
        </div>

       
        {/* Collapsed state indicator */}
        {!isOpen && (
          <div className="p-2 border-t border-gray-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mx-auto animate-pulse"></div>
          </div>
        )}
      </aside>
    </>
  );
};

Sidebar.defaultProps = {
  isOpen: true,
  onToggle: () => {}
};

export default Sidebar;