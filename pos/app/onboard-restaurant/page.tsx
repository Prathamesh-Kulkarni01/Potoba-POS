"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RestaurantOnboarding() {
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const router = useRouter();

  const handleOnboard = async () => {
    const res = await fetch("/api/auth/onboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, address }),
    });

    if (res.ok) {
      const { user } = await res.json();
 
      router.push("/dashboard");
    } else {
      alert("Error completing onboarding!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl">Complete Your Restaurant Onboarding</h1>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleOnboard();
        }}
      >
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
          required
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          required
        />
        <button type="submit" className="btn-primary">
          Complete Onboarding
        </button>
      </form>
    </div>
  );
}
