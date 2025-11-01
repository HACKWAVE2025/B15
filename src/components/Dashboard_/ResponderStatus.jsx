import React, { useState, useEffect } from 'react';
import { 
  User,
  MapPin,
  Clock,
  Phone,
  Radio,
  CheckCircle,
  AlertCircle,
  Activity,
  Navigation,
  MessageSquare,
  Shield,
  Ambulance,
  Flame,
  Users,
  Battery,
  Signal
} from 'lucide-react';

const ResponderStatus = () => {
  const [responders, setResponders] = useState([]);
  const [selectedResponder, setSelectedResponder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('status');

  // Responder types with icons
  const responderTypes = {
    security: { icon: Shield, color: 'blue', label: 'Security' },
    medical: { icon: Ambulance, color: 'red', label: 'Medical' },
    fire: { icon: Flame, color: 'orange', label: 'Fire Safety' },
    crowd_control: { icon: Users, color: 'purple', label: 'Crowd Control' }
  };

  // Status configurations
  const statusConfig = {
    available: { 
      color: 'green', 
      bg: 'bg-green-50', 
      border: 'border-green-300',
      text: 'text-green-700',
      label: 'Available',
      icon: CheckCircle
    },
    on_duty: { 
      color: 'blue', 
      bg: 'bg-blue-50', 
      border: 'border-blue-300',
      text: 'text-blue-700',
      label: 'On Duty',
      icon: Activity
    },
    responding: { 
      color: 'orange', 
      bg: 'bg-orange-50', 
      border: 'border-orange-300',
      text: 'text-orange-700',
      label: 'Responding',
      icon: Navigation
    },
    busy: { 
      color: 'red', 
      bg: 'bg-red-50', 
      border: 'border-red-300',
      text: 'text-red-700',
      label: 'Busy',
      icon: AlertCircle
    },
    off_duty: { 
      color: 'gray', 
      bg: 'bg-gray-50', 
      border: 'border-gray-300',
      text: 'text-gray-700',
      label: 'Off Duty',
      icon: Clock
    }
  };

  // Initialize responders data
  useEffect(() => {
    const initialResponders = [
      {
        id: 'SEC-001',
        name: 'James Wilson',
        type: 'security',
        status: 'available',
        location: 'Main Gate A',
        coordinates: { lat: 17.385, lng: 78.486 },
        assignedIncident: null,
        lastUpdate: new Date(Date.now() - 2 * 60 * 1000),
        phone: '+91-9876543210',
        battery: 85,
        signal: 4,
        responseTime: '2 min',
        completedTasks: 12
      },
      {
        id: 'MED-003',
        name: 'Dr. Sarah Chen',
        type: 'medical',
        status: 'responding',
        location: 'Food Court',
        coordinates: { lat: 17.387, lng: 78.488 },
        assignedIncident: 'INC-045',
        incidentType: 'Medical Emergency',
        lastUpdate: new Date(Date.now() - 1 * 60 * 1000),
        phone: '+91-9876543211',
        battery: 62,
        signal: 3,
        responseTime: '5 min',
        completedTasks: 8,
        eta: '3 mins'
      },
      {
        id: 'SEC-007',
        name: 'Michael Brown',
        type: 'security',
        status: 'busy',
        location: 'Main Stage - Section B',
        coordinates: { lat: 17.389, lng: 78.490 },
        assignedIncident: 'INC-043',
        incidentType: 'Crowd Control',
        lastUpdate: new Date(Date.now() - 5 * 60 * 1000),
        phone: '+91-9876543212',
        battery: 45,
        signal: 5,
        responseTime: '3 min',
        completedTasks: 15
      },
      {
        id: 'FIRE-002',
        name: 'Robert Martinez',
        type: 'fire',
        status: 'on_duty',
        location: 'Fire Station - West',
        coordinates: { lat: 17.383, lng: 78.484 },
        assignedIncident: null,
        lastUpdate: new Date(Date.now() - 3 * 60 * 1000),
        phone: '+91-9876543213',
        battery: 92,
        signal: 5,
        responseTime: '4 min',
        completedTasks: 5
      },
      {
        id: 'CROWD-005',
        name: 'Emily Davis',
        type: 'crowd_control',
        status: 'available',
        location: 'Exit Gate B',
        coordinates: { lat: 17.384, lng: 78.492 },
        assignedIncident: null,
        lastUpdate: new Date(Date.now() - 1 * 60 * 1000),
        phone: '+91-9876543214',
        battery: 78,
        signal: 4,
        responseTime: '2 min',
        completedTasks: 10
      },
      {
        id: 'MED-001',
        name: 'Dr. John Kumar',
        type: 'medical',
        status: 'available',
        location: 'Medical Center',
        coordinates: { lat: 17.386, lng: 78.487 },
        assignedIncident: null,
        lastUpdate: new Date(Date.now() - 4 * 60 * 1000),
        phone: '+91-9876543215',
        battery: 88,
        signal: 5,
        responseTime: '3 min',
        completedTasks: 6
      },
      {
        id: 'SEC-012',
        name: 'David Lee',
        type: 'security',
        status: 'responding',
        location: 'Parking Lot C',
        coordinates: { lat: 17.388, lng: 78.485 },
        assignedIncident: 'INC-046',
        incidentType: 'Suspicious Activity',
        lastUpdate: new Date(Date.now() - 30 * 1000),
        phone: '+91-9876543216',
        battery: 55,
        signal: 3,
        responseTime: '1 min',
        completedTasks: 18,
        eta: '2 mins'
      },
      {
        id: 'CROWD-008',
        name: 'Lisa Anderson',
        type: 'crowd_control',
        status: 'off_duty',
        location: 'Break Room',
        coordinates: { lat: 17.385, lng: 78.489 },
        assignedIncident: null,
        lastUpdate: new Date(Date.now() - 15 * 60 * 1000),
        phone: '+91-9876543217',
        battery: 100,
        signal: 5,
        responseTime: 'N/A',
        completedTasks: 14
      }
    ];

    setResponders(initialResponders);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setResponders(prev => prev.map(responder => ({
        ...responder,
        lastUpdate: new Date(),
        battery: Math.max(10, responder.battery - Math.random() * 2),
        signal: Math.min(5, Math.max(1, responder.signal + (Math.random() - 0.5)))
      })));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Format time ago
  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    
    if (diffSecs < 60) return `${diffSecs}s ago`;
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours}h ago`;
  };

  // Handle dispatch
  const handleDispatch = (responderId, incidentId = 'INC-NEW') => {
    setResponders(prev => prev.map(r => 
      r.id === responderId 
        ? { ...r, status: 'responding', assignedIncident: incidentId, incidentType: 'Emergency Response' }
        : r
    ));
  };

  // Handle recall
  const handleRecall = (responderId) => {
    setResponders(prev => prev.map(r => 
      r.id === responderId 
        ? { ...r, status: 'available', assignedIncident: null, incidentType: null }
        : r
    ));
  };

  // Handle contact
  const handleContact = (responder) => {
    alert(`Calling ${responder.name} at ${responder.phone}`);
  };

  // Filter and sort responders
  const filteredResponders = responders
    .filter(r => filterStatus === 'all' || r.status === filterStatus)
    .filter(r => filterType === 'all' || r.type === filterType)
    .sort((a, b) => {
      if (sortBy === 'status') {
        const statusOrder = ['responding', 'busy', 'on_duty', 'available', 'off_duty'];
        return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
      }
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'type') return a.type.localeCompare(b.type);
      return 0;
    });

  // Get statistics
  const stats = {
    total: responders.length,
    available: responders.filter(r => r.status === 'available').length,
    responding: responders.filter(r => r.status === 'responding').length,
    busy: responders.filter(r => r.status === 'busy').length,
    offDuty: responders.filter(r => r.status === 'off_duty').length
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Responder Status</h2>
          <p className="text-sm text-gray-600 mt-1">Real-time tracking and management</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2">
            <Radio className="w-4 h-4" />
            Broadcast
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Message All
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
          <div className="text-gray-600 text-sm font-semibold mb-1">Total Staff</div>
          <div className="text-3xl font-bold text-gray-800">{stats.total}</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
          <div className="text-green-700 text-sm font-semibold mb-1">Available</div>
          <div className="text-3xl font-bold text-green-600">{stats.available}</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-200">
          <div className="text-orange-700 text-sm font-semibold mb-1">Responding</div>
          <div className="text-3xl font-bold text-orange-600">{stats.responding}</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200">
          <div className="text-red-700 text-sm font-semibold mb-1">Busy</div>
          <div className="text-3xl font-bold text-red-600">{stats.busy}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
          <div className="text-gray-700 text-sm font-semibold mb-1">Off Duty</div>
          <div className="text-3xl font-bold text-gray-600">{stats.offDuty}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <div className="flex gap-2 items-center">
          <label className="text-sm font-semibold text-gray-700">Status:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="responding">Responding</option>
            <option value="busy">Busy</option>
            <option value="on_duty">On Duty</option>
            <option value="off_duty">Off Duty</option>
          </select>
        </div>

        <div className="flex gap-2 items-center">
          <label className="text-sm font-semibold text-gray-700">Type:</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="security">Security</option>
            <option value="medical">Medical</option>
            <option value="fire">Fire Safety</option>
            <option value="crowd_control">Crowd Control</option>
          </select>
        </div>

        <div className="flex gap-2 items-center">
          <label className="text-sm font-semibold text-gray-700">Sort:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="status">By Status</option>
            <option value="name">By Name</option>
            <option value="type">By Type</option>
          </select>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Responders List */}
        <div className="flex-1 space-y-3 max-h-[600px] overflow-y-auto pr-2">
          {filteredResponders.map(responder => {
            const TypeIcon = responderTypes[responder.type].icon;
            const StatusIcon = statusConfig[responder.status].icon;
            const statusInfo = statusConfig[responder.status];

            return (
              <div
                key={responder.id}
                onClick={() => setSelectedResponder(responder)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedResponder?.id === responder.id
                    ? 'border-blue-500 bg-blue-50'
                    : `${statusInfo.bg} ${statusInfo.border} hover:shadow-md`
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full bg-${responderTypes[responder.type].color}-100 flex items-center justify-center`}>
                      <TypeIcon className={`w-6 h-6 text-${responderTypes[responder.type].color}-600`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">{responder.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="font-semibold">{responder.id}</span>
                        <span>•</span>
                        <span>{responderTypes[responder.type].label}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusInfo.bg} border ${statusInfo.border}`}>
                    <StatusIcon className={`w-4 h-4 ${statusInfo.text}`} />
                    <span className={`text-sm font-semibold ${statusInfo.text}`}>
                      {statusInfo.label}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{responder.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{formatTimeAgo(responder.lastUpdate)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Battery className={`w-4 h-4 ${responder.battery < 30 ? 'text-red-500' : ''}`} />
                    <span>{Math.round(responder.battery)}%</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Signal className="w-4 h-4" />
                    <span>{'●'.repeat(Math.round(responder.signal))}{'○'.repeat(5 - Math.round(responder.signal))}</span>
                  </div>
                </div>

                {responder.assignedIncident && (
                  <div className="bg-white rounded p-2 mb-3 border border-gray-200">
                    <div className="flex items-center gap-2 text-sm">
                      <AlertCircle className="w-4 h-4 text-orange-600" />
                      <span className="font-semibold text-gray-700">
                        {responder.assignedIncident}: {responder.incidentType}
                      </span>
                    </div>
                    {responder.eta && (
                      <div className="text-xs text-gray-600 mt-1">ETA: {responder.eta}</div>
                    )}
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleContact(responder);
                    }}
                    className="flex-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm font-semibold flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </button>
                  {responder.status === 'available' ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDispatch(responder.id);
                      }}
                      className="flex-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm font-semibold flex items-center justify-center gap-2"
                    >
                      <Navigation className="w-4 h-4" />
                      Dispatch
                    </button>
                  ) : responder.status === 'responding' || responder.status === 'busy' ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRecall(responder.id);
                      }}
                      className="flex-1 px-3 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm font-semibold"
                    >
                      Recall
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        {/* Details Panel */}
        {selectedResponder && (
          <div className="w-96 bg-gray-50 rounded-lg p-4 border-2 border-blue-500">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-800">Responder Details</h3>
              <button
                onClick={() => setSelectedResponder(null)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="text-center pb-4 border-b border-gray-300">
                <div className={`w-20 h-20 mx-auto rounded-full bg-${responderTypes[selectedResponder.type].color}-100 flex items-center justify-center mb-3`}>
                  {React.createElement(responderTypes[selectedResponder.type].icon, {
                    className: `w-10 h-10 text-${responderTypes[selectedResponder.type].color}-600`
                  })}
                </div>
                <h4 className="text-xl font-bold text-gray-800">{selectedResponder.name}</h4>
                <p className="text-sm text-gray-600">{selectedResponder.id}</p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-600">Type</label>
                  <div className="text-lg font-semibold text-gray-800">
                    {responderTypes[selectedResponder.type].label}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600">Status</label>
                  <div className={`text-lg font-semibold ${statusConfig[selectedResponder.status].text}`}>
                    {statusConfig[selectedResponder.status].label}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600">Current Location</label>
                  <div className="text-sm font-semibold text-gray-800">{selectedResponder.location}</div>
                  <div className="text-xs text-gray-500">
                    {selectedResponder.coordinates.lat.toFixed(3)}, {selectedResponder.coordinates.lng.toFixed(3)}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600">Contact</label>
                  <div className="text-sm font-semibold text-gray-800">{selectedResponder.phone}</div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600">Average Response Time</label>
                  <div className="text-sm font-semibold text-gray-800">{selectedResponder.responseTime}</div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600">Tasks Completed Today</label>
                  <div className="text-sm font-semibold text-gray-800">{selectedResponder.completedTasks}</div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600">Device Status</label>
                  <div className="flex gap-4 mt-1">
                    <div className="flex items-center gap-2">
                      <Battery className={`w-4 h-4 ${selectedResponder.battery < 30 ? 'text-red-500' : 'text-green-500'}`} />
                      <span className="text-sm font-semibold">{Math.round(selectedResponder.battery)}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Signal className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-semibold">{Math.round(selectedResponder.signal)}/5</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600">Last Update</label>
                  <div className="text-sm text-gray-600">{formatTimeAgo(selectedResponder.lastUpdate)}</div>
                </div>
              </div>

              {selectedResponder.assignedIncident && (
                <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-3">
                  <div className="font-semibold text-orange-900 mb-2">Current Assignment</div>
                  <div className="text-sm text-orange-700">
                    <div className="font-semibold">{selectedResponder.assignedIncident}</div>
                    <div>{selectedResponder.incidentType}</div>
                    {selectedResponder.eta && <div className="mt-1">ETA: {selectedResponder.eta}</div>}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => handleContact(selectedResponder)}
                  className="flex-1 px-4 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 font-semibold flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </button>
                <button
                  onClick={() => alert('Sending message...')}
                  className="px-4 py-3 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  <MessageSquare className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResponderStatus;