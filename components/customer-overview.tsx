interface Customer {
  id: string;
  company_name: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  notes?: string;
  created_at: string;
}

interface CustomerOverviewProps {
  customer: Customer;
}

export default function CustomerOverview({ customer }: CustomerOverviewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h3>
        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Company Name</dt>
            <dd className="mt-1 text-sm text-gray-900">{customer.company_name}</dd>
          </div>
          
          {customer.contact_person && (
            <div>
              <dt className="text-sm font-medium text-gray-500">Contact Person</dt>
              <dd className="mt-1 text-sm text-gray-900">{customer.contact_person}</dd>
            </div>
          )}
          
          {customer.email && (
            <div>
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <a href={`mailto:${customer.email}`} className="text-blue-600 hover:text-blue-800">
                  {customer.email}
                </a>
              </dd>
            </div>
          )}
          
          {customer.phone && (
            <div>
              <dt className="text-sm font-medium text-gray-500">Phone</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <a href={`tel:${customer.phone}`} className="text-blue-600 hover:text-blue-800">
                  {customer.phone}
                </a>
              </dd>
            </div>
          )}
          
          {customer.website && (
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Website</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <a 
                  href={customer.website.startsWith('http') ? customer.website : `https://${customer.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  {customer.website}
                </a>
              </dd>
            </div>
          )}
          
          {customer.address && (
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Address</dt>
              <dd className="mt-1 text-sm text-gray-900 whitespace-pre-line">{customer.address}</dd>
            </div>
          )}
          
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Created</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {new Date(customer.created_at).toLocaleDateString()}
            </dd>
          </div>
        </dl>
      </div>

      {customer.notes && (
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Notes</h4>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-700 whitespace-pre-line">{customer.notes}</p>
          </div>
        </div>
      )}
    </div>
  );
} 