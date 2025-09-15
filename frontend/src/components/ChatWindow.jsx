import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";
let socket;

export default function ChatWindow({ to, onClose }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const from = localStorage.getItem("username");

  useEffect(() => {
    socket = io(SOCKET_URL);
    socket.emit("join", from);

    socket.on("receiveMessage", ({ from: sender, message, timestamp }) => {
      setMessages(prev => [...prev, { from: sender, message, timestamp }]);
    });

    return () => socket.disconnect();
  }, []);

  function send() {
    if (!text) return;
    socket.emit("sendMessage", { from, to, message: text });
    setMessages(prev => [...prev, { from, message: text, timestamp: new Date() }]);
    setText("");
  }

  return (
    <div className="chat-drawer">
      <div className="chat-header">
        <strong>Chat with {to}</strong>
        <button className="btn tiny" onClick={onClose}>Close</button>
      </div>
      <div className="chat-body">
        {messages.map((m, i) => (
          <div key={i} className={`chat-msg ${m.from === from ? "me" : "them"}`}>
            <div className="who">{m.from}</div>
            <div className="text">{m.message}</div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Type a message" />
        <button className="btn primary" onClick={send}>Send</button>
      </div>
    </div>
  );
}
