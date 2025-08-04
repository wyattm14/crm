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
      content: "Hi there! 👋 I'm your AI business assistant. I can help you analyze your customer pipeline, provide insights, and give strategic recommendations. What would you like to explore today?",
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
    if (input.includes("pipeline") || input.includes("breakdown") || input.includes("stages")) {
      const stages = customers.reduce((acc, customer) => {
        const stage = customer.pipeline_stage || 'unknown';
        acc[stage] = (acc[stage] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const stageBreakdown = Object.entries(stages)
        .map(([stage, count]) => `• ${stage.charAt(0).toUpperCase() + stage.slice(1)}: ${count} customers`)
        .join('\n');
      
      return `📊 **Pipeline Breakdown**\n\nHere's your current customer distribution:\n\n${stageBreakdown}\n\n💡 **Insights:**\n• Total customers: ${customers.length}\n• Most active stage: ${Object.entries(stages).sort(([,a], [,b]) => b - a)[0]?.[0] || 'None'}\n• Conversion opportunities: ${stages['lead'] || 0 + stages['qualified'] || 0} prospects in early stages`;
    }

    // Customer insights
    if (input.includes("insight") || input.includes("customer")) {
      const recentCustomers = customers.slice(-3);
      const recentList = recentCustomers.map(c => `• ${c.company_name} (${c.pipeline_stage || 'No stage'})`).join('\n');
      
      return `🎯 **Customer Insights**\n\n**Recent Additions:**\n${recentList}\n\n**Quick Stats:**\n• Total customers: ${customers.length}\n• Average pipeline stage: ${customers.length > 0 ? 'Active' : 'None'}\n• Growth potential: ${customers.filter(c => ['lead', 'qualified'].includes(c.pipeline_stage || '')).length} prospects\n\nWould you like me to dive deeper into any specific customer or stage?`;
    }

    // Follow-up recommendations
    if (input.includes("follow") || input.includes("recommend") || input.includes("action")) {
      const needsFollowUp = customers.filter(c => ['lead', 'qualified', 'proposal'].includes(c.pipeline_stage || ''));
      
      if (needsFollowUp.length === 0) {
        return `✅ **Follow-up Status**\n\nGreat news! All your customers are properly managed. No immediate follow-ups needed.\n\n💡 **Suggestions:**\n• Review closed deals for upsell opportunities\n• Check on long-term customers for satisfaction\n• Consider expanding your pipeline with new leads`;
      }
      
      const followUpList = needsFollowUp.slice(0, 3).map(c => `• ${c.company_name} - ${c.pipeline_stage} stage`).join('\n');
      
      return `📞 **Follow-up Recommendations**\n\n**Priority Actions:**\n${followUpList}\n\n**Strategy:**\n• Schedule calls with qualified leads\n• Send proposals to interested prospects\n• Nurture early-stage relationships\n\nWould you like me to help craft specific follow-up messages?`;
    }

    // Sales strategy
    if (input.includes("strategy") || input.includes("sales") || input.includes("tip")) {
      const stageDistribution = customers.reduce((acc, customer) => {
        const stage = customer.pipeline_stage || 'unknown';
        acc[stage] = (acc[stage] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const total = customers.length;
      const conversionRate = total > 0 ? Math.round(((stageDistribution['closed'] || 0) / total) * 100) : 0;
      
      return `🚀 **Sales Strategy Tips**\n\n**Current Performance:**\n• Conversion rate: ${conversionRate}%\n• Pipeline velocity: ${total > 0 ? 'Active' : 'Building'}\n• Growth stage: ${total < 5 ? 'Early' : total < 20 ? 'Growing' : 'Established'}\n\n**Strategic Recommendations:**\n• Focus on ${stageDistribution['lead'] > stageDistribution['qualified'] ? 'lead qualification' : 'proposal development'}\n• Strengthen follow-up processes\n• Consider automated nurturing campaigns\n• Review win/loss patterns\n\n**Next Steps:**\n1. Prioritize high-value prospects\n2. Implement consistent follow-up\n3. Track conversion metrics\n4. Optimize sales process`;
    }

    // General help
    if (input.includes("help") || input.includes("what can you do")) {
      return `🤖 **How I Can Help**\n\nI'm your AI business assistant, designed to help you:\n\n📊 **Analyze** your customer pipeline and performance\n🎯 **Identify** opportunities and risks\n📈 **Optimize** your sales strategy\n💡 **Generate** actionable insights\n📞 **Suggest** follow-up actions\n\n**Try asking me about:**\n• "Show me my pipeline breakdown"\n• "What customer insights do you have?"\n• "Give me follow-up recommendations"\n• "What sales strategy tips do you have?"\n\nI'm here to help you grow your business! 🚀`;
    }

    // Default response
    return `I understand you're asking about "${userInput}". I can help you analyze your ${customers.length} customers, provide pipeline insights, or give strategic recommendations. \n\n💡 **Try asking:**\n• "Show pipeline breakdown"\n• "Customer insights"\n• "Follow-up recommendations"\n• "Sales strategy tips"`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickActions = [
    { text: "📊 Pipeline Breakdown", icon: "📊" },
    { text: "🎯 Customer Insights", icon: "🎯" },
    { text: "📞 Follow-up Actions", icon: "📞" },
    { text: "🚀 Sales Strategy", icon: "🚀" }
  ];

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Enhanced Header */}
      <div className="bg-white border-b border-gray-200 p-6 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI Business Assistant</h1>
                <p className="text-sm text-gray-600">
                  {customers.length} customers • {customers.filter(c => ['lead', 'qualified'].includes(c.pipeline_stage || '')).length} active prospects
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700">AI Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-2xl px-6 py-4 rounded-2xl shadow-sm ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                    : "bg-white border border-gray-200 text-gray-900"
                }`}
              >
                <div className="text-sm leading-relaxed whitespace-pre-line">{message.content}</div>
                <div className={`text-xs mt-2 flex items-center space-x-1 ${
                  message.sender === "user" ? "text-blue-100" : "text-gray-400"
                }`}>
                  <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  {message.sender === "ai" && <span>• AI Assistant</span>}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 max-w-2xl px-6 py-4 rounded-2xl shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-gray-600 font-medium">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Enhanced Input Section */}
      <div className="bg-white border-t border-gray-200 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Quick Actions */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-3">Quick Actions:</p>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action) => (
                <button
                  key={action.text}
                  onClick={() => setInputValue(action.text.replace(/^[^\s]*\s/, ''))}
                  className="inline-flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-gray-200"
                >
                  <span>{action.icon}</span>
                  <span>{action.text.replace(/^[^\s]*\s/, '')}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about your customers, pipeline analysis, or business strategy..."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none shadow-sm"
                rows={3}
                disabled={isLoading}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 