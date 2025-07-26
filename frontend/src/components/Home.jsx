import { Link, useNavigate } from "react-router-dom";
import DarkModeToggle from "./ui/darkmodetoggle.jsx";
import { Button } from "./ui/stateful-button.jsx";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 border-b bg-white/90 dark:bg-gray-900/90 backdrop-blur-md sticky top-0 z-50">
        <h1 className="text-3xl font-semibold tracking-tight">💸 PYTM</h1>
        <div className="flex gap-3 items-center">
          <Button variant="ghost" onClick={() => navigate("/signin")}>
            Login
          </Button>
          <Button onClick={() => navigate("/signup")}>Sign Up</Button>
          <DarkModeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 px-8 py-20 max-w-7xl mx-auto">
        {/* Left Content */}
        <div className="max-w-xl space-y-6">
          <h2 className="text-5xl font-bold tracking-tight leading-tight">
            Pay Smart. Live Easy.
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            A secure and lightning-fast payment solution built for ease and
            trust. Say goodbye to complexity.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Button size="lg" onClick={() => navigate("/signup")}>
              Get Started
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={() => navigate("/signin")}
            >
              Learn More →
            </Button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full max-w-md h-80 rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-purple-200/60 to-purple-400/60 dark:from-purple-700/60 dark:to-purple-900/60 flex items-center justify-center">
          <img
            src="/2.jpg"
            alt="App preview"
            className="object-cover w-full h-full"
          />
        </div>
      </main>
      {/* Features Section */}
      <section className="bg-white dark:bg-gray-950 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">
            Why Choose{" "}
            <span className="text-purple-600 dark:text-purple-400">PYTM?</span>
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-xl mx-auto">
            Designed to make your payments easier, faster, and safer — from
            personal use to business scale.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-left">
            {/* Feature Item */}
            {[
              {
                icon: "🔒",
                title: "Secure Transactions",
                desc: "End-to-end encryption and fraud detection built-in.",
              },
              {
                icon: "⚡",
                title: "Fast Checkout",
                desc: "Zero wait-time, blazing-fast processing experience.",
              },
              {
                icon: "📱",
                title: "Cross-Platform",
                desc: "Use seamlessly across web, mobile, or tablet.",
              },
              {
                icon: "🧠",
                title: "Smart Dashboard",
                desc: "Track payments, history, and insights in one place.",
              },
              {
                icon: "🔁",
                title: "Instant Refunds",
                desc: "Built for peace of mind. Instant and transparent.",
              },
              {
                icon: "📈",
                title: "Real-time Analytics",
                desc: "Powerful visualizations to help you grow.",
              },
            ].map((f, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="text-4xl">{f.icon}</div>
                <div>
                  <h4 className="text-lg font-semibold">{f.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; 2025 PYTM. All rights reserved.</p>
          <div className="flex gap-4">
            <p>Made by Oves Nadaf</p>
            <a
              href="https://github.com/0ves"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/oves-nadaf-58073b192/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
