"use client";

import { useState } from "react";

interface Customer {
  id: string;
  company_name: string;
}

interface Contact {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  is_primary: boolean;
  notes: string;
}

export default function CustomerContacts({ customer }: { customer: Customer }) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    is_primary: false,
    notes: ""
  });

  const addContact = () => {
    if (newContact.name.trim()) {
      const contact: Contact = {
        id: Date.now().toString(),
        ...newContact
      };
      setContacts([...contacts, contact]);
      setNewContact({ name: "", title: "", email: "", phone: "", is_primary: false, notes: "" });
      setIsAdding(false);
    }
  };

  const removeContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">Company Contacts</h2>
          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Add Contact
          </button>
        </div>

        {/* Add Contact Form */}
        {isAdding && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
            <h3 className="text-md font-medium text-gray-900 mb-4">Add New Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newContact.title}
                  onChange={(e) => setNewContact({ ...newContact, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Job title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newContact.email}
                  onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="email@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={newContact.notes}
                  onChange={(e) => setNewContact({ ...newContact, notes: e.target.value })}
                  rows={2}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Additional notes about this contact"
                />
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newContact.is_primary}
                    onChange={(e) => setNewContact({ ...newContact, is_primary: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Primary contact</span>
                </label>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addContact}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Add Contact
              </button>
            </div>
          </div>
        )}

        {/* Contacts List */}
        {contacts.length > 0 ? (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div key={contact.id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{contact.name}</h3>
                      {contact.is_primary && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Primary
                        </span>
                      )}
                    </div>
                    {contact.title && (
                      <p className="text-sm text-gray-600 mb-2">{contact.title}</p>
                    )}
                    <div className="space-y-1">
                      {contact.email && (
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">Email:</span>{" "}
                          <a href={`mailto:${contact.email}`} className="text-blue-600 hover:text-blue-800">
                            {contact.email}
                          </a>
                        </p>
                      )}
                      {contact.phone && (
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">Phone:</span>{" "}
                          <a href={`tel:${contact.phone}`} className="text-blue-600 hover:text-blue-800">
                            {contact.phone}
                          </a>
                        </p>
                      )}
                    </div>
                    {contact.notes && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-sm text-gray-700">{contact.notes}</p>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => removeContact(contact.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts yet</h3>
            <p className="text-gray-500 mb-6">
              Add contacts for {customer.company_name} to keep track of key people.
            </p>
            <button
              onClick={() => setIsAdding(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Add Your First Contact
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 