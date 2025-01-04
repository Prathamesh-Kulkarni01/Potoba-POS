// import { connectToDatabase } from "@/lib/mongodb";
import Restaurant from "@/lib/models/Restaurant";
import { auth } from "@/auth";

export async function POST(req) {

const session = await auth();
  const { phone, address } = await req.json();
  const { id } = session?.user;

  try {
    await Restaurant.findByIdAndUpdate(id, { phone, address, onboarded: true });
    return new Response("Onboarding complete!", { status: 200 });
  } catch (error) {
    return new Response("Error onboarding.", { status: 500 });
  }
}
