"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const subdomain =
    typeof window !== "undefined" ? window.location.host.split(".")[0] : "";

  const [tenants, setTenants] = useState({}); // Stores tenant data
  const [tenantName, setTenantName] = useState("");

  // Create a new tenant
  const createTenant = () => {
    if (!tenantName || tenants[tenantName]) {
      alert("Tenant name is invalid or already exists.");
      return;
    }
    setTenants((prev) => ({ ...prev, [tenantName]: { name: tenantName } }));
    setTenantName("");
  };

  useEffect(() => {
    // If subdomain exists, check if it's a valid tenant
    if (subdomain && tenants[subdomain]) {
      // router.push(`/tenant/${subdomain}`);
    }
  }, [subdomain, tenants, router]);

  // Render a tenant-specific page
  const renderTenantPage = (tenant) => {
    return (
      <div>
        <h1>Welcome to {tenant}!</h1>
        <p>This is the tenant-specific page for {tenant}.</p>
        <a href="/">Go Back</a>
      </div>
    );
  };

  // Render the main application
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      {subdomain ? (
        renderTenantPage(subdomain)
      ) : (
        <div>
          <h1>Multitenant Application</h1>
          <div>
            <input
              type="text"
              placeholder="Enter tenant name"
              value={tenantName}
              onChange={(e) => setTenantName(e.target.value)}
            />
            <button onClick={createTenant}>Create Tenant</button>
          </div>
          <h2>Existing Tenants</h2>
          <ul>
            {Object.keys(tenants).length > 0 ? (
              Object.keys(tenants).map((name) => (
                <li key={name}>
                  <a href={`${`http://${name}.${window.location.host}`}`}>
                    {name}
                  </a>
                </li>
              ))
            ) : (
              <p>No tenants available. Create one above.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Page;
