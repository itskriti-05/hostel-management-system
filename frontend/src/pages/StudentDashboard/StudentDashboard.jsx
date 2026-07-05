import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import StudentBottomNav from '../../components/StudentsBottomNav';

export default function StudentDashboard() {
  return (
    <div className="flex min-h-screen bg-[#F5F9FF] dark:bg-[#0F1F2E] transition-colors duration-300">
       <Sidebar className="hidden lg:block" />
      <StudentBottomNav/>

      <main className="flex-1 lg:ml-56 mb-20 lg:mb-0 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}