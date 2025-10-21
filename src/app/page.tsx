import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
        <p>Welcome to your productivity dashboard! 👋</p>
      </div>
    </ProtectedRoute>
  );
}
