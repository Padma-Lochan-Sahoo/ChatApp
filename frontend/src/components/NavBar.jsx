import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, Sun, Moon, User } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/70 shadow-md">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 group transition-all">
            <div className="size-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-150">
              <MessageSquare className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
            </div>
            <h1 className="text-xl font-semibold text-base-content">ConvoFlow</h1>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-2">

            {/* Theme toggle */}
            {/* Theme toggle switch */}
<label className="swap swap-rotate btn btn-ghost btn-sm px-2">
  <input
    type="checkbox"
    onChange={toggleTheme}
    checked={theme === "dark"}
  />
  <Sun className="swap-on fill-current w-5 h-5 text-yellow-400" />
  <Moon className="swap-off fill-current w-5 h-5 text-blue-500" />
</label>





            <Link to="/settings" className="btn btn-ghost btn-sm gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to="/profile" className="btn btn-ghost btn-sm gap-2">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  onClick={logout}
                  className="btn btn-outline btn-sm text-error border-error hover:bg-error hover:text-white gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
