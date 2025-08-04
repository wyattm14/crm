"use client";

import { useState, useRef, useEffect } from "react";

interface Customer {
  id: string;
  company_name: string;
  contact_person?: string;
  email?: string;
  notes?: string;
  pipeline_stage?: string;
}

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export default function GlobalChat({ customers }: { customers: Customer[] }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI assistant. I can help you with insights about your customers, pipeline analysis, and business recommendations. What would you like to know?",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue,
          customers: customers
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: "ai",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Fallback to simulated response if API fails
      const fallbackResponse = generateAIResponse(inputValue, customers);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: fallbackResponse,
        sender: "ai",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateAIResponse = (userInput: string, customers: Customer[]): string => {
    const input = userInput.toLowerCase();
    
    // Pipeline analysis
    if (input.includes("pipeline") || input.includes("stage")) {
      const stageCounts = customers.reduce((acc, customer) => {
        const stage = customer.pipeline_stage || "no stage";
        acc[stage] = (acc[stage] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const stageBreakdown = Object.entries(stageCounts)
        .map(([stage, count]) => `${stage}: ${count} customers`)
        .join(", ");

      return `Here's your current pipeline breakdown: ${stageBreakdown}. You have ${customers.length} total customers in your pipeline.`;
    }

    // Customer insights
    if (input.includes("customer") || input.includes("company")) {
      if (customers.length === 0) {
        return "You don't have any customers yet. Consider adding some customers to get started with your CRM.";
      }
      
      const recentCustomers = customers.slice(0, 3);
      const customerList = recentCustomers.map(c => c.company_name).join(", ");
      
      return `You have ${customers.length} customers total. Your most recent additions include: ${customerList}. Would you like me to analyze any specific customer or provide insights about your customer base?`;
    }

    // Follow-up recommendations
    if (input.includes("follow") || input.includes("next") || input.includes("action")) {
      const customersWithoutStage = customers.filter(c => !c.pipeline_stage);
      const customersInLead = customers.filter(c => c.pipeline_stage === "lead");
      
      let response = "Here are some recommended actions:\n\n";
      
      if (customersWithoutStage.length > 0) {
        response += `• ${customersWithoutStage.length} customers need pipeline stage assignment\n`;
      }
      
      if (customersInLead.length > 0) {
        response += `• ${customersInLead.length} customers are in the lead stage - consider qualifying them\n`;
      }
      
      if (customers.length > 0) {
        response += `• Review customer notes and contact information for completeness\n`;
        response += `• Schedule follow-ups with customers who haven't been contacted recently`;
      }
      
      return response;
    }

    // General help
    if (input.includes("help") || input.includes("what can you do")) {
      return `I can help you with:\n\n• Pipeline analysis and stage breakdown\n• Customer insights and recommendations\n• Follow-up suggestions and action items\n• Business insights based on your customer data\n• Sales strategy recommendations\n\nJust ask me about your customers, pipeline, or any business questions!`;
    }

    // Default response
    return `I understand you're asking about "${userInput}". I can help you analyze your ${customers.length} customers, provide pipeline insights, or give recommendations. Could you be more specific about what you'd like to know?`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">AI Assistant</h3>
            <p className="text-sm text-gray-500">
              {customers.length} customers in your pipeline
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-500">AI Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              <div className="text-sm whitespace-pre-line">{message.content}</div>
              <div className={`text-xs mt-1 ${
                message.sender === "user" ? "text-blue-100" : "text-gray-500"
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-gray-500">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-4">
          <div className="flex-1">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about your customers, pipeline, or business insights..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows={2}
              disabled={isLoading}
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        
        {/* Quick Suggestions */}
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            "Show pipeline breakdown",
            "Customer insights",
            "Follow-up recommendations",
            "Sales strategy tips"
          ].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setInputValue(suggestion)}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-md transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 