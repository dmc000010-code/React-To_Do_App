
export default function HowItWorksBanner() {
  const statuses = [
    {
      title: "To Do",
      desc: "Task is created\nand not started yet",
      badgeColor: "bg-[#dbeafe]",
      dotColor: "bg-[#2563eb]",
      icon: <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb]" />,
    },
    {
      title: "In Progress",
      desc: "Task is currently\nbeing worked on",
      badgeColor: "bg-[#fef3c7]",
      dotColor: "bg-[#f59e0b]",
      icon: <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />,
    },
    {
      title: "Finished",
      desc: "Task is completed",
      badgeColor: "bg-[#dcfce7]",
      dotColor: "bg-[#10b981]",
      icon: <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />,
    },
    {
      title: "Cancelled",
      desc: "Task is cancelled\nand will not be done",
      badgeColor: "bg-[#ffe4e6]",
      dotColor: "bg-[#f43f5e]",
      icon: (
        <span className="w-3 h-3 rounded-full bg-[#f43f5e] text-white flex items-center justify-center text-[9px] font-bold leading-none">
          ✕
        </span>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col md:flex-row items-center gap-6 lg:gap-10">
      <div className="flex-1 w-full">
        <h2 className="text-xl font-bold text-slate-900 mb-1.5">
          How it works?
        </h2>
        <p className="text-sm text-slate-600 mb-5 leading-relaxed max-w-2xl">
          Create tasks, set due dates, and track their progress. Each task can be
          in one of the following statuses:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {statuses.map((s, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div
                className={`w-7 h-7 rounded-full ${s.badgeColor} flex items-center justify-center shrink-0 mt-0.5`}
              >
                {s.icon}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug">
                  {s.title}
                </h4>
                <p className="text-[11px] text-slate-500 whitespace-pre-line leading-tight mt-0.5">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
