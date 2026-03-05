"use server";

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
    const url = `${ipInfoApiUrl}api/IpInfo/me`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch client IP info");
    }
    return await res.json();
  } catch (err) {
    console.error("Error fetching client IP info:", err);
    throw err;
  }
}