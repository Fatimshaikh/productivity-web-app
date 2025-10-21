//src/components/AddTaskModal.tsx
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient"; // ✅ Import Supabase client

export default function AddTaskModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState("");

  // ✅ Updated handleSubmit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (task.trim() === "") return;

    // Insert the task into Supabase table
    const { data, error } = await supabase.from("tasks").insert([{ title: task }]);

    if (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Check the console for details.");
    } else {
      console.log("Task added:", data);
      alert("Task added successfully!");
    }

    setTask("");
    setIsOpen(false);
  };

  return (
    <>
      {/* Button to open modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
      >
        + New Task
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Add New Task
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter task title"
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
