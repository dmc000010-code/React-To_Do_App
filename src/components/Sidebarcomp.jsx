import {
  Home,
  CheckCircle2,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Settings,
} from "lucide-react";

export default function Sidebarcomp({
  activeTab = "To Do List",
  setActiveTab,
}) {
  const navItems = [
    {
      id: "Home",
      label: "Home",
    },
    {
      id: "To Do List",
      label: "To Do List",
    },
    {
      id: "In Progress",
      label: "In Progress",
    },
    {
      id: "Finished",
      label: "Finished",
    },
    {
      id: "Cancelled",
      label: "Cancelled",
    },
  ];

  const bottomItems = [
    {
      id: "Profile",
      label: "Profile",
      icon: User,
      iconColor: "text-slate-600",
    },
    {
      id: "Settings",
      label: "Settings",
      icon: Settings,
      iconColor: "text-slate-600",
    },
  ];

  return (
    <aside className="w-60 bg-white border-r border-slate-200/80 flex flex-col justify-between py-6 px-3.5 shrink-0 select-none">
      <div className="flex flex-col gap-6">
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab && setActiveTab(item.id)}
                className={`relative flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left w-full ${
                  isActive
                    ? "bg-[#eef2ff] text-[#2563eb] font-semibold shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <span className="flex-1">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-slate-100 pt-4 flex flex-col gap-1.5">
        {bottomItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab && setActiveTab(item.id)}
              className={`flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left w-full ${
                isActive
                  ? "bg-slate-100 text-slate-900 font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
