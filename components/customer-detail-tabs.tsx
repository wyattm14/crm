"use client";

import { useState } from "react";
import CustomerOverview from "./customer-detail/overview";
import CustomerContacts from "./customer-detail/contacts";
import EmailThreads from "./customer-detail/email-threads";
import MeetingTranscripts from "./customer-detail/meeting-transcripts";
import ChatThreads from "./customer-detail/chat-threads";
import Documents from "./customer-detail/documents";
import Notes from "./customer-detail/notes";
import Activity from "./customer-detail/activity";

interface Customer {
  id: string;
  company_name: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  notes?: string;
  pipeline_stage?: string;
  created_at: string;
}

export default function CustomerDetailTabs({ customer }: { customer: Customer }) {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", name: "Overview", component: CustomerOverview },
    { id: "contacts", name: "Contacts", component: CustomerContacts },
    { id: "emails", name: "Email Threads", component: EmailThreads },
    { id: "meetings", name: "Meeting Transcripts", component: MeetingTranscripts },
    { id: "chat", name: "Chat Threads", component: ChatThreads },
    { id: "documents", name: "Documents", component: Documents },
    { id: "notes", name: "Notes", component: Notes },
    { id: "activity", name: "Activity", component: Activity }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || CustomerOverview;

  return (
    <div className="h-full flex flex-col">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto px-6" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        <ActiveComponent customer={customer} />
      </div>
    </div>
  );
} 