"use client";

import { useState } from "react";
import Link from "next/link"; // ✅ Import Link from Next.js
import { Menu } from "lucide-react";
import AddTaskModal from "@/components/AddTaskModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center md:justify-between">
      {/* Left Section */}
      <div className="flex items-center space-x-3">
        {/* Hamburger for mobile */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={24} />
        </button>

        <h1 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white">
          📝 Productivity App
        </h1>
      </div>

      {/* Right Section */}
      <AddTaskModal />

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-64 bg-gray-50 dark:bg-gray-800 h-screen p-5 md:hidden">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/dashboard"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600"
            >
              Dashboard
            </Link>
            <Link
              href="/tasks"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600"
            >
              Tasks
            </Link>
            <Link
              href="/notes"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600"
            >
              Notes
            </Link>
            <Link
              href="/settings"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600"
            >
              Settings
            </Link>
          </nav>
        </div>
      )}
    </nav>
  );
}
