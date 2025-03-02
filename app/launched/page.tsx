"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";

export default function LaunchedPage() {
  const [countdown, setCountdown] = useState(10);
  const router = useRouter();

  useEffect(() => {
    const redirectTimer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirectTimeout = setTimeout(() => {
      router.push("/?autoscroll=true");
    }, 10000);

    return () => {
      clearInterval(redirectTimer);
      clearTimeout(redirectTimeout);
    };
  }, [router]);

  useEffect(() => {
    // Trigger confetti effect when the page loads
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-950 to-green-900 text-green-50">
      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <motion.div
          className="max-w-2xl w-full bg-green-900/50 backdrop-blur-md rounded-xl p-8 border border-green-700/50 shadow-xl shadow-green-900/30"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 10,
                delay: 0.2,
              }}
              className="mb-6"
            >
              <div className="bg-green-800/50 p-6 rounded-full">
                <CheckCircle2 className="h-20 w-20 text-green-400" />
              </div>
            </motion.div>

            <motion.h1
              className="text-3xl md:text-4xl font-bold mb-6 text-green-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Kerala Palliative Care Grid Successfully Launched!
            </motion.h1>

            <motion.div
              className="w-24 h-1 bg-green-500 rounded-full mb-6"
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />

            <motion.p
              className="text-lg mb-8 text-green-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Thank you, Honorable Chief Minister, for inaugurating this
              landmark initiative. The Kerala Palliative Care Grid is now active
              and ready to serve the people of Kerala.
            </motion.p>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <Link
                href="/?autoscroll=true"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <span>View Palliative Care Grid ({countdown}s)</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
