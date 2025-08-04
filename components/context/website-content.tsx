"use client";

import { useState } from "react";

interface WebsitePage {
  id: string;
  url: string;
  pageName: string;
  content: string;
  pageType: string;
  lastUpdated: string;
}

export default function WebsiteContent() {
  const [pages, setPages] = useState<WebsitePage[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPage, setNewPage] = useState({
    url: "",
    pageName: "",
    pageType: "homepage",
    content: ""
  });

  const addPage = () => {
    if (!newPage.pageName.trim() || !newPage.url.trim()) return;

    const page: WebsitePage = {
      id: Date.now().toString(),
      url: newPage.url,
      pageName: newPage.pageName,
      pageType: newPage.pageType,
      content: newPage.content,
      lastUpdated: new Date().toISOString()
    };

    setPages(prev => [...prev, page]);
    setNewPage({
      url: "",
      pageName: "",
      pageType: "homepage",
      content: ""
    });
    setShowAddForm(false);
  };

  const removePage = (id: string) => {
    setPages(prev => prev.filter(page => page.id !== id));
  };

  const getPageTypeIcon = (type: string) => {
    switch (type) {
      case "homepage":
        return "🏠";
      case "about":
        return "ℹ️";
      case "features":
        return "✨";
      case "pricing":
        return "💰";
      case "contact":
        return "📞";
      case "blog":
        return "📝";
      default:
        return "📄";
    }
  };

  const getPageTypeLabel = (type: string) => {
    switch (type) {
      case "homepage":
        return "Homepage";
      case "about":
        return "About Us";
      case "features":
        return "Features";
      case "pricing":
        return "Pricing";
      case "contact":
        return "Contact";
      case "blog":
        return "Blog";
      default:
        return "Other";
    }
  };

  const getPageTypeColor = (type: string) => {
    switch (type) {
      case "homepage":
        return "bg-blue-100 text-blue-800";
      case "about":
        return "bg-green-100 text-green-800";
      case "features":
        return "bg-purple-100 text-purple-800";
      case "pricing":
        return "bg-yellow-100 text-yellow-800";
      case "contact":
        return "bg-red-100 text-red-800";
      case "blog":
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
          <h2 className="text-xl font-semibold text-gray-900">Website Content</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your website pages, URLs, and content</p>
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
          {/* Website Pages List */}
          {pages.length > 0 ? (
            <div className="space-y-4">
              {pages.map((page) => (
                <div key={page.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-2xl">{getPageTypeIcon(page.pageType)}</span>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{page.pageName}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPageTypeColor(page.pageType)}`}>
                              {getPageTypeLabel(page.pageType)}
                            </span>
                            <span className="text-xs text-gray-500">
                              Updated {formatDate(page.lastUpdated)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <a 
                          href={page.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          {page.url}
                        </a>
                      </div>

                      <div className="bg-gray-50 rounded-md p-3">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">Content Preview</span>
                        <div className="text-sm text-gray-900 max-h-32 overflow-y-auto">
                          {page.content.length > 300 
                            ? `${page.content.substring(0, 300)}...` 
                            : page.content
                          }
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removePage(page.id)}
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
              <div className="text-6xl mb-4">🌐</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Website Pages Yet</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Start building your website content library by adding pages, URLs, and content from your website.
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Add Your First Page
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add Page Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Add New Website Page</h3>
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
                    Page Name *
                  </label>
                  <input
                    type="text"
                    value={newPage.pageName}
                    onChange={(e) => setNewPage({ ...newPage, pageName: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Homepage, About Us, Contact"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      URL *
                    </label>
                    <input
                      type="url"
                      value={newPage.url}
                      onChange={(e) => setNewPage({ ...newPage, url: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Page Type
                    </label>
                    <select
                      value={newPage.pageType}
                      onChange={(e) => setNewPage({ ...newPage, pageType: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="homepage">Homepage</option>
                      <option value="about">About Us</option>
                      <option value="features">Features</option>
                      <option value="pricing">Pricing</option>
                      <option value="contact">Contact</option>
                      <option value="blog">Blog</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <textarea
                    value={newPage.content}
                    onChange={(e) => setNewPage({ ...newPage, content: e.target.value })}
                    rows={8}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Paste content from your website or write new content for this page..."
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
                  onClick={addPage}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Add Page
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 