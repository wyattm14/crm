"use client";

import { useState } from "react";

export default function CompanyOverview() {
  const [isEditing, setIsEditing] = useState(false);
  const [companyData, setCompanyData] = useState({
    companyName: "",
    tagline: "",
    industry: "",
    foundedDate: "",
    website: "",
    email: "",
    phone: "",
    address: "",
    description: ""
  });

  const updateField = (field: string, value: string) => {
    setCompanyData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    setIsEditing(false);
  };

  const hasAnyData = Object.values(companyData).some(value => value.trim() !== "");

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-white">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Company Overview</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your company&apos;s basic information and details</p>
        </div>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          {isEditing ? (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Save Changes
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Update Profile
            </>
          )}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {!hasAnyData && !isEditing ? (
            // Empty State
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏢</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Company Information Yet</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Start building your company profile by adding basic information, contact details, and a description.
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Add Company Information
              </button>
            </div>
          ) : (
            <>
              {/* Company Header Card */}
              {(companyData.companyName || companyData.tagline) && (
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-sm p-6 mb-6 text-white">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h1 className="text-2xl font-bold">
                        {companyData.companyName || "Your Company Name"}
                      </h1>
                      {companyData.tagline && (
                        <p className="text-blue-100 mt-1 text-lg">{companyData.tagline}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Basic Information Section */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={companyData.companyName}
                        onChange={(e) => updateField('companyName', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter company name"
                      />
                    ) : (
                      <div className="text-sm text-gray-900 bg-gray-50 rounded-md px-3 py-2 min-h-[38px] flex items-center">
                        {companyData.companyName || (
                          <span className="text-gray-400 italic">Not specified</span>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tagline
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={companyData.tagline}
                        onChange={(e) => updateField('tagline', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter company tagline"
                      />
                    ) : (
                      <div className="text-sm text-gray-900 bg-gray-50 rounded-md px-3 py-2 min-h-[38px] flex items-center">
                        {companyData.tagline || (
                          <span className="text-gray-400 italic">Not specified</span>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={companyData.industry}
                        onChange={(e) => updateField('industry', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter industry"
                      />
                    ) : (
                      <div className="text-sm text-gray-900 bg-gray-50 rounded-md px-3 py-2 min-h-[38px] flex items-center">
                        {companyData.industry || (
                          <span className="text-gray-400 italic">Not specified</span>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Founded Date
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={companyData.foundedDate}
                        onChange={(e) => updateField('foundedDate', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter founded date"
                      />
                    ) : (
                      <div className="text-sm text-gray-900 bg-gray-50 rounded-md px-3 py-2 min-h-[38px] flex items-center">
                        {companyData.foundedDate || (
                          <span className="text-gray-400 italic">Not specified</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={companyData.website}
                        onChange={(e) => updateField('website', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://example.com"
                      />
                    ) : (
                      <div className="text-sm text-gray-900 bg-gray-50 rounded-md px-3 py-2 min-h-[38px] flex items-center">
                        {companyData.website ? (
                          <a href={companyData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            {companyData.website}
                          </a>
                        ) : (
                          <span className="text-gray-400 italic">Not specified</span>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={companyData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="contact@company.com"
                      />
                    ) : (
                      <div className="text-sm text-gray-900 bg-gray-50 rounded-md px-3 py-2 min-h-[38px] flex items-center">
                        {companyData.email ? (
                          <a href={`mailto:${companyData.email}`} className="text-blue-600 hover:text-blue-800 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {companyData.email}
                          </a>
                        ) : (
                          <span className="text-gray-400 italic">Not specified</span>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={companyData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="+1 (555) 123-4567"
                      />
                    ) : (
                      <div className="text-sm text-gray-900 bg-gray-50 rounded-md px-3 py-2 min-h-[38px] flex items-center">
                        {companyData.phone ? (
                          <a href={`tel:${companyData.phone}`} className="text-blue-600 hover:text-blue-800 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {companyData.phone}
                          </a>
                        ) : (
                          <span className="text-gray-400 italic">Not specified</span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    {isEditing ? (
                      <textarea
                        value={companyData.address}
                        onChange={(e) => updateField('address', e.target.value)}
                        rows={3}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter full address"
                      />
                    ) : (
                      <div className="text-sm text-gray-900 bg-gray-50 rounded-md px-3 py-2 min-h-[38px] flex items-center">
                        {companyData.address ? (
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {companyData.address}
                          </div>
                        ) : (
                          <span className="text-gray-400 italic">Not specified</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Company Description Section */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Company Description
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  {isEditing ? (
                    <textarea
                      value={companyData.description}
                      onChange={(e) => updateField('description', e.target.value)}
                      rows={4}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Describe your company, mission, and values..."
                    />
                  ) : (
                    <div className="text-sm text-gray-900 bg-gray-50 rounded-md px-3 py-3 min-h-[100px]">
                      {companyData.description || (
                        <span className="text-gray-400 italic">No description provided</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 