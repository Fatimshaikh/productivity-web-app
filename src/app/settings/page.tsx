//src/app/settings/page.tsx
import ProtectedRoute from "@/components/ProtectedRoute";
import ThemeToggle from "@/components/ThemeToggle";

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Settings ⚙️</h2>

        <div className="space-y-6">
          {/* Dark Mode */}
          <section>
            <h3 className="text-lg font-semibold mb-2">Appearance</h3>
            <ThemeToggle />
          </section>

          {/* Profile Placeholder */}
          <section>
            <h3 className="text-lg font-semibold mb-2">Profile</h3>
            <div className="p-4 border rounded-lg dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300">
                User: <strong>Guest</strong>
              </p>
            </div>
          </section>
        </div>
      </div>
    </ProtectedRoute>
  );
}
