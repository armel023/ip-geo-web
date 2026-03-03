
import normalizeIp from "@/utils/normalize-ip";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  let ip = searchParams.get("ip") || "";

  // If no IP provided, try to get from headers
  if (!ip) {
    const xforwardedFor = req.headers.get("x-forwarded-for");
    const xRealIp = req.headers.get("x-real-ip");
    console.log(req.headers);
    ip = xforwardedFor?.split(",")[0]?.trim() || xRealIp || "";
    ip = normalizeIp(ip) || ""; // Normalize IP if needed
  }

  if (!ip) {
    return NextResponse.json({ error: "IP address not found." }, { status: 400 });
  }

  try {
    const res = await fetch(`http://localhost:5069/api/IpInfo/${ip}`);
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch IP info." }, { status: 500 });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: "Error fetching IP info." }, { status: 500 });
  }
}
