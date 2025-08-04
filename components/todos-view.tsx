"use client";

import { useState } from "react";
import CustomDropdown from "@/components/ui/custom-dropdown";

interface Customer {
  id: string;
  company_name: string;
}

interface Todo {
  id: string;
  title: string;
  description: string;
  customer_id: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "pending" | "in_progress" | "completed" | "cancelled";
  due_date: string;
  created_at: string;
  type: "task" | "feature_request" | "bug_fix" | "follow_up" | "other";
}

const priorityColors = {
  low: "text-gray-600 bg-gray-100",
  medium: "text-blue-600 bg-blue-100",
  high: "text-orange-600 bg-orange-100",
  urgent: "text-red-600 bg-red-100"
};

const statusColors = {
  pending: "text-gray-600 bg-gray-100",
  in_progress: "text-blue-600 bg-blue-100",
  completed: "text-green-600 bg-green-100",
  cancelled: "text-red-600 bg-red-100"
};

const typeColors = {
  task: "text-purple-600 bg-purple-100",
  feature_request: "text-blue-600 bg-blue-100",
  bug_fix: "text-red-600 bg-red-100",
  follow_up: "text-green-600 bg-green-100",
  other: "text-gray-600 bg-gray-100"
};

export default function TodosView({ customers, todos }: { customers: Customer[], todos: Todo[] }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterCustomer, setFilterCustomer] = useState<string>("all");
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    customer_id: "",
    priority: "medium" as Todo["priority"],
    due_date: "",
    type: "task" as Todo["type"]
  });

  const addTodo = () => {
    if (newTodo.title.trim() && newTodo.customer_id) {
      const todo: Todo = {
        id: Date.now().toString(),
        title: newTodo.title.trim(),
        description: newTodo.description.trim(),
        customer_id: newTodo.customer_id,
        priority: newTodo.priority,
        status: "pending",
        due_date: newTodo.due_date,
        created_at: new Date().toISOString(),
        type: newTodo.type
      };
      // TODO: Add to database
      console.log("Adding todo:", todo);
      setNewTodo({
        title: "",
        description: "",
        customer_id: "",
        priority: "medium",
        due_date: "",
        type: "task"
      });
      setShowAddTodo(false);
    }
  };

  const updateTodoStatus = (todoId: string, newStatus: Todo["status"]) => {
    // TODO: Update in database
    console.log(`Updating todo ${todoId} to status ${newStatus}`);
  };

  const deleteTodo = (todoId: string) => {
    // TODO: Delete from database
    console.log(`Deleting todo ${todoId}`);
  };

  const getFilteredTodos = () => {
    let filtered = todos;
    
    if (filterStatus !== "all") {
      filtered = filtered.filter(todo => todo.status === filterStatus);
    }
    
    if (filterPriority !== "all") {
      filtered = filtered.filter(todo => todo.priority === filterPriority);
    }
    
    if (filterCustomer !== "all") {
      filtered = filtered.filter(todo => todo.customer_id === filterCustomer);
    }
    
    return filtered.sort((a, b) => {
      // Sort by priority first, then by due date
      const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
    });
  };

  const getOverdueTodos = () => {
    const today = new Date();
    return todos.filter(todo => 
      todo.status !== "completed" && 
      new Date(todo.due_date) < today
    );
  };

  const getDueTodayTodos = () => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    return todos.filter(todo => 
      todo.status !== "completed" && 
      todo.due_date === todayStr
    );
  };

  const getCompletedTodos = () => {
    return todos.filter(todo => todo.status === "completed");
  };

  const getPendingTodos = () => {
    return todos.filter(todo => todo.status === "pending");
  };

  const filteredTodos = getFilteredTodos();
  const overdueTodos = getOverdueTodos();
  const dueTodayTodos = getDueTodayTodos();
  const completedTodos = getCompletedTodos();
  const pendingTodos = getPendingTodos();

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-white">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">To Dos & Action Items</h2>
          <p className="text-sm text-gray-500 mt-1">
            {todos.length} total items • {overdueTodos.length} overdue • {dueTodayTodos.length} due today
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowAddTodo(!showAddTodo)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            {showAddTodo ? (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Todo
              </>
            )}
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
                Edit
              </>
            )}
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      {todos.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-gray-900">{todos.length}</div>
                <div className="text-xs text-gray-500">Total</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600">{pendingTodos.length}</div>
                <div className="text-xs text-gray-500">Pending</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-orange-600">{overdueTodos.length}</div>
                <div className="text-xs text-gray-500">Overdue</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-green-600">{completedTodos.length}</div>
                <div className="text-xs text-gray-500">Completed</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-purple-600">{dueTodayTodos.length}</div>
                <div className="text-xs text-gray-500">Due Today</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Todo Form */}
      {showAddTodo && (
        <div className="border-b border-gray-200 p-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Todo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={newTodo.title}
                  onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter todo title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer *
                </label>
                <CustomDropdown
                  options={customers.map(customer => ({
                    value: customer.id,
                    label: customer.company_name
                  }))}
                  value={newTodo.customer_id}
                  onChange={(value) => setNewTodo({ ...newTodo, customer_id: value })}
                  placeholder="Select customer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <CustomDropdown
                  options={[
                    { value: "low", label: "Low" },
                    { value: "medium", label: "Medium" },
                    { value: "high", label: "High" },
                    { value: "urgent", label: "Urgent" }
                  ]}
                  value={newTodo.priority}
                  onChange={(value) => setNewTodo({ ...newTodo, priority: value as Todo["priority"] })}
                  placeholder="Select priority"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <CustomDropdown
                  options={[
                    { value: "task", label: "Task" },
                    { value: "feature_request", label: "Feature Request" },
                    { value: "bug_fix", label: "Bug Fix" },
                    { value: "follow_up", label: "Follow Up" },
                    { value: "other", label: "Other" }
                  ]}
                  value={newTodo.type}
                  onChange={(value) => setNewTodo({ ...newTodo, type: value as Todo["type"] })}
                  placeholder="Select type"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={newTodo.due_date}
                  onChange={(e) => setNewTodo({ ...newTodo, due_date: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newTodo.description}
                  onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter description"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={addTodo}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Todo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="border-b border-gray-200 p-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
              <CustomDropdown
                options={[
                  { value: "all", label: "All Status" },
                  { value: "pending", label: "Pending" },
                  { value: "in_progress", label: "In Progress" },
                  { value: "completed", label: "Completed" },
                  { value: "cancelled", label: "Cancelled" }
                ]}
                value={filterStatus}
                onChange={setFilterStatus}
                placeholder="All Status"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Priority</label>
              <CustomDropdown
                options={[
                  { value: "all", label: "All Priorities" },
                  { value: "urgent", label: "Urgent" },
                  { value: "high", label: "High" },
                  { value: "medium", label: "Medium" },
                  { value: "low", label: "Low" }
                ]}
                value={filterPriority}
                onChange={setFilterPriority}
                placeholder="All Priorities"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Customer</label>
              <CustomDropdown
                options={[
                  { value: "all", label: "All Customers" },
                  ...customers.map(customer => ({
                    value: customer.id,
                    label: customer.company_name
                  }))
                ]}
                value={filterCustomer}
                onChange={setFilterCustomer}
                placeholder="All Customers"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Todos List */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        {filteredTodos.length > 0 ? (
          <div className="p-6">
            <div className="max-w-4xl mx-auto space-y-4">
              {filteredTodos.map((todo) => {
                const customer = customers.find(c => c.id === todo.customer_id);
                const isOverdue = new Date(todo.due_date) < new Date() && todo.status !== "completed";
                
                return (
                  <div
                    key={todo.id}
                    className={`bg-white rounded-lg border p-4 shadow-sm hover:shadow-md transition-shadow duration-200 ${
                      isOverdue ? "border-red-200 bg-red-50" : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-3">
                          <h3 className="text-base font-medium text-gray-900">{todo.title}</h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[todo.priority]}`}>
                            {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                          </span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[todo.status]}`}>
                            {todo.status.replace('_', ' ')}
                          </span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[todo.type]}`}>
                            {todo.type.replace('_', ' ')}
                          </span>
                        </div>
                        
                        {todo.description && (
                          <p className="text-sm text-gray-600 mb-3">{todo.description}</p>
                        )}
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {customer?.company_name}
                          </span>
                          <span className={`flex items-center ${isOverdue ? 'text-red-600 font-medium' : ''}`}>
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Due: {new Date(todo.due_date).toLocaleDateString()}
                            {isOverdue && <span className="ml-1">(Overdue)</span>}
                          </span>
                        </div>
                      </div>
                      
                      {isEditing && (
                        <div className="flex items-center space-x-2 ml-4">
                          <select
                            value={todo.status}
                            onChange={(e) => updateTodoStatus(todo.id, e.target.value as Todo["status"])}
                            className="text-xs border border-gray-300 rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <button
                            onClick={() => deleteTodo(todo.id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full p-8">
            <div className="text-center max-w-md mx-auto">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No todos yet</h3>
              <p className="text-gray-600 mb-6">
                {todos.length === 0 
                  ? "Start tracking tasks and action items for your customers."
                  : "No todos match your current filters."
                }
              </p>
              {todos.length === 0 && (
                <button
                  onClick={() => setShowAddTodo(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Todo
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 