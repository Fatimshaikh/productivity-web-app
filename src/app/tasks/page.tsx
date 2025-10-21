import ProtectedRoute from "@/components/ProtectedRoute";
import TaskList from "@/components/TaskList";

export default function TasksPage() {
  return (
    <ProtectedRoute>
      <div>
        <h2 className="text-2xl font-semibold mb-6">Your Tasks</h2>
        <TaskList />
      </div>
    </ProtectedRoute>
  );
}
