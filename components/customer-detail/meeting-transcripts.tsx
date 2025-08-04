"use client";

import { useState } from "react";

interface Customer {
  id: string;
  company_name: string;
}

interface MeetingTranscript {
  id: string;
  title: string;
  date: string;
  duration: string;
  participants: string[];
  summary: string;
}

export default function MeetingTranscripts({ customer }: { customer: Customer }) {
  const [transcripts] = useState<MeetingTranscript[]>([]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">Meeting Transcripts</h2>
          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
            Upload Transcript
          </button>
        </div>

        {transcripts.length > 0 ? (
          <div className="space-y-4">
            {transcripts.map((transcript) => (
              <div key={transcript.id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{transcript.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{transcript.date} • {transcript.duration}</p>
                    <p className="text-sm text-gray-600 mt-1">Participants: {transcript.participants.join(", ")}</p>
                    <p className="text-sm text-gray-700 mt-3">{transcript.summary}</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    View Full
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No meeting transcripts</h3>
            <p className="text-gray-500 mb-6">
              Upload meeting transcripts with {customer.company_name} to keep track of discussions.
            </p>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
              Upload Transcript
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 