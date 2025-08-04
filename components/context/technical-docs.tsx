"use client";

import { useState } from "react";

interface TechnicalDoc {
  id: string;
  title: string;
  type: "api_docs" | "system_requirements" | "integration_guide" | "security_docs" | "rate_limits" | "data_policies" | "deployment_guide" | "troubleshooting" | "other";
  description: string;
  content: string;
  version?: string;
  last_updated: string;
  status: "draft" | "published" | "archived";
  audience?: string;
}

export default function TechnicalDocs() {
  const [docs, setDocs] = useState<TechnicalDoc[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDoc, setNewDoc] = useState({
    title: "",
    type: "api_docs" as TechnicalDoc["type"],
    description: "",
    content: "",
    version: "",
    status: "draft" as TechnicalDoc["status"],
    audience: ""
  });

  const addDoc = () => {
    if (!newDoc.title.trim() || !newDoc.content.trim()) return;

    const doc: TechnicalDoc = {
      id: Date.now().toString(),
      title: newDoc.title,
      type: newDoc.type,
      description: newDoc.description,
      content: newDoc.content,
      version: newDoc.version,
      status: newDoc.status,
      audience: newDoc.audience,
      last_updated: new Date().toISOString()
    };

    setDocs(prev => [...prev, doc]);
    setNewDoc({
      title: "",
      type: "api_docs",
      description: "",
      content: "",
      version: "",
      status: "draft",
      audience: ""
    });
    setShowAddForm(false);
  };

  const removeDoc = (id: string) => {
    setDocs(prev => prev.filter(doc => doc.id !== id));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "api_docs":
        return "🔌";
      case "system_requirements":
        return "💻";
      case "integration_guide":
        return "🔗";
      case "security_docs":
        return "🔒";
      case "rate_limits":
        return "⚡";
      case "data_policies":
        return "📊";
      case "deployment_guide":
        return "🚀";
      case "troubleshooting":
        return "🔧";
      default:
        return "📄";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "api_docs":
        return "API Documentation";
      case "system_requirements":
        return "System Requirements";
      case "integration_guide":
        return "Integration Guide";
      case "security_docs":
        return "Security Documentation";
      case "rate_limits":
        return "Rate Limits";
      case "data_policies":
        return "Data Policies";
      case "deployment_guide":
        return "Deployment Guide";
      case "troubleshooting":
        return "Troubleshooting";
      default:
        return "Other";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "api_docs":
        return "bg-blue-100 text-blue-800";
      case "system_requirements":
        return "bg-green-100 text-green-800";
      case "integration_guide":
        return "bg-purple-100 text-purple-800";
      case "security_docs":
        return "bg-red-100 text-red-800";
      case "rate_limits":
        return "bg-yellow-100 text-yellow-800";
      case "data_policies":
        return "bg-indigo-100 text-indigo-800";
      case "deployment_guide":
        return "bg-pink-100 text-pink-800";
      case "troubleshooting":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-white">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Technical Documentation</h2>
          <p className="text-sm text-gray-500 mt-1">Manage API docs, system requirements, integration guides, and technical specifications</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {/* Documentation List */}
          {docs.length > 0 ? (
            <div className="space-y-4">
              {docs.map((doc) => (
                <div key={doc.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-2xl">{getTypeIcon(doc.type)}</span>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{doc.title}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(doc.type)}`}>
                              {getTypeLabel(doc.type)}
                            </span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                              {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                            </span>
                            {doc.version && (
                              <span className="text-xs text-gray-500">
                                v{doc.version}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {doc.description && (
                        <p className="text-sm text-gray-600 mb-3">{doc.description}</p>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</span>
                          <p className="text-sm text-gray-900 mt-1">{formatDate(doc.last_updated)}</p>
                        </div>
                        {doc.audience && (
                          <div>
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Target Audience</span>
                            <p className="text-sm text-gray-900 mt-1">{doc.audience}</p>
                          </div>
                        )}
                      </div>

                      <div className="bg-gray-50 rounded-md p-3">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">Content Preview</span>
                        <div className="text-sm text-gray-900 max-h-32 overflow-y-auto font-mono">
                          {doc.content.length > 300 
                            ? `${doc.content.substring(0, 300)}...` 
                            : doc.content
                          }
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeDoc(doc.id)}
                      className="ml-4 text-red-600 hover:text-red-800 text-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">⚙️</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Technical Documentation Yet</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Start building your technical documentation library with API docs, system requirements, integration guides, and more.
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Add Your First Technical Doc
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add Documentation Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Add New Technical Documentation</h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={newDoc.title}
                    onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., REST API v2.0 Documentation, System Requirements"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type *
                    </label>
                    <select
                      value={newDoc.type}
                      onChange={(e) => setNewDoc({ ...newDoc, type: e.target.value as TechnicalDoc["type"] })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="api_docs">API Documentation</option>
                      <option value="system_requirements">System Requirements</option>
                      <option value="integration_guide">Integration Guide</option>
                      <option value="security_docs">Security Documentation</option>
                      <option value="rate_limits">Rate Limits</option>
                      <option value="data_policies">Data Policies</option>
                      <option value="deployment_guide">Deployment Guide</option>
                      <option value="troubleshooting">Troubleshooting</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={newDoc.status}
                      onChange={(e) => setNewDoc({ ...newDoc, status: e.target.value as TechnicalDoc["status"] })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Version
                    </label>
                    <input
                      type="text"
                      value={newDoc.version}
                      onChange={(e) => setNewDoc({ ...newDoc, version: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 1.0.0, v2.1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Target Audience
                    </label>
                    <input
                      type="text"
                      value={newDoc.audience}
                      onChange={(e) => setNewDoc({ ...newDoc, audience: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Developers, System Administrators"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={newDoc.description}
                    onChange={(e) => setNewDoc({ ...newDoc, description: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Brief description of this documentation"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content *
                  </label>
                  <textarea
                    value={newDoc.content}
                    onChange={(e) => setNewDoc({ ...newDoc, content: e.target.value })}
                    rows={10}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono"
                    placeholder="Paste your technical documentation content here..."
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-2">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addDoc}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Add Documentation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 