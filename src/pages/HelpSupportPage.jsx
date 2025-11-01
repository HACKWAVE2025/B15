import React, { useState } from "react";
import axios from "axios";

const HelpSupportPage = () => {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi! I'm SentriAI Assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages([...messages, userMsg]);
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:5000/chat", { message: input });
      const aiReply = res.data.reply || "Sorry, I didn’t understand that.";
      setMessages((prev) => [...prev, { sender: "ai", text: aiReply }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "⚠️ Error: Unable to connect to AI service." },
      ]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-4">
      <div className="bg-white w-full max-w-lg shadow-lg rounded-2xl flex flex-col">
        <div className="p-4 border-b bg-blue-600 text-white rounded-t-2xl">
          <h2 className="text-lg font-semibold">Help & Support Chat</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 h-[400px]">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg max-w-[80%] ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white self-end ml-auto"
                  : "bg-gray-200 text-gray-900 self-start"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && <div className="text-gray-400 italic">AI is typing...</div>}
        </div>

        <div className="flex items-center border-t p-3">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 p-2 border rounded-lg outline-none"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpSupportPage;
