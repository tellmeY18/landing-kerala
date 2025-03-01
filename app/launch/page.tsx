"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Activity, CheckCircle2 } from "lucide-react";

export default function LaunchPage() {
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchStep, setLaunchStep] = useState(0);
  const [gridNodes, setGridNodes] = useState<
    { id: number; x: number; y: number; status: string }[]
  >([]);
  const [connections, setConnections] = useState<
    { id: number; from: number; to: number; status: string }[]
  >([]);
  const [systemMessages, setSystemMessages] = useState<string[]>([]);
  const router = useRouter();

  const messages = [
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

  // Generate grid nodes
  useEffect(() => {
    const nodes = [];
    const rows = 12;
    const cols = 15;

    for (let i = 0; i < rows * cols; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;

      // Add some randomness to positions for a more organic feel
      const xOffset = Math.random() * 15 - 7.5;
      const yOffset = Math.random() * 15 - 7.5;

      nodes.push({
        id: i,
        x: (col / (cols - 1)) * 100 + xOffset,
        y: (row / (rows - 1)) * 100 + yOffset,
        status: "active",
      });
    }

    setGridNodes(nodes);

    // Generate connections between nodes
    const conns = [];
    let connId = 0;

    // Horizontal connections
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols - 1; col++) {
        const fromId = row * cols + col;
        const toId = row * cols + col + 1;

        // Skip some connections randomly for a more organic feel
        if (Math.random() > 0.3) {
          conns.push({
            id: connId++,
            from: fromId,
            to: toId,
            status: "inactive",
          });
        }
      }
    }

    // Vertical connections
    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows - 1; row++) {
        const fromId = row * cols + col;
        const toId = (row + 1) * cols + col;

        // Skip some connections randomly
        if (Math.random() > 0.3) {
          conns.push({
            id: connId++,
            from: fromId,
            to: toId,
            status: "inactive",
          });
        }
      }
    }

    // Add some diagonal connections for more complexity
    for (let row = 0; row < rows - 1; row++) {
      for (let col = 0; col < cols - 1; col++) {
        if (Math.random() > 0.6) {
          const fromId = row * cols + col;
          const toId = (row + 1) * cols + col + 1;

          conns.push({
            id: connId++,
            from: fromId,
            to: toId,
            status: "inactive",
          });
        }
      }
    }

    setConnections(conns);
  }, []);

  // Handle the launch sequence
  useEffect(() => {
    if (!isLaunching) return;

    // Add initial message and set initial progress
    setSystemMessages([messages[0]]);
    setLaunchStep(10);

    // Remove node activation since they're already active
    // Only activate connections with a small initial delay
    const connInterval = setInterval(() => {
      setConnections((prev) => {
        const inactiveConns = prev.filter((conn) => conn.status === "inactive");
        if (inactiveConns.length === 0) {
          clearInterval(connInterval);
          return prev;
        }

        // Activate 1-2 connections at a time for slower animation
        const numToActivate = Math.min(
          Math.floor(Math.random() * 2) + 1,
          inactiveConns.length
        );
        const connsToActivate: number[] = [];

        for (let i = 0; i < numToActivate; i++) {
          const randomIndex = Math.floor(Math.random() * inactiveConns.length);
          connsToActivate.push(inactiveConns[randomIndex].id);
          inactiveConns.splice(randomIndex, 1);
        }

        return prev.map((conn) =>
          connsToActivate.includes(conn.id)
            ? { ...conn, status: "active" }
            : conn
        );
      });
    }, 60); // Slowed down connection activation

    // Update system messages and progress together
    let messageIndex = 1;
    const messageInterval = setInterval(() => {
      if (messageIndex < messages.length) {
        setSystemMessages((prev) => [...prev, messages[messageIndex]]);
        setLaunchStep((messageIndex + 1) * 10);
        messageIndex++;
      } else {
        clearInterval(messageInterval);
        setTimeout(() => {
          router.push("/launched");
        }, 1000); // Added small delay before redirect
      }
    }, 1200); // Slowed down message display

    return () => {
      clearInterval(connInterval);
      clearInterval(messageInterval);
    };
  }, [isLaunching, router]);

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
                    stroke: conn.status === "active" ? "#4ade80" : "#064e3b",
                  }}
                  transition={{ duration: 0.5 }}
                  stroke={conn.status === "active" ? "#4ade80" : "#064e3b"}
                  strokeWidth={conn.status === "active" ? 2 : 1}
                />
              );
            })}

            {/* Grid nodes */}
            {gridNodes.map((node) => (
              <g key={`node-${node.id}`}>
                <motion.circle
                  cx={`${node.x}%`}
                  cy={`${node.y}%`}
                  r={node.status === "active" ? 4 : 3}
                  initial={{ scale: 0.5, opacity: 0.3 }}
                  animate={{
                    scale: node.status === "active" ? [1, 1.2, 1] : 0.8,
                    opacity: node.status === "active" ? 1 : 0.3,
                    fill: node.status === "active" ? "#4ade80" : "#064e3b",
                  }}
                  transition={{
                    duration: 0.5,
                    scale: {
                      repeat:
                        node.status === "active" ? Number.POSITIVE_INFINITY : 0,
                      repeatType: "reverse",
                      duration: 2,
                    },
                  }}
                  fill={node.status === "active" ? "#4ade80" : "#064e3b"}
                />
                {node.status === "active" && (
                  <motion.circle
                    cx={`${node.x}%`}
                    cy={`${node.y}%`}
                    r={8}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1.5, 0],
                      opacity: [0, 0.4, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: Math.random() * 2,
                    }}
                    fill="none"
                    stroke="#4ade80"
                    strokeWidth={1.5}
                  />
                )}
              </g>
            ))}
          </svg>
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
                  <div className="flex flex-col gap-1">
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
                          systemMessages.length === messages.length ? (
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
