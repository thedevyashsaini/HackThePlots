"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Terminal,
  Shield,
  Flag,
  Trophy,
  ChevronRight,
  Code,
  Zap,
  GitBranch,
} from "lucide-react";

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { scrollYProgress } = useScroll();
  const [isTyping, setIsTyping] = useState(true);
  const [text, setText] = useState("");
  const fullText = "> Initializing secure environment...";

  useEffect(() => {
    if (isTyping) {
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
        if (text.length === fullText.length - 1) {
          setIsTyping(false);
        }
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [text, isTyping]);

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
          <div className="h-full w-full matrix-bg" />
        </motion.div>
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="h-full w-full bg-[linear-gradient(to_right,#8a2be280_1px,transparent_1px),linear-gradient(to_bottom,#8a2be280_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-purple-900/20 border border-purple-500/30 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              <span className="text-purple-300 font-mono">{text}</span>
            </div>

            <h1
              className="text-6xl md:text-7xl font-bold mb-6 glitch"
              data-text="HackThePlots"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-500">
                HackThePlots
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Where elite hackers forge their legacy. Master the art of
              cybersecurity through next-gen CTF challenges.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="cyber-button bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white px-8 py-4 rounded-lg text-lg font-medium group">
                <span className="relative z-10 flex items-center justify-center">
                  <Terminal className="w-5 h-5 mr-2" />
                  <Link href={"/login"}>
                    Launch Terminal
                  </Link>
                </span>
              </button>
              <button className="cyber-button border-2 border-purple-500/50 text-purple-300 px-8 py-4 rounded-lg text-lg font-medium hover:bg-purple-500/10">
                <span className="relative z-10 flex items-center justify-center">
                  <GitBranch className="w-5 h-5 mr-2" />
                  <Link
                    href="https://github.com/thedevyashsaini/hacktheplots"
                    target="_blank"
                  >
                    Fork Project
                  </Link>
                </span>
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center -ml-10"
          animate={{
            y: [0, 10, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
          }}
        >
          <p className="text-sm text-purple-300 mb-2">Scroll to explore</p>
          <ChevronRight className="h-6 w-6 text-purple-400 rotate-90" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="h-full w-full bg-[linear-gradient(to_right,#8a2be220_1px,transparent_1px),linear-gradient(to_bottom,#8a2be220_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>

        <div className="container mx-auto px-4 z-10 relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">
                HackThePlots
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our platform offers everything you need to host, participate, and
              excel in CTF competitions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <Terminal className="h-10 w-10 text-purple-400" />,
                title: "Dynamic Challenges",
                description:
                  "From web exploitation to reverse engineering, our platform supports all types of CTF challenges.",
              },
              {
                icon: <Shield className="h-10 w-10 text-purple-400" />,
                title: "Secure Infrastructure",
                description:
                  "Built with security in mind, ensuring your competitions and data remain protected.",
              },
              {
                icon: <Flag className="h-10 w-10 text-purple-400" />,
                title: "Real-time Scoring",
                description:
                  "Instant updates on team standings with our advanced scoring system.",
              },
              {
                icon: <Trophy className="h-10 w-10 text-purple-400" />,
                title: "Global Leaderboards",
                description:
                  "Compete against the best and track your progress on our global rankings.",
              },
              {
                icon: <Code className="h-10 w-10 text-purple-400" />,
                title: "Custom Environments",
                description:
                  "Create tailored environments for each challenge with our containerization.",
              },
              {
                icon: <Zap className="h-10 w-10 text-purple-400" />,
                title: "Instant Deployment",
                description:
                  "Launch your CTF competition in minutes with our streamlined setup process.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm border border-purple-900/30 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 30px -15px rgba(138, 43, 226, 0.3)",
                }}
              >
                <div className="bg-purple-900/20 rounded-lg p-3 w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 z-0">
          <div className="h-full w-full bg-[linear-gradient(to_right,#8a2be220_1px,transparent_1px),linear-gradient(to_bottom,#8a2be220_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(138,43,226,0.15)]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              {/* Background with purple gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-black z-0"></div>

              {/* Content */}
              <div className="relative z-10 p-6 sm:p-8 md:p-12 border border-purple-500/30 backdrop-blur-sm">
                <div className="flex flex-col items-start gap-8">
                  <div className="w-full">
                    <div className="inline-block bg-purple-900/30 border border-purple-500/30 rounded-full px-4 py-1 text-sm text-purple-300 mb-4">
                      <span className="flex items-center">
                        <span className="relative flex h-2 w-2 mr-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                        </span>
                        Open Source Project
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      Ready to test your skills?
                    </h2>
                    <p className="text-gray-300 mb-6 max-w-2xl">
                      HackThePlots is an open-source CTF hosting platform. Login
                      if a CTF is already hosted or host your own by cloning our
                      GitHub repository and deploying it yourself.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white border-0 px-6 py-6 h-auto">
                        <Link href="/">Login</Link>
                      </Button>
                      <Link
                        href="https://github.com/thedevyashsaini/hacktheplots"
                        target="_blank"
                        className="sm:w-auto w-full"
                      >
                        <Button
                          variant="outline"
                          className="border-purple-500 text-purple-300 hover:bg-purple-950/30 px-6 py-6 h-auto w-full"
                        >
                          Host Your Own CTF
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-8 md:mb-0">
              <Terminal className="h-8 w-8 text-purple-500 mr-2" />
              <span className="text-xl font-bold text-white">HackThePlots</span>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-4 justify-center">
              <Link
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                Home
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                Features
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                Competitions
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                Leaderboard
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                About
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0 text-center md:text-left">
              © {new Date().getFullYear()} HackThePlots. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-gray-500 hover:text-purple-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-purple-400 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
