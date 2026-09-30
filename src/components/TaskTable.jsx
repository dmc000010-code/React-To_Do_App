import React from "react";
import { Search, Pencil, Trash2, Calendar, Plus, FilterX } from "lucide-react";

export default function TaskTable({
  tasks = [],
  tableSearchQuery = "",
  setTableSearchQuery,
  onEditTask,
  onDeleteTask,
  onAddTask,
  filterStatus = "all",
  onClearFilter,
}) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "To Do":
        return (
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-[#eef2ff] text-[#4338ca]">
            To Do
          </span>
        );
      case "In Progress":
        return (
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-[#fef3c7] text-[#b45309]">
            In Progress
          </span>
        );
      case "Finished":
        return (
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-[#dcfce7] text-[#15803d]">
            Finished
          </span>
        );
      case "Cancelled":
        return (
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-[#ffe4e6] text-[#be123c]">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden">
      
      <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            All Tasks ({tasks.length})
          </h3>
          {filterStatus !== "all" && (
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100">
              <span>Filter: {filterStatus}</span>
              <button
                onClick={onClearFilter}
                className="hover:text-blue-900 font-bold ml-1"
                title="Clear filter"
              >
                ×
              </button>
            </div>
          )}
        </div>

        
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={tableSearchQuery}
            onChange={(e) => setTableSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            className="w-full bg-[#f4f6f9] hover:bg-[#eef2f6] focus:bg-white text-slate-800 placeholder-slate-400 text-xs rounded-xl pl-9 pr-8 py-2 border border-slate-200/50 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
          />
          {tableSearchQuery && (
            <button
              onClick={() => setTableSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              ×
            </button>
          )}
        </div>
      </div>

      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-[#f8fafc]/90 border-b border-slate-100 text-[12px] font-semibold text-slate-600 uppercase tracking-wider">
              <th className="py-3.5 pl-6 pr-3 w-12 text-center">#</th>
              <th className="py-3.5 px-4 font-semibold">Task Title</th>
              <th className="py-3.5 px-4 font-semibold">Description</th>
              <th className="py-3.5 px-4 font-semibold">Due Date</th>
              <th className="py-3.5 px-4 font-semibold">Status</th>
              <th className="py-3.5 pr-6 pl-4 text-right font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <tr
                  key={task.id}
                  className="hover:bg-slate-50/80 transition-colors group text-sm"
                >
                  
                  <td className="py-4 pl-6 pr-3 text-center text-slate-700 font-medium">
                    {index + 1}
                  </td>

                  
                  <td className="py-4 px-4 font-semibold text-slate-900">
                    {task.title}
                  </td>

                  
                  <td className="py-4 px-4 text-slate-600 text-sm max-w-xs truncate">
                    {task.description}
                  </td>

                  
                  <td className="py-4 px-4 text-slate-700 text-sm whitespace-nowrap">
                    {task.dueDate}
                  </td>

                  
                  <td className="py-4 px-4 whitespace-nowrap">
                    {getStatusBadge(task.status)}
                  </td>

                  
                  <td className="py-4 pr-6 pl-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      
                      <button
                        onClick={() => onEditTask(task)}
                        className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors active:scale-95"
                        title="Edit task"
                      >
                        <Pencil className="w-4 h-4 stroke-[1.8]" />
                      </button>

                      
                      <button
                        onClick={() => onDeleteTask(task)}
                        className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors active:scale-95"
                        title="Delete task"
                      >
                        <Trash2 className="w-4 h-4 stroke-[1.8]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <FilterX className="w-8 h-8 text-slate-300" />
                    <p className="text-sm font-medium text-slate-600">
                      No tasks found matching your criteria.
                    </p>
                    <button
                      onClick={onAddTask}
                      className="mt-2 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      + Add New Task
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
