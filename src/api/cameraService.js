import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Fetch all live camera data
export const getLiveFeed = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/live-feed`);
  return response.data;
};

// Get video stream for a specific camera
export const getCameraStreamURL = (cameraId) => {
  return `${API_BASE_URL}/api/stream/${cameraId}`;
};
