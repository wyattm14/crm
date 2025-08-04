"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Customer {
  id: string;
  company_name: string;
}

interface User {
  id: string;
  email?: string;
}

interface CustomerSidebarProps {
  customers: Customer[];
  user: User;
}

export default function CustomerSidebar({ customers, user }: CustomerSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 h-screen flex flex-col">
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Fuse</h2>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Quick Actions
          </h3>
          <div className="space-y-1">
            <Link
              href="/dashboard"
              className={`
                block px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${
                  pathname === "/dashboard"
                    ? "bg-blue-100 text-blue-700 border-r-2 border-blue-600"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                }
              `}
            >
              <div className="flex items-center space-x-2">
                <span className="text-base">📊</span>
                <span>Dashboard</span>
              </div>
            </Link>
            <Link
              href="/dashboard/context"
              className={`
                block px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${
                  pathname === "/dashboard/context"
                    ? "bg-blue-100 text-blue-700 border-r-2 border-blue-600"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                }
              `}
            >
              <div className="flex items-center space-x-2">
                <span className="text-base">🏢</span>
                <span>Context</span>
              </div>
            </Link>
            <Link
              href="/dashboard/pipeline"
              className={`
                block px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${
                  pathname === "/dashboard/pipeline"
                    ? "bg-blue-100 text-blue-700 border-r-2 border-blue-600"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                }
              `}
            >
              <div className="flex items-center space-x-2">
                <span className="text-base">📈</span>
                <span>Pipeline</span>
              </div>
            </Link>
            <Link
              href="/dashboard/todos"
              className={`
                block px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${
                  pathname === "/dashboard/todos"
                    ? "bg-blue-100 text-blue-700 border-r-2 border-blue-600"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                }
              `}
            >
              <div className="flex items-center space-x-2">
                <span className="text-base">✅</span>
                <span>To Dos</span>
              </div>
            </Link>
            <Link href="/dashboard/customers" className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              pathname === "/dashboard/customers"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}>
              <div className="flex items-center space-x-2">
                <span className="text-base">👥</span>
                <span>Customers</span>
              </div>
            </Link>
            <Link href="/dashboard/chat" className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              pathname === "/dashboard/chat"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}>
              <div className="flex items-center space-x-2">
                <span className="text-base">💬</span>
                <span>Chat</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Customer List - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-1">
            {customers.map((customer) => {
              const isActive = pathname === `/dashboard/customers/${customer.id}`;
              return (
                <Link
                  key={customer.id}
                  href={`/dashboard/customers/${customer.id}`}
                  className={`
                    block px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${
                      isActive
                        ? "bg-blue-100 text-blue-700 border-r-2 border-blue-600"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    }
                  `}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                      {customer.company_name.charAt(0).toUpperCase()}
                    </div>
                    <span className="truncate">{customer.company_name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Profile Section */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <Link
            href="/dashboard/profile"
            className={`
              block px-3 py-2 rounded-md text-sm font-medium transition-colors
              ${
                pathname === "/dashboard/profile"
                  ? "bg-blue-100 text-blue-700 border-r-2 border-blue-600"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              }
            `}
          >
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                {user.email?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 