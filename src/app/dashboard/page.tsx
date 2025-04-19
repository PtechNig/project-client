"use client";
import { FiBook, FiAward, FiClock, FiCalendar } from 'react-icons/fi';

export default function DashboardPage() {
  // Sample data - replace with your actual data source
  const stats = [
    { title: "Active Courses", value: 3, icon: <FiBook className="text-blue-500" /> },
    { title: "Completed Lessons", value: 12, icon: <FiAward className="text-green-500" /> },
    { title: "Pending Assignments", value: 2, icon: <FiClock className="text-yellow-500" /> },
    { title: "Upcoming Deadlines", value: 1, icon: <FiCalendar className="text-red-500" /> }
  ];

  const recentActivity = [
    { id: 1, course: "Introduction to Python", action: "Completed Lesson 5", time: "2 hours ago" },
    { id: 2, course: "Web Development", action: "Submitted Assignment 2", time: "1 day ago" },
    { id: 3, course: "Data Science", action: "Started Lesson 3", time: "3 days ago" }
  ];

  const courses = [
    { name: "Python Fundamentals", progress: 65, color: "bg-blue-500" },
    { name: "Web Development Basics", progress: 40, color: "bg-purple-500" },
    { name: "Data Science Intro", progress: 30, color: "bg-green-500" }
  ];

  return (
    <div className="space-y-6 text-[#005188]">
      {/* Welcome Header */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, Student!</h1>
        <p className="text-gray-600">Here&apos;s what&apos;s happening with your learning today</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow flex items-center">
            <div className="p-3 rounded-full bg-gray-100 mr-4">
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FiClock className="mr-2" /> Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map(activity => (
              <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <FiBook className="text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium">{activity.course}</h3>
                  <p className="text-gray-600">{activity.action}</p>
                  <p className="text-sm text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Progress */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FiBook className="mr-2" /> Course Progress
          </h2>
          <div className="space-y-4">
            {courses.map((course, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{course.name}</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${course.color}`} 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-blue-50 text-blue-600 p-4 rounded-lg hover:bg-blue-100 transition">
            View Assignments
          </button>
          <button className="bg-green-50 text-green-600 p-4 rounded-lg hover:bg-green-100 transition">
            Continue Learning
          </button>
          <button className="bg-purple-50 text-purple-600 p-4 rounded-lg hover:bg-purple-100 transition">
            View Grades
          </button>
          <button className="bg-yellow-50 text-yellow-600 p-4 rounded-lg hover:bg-yellow-100 transition">
            Ask Question
          </button>
        </div>
      </div>
    </div>
  );
}