"use client";

import { useState } from "react";

interface Customer {
  id: string;
  company_name: string;
}

interface EmailThread {
  id: string;
  subject: string;
  participants: string[];
  last_message: string;
  date: string;
  unread: boolean;
}

export default function EmailThreads({ customer }: { customer: Customer }) {
  const [threads] = useState<EmailThread[]>([]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">Email Threads</h2>
          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
            Import Emails
          </button>
        </div>

        {threads.length > 0 ? (
          <div className="space-y-2">
            {threads.map((thread) => (
              <div key={thread.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{thread.subject}</h3>
                    <p className="text-sm text-gray-600 mt-1">{thread.participants.join(", ")}</p>
                    <p className="text-sm text-gray-500 mt-1 truncate">{thread.last_message}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{thread.date}</p>
                    {thread.unread && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-1"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No email threads</h3>
            <p className="text-gray-500 mb-6">
              Import email threads with {customer.company_name} to keep track of communications.
            </p>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
              Import Emails
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 