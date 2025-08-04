"use client";

import { useState } from "react";

interface Customer {
  id: string;
  company_name: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploaded: string;
}

export default function Documents({ customer }: { customer: Customer }) {
  const [documents] = useState<Document[]>([]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">Documents</h2>
          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
            Upload Document
          </button>
        </div>

        {documents.length > 0 ? (
          <div className="space-y-2">
            {documents.map((doc) => (
              <div key={doc.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{doc.name}</h3>
                      <p className="text-sm text-gray-600">{doc.type} • {doc.size} • {doc.uploaded}</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents</h3>
            <p className="text-gray-500 mb-6">
              Upload documents related to {customer.company_name} to keep them organized.
            </p>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
              Upload Document
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 