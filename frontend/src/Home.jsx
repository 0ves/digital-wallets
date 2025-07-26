import { Link } from "react-router-dom";
import DarkModeToggle from "./components/ui/darkmodetoggle.jsx";
import { useNavigate } from "react-router-dom";
import { Button } from "./components/ui/stateful-button.jsx";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-amber-50 dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 bg-amber-300 dark:bg-gray-800 shadow-md">
        <h1 className="text-2xl font-bold">PYTM</h1>
        <div className="flex gap-4 items-center">
          <Button onClick={() => navigate("/signin")}>Login</Button>
          <Button onClick={() => navigate("/signup")}>Sign Up</Button>
          <DarkModeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 px-8 py-16">
        {/* Text Content */}
        <div className="max-w-xl space-y-4">
          <h2 className="text-4xl font-bold leading-tight">
            Pay Smart, Live Easy!
          </h2>
          <p className="text-lg">
            Secure. Fast. Seamless — Your All-in-One Payment Gateway Solution.
          </p>
          <div className="flex gap-4">
            <Button onClick={() => navigate("/signup")}>Get Started</Button>
            <Button variant="ghost" onClick={() => navigate("/signin")}>
              Learn More
            </Button>
          </div>
        </div>

        {/* Hero Image Placeholder */}
        <div className="w-full max-w-md h-64 bg-purple-300 dark:bg-purple-700 rounded-2xl flex items-center justify-center shadow-md">
          <img src="/2.jpg" alt="" srcset=""  className="h-64 w-full"/>
        </div>
      </main>

      {/* Footer */}
      <footer className=" fixed bottom-0 w-full bg-purple-400 dark:bg-purple-800 text-center py-6 mt-16 rounded-t-2xl">
        <div className="flex justify-around">
        <p>&copy; 2025 PYMT. All rights reserved.</p>
        <div>
        <p>created by </p>
      <a href="https://github.com/0ves"
         target="_blank">github</a>
         </div>  
         </div>
      </footer>
    </div>
  );
}
