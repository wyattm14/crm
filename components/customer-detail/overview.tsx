"use client";

import { useState } from "react";

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

export default function CustomerOverview({ customer }: { customer: Customer }) {
  const [isEditing, setIsEditing] = useState(false);
  const [customerData, setCustomerData] = useState({
    company_name: customer.company_name,
    contact_person: customer.contact_person || "",
    email: customer.email || "",
    phone: customer.phone || "",
    website: customer.website || "",
    address: customer.address || "",
    notes: customer.notes || "",
    pipeline_stage: customer.pipeline_stage || ""
  });

  const handleSave = async () => {
    // TODO: Implement API call to update customer
    console.log("Saving customer data:", customerData);
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">Company Overview</h2>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>

        {/* Company Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={customerData.company_name}
                  onChange={(e) => setCustomerData({ ...customerData, company_name: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-sm text-gray-900">{customerData.company_name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Person
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={customerData.contact_person}
                  onChange={(e) => setCustomerData({ ...customerData, contact_person: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Primary contact person"
                />
              ) : (
                <p className="text-sm text-gray-900">{customerData.contact_person || "Not specified"}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={customerData.email}
                  onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="company@example.com"
                />
              ) : (
                <p className="text-sm text-gray-900">
                  {customerData.email ? (
                    <a href={`mailto:${customerData.email}`} className="text-blue-600 hover:text-blue-800">
                      {customerData.email}
                    </a>
                  ) : (
                    "Not specified"
                  )}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={customerData.phone}
                  onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+1 (555) 123-4567"
                />
              ) : (
                <p className="text-sm text-gray-900">
                  {customerData.phone ? (
                    <a href={`tel:${customerData.phone}`} className="text-blue-600 hover:text-blue-800">
                      {customerData.phone}
                    </a>
                  ) : (
                    "Not specified"
                  )}
                </p>
              )}
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website
              </label>
              {isEditing ? (
                <input
                  type="url"
                  value={customerData.website}
                  onChange={(e) => setCustomerData({ ...customerData, website: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com"
                />
              ) : (
                <p className="text-sm text-gray-900">
                  {customerData.website ? (
                    <a href={customerData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      {customerData.website}
                    </a>
                  ) : (
                    "Not specified"
                  )}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pipeline Stage
              </label>
              {isEditing ? (
                <select
                  value={customerData.pipeline_stage}
                  onChange={(e) => setCustomerData({ ...customerData, pipeline_stage: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select stage</option>
                  <option value="lead">Lead</option>
                  <option value="qualified">Qualified</option>
                  <option value="proposal">Proposal</option>
                  <option value="negotiation">Negotiation</option>
                  <option value="closed">Closed</option>
                  <option value="lost">Lost</option>
                </select>
              ) : (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  customerData.pipeline_stage 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {customerData.pipeline_stage ? customerData.pipeline_stage.charAt(0).toUpperCase() + customerData.pipeline_stage.slice(1) : 'No Stage'}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              {isEditing ? (
                <textarea
                  value={customerData.address}
                  onChange={(e) => setCustomerData({ ...customerData, address: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Full address"
                />
              ) : (
                <p className="text-sm text-gray-900">{customerData.address || "Not specified"}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Created Date
              </label>
              <p className="text-sm text-gray-900">{formatDate(customer.created_at)}</p>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          {isEditing ? (
            <textarea
              value={customerData.notes}
              onChange={(e) => setCustomerData({ ...customerData, notes: e.target.value })}
              rows={4}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Add notes about this customer..."
            />
          ) : (
            <div className="bg-gray-50 rounded-md p-4">
              <p className="text-sm text-gray-900 whitespace-pre-line">
                {customerData.notes || "No notes added yet."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 