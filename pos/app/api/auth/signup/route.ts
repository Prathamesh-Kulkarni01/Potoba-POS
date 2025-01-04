import Restaurant from "@/lib/models/Restaurant";
import bcrypt from "bcrypt";

export async function POST(req) {
  const { name, email, password } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  const newRestaurant = new Restaurant({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await newRestaurant.save();
    return new Response("Signup successful!", { status: 200 });
  } catch (error) {
    return new Response("Error creating user.", { status: 500 });
  }
}
