"use client";

import { useState } from "react";
import CompanyOverview from "./context/company-overview";
import ProductsServices from "./context/products-services";
import WebsiteContent from "./context/website-content";
import MarketingMaterials from "./context/marketing-materials";
import TechnicalDocs from "./context/technical-docs";
import Pricing from "./context/pricing";

export default function ContextTabs() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", name: "Company Overview", component: CompanyOverview, icon: "🏢" },
    { id: "products", name: "Products & Services", component: ProductsServices, icon: "📦" },
    { id: "website", name: "Website Content", component: WebsiteContent, icon: "🌐" },
    { id: "marketing", name: "Marketing Materials", component: MarketingMaterials, icon: "📢" },
    { id: "technical", name: "Technical Docs", component: TechnicalDocs, icon: "⚙️" },
    { id: "pricing", name: "Pricing", component: Pricing, icon: "💰" }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || CompanyOverview;

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 bg-white">
        <div className="px-6">
          <nav className="-mb-px flex space-x-8 overflow-x-auto scrollbar-hide" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                  ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-base">{tab.icon}</span>
                  <span>{tab.name}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        <ActiveComponent />
      </div>
    </div>
  );
} 