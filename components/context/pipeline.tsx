"use client";

interface PipelineCustomer {
  id: string;
  company_name: string;
  contact_person: string;
  value: number;
  stage: string;
  last_activity: string;
  probability: number;
}

export default function Pipeline() {

  // Sample data for demonstration
  const sampleCustomers: PipelineCustomer[] = [
    {
      id: "1",
      company_name: "TechCorp Solutions",
      contact_person: "Sarah Johnson",
      value: 50000,
      stage: "Qualified",
      last_activity: "2024-01-15",
      probability: 60
    },
    {
      id: "2",
      company_name: "Global Innovations",
      contact_person: "Mike Chen",
      value: 75000,
      stage: "Proposal",
      last_activity: "2024-01-14",
      probability: 80
    },
    {
      id: "3",
      company_name: "StartupXYZ",
      contact_person: "Alex Rodriguez",
      value: 25000,
      stage: "Discovery",
      last_activity: "2024-01-13",
      probability: 40
    }
  ];

  const stages = [
    { id: "lead", name: "Lead", color: "bg-gray-100", textColor: "text-gray-700" },
    { id: "qualified", name: "Qualified", color: "bg-blue-100", textColor: "text-blue-700" },
    { id: "discovery", name: "Discovery", color: "bg-yellow-100", textColor: "text-yellow-700" },
    { id: "proposal", name: "Proposal", color: "bg-purple-100", textColor: "text-purple-700" },
    { id: "negotiation", name: "Negotiation", color: "bg-orange-100", textColor: "text-orange-700" },
    { id: "closed", name: "Closed Won", color: "bg-green-100", textColor: "text-green-700" }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStageCustomers = (stageId: string) => {
    return sampleCustomers.filter(customer => 
      customer.stage.toLowerCase() === stageId
    );
  };

  const getTotalValue = (stageId: string) => {
    return getStageCustomers(stageId).reduce((sum, customer) => sum + customer.value, 0);
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return "text-green-600";
    if (probability >= 60) return "text-blue-600";
    if (probability >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  if (sampleCustomers.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Sales Pipeline</h3>
        </div>
        
        {/* Empty State */}
        <div className="text-center py-12">
          <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No customers in pipeline</h3>
          <p className="text-gray-500 mb-6">
            Your sales pipeline is empty. Add customers to start tracking your sales process.
          </p>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto">
              <h4 className="font-medium text-gray-900 mb-2">Pipeline Stages</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Lead</span>
                  <span className="text-gray-400">Initial contact</span>
                </div>
                <div className="flex justify-between">
                  <span>Qualified</span>
                  <span className="text-gray-400">BANT verified</span>
                </div>
                <div className="flex justify-between">
                  <span>Discovery</span>
                  <span className="text-gray-400">Needs analysis</span>
                </div>
                <div className="flex justify-between">
                  <span>Proposal</span>
                  <span className="text-gray-400">Solution presented</span>
                </div>
                <div className="flex justify-between">
                  <span>Negotiation</span>
                  <span className="text-gray-400">Terms discussion</span>
                </div>
                <div className="flex justify-between">
                  <span>Closed Won</span>
                  <span className="text-gray-400">Deal closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Sales Pipeline</h3>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500">
            Total Pipeline Value: <span className="font-semibold text-gray-900">
              {formatCurrency(sampleCustomers.reduce((sum, c) => sum + c.value, 0))}
            </span>
          </div>
        </div>
      </div>

      {/* Pipeline Overview */}
      <div className="grid grid-cols-6 gap-4 mb-6">
        {stages.map((stage) => {
          const stageCustomers = getStageCustomers(stage.id);
          const totalValue = getTotalValue(stage.id);
          return (
            <div key={stage.id} className="text-center">
              <div className={`${stage.color} rounded-lg p-3`}>
                <div className={`text-sm font-medium ${stage.textColor}`}>
                  {stage.name}
                </div>
                <div className="text-lg font-bold text-gray-900">
                  {stageCustomers.length}
                </div>
                <div className="text-xs text-gray-500">
                  {formatCurrency(totalValue)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-6 gap-4">
        {stages.map((stage) => {
          const stageCustomers = getStageCustomers(stage.id);
          return (
            <div key={stage.id} className="space-y-3">
              <div className={`${stage.color} rounded-lg p-3`}>
                <h4 className={`font-medium ${stage.textColor}`}>{stage.name}</h4>
                <p className="text-xs text-gray-500">
                  {stageCustomers.length} customer{stageCustomers.length !== 1 ? 's' : ''}
                </p>
              </div>
              
              <div className="space-y-2">
                {stageCustomers.map((customer) => (
                  <div key={customer.id} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium text-gray-900 text-sm truncate">
                        {customer.company_name}
                      </h5>
                      <span className={`text-xs font-medium ${getProbabilityColor(customer.probability)}`}>
                        {customer.probability}%
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">
                      {customer.contact_person}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-gray-900">
                        {formatCurrency(customer.value)}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(customer.last_activity).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
                
                {stageCustomers.length === 0 && (
                  <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
                    <p className="text-xs text-gray-400">No customers</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pipeline Metrics */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">Pipeline Metrics</h4>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {sampleCustomers.length}
            </div>
            <div className="text-sm text-gray-500">Total Opportunities</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(sampleCustomers.reduce((sum, c) => sum + c.value, 0))}
            </div>
            <div className="text-sm text-gray-500">Total Value</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(sampleCustomers.reduce((sum, c) => sum + c.probability, 0) / sampleCustomers.length)}%
            </div>
            <div className="text-sm text-gray-500">Avg. Win Rate</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">
              {formatCurrency(sampleCustomers.reduce((sum, c) => sum + (c.value * c.probability / 100), 0))}
            </div>
            <div className="text-sm text-gray-500">Weighted Value</div>
          </div>
        </div>
      </div>
    </div>
  );
} 