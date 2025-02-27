// app/api/contacts/[id]/route.ts
import { NextResponse } from "next/server";

const API_BASE_URL = "http://127.0.0.1:8000/api/contacts";
const token = process.env.API_TOKEN;

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    } else {
      console.error("Fejl i backend-API:", res.status, res.statusText);
      return NextResponse.json(
        { message: "Fejl ved hentning af kontakt" },
        { status: res.status }
      );
    }
  } catch (error) {
    console.error("Fejl i Next.js API-route:", error);
    return NextResponse.json(
      { message: "Server fejl i Next.js API-route" },
      { status: 500 }
    );
  }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    const { id } = params;
    const body = await request.json();
  
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
  
    if (res.ok) {
      const updatedContact = await res.json();
      return NextResponse.json(updatedContact);
    } else {
      return NextResponse.json({ success: false }, { status: res.status });
    }
}



export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 204) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false }, { status: res.status });
  }
}
