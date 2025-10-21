"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "@/context/AuthContext";

const COLORS = ["#22c55e", "#ef4444"]; // green for done, red for pending

export default function DashboardPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const { user } = useAuth();

  // Fetch tasks
  const fetchTasks = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id);

    if (error) console.error(error);
    else setTasks(data || []);
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.length - completed;

  const chartData = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
  ];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        📊 Productivity Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Task Summary</h3>
          <p className="text-green-600 font-medium">
            ✅ Completed: {completed}
          </p>
          <p className="text-red-500 font-medium">
            ⏳ Pending: {pending}
          </p>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            Total Tasks: {tasks.length}
          </p>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
