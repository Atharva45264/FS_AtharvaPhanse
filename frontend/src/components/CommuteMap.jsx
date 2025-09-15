import React, { useEffect, useState } from "react";
import { FiUsers, FiMap, FiBriefcase, FiBell } from "react-icons/fi";
import { motion } from "framer-motion";
import CommuteMap from "../components/CommuteMap";
import ChatWindow from "../components/ChatWindow";
import { api } from "../services/api";

export default function Dashboard() {
  const [routes, setRoutes] = useState([]);
  const [nearby, setNearby] = useState([]);
  const [chatTo, setChatTo] = useState(null);
  const username = localStorage.getItem("username");

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/routes");
        setRoutes(res.data);
      } catch (err) {}
    })();
  }, []);

  return (
    <div className="app-grid">
      <aside className="sidebar">
        <div className="logo">SCO</div>
        <nav>
          <a className="nav-item active"><FiMap /> Map</a>
          <a className="nav-item"><FiUsers /> Matches</a>
          <a className="nav-item"><FiBell /> Notifications</a>
          <a className="nav-item"><FiBriefcase /> About</a>
        </nav>
        <div className="sidebar-footer muted">Logged in as <strong>{username}</strong></div>
      </aside>

      <main className="main">
        <header className="main-header">
          <div>
            <h2>Welcome to Student Commute Optimizer</h2>
            <p className="muted">Find nearby students and coordinate anonymous carpools</p>
          </div>
          <div className="header-actions">
            <button className="btn">New Route</button>
          </div>
        </header>

        <section className="cards">
          <motion.div className="card" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 }}>
            <div className="card-title">Active users</div>
            <div className="card-value">{routes.length}</div>
          </motion.div>

          <motion.div className="card" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
            <div className="card-title">Nearby matches</div>
            <div className="card-value">{nearby.length}</div>
          </motion.div>

          <motion.div className="card" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }}>
            <div className="card-title">Anonymity</div>
            <div className="card-value">Enabled</div>
          </motion.div>
        </section>

        <section className="panel">
          <div className="panel-left">
            <CommuteMap routes={routes} onChat={(u) => setChatTo(u)} />
          </div>

          <div className="panel-right">
            <div className="about-card">
              <h3>About this project</h3>
              <p>
                Student Commute Optimizer matches students with overlapping routes using geospatial queries and lets them chat anonymously to coordinate carpools.
              </p>
              <ul>
                <li>Map-based route input & visualization</li>
                <li>Geospatial matching (MongoDB 2dsphere)</li>
                <li>Private real-time chat (Socket.IO)</li>
              </ul>
              <p className="muted small">Click a user marker on the map to start chat (anonymous username shown).</p>
            </div>

            <div className="help-card">
              <h4>Project sections</h4>
              <ol>
                <li>Auth & anonymized usernames</li>
                <li>Route storage + geospatial index</li>
                <li>Matching & suggestion algorithm</li>
                <li>Real-time chat & privacy</li>
              </ol>
            </div>
          </div>
        </section>
      </main>

      {chatTo && <ChatWindow to={chatTo} onClose={() => setChatTo(null)} />}
    </div>
  );
}
