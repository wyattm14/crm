"use client";

import { useState } from "react";

interface MarketingMaterial {
  id: string;
  name: string;
  type: "email_template" | "social_media" | "case_study" | "brochure" | "presentation" | "video" | "other";
  description: string;
  content: string;
  target_audience?: string;
  campaign?: string;
  created_date: string;
}

export default function MarketingMaterials() {
  const [materials, setMaterials] = useState<MarketingMaterial[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    name: "",
    type: "email_template" as MarketingMaterial["type"],
    description: "",
    content: "",
    target_audience: "",
    campaign: ""
  });

  const addMaterial = () => {
    if (!newMaterial.name.trim() || !newMaterial.content.trim()) return;

    const material: MarketingMaterial = {
      id: Date.now().toString(),
      name: newMaterial.name,
      type: newMaterial.type,
      description: newMaterial.description,
      content: newMaterial.content,
      target_audience: newMaterial.target_audience,
      campaign: newMaterial.campaign,
      created_date: new Date().toISOString()
    };

    setMaterials(prev => [...prev, material]);
    setNewMaterial({
      name: "",
      type: "email_template",
      description: "",
      content: "",
      target_audience: "",
      campaign: ""
    });
    setShowAddForm(false);
  };

  const removeMaterial = (id: string) => {
    setMaterials(prev => prev.filter(material => material.id !== id));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email_template":
        return "📧";
      case "social_media":
        return "📱";
      case "case_study":
        return "📊";
      case "brochure":
        return "📄";
      case "presentation":
        return "📽️";
      case "video":
        return "🎥";
      default:
        return "📋";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "email_template":
        return "Email Template";
      case "social_media":
        return "Social Media";
      case "case_study":
        return "Case Study";
      case "brochure":
        return "Brochure";
      case "presentation":
        return "Presentation";
      case "video":
        return "Video";
      default:
        return "Other";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "email_template":
        return "bg-blue-100 text-blue-800";
      case "social_media":
        return "bg-purple-100 text-purple-800";
      case "case_study":
        return "bg-green-100 text-green-800";
      case "brochure":
        return "bg-yellow-100 text-yellow-800";
      case "presentation":
        return "bg-red-100 text-red-800";
      case "video":
        return "bg-indigo-100 text-indigo-800";
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
          <h2 className="text-xl font-semibold text-gray-900">Marketing Materials</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your marketing content, templates, and campaigns</p>
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
          {/* Materials List */}
          {materials.length > 0 ? (
            <div className="space-y-4">
              {materials.map((material) => (
                <div key={material.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-2xl">{getTypeIcon(material.type)}</span>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{material.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(material.type)}`}>
                              {getTypeLabel(material.type)}
                            </span>
                            <span className="text-xs text-gray-500">
                              Created {formatDate(material.created_date)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {material.description && (
                        <p className="text-sm text-gray-600 mb-3">{material.description}</p>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {material.target_audience && (
                          <div>
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Target Audience</span>
                            <p className="text-sm text-gray-900 mt-1">{material.target_audience}</p>
                          </div>
                        )}
                        {material.campaign && (
                          <div>
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</span>
                            <p className="text-sm text-gray-900 mt-1">{material.campaign}</p>
                          </div>
                        )}
                      </div>

                      <div className="bg-gray-50 rounded-md p-3">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">Content Preview</span>
                        <div className="text-sm text-gray-900 max-h-32 overflow-y-auto">
                          {material.content.length > 300 
                            ? `${material.content.substring(0, 300)}...` 
                            : material.content
                          }
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeMaterial(material.id)}
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
              <div className="text-6xl mb-4">📢</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Marketing Materials Yet</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Start building your marketing library by adding email templates, social media content, case studies, and more.
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Add Your First Marketing Material
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add Material Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Add New Marketing Material</h3>
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
                    Name *
                  </label>
                  <input
                    type="text"
                    value={newMaterial.name}
                    onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Welcome Email Template, Q1 Case Study"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type *
                  </label>
                  <select
                    value={newMaterial.type}
                    onChange={(e) => setNewMaterial({ ...newMaterial, type: e.target.value as MarketingMaterial["type"] })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="email_template">Email Template</option>
                    <option value="social_media">Social Media Content</option>
                    <option value="case_study">Case Study</option>
                    <option value="brochure">Brochure</option>
                    <option value="presentation">Presentation</option>
                    <option value="video">Video</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={newMaterial.description}
                    onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Brief description of this material"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Target Audience
                    </label>
                    <input
                      type="text"
                      value={newMaterial.target_audience}
                      onChange={(e) => setNewMaterial({ ...newMaterial, target_audience: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Enterprise customers, Small business owners"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Campaign
                    </label>
                    <input
                      type="text"
                      value={newMaterial.campaign}
                      onChange={(e) => setNewMaterial({ ...newMaterial, campaign: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Q1 Product Launch, Holiday Promotion"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content *
                  </label>
                  <textarea
                    value={newMaterial.content}
                    onChange={(e) => setNewMaterial({ ...newMaterial, content: e.target.value })}
                    rows={8}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Paste your marketing content here..."
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
                  onClick={addMaterial}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Add Material
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 