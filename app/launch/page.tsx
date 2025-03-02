"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Activity, CheckCircle2 } from "lucide-react";

// Move messages array outside the component to prevent recreation on each render
const LAUNCH_MESSAGES = [
  "Initializing Kerala Palliative Care Grid...",
  "Establishing secure connections...",
  "Activating district nodes...",
  "Connecting healthcare facilities...",
  "Integrating community support systems...",
  "Synchronizing clinical systems...",
  "Activating response protocols...",
  "Enabling critical services...",
  "Finalizing system integration...",
  "Launching Kerala Palliative Care Grid...",
];

export default function LaunchPage() {
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchStep, setLaunchStep] = useState(0);
  const [gridNodes, setGridNodes] = useState<
    { id: number; x: number; y: number; status: string; iconType: string }[]
  >([]);
  const [connections, setConnections] = useState<
    { id: number; from: number; to: number; status: string }[]
  >([]);
  const [systemMessages, setSystemMessages] = useState<string[]>([]);

  // Array of healthcare participant types
  const participantTypes = [
    "doctor",
    "nurse",
    "hospital",
    "patient",
    "ambulance",
    "volunteer",
    "health",
  ];

  // Function to render the appropriate SVG icon based on type
  const renderIcon = (iconType: string, size: number) => {
    return (
      <div
        style={{
          width: size,
          height: size,
        }}
        className="relative"
      >
        <Image
          src={`/icons/${iconType}.svg`}
          alt={iconType}
          width={size}
          height={size}
          className="w-full h-full"
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </div>
    );
  };

  // Generate grid nodes
  useEffect(() => {
    const nodes: {
      id: number;
      x: number;
      y: number;
      status: string;
      iconType: string;
    }[] = [];
    const rows = 6;
    const cols = 8;

    // Create a more balanced distribution of icons
    const iconDistribution: string[] = [];
    const totalNodes = rows * cols;
    const iconsPerType = Math.ceil(totalNodes / participantTypes.length);

    // Fill the distribution array with a balanced mix of icon types
    participantTypes.forEach((iconType) => {
      for (let i = 0; i < iconsPerType; i++) {
        iconDistribution.push(iconType);
      }
    });

    // Shuffle the icon distribution array
    for (let i = iconDistribution.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [iconDistribution[i], iconDistribution[j]] = [
        iconDistribution[j],
        iconDistribution[i],
      ];
    }

    // Create nodes with random but fixed positions
    // Use a seeded random approach to ensure consistency
    const seed = 42; // Fixed seed for reproducibility
    const pseudoRandom = (n: number) => {
      // Simple pseudo-random function with seed
      return ((n * 9301 + 49297) % 233280) / 233280;
    };

    for (let i = 0; i < rows * cols; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;

      // Generate random offsets using our seeded function
      // This ensures the same "random" positions each time
      const xOffset = pseudoRandom(seed + i * 2) * 20 - 10; // -10 to +10
      const yOffset = pseudoRandom(seed + i * 2 + 1) * 20 - 10; // -10 to +10

      // Base position plus random offset
      const xPos = (col / (cols - 1)) * 85 + 7.5 + xOffset; // 7.5% padding on each side
      const yPos = (row / (rows - 1)) * 85 + 7.5 + yOffset; // 7.5% padding on each side

      // Assign an icon type from our balanced distribution
      const iconType = iconDistribution[i % iconDistribution.length];

      nodes.push({
        id: i,
        x: xPos, // Random but fixed position
        y: yPos, // Random but fixed position
        status: "active",
        iconType: iconType,
      });
    }

    setGridNodes(nodes);

    // Generate connections between nodes - more strategic connections
    const conns: { id: number; from: number; to: number; status: string }[] =
      [];
    let connId = 0;

    // Create a network where each node connects to 2-3 others
    nodes.forEach((node) => {
      // Find 2-3 closest nodes to connect to
      const otherNodes = [...nodes].filter((n) => n.id !== node.id);

      // Sort by distance
      otherNodes.sort((a, b) => {
        const distA = Math.sqrt(
          Math.pow(a.x - node.x, 2) + Math.pow(a.y - node.y, 2)
        );
        const distB = Math.sqrt(
          Math.pow(b.x - node.x, 2) + Math.pow(b.y - node.y, 2)
        );
        return distA - distB;
      });

      // Connect to 2-3 closest nodes
      const connectCount = 2 + Math.floor(pseudoRandom(seed + node.id) * 2); // 2-3 connections, but deterministic
      const nodesToConnect = otherNodes.slice(0, connectCount);

      nodesToConnect.forEach((targetNode) => {
        // Check if this connection already exists
        const connectionExists = conns.some(
          (conn) =>
            (conn.from === node.id && conn.to === targetNode.id) ||
            (conn.from === targetNode.id && conn.to === node.id)
        );

        if (!connectionExists) {
          conns.push({
            id: connId++,
            from: node.id,
            to: targetNode.id,
            status: "inactive",
          });
        }
      });
    });

    setConnections(conns);
  }, []); // Empty dependency array ensures it only runs once

  // Handle the launch sequence
  useEffect(() => {
    if (!isLaunching) return;

    // Reset state to ensure clean start
    const initialMessage = LAUNCH_MESSAGES[0];
    setSystemMessages([initialMessage]);
    setLaunchStep(10);

    // Simple sequential timer for messages
    let currentMessageIndex = 1;
    let timer: NodeJS.Timeout;

    // Only start the timer if we haven't shown all messages yet
    if (currentMessageIndex < LAUNCH_MESSAGES.length) {
      timer = setInterval(() => {
        if (currentMessageIndex < LAUNCH_MESSAGES.length) {
          // Add next message
          setSystemMessages((prev) => [
            ...prev,
            LAUNCH_MESSAGES[currentMessageIndex],
          ]);
          setLaunchStep((currentMessageIndex + 1) * 10);

          // Activate some connections with each message
          setConnections((prev) => {
            const inactiveConns = prev.filter(
              (conn) => conn.status === "inactive"
            );
            if (inactiveConns.length === 0) return prev;

            // Activate about 20% of remaining inactive connections with each step
            const numToActivate = Math.max(
              1,
              Math.floor(inactiveConns.length * 0.2)
            );
            const connsToActivate: number[] = [];

            for (
              let i = 0;
              i < numToActivate && i < inactiveConns.length;
              i++
            ) {
              const randomIndex = Math.floor(
                Math.random() * inactiveConns.length
              );
              connsToActivate.push(inactiveConns[randomIndex].id);
              inactiveConns.splice(randomIndex, 1);
            }

            return prev.map((conn) =>
              connsToActivate.includes(conn.id)
                ? { ...conn, status: "active" }
                : conn
            );
          });

          currentMessageIndex++;
        } else {
          // All messages displayed, clear interval and redirect
          clearInterval(timer);

          // Use window.location for direct navigation instead of router
          setTimeout(() => {
            window.location.href = "/launched";
          }, 1500);
        }
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isLaunching]); // Only depend on isLaunching

  // Add keyboard event listener for Enter key
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter" && !isLaunching) {
        handleLaunch();
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [isLaunching]);

  const handleLaunch = () => {
    setIsLaunching(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-950 to-green-900 text-green-50 overflow-hidden">
      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center relative">
        {/* Grid visualization */}
        <div className="absolute inset-0 w-full h-full">
          <svg className="w-full h-full">
            {/* Connections between nodes */}
            {connections.map((conn) => {
              const fromNode = gridNodes.find((n) => n.id === conn.from);
              const toNode = gridNodes.find((n) => n.id === conn.to);

              if (!fromNode || !toNode) return null;

              // Use consistent green color for connections
              const connectionColor =
                conn.status === "active"
                  ? "rgba(16, 185, 129, 0.5)" // Consistent green with transparency
                  : "#064e3b";

              return (
                <motion.line
                  key={`conn-${conn.id}`}
                  x1={`${fromNode.x}%`}
                  y1={`${fromNode.y}%`}
                  x2={`${toNode.x}%`}
                  y2={`${toNode.y}%`}
                  initial={{ pathLength: 0, opacity: 0.2 }}
                  animate={{
                    pathLength: conn.status === "active" ? 1 : 0,
                    opacity: conn.status === "active" ? 0.8 : 0.2,
                    stroke: connectionColor,
                  }}
                  transition={{
                    duration: 0.8,
                    pathLength: { type: "spring", stiffness: 50, damping: 15 },
                  }}
                  stroke={connectionColor}
                  strokeWidth={conn.status === "active" ? 2 : 1}
                />
              );
            })}
          </svg>

          {/* Grid nodes with icons */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            {gridNodes.map((node) => (
              <div
                key={`node-${node.id}`}
                className="absolute"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: "translate(-50%, -50%)",
                  opacity: node.status === "active" ? 1 : 0.3,
                }}
              >
                {/* Icon with increased size for better visibility */}
                <motion.div
                  className="flex items-center justify-center rounded-full p-1"
                  style={{
                    width: node.status === "active" ? "40px" : "32px",
                    height: node.status === "active" ? "40px" : "32px",
                    backgroundColor:
                      node.status === "active"
                        ? "rgba(16, 185, 129, 0.3)" // Consistent green background for active
                        : "rgba(6, 78, 59, 0.5)", // Darker background for inactive
                    boxShadow:
                      node.status === "active"
                        ? "0 0 12px rgba(16, 185, 129, 0.5)" // Consistent green glow
                        : "none",
                    border:
                      node.status === "active"
                        ? "1px solid #10b981" // Consistent green border
                        : "1px solid rgba(6, 78, 59, 0.8)",
                  }}
                  animate={
                    node.status === "active"
                      ? {
                          scale: [1, 1.08, 1],
                        }
                      : {}
                  }
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: Math.random() * 2,
                  }}
                >
                  {renderIcon(
                    node.iconType,
                    node.status === "active" ? 28 : 22
                  )}
                </motion.div>

                {/* Pulse effect */}
                {node.status === "active" && (
                  <motion.div
                    className="absolute rounded-full border"
                    style={{
                      width: "52px",
                      height: "52px",
                      top: "-6px",
                      left: "-6px",
                      borderColor: "#10b981", // Consistent green border
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1.5, 0],
                      opacity: [0, 0.4, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: Math.random() * 1.5,
                    }}
                  />
                )}

                {/* Add a second pulse effect for more dynamic animation */}
                {node.status === "active" && (
                  <motion.div
                    className="absolute rounded-full"
                    style={{
                      width: "40px",
                      height: "40px",
                      top: "0px",
                      left: "0px",
                      backgroundColor: "rgba(16, 185, 129, 0.2)", // Consistent green background
                    }}
                    initial={{ scale: 1, opacity: 0.2 }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: Math.random(),
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Kerala map outline */}
        <div className="absolute opacity-10 pointer-events-none">
          <Image
            src="/facilities-finder.svg"
            width={600}
            height={800}
            alt="Kerala map outline"
            className="w-[600px] h-[800px]"
          />
        </div>

        {/* Central content */}
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center p-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <AnimatePresence mode="wait">
            {!isLaunching ? (
              <motion.div
                key="logo"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-100 mb-20">
                  <Image
                    src="/kerala-light_custom_logo.svg"
                    width={400}
                    height={600}
                    alt="Kerala Care Logo"
                  />
                </motion.h1>

                <motion.button
                  onClick={handleLaunch}
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Outer rings */}
                  <motion.div
                    className="absolute -inset-8 rounded-full border-2 border-green-500/30"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.7, 0.3, 0.7] }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                  <motion.div
                    className="absolute -inset-4 rounded-full border-2 border-green-500/50"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.7, 0.5, 0.7] }}
                    transition={{
                      duration: 2.5,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />

                  {/* Main button */}
                  <motion.div
                    className="relative flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-green-600 to-green-800 shadow-lg shadow-green-900/50 border border-green-500/50"
                    whileHover={{
                      scale: 1.1,
                      background:
                        "linear-gradient(to bottom right, #059669, #065f46)",
                      boxShadow: "0 25px 30px -12px rgb(4 120 87 / 0.6)",
                      transition: { duration: 0.3, ease: "easeOut" },
                    }}
                  >
                    {/* Text ring around button */}
                    <motion.div
                      className="absolute -inset-3 rounded-full border-2 border-green-500/80 flex items-center justify-center"
                      whileHover={{
                        scale: 1.05,
                        borderWidth: "3px",
                        transition: { duration: 0.3, ease: "easeOut" },
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.span
                          className="text-xs text-green-300 tracking-widest uppercase"
                          whileHover={{
                            textShadow: "0 0 8px rgb(134 239 172 / 0.5)",
                          }}
                        >
                          Launch Grid
                        </motion.span>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="messages"
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* System messages */}
                <div className="w-full max-w-md h-64 overflow-hidden bg-green-950/50 border border-green-800/50 rounded-lg p-4 font-mono text-sm mb-8">
                  <div className="flex flex-col gap-1 text-left">
                    <AnimatePresence>
                      {systemMessages.map((message, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {index === systemMessages.length - 1 &&
                          systemMessages.length === LAUNCH_MESSAGES.length ? (
                            <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-400 flex-shrink-0" />
                          ) : (
                            <span className="text-green-400 flex-shrink-0">
                              {">"}
                            </span>
                          )}
                          <span className="text-green-200">{message}</span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Progress bar */}
                <motion.div
                  className="relative w-full max-w-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative h-3 bg-green-950/50 rounded-full overflow-hidden border border-green-800/50">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-600 to-green-400"
                      initial={{ width: "0%" }}
                      animate={{ width: `${launchStep}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>

                  {/* Percentage text */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-green-100 font-mono text-sm">
                    {launchStep}%
                  </div>

                  {/* Animated icons */}
                  <motion.div
                    className="absolute -bottom-4 left-0"
                    animate={{ x: `${launchStep}%` }}
                    transition={{ duration: 0.1 }}
                  >
                    <Activity className="h-3 w-3 text-green-400 -translate-x-1/2" />
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
}
