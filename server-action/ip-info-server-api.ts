"use server";

import { headers } from "next/headers";

const ipInfoApiUrl = process.env.IP_GEO_API_URL || "http://localhost:5069/";

export default async function fetchIpInfo(ip: string) {
  try {
    const url = `${ipInfoApiUrl}api/IpInfo/${ip}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch IP info");
    }
    return await res.json();
  } catch (err) {
    console.error("Error fetching IP info:", err);
    throw err;
  }
}

export async function fetchMyIpInfo() {
  try {
    const header = await headers();
    const newHeaders = new Headers();

    // Copy only safe headers
    const forwardHeaders = [
      "x-forwarded-for",
      "user-agent",
      "x-real-ip",
      "cf-connecting-ip",
    ];

    forwardHeaders.forEach((h) => {
      const value = header.get(h);
      if (value) newHeaders.set(h, value);
    });
    const url = `${ipInfoApiUrl}api/IpInfo/me`;
    const res = await fetch(url, {
      headers: newHeaders,
    });
    if (!res.ok) {
      throw new Error("Failed to fetch client IP info");
    }
    return await res.json();
  } catch (err) {
    console.error("Error fetching client IP info:", err);
    throw err;
  }
}
