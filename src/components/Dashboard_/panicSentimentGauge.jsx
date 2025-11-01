import React, { useState, useEffect } from 'react';
import { 
  Twitter, 
  MessageCircle, 
  TrendingUp,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  Meh,
  Activity,
  MapPin,
  Clock,
  Users,
  RefreshCw
} from 'lucide-react';

const PanicSentimentGauge = () => {
  const [sentimentScore, setSentimentScore] = useState(35);
  const [socialPosts, setSocialPosts] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState('15min');
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  const platforms = [
    { id: 'all', name: 'All Platforms', icon: Activity },
    { id: 'twitter', name: 'Twitter', icon: Twitter },
    { id: 'facebook', name: 'Facebook', icon: MessageCircle }
  ];

  // Sentiment categories
  const getSentimentLevel = (score) => {
    if (score < 20) return { level: 'calm', color: 'green', label: 'Calm', description: 'Normal crowd sentiment' };
    if (score < 40) return { level: 'concerned', color: 'blue', label: 'Concerned', description: 'Slight concern detected' };
    if (score < 60) return { level: 'anxious', color: 'yellow', label: 'Anxious', description: 'Elevated anxiety levels' };
    if (score < 80) return { level: 'worried', color: 'orange', label: 'Worried', description: 'High concern detected' };
    return { level: 'panic', color: 'red', label: 'Panic', description: 'Critical panic indicators' };
  };

  // Initialize data
  useEffect(() => {
    generateSampleData();

    // Simulate real-time updates
    const interval = setInterval(() => {
      updateSentimentData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const generateSampleData = () => {
    const samplePosts = [
      {
        id: 1,
        platform: 'twitter',
        user: '@event_goer_123',
        text: 'Crowd getting really dense near the main stage. Hard to move! #EventName',
        sentiment: 'negative',
        score: 65,
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        location: 'Main Stage',
        engagement: 45
      },
      {
        id: 2,
        platform: 'facebook',
        user: 'Sarah Johnson',
        text: 'Amazing performance! But the lines are super long everywhere',
        sentiment: 'mixed',
        score: 50,
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        location: 'Food Court',
        engagement: 23
      },
      {
        id: 3,
        platform: 'twitter',
        user: '@music_fan_99',
        text: "People are pushing near gate B. Security should look into this. It's getting unsafe.",
        sentiment: 'negative',
        score: 78,
        timestamp: new Date(Date.now() - 8 * 60 * 1000),
        location: 'Gate B',
        engagement: 112
      },
      {
        id: 4,
        platform: 'twitter',
        user: '@concert_lover',
        text: 'Great show! Well organized event. Safety measures are good.',
        sentiment: 'positive',
        score: 15,
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        location: 'General',
        engagement: 67
      },
      {
        id: 5,
        platform: 'facebook',
        user: 'Mike Chen',
        text: 'Exit routes are blocked! This is dangerous. Need immediate help!',
        sentiment: 'negative',
        score: 92,
        timestamp: new Date(Date.now() - 12 * 60 * 1000),
        location: 'Exit Area',
        engagement: 203
      },
      {
        id: 6,
        platform: 'twitter',
        user: '@festivalgoer',
        text: 'Having a blast! Though it is pretty crowded',
        sentiment: 'mixed',
        score: 35,
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        location: 'General',
        engagement: 18
      }
    ];

    const sampleKeywords = [
      { word: 'crowded', count: 156, sentiment: 'negative', trend: 'up' },
      { word: 'pushing', count: 89, sentiment: 'negative', trend: 'up' },
      { word: 'unsafe', count: 67, sentiment: 'negative', trend: 'up' },
      { word: 'blocked', count: 45, sentiment: 'negative', trend: 'stable' },
      { word: 'emergency', count: 34, sentiment: 'negative', trend: 'down' },
      { word: 'amazing', count: 234, sentiment: 'positive', trend: 'stable' },
      { word: 'great', count: 198, sentiment: 'positive', trend: 'up' },
      { word: 'fun', count: 176, sentiment: 'positive', trend: 'stable' }
    ];

    setSocialPosts(samplePosts);
    setKeywords(sampleKeywords);
  };

  const updateSentimentData = () => {
    // Update sentiment score with random fluctuation
    setSentimentScore(prev => {
      const change = (Math.random() - 0.5) * 10;
      return Math.max(0, Math.min(100, prev + change));
    });

    // Add new post occasionally
    if (Math.random() > 0.7) {
      const newPost = {
        id: Date.now(),
        platform: Math.random() > 0.5 ? 'twitter' : 'facebook',
        user: `@user_${Math.floor(Math.random() * 1000)}`,
        text: 'New social media post detected...',
        sentiment: ['positive', 'negative', 'mixed'][Math.floor(Math.random() * 3)],
        score: Math.floor(Math.random() * 100),
        timestamp: new Date(),
        location: ['Main Stage', 'Food Court', 'Exit Area', 'General'][Math.floor(Math.random() * 4)],
        engagement: Math.floor(Math.random() * 200)
      };
      setSocialPosts(prev => [newPost, ...prev.slice(0, 9)]);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    updateSentimentData();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const formatTime = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours}h ago`;
  };

  const getSentimentIcon = (sentiment) => {
    if (sentiment === 'positive') return <ThumbsUp className="w-4 h-4 text-green-600" />;
    if (sentiment === 'negative') return <ThumbsDown className="w-4 h-4 text-red-600" />;
    return <Meh className="w-4 h-4 text-yellow-600" />;
  };

  const getSentimentBadge = (sentiment) => {
    const styles = {
      positive: 'bg-green-100 text-green-700 border-green-300',
      negative: 'bg-red-100 text-red-700 border-red-300',
      mixed: 'bg-yellow-100 text-yellow-700 border-yellow-300'
    };
    return styles[sentiment] || styles.mixed;
  };

  const filteredPosts = socialPosts.filter(post => 
    selectedPlatform === 'all' || post.platform === selectedPlatform
  );

  const sentiment = getSentimentLevel(sentimentScore);
  const negativeCount = socialPosts.filter(p => p.sentiment === 'negative').length;
  const positiveCount = socialPosts.filter(p => p.sentiment === 'positive').length;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Panic Sentiment Gauge</h2>
          <p className="text-sm text-gray-600 mt-1">AI-powered social media monitoring</p>
        </div>
        <button
          onClick={handleRefresh}
          className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2 ${
            isRefreshing ? 'animate-pulse' : ''
          }`}
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Gauge and Stats */}
        <div className="col-span-1 space-y-6">
          {/* Circular Gauge */}
          <div className="relative">
            <svg viewBox="0 0 200 120" className="w-full">
              {/* Background arc */}
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="20"
                strokeLinecap="round"
              />
              
              {/* Colored segments */}
              <path d="M 20 100 A 80 80 0 0 1 52 45" fill="none" stroke="#22c55e" strokeWidth="20" strokeLinecap="round" />
              <path d="M 52 45 A 80 80 0 0 1 84 20" fill="none" stroke="#3b82f6" strokeWidth="20" strokeLinecap="round" />
              <path d="M 84 20 A 80 80 0 0 1 116 20" fill="none" stroke="#eab308" strokeWidth="20" strokeLinecap="round" />
              <path d="M 116 20 A 80 80 0 0 1 148 45" fill="none" stroke="#f97316" strokeWidth="20" strokeLinecap="round" />
              <path d="M 148 45 A 80 80 0 0 1 180 100" fill="none" stroke="#ef4444" strokeWidth="20" strokeLinecap="round" />
              
              {/* Needle */}
              <g transform={`rotate(${-90 + (sentimentScore * 1.8)} 100 100)`}>
                <line x1="100" y1="100" x2="100" y2="35" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
                <circle cx="100" cy="100" r="8" fill="#1f2937" />
              </g>
            </svg>
            
            <div className="text-center mt-4">
              <div className={`text-4xl font-bold ${
                sentiment.color === 'green' ? 'text-green-600' :
                sentiment.color === 'blue' ? 'text-blue-600' :
                sentiment.color === 'yellow' ? 'text-yellow-600' :
                sentiment.color === 'orange' ? 'text-orange-600' :
                'text-red-600'
              }`}>
                {Math.round(sentimentScore)}%
              </div>
              <div className={`text-lg font-semibold ${
                sentiment.color === 'green' ? 'text-green-700' :
                sentiment.color === 'blue' ? 'text-blue-700' :
                sentiment.color === 'yellow' ? 'text-yellow-700' :
                sentiment.color === 'orange' ? 'text-orange-700' :
                'text-red-700'
              }`}>
                {sentiment.label}
              </div>
              <div className="text-sm text-gray-600 mt-1">{sentiment.description}</div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-3">
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-blue-700">Posts Analyzed</span>
                <span className="text-xl font-bold text-blue-600">{socialPosts.length}</span>
              </div>
            </div>

            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-green-700">Positive</span>
                <span className="text-xl font-bold text-green-600">{positiveCount}</span>
              </div>
            </div>

            <div className="bg-red-50 p-3 rounded-lg border border-red-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-red-700">Negative</span>
                <span className="text-xl font-bold text-red-600">{negativeCount}</span>
              </div>
            </div>
          </div>

          {/* Time Range Selector */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Time Range</label>
            <div className="flex flex-col gap-2">
              {['5min', '15min', '1hour', '24hour'].map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-2 rounded text-sm ${
                    timeRange === range
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Last {range.replace('min', ' min').replace('hour', ' hour')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Column - Social Posts Feed */}
        <div className="col-span-1">
          <div className="flex gap-2 mb-4">
            {platforms.map(platform => {
              const Icon = platform.icon;
              return (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform.id)}
                  className={`flex-1 px-3 py-2 rounded text-sm flex items-center justify-center gap-2 ${
                    selectedPlatform === platform.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {platform.name === 'All Platforms' ? 'All' : platform.name}
                </button>
              );
            })}
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {filteredPosts.map(post => (
              <div
                key={post.id}
                className={`p-3 rounded-lg border-2 ${getSentimentBadge(post.sentiment)}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {post.platform === 'twitter' ? (
                      <Twitter className="w-4 h-4 text-blue-500" />
                    ) : (
                      <MessageCircle className="w-4 h-4 text-blue-600" />
                    )}
                    <span className="font-semibold text-sm text-gray-700">{post.user}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getSentimentIcon(post.sentiment)}
                    <span className="text-xs text-gray-500">{formatTime(post.timestamp)}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-800 mb-2">{post.text}</p>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-gray-600">
                      <MapPin className="w-3 h-3" />
                      {post.location}
                    </span>
                    <span className="flex items-center gap-1 text-gray-600">
                      <Users className="w-3 h-3" />
                      {post.engagement} reactions
                    </span>
                  </div>
                  <span className={`font-semibold ${
                    post.score > 70 ? 'text-red-600' :
                    post.score > 40 ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>
                    {post.score}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Keywords and Trends */}
        <div className="col-span-1 space-y-6">
          {/* Trending Keywords */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Trending Keywords
            </h3>
            <div className="space-y-2">
              {keywords.slice(0, 8).map((keyword, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border ${
                    keyword.sentiment === 'negative'
                      ? 'bg-red-50 border-red-200'
                      : 'bg-green-50 border-green-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800">#{keyword.word}</span>
                      {keyword.trend === 'up' && <TrendingUp className="w-4 h-4 text-red-500" />}
                    </div>
                    <span className="text-sm font-bold text-gray-600">{keyword.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alert Threshold */}
          {sentimentScore > 60 && (
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
              <div className="flex items-center gap-2 text-red-700 font-bold mb-2">
                <AlertTriangle className="w-5 h-5" />
                High Panic Alert
              </div>
              <p className="text-sm text-red-600 mb-3">
                Social sentiment has exceeded safe thresholds. Immediate attention required.
              </p>
              <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 font-semibold">
                Trigger Emergency Protocol
              </button>
            </div>
          )}

          {/* Sentiment Breakdown */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-3">Sentiment Distribution</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Positive</span>
                  <span className="font-semibold text-green-600">
                    {Math.round((positiveCount / socialPosts.length) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${(positiveCount / socialPosts.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Negative</span>
                  <span className="font-semibold text-red-600">
                    {Math.round((negativeCount / socialPosts.length) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${(negativeCount / socialPosts.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Mixed</span>
                  <span className="font-semibold text-yellow-600">
                    {Math.round(((socialPosts.length - positiveCount - negativeCount) / socialPosts.length) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: `${((socialPosts.length - positiveCount - negativeCount) / socialPosts.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanicSentimentGauge;