"use client";

import { useState } from "react";

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  billing_cycle: "monthly" | "yearly" | "one_time";
  description: string;
  features: string[];
  isPopular: boolean;
  color: string;
  created_date: string;
}

export default function Pricing() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: "",
    price: "",
    billing_cycle: "monthly" as PricingPlan["billing_cycle"],
    description: "",
    features: [""],
    isPopular: false,
    color: "blue"
  });

  const addPlan = () => {
    if (!newPlan.name.trim() || !newPlan.price.trim()) return;

    const plan: PricingPlan = {
      id: Date.now().toString(),
      name: newPlan.name,
      price: newPlan.price,
      billing_cycle: newPlan.billing_cycle,
      description: newPlan.description,
      features: newPlan.features.filter(f => f.trim() !== ""),
      isPopular: newPlan.isPopular,
      color: newPlan.color,
      created_date: new Date().toISOString()
    };

    setPlans(prev => [...prev, plan]);
    setNewPlan({
      name: "",
      price: "",
      billing_cycle: "monthly",
      description: "",
      features: [""],
      isPopular: false,
      color: "blue"
    });
    setShowAddForm(false);
  };

  const removePlan = (id: string) => {
    setPlans(prev => prev.filter(plan => plan.id !== id));
  };

  const addFeature = () => {
    setNewPlan(prev => ({
      ...prev,
      features: [...prev.features, ""]
    }));
  };

  const removeFeature = (index: number) => {
    setNewPlan(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setNewPlan(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-500 text-white";
      case "green":
        return "bg-green-500 text-white";
      case "purple":
        return "bg-purple-500 text-white";
      case "orange":
        return "bg-orange-500 text-white";
      case "red":
        return "bg-red-500 text-white";
      case "indigo":
        return "bg-indigo-500 text-white";
      default:
        return "bg-blue-500 text-white";
    }
  };

  const getColorBorder = (color: string) => {
    switch (color) {
      case "blue":
        return "border-blue-200";
      case "green":
        return "border-green-200";
      case "purple":
        return "border-purple-200";
      case "orange":
        return "border-orange-200";
      case "red":
        return "border-red-200";
      case "indigo":
        return "border-indigo-200";
      default:
        return "border-blue-200";
    }
  };

  const getBillingCycleLabel = (cycle: string) => {
    switch (cycle) {
      case "monthly":
        return "/month";
      case "yearly":
        return "/year";
      case "one_time":
        return "one-time";
      default:
        return "";
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
          <h2 className="text-xl font-semibold text-gray-900">Pricing Plans</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your pricing plans and packages for customers</p>
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
        <div className="max-w-6xl mx-auto">
          {/* Pricing Plans Grid */}
          {plans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div key={plan.id} className={`bg-white rounded-lg shadow-sm border-2 ${getColorBorder(plan.color)} relative overflow-hidden`}>
                  {plan.isPopular && (
                    <div className={`absolute top-0 left-0 right-0 ${getColorClasses(plan.color)} text-center py-1 text-xs font-medium`}>
                      Most Popular
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                        <div className="flex items-baseline mt-2">
                          <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                          <span className="text-sm text-gray-500 ml-1">{getBillingCycleLabel(plan.billing_cycle)}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removePlan(plan.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    {plan.description && (
                      <p className="text-sm text-gray-600 mb-6">{plan.description}</p>
                    )}

                    <div className="space-y-3 mb-6">
                      <h4 className="text-sm font-medium text-gray-900">Features:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="text-xs text-gray-500">
                      Created {formatDate(plan.created_date)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💰</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Pricing Plans Yet</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Start building your pricing strategy by adding different plans and packages for your customers.
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Add Your First Pricing Plan
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add Plan Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Add New Pricing Plan</h3>
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
                    Plan Name *
                  </label>
                  <input
                    type="text"
                    value={newPlan.name}
                    onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Basic Plan, Pro Plan, Enterprise"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price *
                    </label>
                    <input
                      type="text"
                      value={newPlan.price}
                      onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., $29, $99, $299"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Billing Cycle
                    </label>
                    <select
                      value={newPlan.billing_cycle}
                      onChange={(e) => setNewPlan({ ...newPlan, billing_cycle: e.target.value as PricingPlan["billing_cycle"] })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                      <option value="one_time">One-time</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Color Theme
                    </label>
                    <select
                      value={newPlan.color}
                      onChange={(e) => setNewPlan({ ...newPlan, color: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="blue">Blue</option>
                      <option value="green">Green</option>
                      <option value="purple">Purple</option>
                      <option value="orange">Orange</option>
                      <option value="red">Red</option>
                      <option value="indigo">Indigo</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newPlan.isPopular}
                      onChange={(e) => setNewPlan({ ...newPlan, isPopular: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      Mark as Most Popular
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newPlan.description}
                    onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Brief description of this plan..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features *
                  </label>
                  <div className="space-y-2">
                    {newPlan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => updateFeature(index, e.target.value)}
                          className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder={`Feature ${index + 1}`}
                        />
                        {newPlan.features.length > 1 && (
                          <button
                            onClick={() => removeFeature(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={addFeature}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      + Add Feature
                    </button>
                  </div>
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
                  onClick={addPlan}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Add Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 