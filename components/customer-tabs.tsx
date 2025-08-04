"use client";

import { useState } from "react";
import CustomerOverview from "./customer-overview";
import CustomerFiles from "./customer-files";
import CustomerChat from "./customer-chat";

interface Customer {
  id: string;
  company_name: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  notes?: string;
  created_at: string;
}

interface CustomerTabsProps {
  customer: Customer;
}

export default function CustomerTabs({ customer }: CustomerTabsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", name: "Overview", icon: "📋" },
    { id: "files", name: "Files", icon: "📁" },
    { id: "chat", name: "AI Chat", icon: "💬" },
  ];

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "overview" && <CustomerOverview customer={customer} />}
        {activeTab === "files" && <CustomerFiles customer={customer} />}
        {activeTab === "chat" && <CustomerChat customer={customer} />}
      </div>
    </div>
  );
} 