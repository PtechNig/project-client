'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  PlaySquare,
  CreditCard,
  Menu,
  X,
  Settings,
  LogOut,
} from 'lucide-react';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/assignment', label: 'Assignment', icon: ClipboardList },
  { href: '/dashboard/lessons', label: 'Lessons', icon: BookOpen },
  { href: '/dashboard/courses', label: 'Courses', icon: PlaySquare },
  { href: '/dashboard/payment', label: 'Payment', icon: CreditCard },
];

const extraLinks = [
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  { href: '/logout', label: 'Logout', icon: LogOut },
];

export default function StudentDashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#00426D] text-white">
        <h2 className="text-xl font-bold">Student Panel</h2>
        <button onClick={toggleSidebar}>
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-[#00426D] text-white py-6 px-4 space-y-6 md:space-y-4`}
      >
        <h2 className="hidden md:block text-2xl font-bold mb-6">Student Panel</h2>

        <ul className="space-y-2">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center gap-3 px-4 py-2 rounded transition ${
                  pathname.startsWith(href) ? 'bg-[#003255]' : 'hover:bg-[#003255]'
                }`}
                onClick={() => setSidebarOpen(false)} // Close mobile menu
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 border-t border-[#003255] pt-4">
          <ul className="space-y-2">
            {extraLinks.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-4 py-2 rounded transition ${
                    label === 'Logout'
                      ? 'bg-[#FF0B80]'
                      : pathname === href
                      ? 'bg-[#003255]'
                      : 'hover:bg-[#003255]'
                  }`}
                  onClick={() => setSidebarOpen(false)} // Close mobile menu
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 text-[#000000]">{children}</main>
    </div>
  );
}
