"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import {
  requestNotificationPermission,
  scheduleReminder,
} from "@/lib/reminders";
import {
  getOfflineTasks,
  clearOfflineTasks,
  saveOfflineTask,
} from "@/lib/offlineTasks"; // ✅ new import

export default function TaskList() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTask, setNewTask] = useState("");
  const { user } = useAuth();

  // ✅ Ask for notification permission when app loads
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  // ✅ Sync offline tasks when back online
  useEffect(() => {
    const syncOfflineTasks = async () => {
      const offlineTasks = getOfflineTasks();
      if (offlineTasks.length > 0 && user) {
        const { error } = await supabase.from("tasks").insert(offlineTasks);
        if (!error) {
          clearOfflineTasks();
          console.log("✅ Offline tasks synced successfully");
          toast.success("Offline tasks synced!");
          fetchTasks();
        } else {
          console.error("❌ Failed to sync offline tasks", error);
        }
      }
    };

    window.addEventListener("online", syncOfflineTasks);
    return () => window.removeEventListener("online", syncOfflineTasks);
  }, [user]);

  // ✅ Fetch only this user's tasks
  const fetchTasks = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id)
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      toast.error("Failed to load tasks");
    } else {
      setTasks(data || []);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchTasks();

    const channel = supabase
      .channel("tasks-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tasks" },
        () => fetchTasks()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  // ✅ Add new task with offline fallback
  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim() || !user) return;

    try {
      const { error } = await supabase
        .from("tasks")
        .insert([{ title: newTask, completed: false, user_id: user.id }]);

      if (error) {
        console.warn("Offline mode - saving locally");
        saveOfflineTask({ title: newTask, completed: false, user_id: user.id });
      } else {
        toast.success("Task added!");
        scheduleReminder(newTask, 1); // Reminder after 1 minute (for testing)
        setNewTask("");
      }
    } catch {
      console.warn("Offline mode - saving locally");
      saveOfflineTask({ title: newTask, completed: false, user_id: user.id });
    }
  };

  // ✅ Toggle task completion
  const toggleTask = async (id: number, completed: boolean) => {
    try {
      const { error } = await supabase
        .from("tasks")
        .update({ completed: !completed })
        .eq("id", id)
        .eq("user_id", user?.id);

      if (error) throw error;

      toast.success(
        !completed ? "Task marked as done!" : "Task marked as undone!"
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to update task");
    }
  };

  // ✅ Delete task
  const deleteTask = async (id: number) => {
    try {
      const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id)
        .eq("user_id", user?.id);

      if (error) throw error;

      toast.success("Task deleted!");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h3 className="text-xl font-semibold mb-4">Your Tasks</h3>

      {/* Add Task Form */}
      <form onSubmit={addTask} className="flex mb-5 space-x-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add
        </button>
      </form>

      {/* Task List */}
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex items-center justify-between p-3 border rounded-lg ${
              task.completed ? "bg-green-100" : "bg-white"
            }`}
          >
            <span
              className={`${
                task.completed ? "line-through text-gray-500" : "text-black"
              }`}
            >
              {task.title}
            </span>

            <div className="space-x-2">
              <button
                onClick={() => toggleTask(task.id, task.completed)}
                className="px-2 py-1 text-sm bg-blue-500 text-white rounded"
              >
                {task.completed ? "Undo" : "Done"}
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="px-2 py-1 text-sm bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
