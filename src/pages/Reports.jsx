import React, { useState, useEffect } from 'react';
import { 
  FileText,
  Download,
  Calendar,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Users,
  AlertTriangle,
  Clock,
  Eye,
  Trash2,
  Share2,
  Printer,
  BarChart3,
  PieChart,
  Activity,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  FileCheck,
  FileClock
} from 'lucide-react';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');

  // Report categories
  const reportTypes = {
    event: { label: 'Event Report', icon: FileText, color: 'blue' },
    incident: { label: 'Incident Report', icon: AlertTriangle, color: 'red' },
    analytics: { label: 'Analytics', icon: BarChart3, color: 'purple' },
    daily: { label: 'Daily Summary', icon: Calendar, color: 'green' },
    performance: { label: 'Performance', icon: TrendingUp, color: 'orange' }
  };

  // Initialize reports
  useEffect(() => {
    const sampleReports = [
      {
        id: 'RPT-001',
        title: 'Music Festival 2025 - Post Event Analysis',
        type: 'event',
        date: new Date('2025-10-20'),
        status: 'completed',
        author: 'System Admin',
        size: '2.4 MB',
        pages: 45,
        summary: {
          attendees: 15847,
          incidents: 23,
          responseTime: 3.2,
          satisfaction: 92
        },
        highlights: [
          'Zero critical injuries',
          'All incidents resolved within target time',
          '96% camera uptime'
        ]
      },
      {
        id: 'RPT-002',
        title: 'Sports Championship - Security Report',
        type: 'event',
        date: new Date('2025-10-15'),
        status: 'completed',
        author: 'Security Team',
        size: '1.8 MB',
        pages: 32,
        summary: {
          attendees: 12450,
          incidents: 18,
          responseTime: 2.8,
          satisfaction: 89
        },
        highlights: [
          'Excellent crowd management',
          'Fast incident response',
          'Positive attendee feedback'
        ]
      },
      {
        id: 'RPT-003',
        title: 'Tech Conference - Analytics Report',
        type: 'analytics',
        date: new Date('2025-10-10'),
        status: 'completed',
        author: 'Data Analytics',
        size: '3.1 MB',
        pages: 58,
        summary: {
          attendees: 8920,
          incidents: 12,
          responseTime: 4.1,
          satisfaction: 94
        },
        highlights: [
          'High satisfaction rate',
          'Efficient resource utilization',
          'Strong security metrics'
        ]
      },
      {
        id: 'RPT-004',
        title: 'Daily Summary - October 25, 2025',
        type: 'daily',
        date: new Date('2025-10-25'),
        status: 'completed',
        author: 'System',
        size: '856 KB',
        pages: 12,
        summary: {
          attendees: 5420,
          incidents: 6,
          responseTime: 2.5,
          satisfaction: 91
        },
        highlights: [
          'Low incident rate',
          'All systems operational',
          'Quick response times'
        ]
      },
      {
        id: 'RPT-005',
        title: 'Weekly Performance Analysis',
        type: 'performance',
        date: new Date('2025-10-24'),
        status: 'completed',
        author: 'Operations Manager',
        size: '1.2 MB',
        pages: 24,
        summary: {
          attendees: 42300,
          incidents: 67,
          responseTime: 3.5,
          satisfaction: 88
        },
        highlights: [
          'Improved response times',
          'Higher camera efficiency',
          'Team performance excellent'
        ]
      },
      {
        id: 'RPT-006',
        title: 'Incident Analysis - Gate B Overcrowding',
        type: 'incident',
        date: new Date('2025-10-23'),
        status: 'completed',
        author: 'Incident Commander',
        size: '645 KB',
        pages: 8,
        summary: {
          attendees: 580,
          incidents: 1,
          responseTime: 1.8,
          satisfaction: 85
        },
        highlights: [
          'Rapid response deployed',
          'Situation resolved in 12 minutes',
          'No injuries reported'
        ]
      },
      {
        id: 'RPT-007',
        title: 'Monthly System Performance - October 2025',
        type: 'performance',
        date: new Date('2025-10-22'),
        status: 'draft',
        author: 'Tech Lead',
        size: '2.8 MB',
        pages: 52,
        summary: {
          attendees: 125000,
          incidents: 234,
          responseTime: 3.1,
          satisfaction: 90
        },
        highlights: [
          'System uptime: 99.2%',
          'AI accuracy improved by 12%',
          'Reduced false positives'
        ]
      },
      {
        id: 'RPT-008',
        title: 'Q4 Analytics Dashboard',
        type: 'analytics',
        date: new Date('2025-10-20'),
        status: 'processing',
        author: 'Analytics Team',
        size: '4.2 MB',
        pages: 78,
        summary: {
          attendees: 342000,
          incidents: 567,
          responseTime: 3.4,
          satisfaction: 91
        },
        highlights: [
          'Quarter-over-quarter improvement',
          'Cost savings identified',
          'Enhanced safety protocols'
        ]
      }
    ];

    setReports(sampleReports);
    setFilteredReports(sampleReports);
  }, []);

  // Filter and search
  useEffect(() => {
    let filtered = [...reports];

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(r => r.type === filterType);
    }

    // Filter by date range
    const now = new Date();
    if (dateRange === 'today') {
      filtered = filtered.filter(r => {
        const diff = now - new Date(r.date);
        return diff < 24 * 60 * 60 * 1000;
      });
    } else if (dateRange === 'week') {
      filtered = filtered.filter(r => {
        const diff = now - new Date(r.date);
        return diff < 7 * 24 * 60 * 60 * 1000;
      });
    } else if (dateRange === 'month') {
      filtered = filtered.filter(r => {
        const diff = now - new Date(r.date);
        return diff < 30 * 24 * 60 * 60 * 1000;
      });
    }

    // Search
    if (searchQuery) {
      filtered = filtered.filter(r => 
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'type') return a.type.localeCompare(b.type);
      return 0;
    });

    setFilteredReports(filtered);
  }, [filterType, dateRange, searchQuery, sortBy, reports]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusBadge = (status) => {
    const badges = {
      completed: 'bg-green-100 text-green-700 border-green-300',
      draft: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      processing: 'bg-blue-100 text-blue-700 border-blue-300',
      archived: 'bg-gray-100 text-gray-700 border-gray-300'
    };
    return badges[status] || badges.completed;
  };

  const getStatusIcon = (status) => {
    const icons = {
      completed: CheckCircle,
      draft: FileClock,
      processing: Activity,
      archived: FileCheck
    };
    return icons[status] || CheckCircle;
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
  };

  const handleDownloadReport = (report) => {
    alert(`Downloading ${report.title}...`);
  };

  const handleShareReport = (report) => {
    alert(`Sharing ${report.title}...`);
  };

  const handleDeleteReport = (report) => {
    if (window.confirm(`Are you sure you want to delete "${report.title}"?`)) {
      setReports(prev => prev.filter(r => r.id !== report.id));
    }
  };

  const handleGenerateReport = () => {
    alert('Opening report generation wizard...');
  };

  // Calculate statistics
  const stats = {
    total: reports.length,
    completed: reports.filter(r => r.status === 'completed').length,
    draft: reports.filter(r => r.status === 'draft').length,
    thisMonth: reports.filter(r => {
      const diff = new Date() - new Date(r.date);
      return diff < 30 * 24 * 60 * 60 * 1000;
    }).length
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Reports & Analytics</h1>
            <p className="text-gray-600">View, generate, and manage event reports</p>
          </div>
          <button
            onClick={handleGenerateReport}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2"
          >
            <FileText className="w-5 h-5" />
            Generate New Report
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-600">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-600 text-sm mb-1">Total Reports</div>
                <div className="text-3xl font-bold text-gray-800">{stats.total}</div>
              </div>
              <FileText className="w-10 h-10 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-600">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-600 text-sm mb-1">Completed</div>
                <div className="text-3xl font-bold text-gray-800">{stats.completed}</div>
              </div>
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-600">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-600 text-sm mb-1">Draft</div>
                <div className="text-3xl font-bold text-gray-800">{stats.draft}</div>
              </div>
              <FileClock className="w-10 h-10 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-600">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-600 text-sm mb-1">This Month</div>
                <div className="text-3xl font-bold text-gray-800">{stats.thisMonth}</div>
              </div>
              <Calendar className="w-10 h-10 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            {Object.entries(reportTypes).map(([key, value]) => (
              <option key={key} value={key}>{value.label}</option>
            ))}
          </select>

          {/* Date Range */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
            <option value="type">Sort by Type</option>
          </select>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredReports.map(report => {
          const ReportIcon = reportTypes[report.type].icon;
          const StatusIcon = getStatusIcon(report.status);
          
          return (
            <div
              key={report.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 border border-gray-200"
            >
              <div className="flex items-start justify-between">
                {/* Left - Report Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-${reportTypes[report.type].color}-100`}>
                      <ReportIcon className={`w-8 h-8 text-${reportTypes[report.type].color}-600`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-800">{report.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(report.status)}`}>
                          <StatusIcon className="w-3 h-3 inline mr-1" />
                          {report.status.toUpperCase()}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                          {reportTypes[report.type].label}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(report.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          {report.id}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {report.author}
                        </span>
                        <span>{report.pages} pages • {report.size}</span>
                      </div>

                      {/* Summary Stats */}
                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div className="bg-blue-50 rounded p-3">
                          <div className="text-xs text-blue-700 mb-1">Attendees</div>
                          <div className="text-lg font-bold text-blue-600">
                            {report.summary.attendees.toLocaleString()}
                          </div>
                        </div>
                        <div className="bg-orange-50 rounded p-3">
                          <div className="text-xs text-orange-700 mb-1">Incidents</div>
                          <div className="text-lg font-bold text-orange-600">
                            {report.summary.incidents}
                          </div>
                        </div>
                        <div className="bg-green-50 rounded p-3">
                          <div className="text-xs text-green-700 mb-1">Response Time</div>
                          <div className="text-lg font-bold text-green-600">
                            {report.summary.responseTime} min
                          </div>
                        </div>
                        <div className="bg-purple-50 rounded p-3">
                          <div className="text-xs text-purple-700 mb-1">Satisfaction</div>
                          <div className="text-lg font-bold text-purple-600">
                            {report.summary.satisfaction}%
                          </div>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <div className="text-xs font-semibold text-gray-700 mb-2">Key Highlights:</div>
                        <ul className="space-y-1">
                          {report.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right - Actions */}
                <div className="flex flex-col gap-2 ml-4">
                  <button
                    onClick={() => handleViewReport(report)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button
                    onClick={() => handleDownloadReport(report)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-sm flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    onClick={() => handleShareReport(report)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold text-sm flex items-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold text-sm flex items-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    Print
                  </button>
                  <button
                    onClick={() => handleDeleteReport(report)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredReports.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Reports Found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your filters or search query</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterType('all');
              setDateRange('all');
            }}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Reports;