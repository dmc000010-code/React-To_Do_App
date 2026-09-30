import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Check,
} from "lucide-react";
import avatarImg from "../assets/avatar.png";

export default function Navbar({
  searchQuery = "",
  setSearchQuery
}) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const profileMenuRef = useRef(null);
  const notifMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
      if (
        notifMenuRef.current &&
        !notifMenuRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <div className="flex items-center justify-between px-6 lg:px-8 h-[70px]">
        <div className="flex items-center gap-1.5 select-none shrink-0">
          <span className="text-[#2563eb] text-2xl lg:text-[26px] font-bold tracking-tight">
            To Do
          </span>
          <span className="text-slate-900 text-2xl lg:text-[26px] font-bold tracking-tight">
            App
          </span>
        </div>

        <div className="flex-1 max-w-2xl mx-6 lg:mx-12 hidden md:block">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks, status, or keywords..."
              className="w-full bg-[#f4f6f9] hover:bg-[#eef2f6] focus:bg-white text-slate-800 placeholder-slate-400 text-sm rounded-xl pl-11 pr-10 py-2.5 border border-slate-200/60 transition-all outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 text-xs text-slate-400 hover:text-slate-600 bg-slate-200 hover:bg-slate-300 rounded-full w-4 h-4 flex items-center justify-center transition-colors"
                title="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          <div className="relative" ref={notifMenuRef}>
            <button
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors active:scale-95"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />

              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
            </button>
          </div>

          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2.5 py-1 px-2 rounded-xl hover:bg-slate-100/80 transition-colors active:scale-98"
            >
              <img
                src={avatarImg}
                alt="Username"
                className="w-9 h-9 rounded-full object-cover border border-slate-200 shadow-xs"
              />
              <span className="text-sm font-semibold text-slate-800 hidden sm:inline-block">
                Hari Prasath
              </span>
              <ChevronDown
                className={`w-4 h-4 text-slate-600 transition-transform duration-200 ${
                  showProfileMenu ? "rotate-180" : ""
                }`}
              />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="py-1">
                </div>
                <div className="pt-1 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      alert("Logged out successfully");
                    }}
                    className="w-full px-4 py-2 text-left text-xs sm:text-sm text-red-600 hover:bg-red-50 flex items-center gap-2.5 font-medium transition-colors"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
