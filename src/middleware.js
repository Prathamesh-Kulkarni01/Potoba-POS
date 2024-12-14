import { NextResponse } from "next/server";

// This function will process the request and extract subdomain if available.
export function middleware(request) {
  const host = request.headers.get("host") || ""; // Get the full host (including subdomain)
  console.log("Host:", host);
  // Regex to extract subdomain from the host (assumes domain structure like subdomain.example.com)
  const subdomainMatch = host.match(/^([a-zA-Z0-9-]+)\./);

  const hostArray = host.split(".");
  const isSubdomainExist = host.includes('localhost')?hostArray.length>=2:hostArray.length>2
  // Extract the subdomain if it exists; otherwise, set it to an empty string
  const subdomain = (isSubdomainExist && subdomainMatch) ? subdomainMatch[1] : "";

  // Create a response that carries the subdomain info
  const response = NextResponse.next();

  // Set the subdomain to the headers to make it accessible in your component
  response.headers.set("x-subdomain", subdomain);

  return response;
}

// Apply this middleware to all routes
export const config = {
  matcher: "/",
};
