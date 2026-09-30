import { Clock, Check, X, AlignJustify } from "lucide-react";

export default function StatCards({
  counts = { todo: 5, inProgress: 2, finished: 8, cancelled: 1 },
  selectedFilter = "all",
  onSelectFilter,
}) {
  const cards = [
    {
      id: "To Do",
      label: "To Do",
      count: counts.todo,
      bgColor: "bg-white",
      
      iconColor: "text-slate-600",
      activeRing: "ring-2 ring-blue-500",
      icon: (
        <div className="flex flex-col gap-1 items-center justify-center w-5">
          <span className="w-5 h-1.5 bg-slate-500 rounded-full" />
          <span className="w-5 h-1.5 bg-slate-500 rounded-full" />
          <span className="w-5 h-1.5 bg-slate-500 rounded-full" />
        </div>
      ),
    },
    {
      id: "In Progress",
      label: "In Progress",
      count: counts.inProgress,
      bgColor: "bg-white",
      
      iconColor: "text-[#d97706]",
      activeRing: "ring-2 ring-amber-500",
      icon: <Clock className="w-6 h-6 text-[#d97706] stroke-[2.2]" />,
    },
    {
      id: "Finished",
      label: "Finished",
      count: counts.finished,
      bgColor: "bg-white",
      
      iconColor: "text-[#16a34a]",
      activeRing: "ring-2 ring-emerald-500",
      icon: <Check className="w-6 h-6 text-[#16a34a] stroke-[2.8]" />,
    },
    {
      id: "Cancelled",
      label: "Cancelled",
      count: counts.cancelled,
      bgColor: "bg-white",
      
      iconColor: "text-[#e11d48]",
      activeRing: "ring-2 ring-rose-500",
      icon: <X className="w-6 h-6 text-[#e11d48] stroke-[2.8]" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card) => {
        const isSelected = selectedFilter === card.id;

        return (
          <div
            key={card.id}
            onClick={() => onSelectFilter && onSelectFilter(card.id)}
            className={`bg-white rounded-2xl p-5 border border-slate-200/70 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center gap-5 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
              isSelected ? card.activeRing : ""
            }`}
          >
            <div
              className={`w-14 h-14 rounded-full ${card.iconBg} flex items-center justify-center shrink-0`}
            >
              {card.icon}
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-700">
                {card.label}
              </span>
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                {card.count}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
