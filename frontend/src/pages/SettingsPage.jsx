import { useNavigate } from "react-router-dom";
import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import {
  Send,
  ArrowLeftCircle,
  ArrowRightCircle,
} from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  {
    id: 2,
    content: "I'm doing great! Just working on some new features.",
    isSent: true,
  },
];

const SettingsPage = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
<div className="bg-base-300 rounded-xl p-6 shadow-lg space-y-10">
        {/* 🔙 Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate(-1)}
            className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium text-primary border border-primary hover:bg-primary hover:text-primary-content transition-all duration-300"
          >
            <ArrowLeftCircle className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back</span>
          </button>
          <button
            onClick={() => navigate("/")}
            className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium text-primary border border-primary hover:bg-primary hover:text-primary-content transition-all duration-300"
          >
            <ArrowRightCircle className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            <span>Chat</span>
          </button>
        </div>

        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-primary">Theme</h1>
          <p className="mt-2 text-sm text-base-content/70">Choose a theme for your chat interface</p>
        </div>

        {/* Theme Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {THEMES.map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors border border-transparent hover:border-base-300
              ${theme === t ? "bg-base-200 border border-base-content/20" : "hover:bg-base-200/50"}`}
            >
              {/* Theme Preview Box */}
              <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>

              {/* Theme Name + Active Indicator */}
              <div className="relative w-full flex justify-center items-center gap-1">
                <span className="text-[11px] font-medium truncate">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
                {theme === t && (
                  <span
                    className="w-2.5 h-2.5 bg-success rounded-full border border-white shadow-sm animate-pulse"
                    title="Active Theme"
                  />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Preview Section */}
        <div>
          <h2 className="text-xl font-semibold">Preview</h2>
          <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow">
            <div className="p-4 bg-base-200">
              <div className="max-w-lg mx-auto bg-base-100 rounded-xl shadow-sm overflow-hidden">
                {/* Chat Header */}
                <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                      J
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">John Doe</h3>
                      <p className="text-xs text-base-content/70">Online</p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-4 space-y-4 max-h-[200px] overflow-y-auto bg-base-100">
                  {PREVIEW_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-xl p-3 shadow-sm ${
                          message.isSent ? "bg-primary text-primary-content" : "bg-base-200"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`text-[10px] mt-1.5 ${
                            message.isSent ? "text-primary-content/70" : "text-base-content/70"
                          }`}
                        >
                          12:00 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-base-300 bg-base-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="input input-bordered flex-1 text-sm h-10"
                      placeholder="Type a message..."
                      value="This is a preview"
                      readOnly
                    />
                    <button className="btn btn-primary h-10 min-h-0">
                      <Send size={18} />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
</div>
      </div>
    </div>
  );
};

export default SettingsPage;
