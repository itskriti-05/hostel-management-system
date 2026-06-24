import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function StudentDashboard() {
  return (
    <div className="flex min-h-screen bg-[#F5F9FF] dark:bg-[#0F1F2E] transition-colors duration-300">
      <Sidebar />
      <main className="flex-1 ml-56 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}