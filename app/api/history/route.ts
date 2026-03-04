import { NextRequest, NextResponse } from "next/server";

const API_BASE = "http://localhost:5069/api/History";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const params = url.searchParams.toString();
  try {
    const res = await fetch(`${API_BASE}?${params}`);
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch history." }, { status: 500 });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: "Error fetching history." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const ids = await req.json();
    const res = await fetch(API_BASE, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ids),
    });
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to delete history." }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Error deleting history." }, { status: 500 });
  }
}
