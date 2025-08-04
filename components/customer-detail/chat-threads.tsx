"use client";

import { useState } from "react";

interface Customer {
  id: string;
  company_name: string;
}

interface ChatThread {
  id: string;
  title: string;
  date: string;
  messages: number;
  last_message: string;
}

export default function ChatThreads({ customer }: { customer: Customer }) {
  const [threads] = useState<ChatThread[]>([]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">Chat Threads</h2>
          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
            New Chat
          </button>
        </div>

        {threads.length > 0 ? (
          <div className="space-y-2">
            {threads.map((thread) => (
              <div key={thread.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{thread.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{thread.date} • {thread.messages} messages</p>
                    <p className="text-sm text-gray-500 mt-1 truncate">{thread.last_message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No chat threads</h3>
            <p className="text-gray-500 mb-6">
              Start a new chat with {customer.company_name} to begin conversations.
            </p>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
              Start New Chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 