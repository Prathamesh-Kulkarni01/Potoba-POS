"use client";
import { useState, useEffect } from "react";

const Page = () => {
  const [tenants, setTenants] = useState({}); // Stores tenant data
  const [tenantName, setTenantName] = useState("");
  const [subdomain, setSubdomain] = useState("");

  // Fetch the subdomain from the custom header set by middleware
  useEffect(() => {
    const fetchSubdomain = async () => {
      const response = await fetch("/");
      const subdomainHeader = response.headers.get("x-subdomain");
      console.log({ subdomainHeader });
      setSubdomain(subdomainHeader || ""); // Default to empty string if no subdomain
    };

    fetchSubdomain();
  }, []);

  const createTenant = () => {
    if (!tenantName || tenants[tenantName]) {
      alert("Tenant name is invalid or already exists.");
      return;
    }
    setTenants((prev) => ({ ...prev, [tenantName]: { name: tenantName } }));
    setTenantName("");
  };

  const renderTenantPage = (tenant) => {
    return (
      <div>
        <h1>Welcome to {tenant}!</h1>
        <p>This is the tenant-specific page for {tenant}.</p>
        <a href="/">Go Back</a>
      </div>
    );
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "localhost:3000";

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
                  <a href={`http://${name}.${baseUrl}`}>{name}</a>
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
