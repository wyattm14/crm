"use client";

import { useState } from "react";

interface Customer {
  id: string;
  company_name: string;
  pipeline_stage?: string;
}

interface PipelineStage {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  description: string;
  order: number;
}

const defaultStages: PipelineStage[] = [
  {
    id: "lead",
    name: "Lead",
    color: "text-gray-600",
    bgColor: "bg-gray-100",
    description: "Initial contact made",
    order: 1
  }
];

const colorOptions = [
  { id: "gray", color: "text-gray-600", bgColor: "bg-gray-100" },
  { id: "blue", color: "text-blue-600", bgColor: "bg-blue-100" },
  { id: "green", color: "text-green-600", bgColor: "bg-green-100" },
  { id: "yellow", color: "text-yellow-600", bgColor: "bg-yellow-100" },
  { id: "orange", color: "text-orange-600", bgColor: "bg-orange-100" },
  { id: "red", color: "text-red-600", bgColor: "bg-red-100" },
  { id: "purple", color: "text-purple-600", bgColor: "bg-purple-100" },
  { id: "pink", color: "text-pink-600", bgColor: "bg-pink-100" }
];

export default function PipelineView({ customers }: { customers: Customer[] }) {
  const [isEditing, setIsEditing] = useState(false);
  const [stages, setStages] = useState<PipelineStage[]>(defaultStages);
  const [showStagesModal, setShowStagesModal] = useState(false);
  const [newStage, setNewStage] = useState({
    name: "",
    description: "",
    color: "gray"
  });

  const getCustomersInStage = (stageId: string) => {
    return customers.filter(customer => customer.pipeline_stage === stageId);
  };

  const updateCustomerStage = async (customerId: string, newStage: string) => {
    // TODO: Implement API call to update customer pipeline stage
    console.log(`Updating customer ${customerId} to stage ${newStage}`);
  };

  const addStage = () => {
    if (newStage.name.trim()) {
      const selectedColor = colorOptions.find(c => c.id === newStage.color);
      const stage: PipelineStage = {
        id: Date.now().toString(),
        name: newStage.name.trim(),
        description: newStage.description.trim(),
        color: selectedColor?.color || "text-gray-600",
        bgColor: selectedColor?.bgColor || "bg-gray-100",
        order: stages.length + 1
      };
      setStages([...stages, stage]);
      setNewStage({ name: "", description: "", color: "gray" });
    }
  };

  const removeStage = (stageId: string) => {
    setStages(stages.filter(stage => stage.id !== stageId));
  };

  const updateStage = (stageId: string, field: keyof PipelineStage, value: string | number) => {
    setStages(stages.map(stage => 
      stage.id === stageId ? { ...stage, [field]: value } : stage
    ));
  };

  const getTotalCustomers = () => customers.length;
  const getCustomersInStageCount = (stageId: string) => getCustomersInStage(stageId).length;

  const sortedStages = [...stages].sort((a, b) => a.order - b.order);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-white">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Sales Pipeline</h2>
          <p className="text-sm text-gray-500 mt-1">
            {getTotalCustomers()} total customers across {stages.length} stages
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowStagesModal(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Stages
          </button>
          <button
            onClick={() => setIsEditing(!isEditing)}
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
                Edit Customers
              </>
            )}
          </button>
        </div>
      </div>

      {/* Pipeline View */}
      <div className="flex-1 overflow-x-auto bg-gray-50">
        {stages.length > 0 ? (
          <div className="flex space-x-6 p-6 min-w-max">
            {sortedStages.map((stage) => {
              const stageCustomers = getCustomersInStage(stage.id);
              const customerCount = stageCustomers.length;
              
              return (
                <div key={stage.id} className="flex-shrink-0 w-80">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full">
                    {/* Stage Header */}
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${stage.bgColor}`}></div>
                          <h3 className={`font-semibold text-lg ${stage.color}`}>{stage.name}</h3>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm font-medium">
                            {customerCount}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">{stage.description}</p>
                    </div>

                    {/* Customers in this stage */}
                    <div className="p-4">
                      <div className="space-y-3">
                        {stageCustomers.length > 0 ? (
                          stageCustomers.map((customer) => (
                            <div
                              key={customer.id}
                              className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                    {customer.company_name.charAt(0).toUpperCase()}
                                  </div>
                                  <div>
                                    <span className="text-sm font-medium text-gray-900">
                                      {customer.company_name}
                                    </span>
                                  </div>
                                </div>
                                {isEditing && (
                                  <select
                                    value={customer.pipeline_stage || stages[0]?.id || ""}
                                    onChange={(e) => updateCustomerStage(customer.id, e.target.value)}
                                    className="text-xs border border-gray-300 rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                  >
                                    {stages.map((s) => (
                                      <option key={s.id} value={s.id}>
                                        {s.name}
                                      </option>
                                    ))}
                                  </select>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-12">
                            <div className="text-4xl mb-3">📭</div>
                            <p className="text-sm text-gray-500 font-medium">No customers in this stage</p>
                            <p className="text-xs text-gray-400 mt-1">Add customers to get started</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-6xl mb-4">📈</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Pipeline Stages Yet</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Create your first pipeline stage to start organizing your sales process and tracking customer progress.
              </p>
              <button
                onClick={() => setShowStagesModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Create First Stage
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Pipeline Summary */}
      {stages.length > 0 && (
        <div className="border-t border-gray-200 p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Pipeline Summary</h3>
            <div className="text-sm text-gray-500">
              Total: {getTotalCustomers()} customers
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {sortedStages.map((stage) => (
              <div key={stage.id} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className={`text-2xl font-bold ${stage.color}`}>
                  {getCustomersInStageCount(stage.id)}
                </div>
                <div className="text-sm text-gray-600 font-medium">{stage.name}</div>
                <div className="text-xs text-gray-500 mt-1">{stage.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stages Modal */}
      {showStagesModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Manage Pipeline Stages</h3>
                <button
                  onClick={() => setShowStagesModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Add New Stage Form */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">Add New Stage</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stage Name
                    </label>
                    <input
                      type="text"
                      value={newStage.name}
                      onChange={(e) => setNewStage({ ...newStage, name: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Lead, Qualified, Proposal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      value={newStage.description}
                      onChange={(e) => setNewStage({ ...newStage, description: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Brief description of this stage"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Color
                    </label>
                    <select
                      value={newStage.color}
                      onChange={(e) => setNewStage({ ...newStage, color: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      {colorOptions.map((color) => (
                        <option key={color.id} value={color.id}>
                          {color.id.charAt(0).toUpperCase() + color.id.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={addStage}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    Add Stage
                  </button>
                </div>
              </div>

              {/* Existing Stages */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                <h4 className="text-md font-medium text-gray-900 mb-4">Existing Stages</h4>
                {sortedStages.map((stage) => (
                  <div key={stage.id} className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-4 h-4 rounded-full ${stage.bgColor}`}></div>
                        <div className="flex-1">
                          <input
                            type="text"
                            value={stage.name}
                            onChange={(e) => updateStage(stage.id, 'name', e.target.value)}
                            className="text-sm font-medium text-gray-900 border-none bg-transparent focus:outline-none focus:ring-0"
                          />
                          <input
                            type="text"
                            value={stage.description}
                            onChange={(e) => updateStage(stage.id, 'description', e.target.value)}
                            className="text-xs text-gray-500 border-none bg-transparent focus:outline-none focus:ring-0 w-full"
                            placeholder="Description"
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <select
                          value={colorOptions.find(c => c.color === stage.color)?.id || "gray"}
                          onChange={(e) => {
                            const selectedColor = colorOptions.find(c => c.id === e.target.value);
                            if (selectedColor) {
                              updateStage(stage.id, 'color', selectedColor.color);
                              updateStage(stage.id, 'bgColor', selectedColor.bgColor);
                            }
                          }}
                          className="text-xs border border-gray-300 rounded px-2 py-1 bg-white"
                        >
                          {colorOptions.map((color) => (
                            <option key={color.id} value={color.id}>
                              {color.id.charAt(0).toUpperCase() + color.id.slice(1)}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => removeStage(stage.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowStagesModal(false)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 