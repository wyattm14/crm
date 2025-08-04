import { createSupabaseClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import CustomerDetailTabs from "@/components/customer-detail-tabs";

export default async function CustomerDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const { data: customer } = await supabase
    .from("customers")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", user.id)
    .single();

  if (!customer) {
    redirect("/dashboard/customers");
  }

  return (
    <div className="h-full">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{customer.company_name}</h1>
            <p className="text-gray-600">Manage customer information, communications, and interactions.</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              customer.pipeline_stage 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {customer.pipeline_stage ? customer.pipeline_stage.charAt(0).toUpperCase() + customer.pipeline_stage.slice(1) : 'No Stage'}
            </span>
          </div>
        </div>
      </div>
      <div className="h-full bg-white rounded-lg shadow">
        <CustomerDetailTabs customer={customer} />
      </div>
    </div>
  );
} 