import React, { useState, useEffect } from "react";
import { X, Calendar, CheckSquare, AlignLeft, Tag } from "lucide-react";

export default function TaskModal({
  isOpen,
  onClose,
  onSave,
  taskToEdit = null,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("To Do");
  const [error, setError] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || "");
      setDescription(taskToEdit.description || "");
      setDueDate(taskToEdit.dueDate || "");
      setStatus(taskToEdit.status || "To Do");
    } else {
      setTitle("");
      setDescription("");
      
      setDueDate("Oct 06, 2026");
      setStatus("To Do");
    }
    setError("");
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Task title is required");
      return;
    }

    onSave({
      ...(taskToEdit ? { id: taskToEdit.id } : {}),
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate.trim() || "Oct 06, 2026",
      status,
    });

    onClose();
  };

  const statusOptions = [
    {
      id: "To Do",
      label: "To Do",
      activeBg: "bg-blue-50 text-blue-700 border-blue-300 ring-2 ring-blue-500/20",
    },
    {
      id: "In Progress",
      label: "In Progress",
      activeBg:
        "bg-amber-50 text-amber-700 border-amber-300 ring-2 ring-amber-500/20",
    },
    {
      id: "Finished",
      label: "Finished",
      activeBg:
        "bg-emerald-50 text-emerald-700 border-emerald-300 ring-2 ring-emerald-500/20",
    },
    {
      id: "Cancelled",
      label: "Cancelled",
      activeBg: "bg-rose-50 text-rose-700 border-rose-300 ring-2 ring-rose-500/20",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-lg overflow-hidden transform animate-in zoom-in-95 duration-200">
        
        <div className="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563eb] flex items-center justify-center">
              <CheckSquare className="w-4.5 h-4.5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {taskToEdit ? "Edit Task" : "Add New Task"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        
        <form onSubmit={handleSubmit} className="p-6 space-y-4.5">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
              {error}
            </div>
          )}

          
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Learn MongoDB"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-3 focus:ring-blue-100 outline-none transition-all"
              autoFocus
            />
          </div>

          
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the task requirements..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-3 focus:ring-blue-100 outline-none transition-all resize-none"
            />
          </div>

          
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Due Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  placeholder="e.g. Sep 25, 2026"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-3 focus:ring-blue-100 outline-none transition-all"
                />
              </div>
            </div>

            
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Status
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {statusOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setStatus(opt.id)}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                      status === opt.id
                        ? opt.activeBg
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-[#2563eb] hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 active:scale-95 transition-all"
            >
              {taskToEdit ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
