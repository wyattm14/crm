import { createSupabaseClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import CustomersTable from "@/components/customers-table";

export default async function CustomersPage() {
  const supabase = await createSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const { data: customers } = await supabase
    .from("customers")
    .select("*")
    .eq("user_id", user.id)
    .order("company_name");

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">All Customers</h1>
        <p className="text-gray-600">Complete overview of all your customers and their details.</p>
      </div>
      <div className="h-full bg-white rounded-lg shadow">
        <CustomersTable customers={customers || []} />
      </div>
    </div>
  );
} 