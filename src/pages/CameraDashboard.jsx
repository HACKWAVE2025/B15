import React, { useEffect, useState } from "react";
import { getLiveFeed, getCameraStreamURL } from "../api/cameraService";

const CameraDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getLiveFeed();
      setData(result);
    };

    fetchData();

    // Auto refresh every 5 seconds
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return <p className="text-center text-lg mt-10">Loading cameras...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">📡 Real-Time Camera Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        {data.cameras.map((cam) => (
          <div
            key={cam.id}
            className={`border rounded-xl shadow p-4 transition hover:shadow-lg ${
              cam.alert ? "border-red-500" : "border-green-400"
            }`}
          >
            <h2 className="font-semibold text-xl">{cam.name}</h2>
            <p className="text-sm text-gray-500">{cam.zone}</p>

            <img
              src={getCameraStreamURL(cam.id)}
              alt={cam.name}
              className="rounded mt-3 w-full h-48 object-cover"
            />

            <div className="mt-3 text-sm space-y-1">
              <p>🧍 People Count: {cam.peopleCount}</p>
              <p>📊 Crowd Density: {cam.crowdDensity}%</p>
              <p>
                ⚠️ Alert:{" "}
                {cam.alert ? cam.alertType || "Active" : "No Alert"}
              </p>
              <p>🔴 Status: {cam.status}</p>
            </div>

            <div
              className={`mt-3 p-2 rounded text-center font-semibold text-white ${
                cam.alert ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {cam.alert ? `⚠️ ${cam.alertType}` : "✅ Normal"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CameraDashboard;
