import React, { useState, useMemo, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebarcomp from "./components/Sidebarcomp";
import HowItWorksBanner from "./components/HowItWorksBanner";
import StatCards from "./components/StatCards";
import TaskTable from "./components/TaskTable";
import TaskModal from "./components/TaskModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import { Plus } from "lucide-react";
import { useLocalStorage } from "./Hooks/useLocalStorage.js";
import "./App.css";

const INITIAL_TASKS = [
  {
    id: 1,
    title: "Learn MongoDB",
    description: "Study basic CRUD operations",
    dueDate: "Sep 25, 2026",
    status: "To Do",
  },
  {
    id: 2,
    title: "Build To Do App",
    description: "Create a React To Do application",
    dueDate: "Sep 28, 2026",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Complete Project",
    description: "Finish and deploy the project",
    dueDate: "Sep 30, 2026",
    status: "Finished",
  },
  {
    id: 4,
    title: "Write Documentation",
    description: "Add README and usage guide",
    dueDate: "Oct 02, 2026",
    status: "Cancelled",
  },
  {
    id: 5,
    title: "Prepare Presentation",
    description: "Create slides for final review",
    dueDate: "Oct 05, 2026",
    status: "To Do",
  },
  {
    id: 6,
    title: "Configure CI/CD Pipeline",
    description: "Setup GitHub Actions workflow and deployment scripts",
    dueDate: "Oct 07, 2026",
    status: "To Do",
  },
  {
    id: 7,
    title: "User Acceptance Testing",
    description: "Perform end-to-end testing with QA team",
    dueDate: "Oct 08, 2026",
    status: "To Do",
  },
  {
    id: 8,
    title: "Security Audit",
    description: "Review dependencies and vulnerability scans",
    dueDate: "Oct 10, 2026",
    status: "To Do",
  },
  {
    id: 9,
    title: "Optimize Assets & Performance",
    description: "Compress images and audit lighthouse performance scores",
    dueDate: "Oct 01, 2026",
    status: "In Progress",
  },
  {
    id: 10,
    title: "Project Inception",
    description: "Define project scope, requirements and deliverables",
    dueDate: "Sep 12, 2026",
    status: "Finished",
  },
  {
    id: 11,
    title: "Wireframing & UI Design",
    description: "Draft Figma mockups for responsive layouts",
    dueDate: "Sep 15, 2026",
    status: "Finished",
  },
  {
    id: 12,
    title: "Component Architecture",
    description: "Plan reusable React component hierarchy and props",
    dueDate: "Sep 18, 2026",
    status: "Finished",
  },
  {
    id: 13,
    title: "Tailwind CSS Setup",
    description: "Configure design tokens, color palette and custom fonts",
    dueDate: "Sep 19, 2026",
    status: "Finished",
  },
  {
    id: 14,
    title: "State Management Architecture",
    description: "Setup React hooks and local state handlers",
    dueDate: "Sep 20, 2026",
    status: "Finished",
  },
  {
    id: 15,
    title: "Unit Testing Suite",
    description: "Configure test cases for core components",
    dueDate: "Sep 21, 2026",
    status: "Finished",
  },
  {
    id: 16,
    title: "Code Formatting & Linting",
    description: "Add ESLint rules and code standards",
    dueDate: "Sep 22, 2026",
    status: "Finished",
  },
];

function App() {
  const [tasks, setTasks] = useLocalStorage("INITIAL_TASKS", INITIAL_TASKS);
  const [activeTab, setActiveTab] = useState("To Do List");
  const [globalSearch, setGlobalSearch] = useState("");
  const [tableSearch, setTableSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(()=>{
    setTasks(INITIAL_TASKS);
  }, []);

  const counts = useMemo(() => {
    const list = Array.isArray(tasks) ? tasks : [];
    return {
      todo: list.filter((t) => t.status === "To Do").length,
      inProgress: list.filter((t) => t.status === "In Progress").length,
      finished: list.filter((t) => t.status === "Finished").length,
      cancelled: list.filter((t) => t.status === "Cancelled").length,
    };
  }, [tasks]);

  const handleSidebarTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "Home" || tabId === "To Do List") {
      setSelectedFilter("all");
    } else if (
      tabId === "In Progress" ||
      tabId === "Finished" ||
      tabId === "Cancelled"
    ) {
      setSelectedFilter(tabId);
    } else if (tabId === "Profile") {
      alert("Profile settings loaded for Hari Prasath");
    } else if (tabId === "Settings") {
      alert("Settings panel opened");
    }
  };

  const handleStatCardFilter = (status) => {
    if (selectedFilter === status) {
      setSelectedFilter("all");
    } else {
      setSelectedFilter(status);
    }
  };

  const filteredTasks = useMemo(() => {
    const list = Array.isArray(tasks) ? tasks : [];
    return list.filter((task) => {
      if (selectedFilter !== "all" && task.status !== selectedFilter) {
        return false;
      }

      if (globalSearch.trim()) {
        const q = globalSearch.toLowerCase().trim();
        const matchesTitle = task.title.toLowerCase().includes(q);
        const matchesDesc = task.description.toLowerCase().includes(q);
        const matchesStatus = task.status.toLowerCase().includes(q);
        const matchesDate = task.dueDate.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesStatus && !matchesDate) {
          return false;
        }
      }

      if (tableSearch.trim()) {
        const q = tableSearch.toLowerCase().trim();
        const matchesTitle = task.title.toLowerCase().includes(q);
        const matchesDesc = task.description.toLowerCase().includes(q);
        const matchesStatus = task.status.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesStatus) {
          return false;
        }
      }

      return true;
    });
  }, [tasks, selectedFilter, globalSearch, tableSearch]);

  const handleSaveTask = (taskData) => {
    if (taskToEdit) {
      setTasks((prev) =>
        (Array.isArray(prev) ? prev : []).map((t) =>
          t.id === taskToEdit.id ? { ...t, ...taskData } : t,
        ),
      );
      alert(`Task "${taskData.title}" updated successfully!`);
    } else {
      const newTask = {
        id: Date.now(),
        ...taskData,
      };
      setTasks((prev) => [newTask, ...(Array.isArray(prev) ? prev : [])]);
      alert(`Task "${taskData.title}" added successfully!`);
    }
    setTaskToEdit(null);
  };

  const handleOpenEditModal = (task) => {
    setTaskToEdit(task);
    setIsTaskModalOpen(true);
  };

  const handleOpenAddModal = () => {
    setTaskToEdit(null);
    setIsTaskModalOpen(true);
  };

  const handleOpenDeleteModal = (task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      setTasks((prev) =>
        (Array.isArray(prev) ? prev : []).filter(
          (t) => t.id !== taskToDelete.id,
        ),
      );
      alert(`Task "${taskToDelete.title}" deleted.`);
      setTaskToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="h-screen w-full bg-[#f8fafc] flex flex-col overflow-hidden text-slate-800">
      <Navbar
        searchQuery={globalSearch}
        setSearchQuery={setGlobalSearch}
        onOpenSettings={() => alert("Settings opened")}
        onOpenProfile={() => alert("Profile loaded for Hari Prasath")}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebarcomp
          activeTab={activeTab}
          setActiveTab={handleSidebarTabChange}
          counts={counts}
        />

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                To Do List
              </h1>
            </div>

            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-blue-500/20 active:scale-95 transition-all self-start sm:self-auto cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add To Do</span>
            </button>
          </div>

          <HowItWorksBanner />

          <StatCards
            counts={counts}
            selectedFilter={selectedFilter}
            onSelectFilter={handleStatCardFilter}
          />

          <TaskTable
            tasks={filteredTasks}
            tableSearchQuery={tableSearch}
            setTableSearchQuery={setTableSearch}
            onEditTask={handleOpenEditModal}
            onDeleteTask={handleOpenDeleteModal}
            onAddTask={handleOpenAddModal}
            filterStatus={selectedFilter}
            onClearFilter={() => setSelectedFilter("all")}
          />
        </main>
      </div>

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setTaskToEdit(null);
        }}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setTaskToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        taskTitle={taskToDelete?.title}
      />
    </div>
  );
}

export default App;
