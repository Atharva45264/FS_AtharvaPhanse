import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiUsers, FiMap, FiBriefcase, FiBell, FiMessageSquare } from "react-icons/fi";

export default function Dashboard() {
  const [studentsNearby] = useState(12);
  const [activeRoutes] = useState(4);
  const [carpoolGroups] = useState(8);
  const [notifications] = useState(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white p-8">
      {/* Title */}
      <motion.h1
        className="text-4xl font-bold mb-10 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🚗 Student Commute Optimizer Dashboard
      </motion.h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: <FiUsers size={28} />, label: "Nearby Students", value: studentsNearby },
          { icon: <FiMap size={28} />, label: "Active Routes", value: activeRoutes },
          { icon: <FiBriefcase size={28} />, label: "Carpool Groups", value: carpoolGroups },
          { icon: <FiBell size={28} />, label: "Notifications", value: notifications },
        ].map((card, index) => (
          <motion.div
            key={index}
            className="bg-white/20 backdrop-blur-lg p-6 rounded-2xl shadow-lg flex items-center gap-4"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            {card.icon}
            <div>
              <p className="text-lg">{card.label}</p>
              <h2 className="text-2xl font-bold">{card.value}</h2>
            </div>
          </motion.div>
        ))}
      </div>

      {/* About Project Section */}
      <motion.div
        className="mt-12 bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <FiMessageSquare /> About This Project
        </h2>
        <p className="text-lg leading-relaxed">
          The <strong>Student Commute Optimizer</strong> helps students find nearby peers traveling
          in the same direction to enable <span className="font-semibold">carpooling</span> and{" "}
          <span className="font-semibold">route sharing</span>. Students remain anonymous with
          unique usernames and can directly chat with peers along their route. 🚀
        </p>
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="mt-10 text-center text-sm opacity-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        © 2025 Student Commute Optimizer | Prototype Dashboard
      </motion.footer>
    </div>
  );
}

