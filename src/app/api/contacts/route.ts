// app/api/contacts/route.ts
import { NextResponse } from "next/server";

const API_BASE_URL = "http://127.0.0.1:8000/api/contacts";
const token = process.env.API_TOKEN;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";

  const res = await fetch(`${API_BASE_URL}?page=${page}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) {
    const data = await res.json();



    return NextResponse.json(data);
  } else {
    return NextResponse.json(
      { message: "Fejl ved hentning af kontakter" },
      { status: res.status }
    );
  }
}
