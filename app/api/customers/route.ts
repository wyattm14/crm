import { createSupabaseClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    const formData = await request.formData();
    const customerData = {
      company_name: formData.get("company_name") as string,
      contact_person: formData.get("contact_person") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      website: formData.get("website") as string,
      address: formData.get("address") as string,
      notes: formData.get("notes") as string,
      user_id: user.id,
      created_at: new Date().toISOString(),
    };

    // Insert customer into database
    const { data, error } = await supabase
      .from("customers")
      .insert([customerData])
      .select()
      .single();

    if (error) {
      console.error("Error creating customer:", error);
      return NextResponse.redirect(new URL("/dashboard/customers/new?error=Failed+to+create+customer", request.url));
    }

    // Redirect to the customer's page
    return NextResponse.redirect(new URL(`/dashboard/customers/${data.id}`, request.url));

  } catch (error) {
    console.error("Error in customer creation:", error);
    return NextResponse.redirect(new URL("/dashboard/customers/new?error=An+error+occurred", request.url));
  }
} 