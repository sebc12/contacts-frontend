"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { updateContact } from "@/lib/contacts/updateContact";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  created_at?: string;
  updated_at?: string;
}

export default function EditContactPage() {
  const params = useParams();
  const id = params.id; // Hent id fra URL'en

  const [contact, setContact] = useState<Contact | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch(`/api/contacts/${id}`);
        
        // Tjek om status ikke er 200
        if (!res.ok) {
          console.error("Fejl i API kald:", res.status, res.statusText);
          setContact(null);
          return;
        }
  
        // Tjek om responsen har indhold
        const text = await res.text();
        if (!text) {
          console.error("Tom respons fra API");
          setContact(null);
          return;
        }
  
        // Hvis der er indhold, parse som JSON
        const data = JSON.parse(text);
        setContact(data);
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
      } catch (error) {
        console.error("Fejl ved hentning af kontakt:", error);
      }
    };
  
    if (id) fetchContact();
  }, [id]);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = {
      name,
      email,
      phone,
    };

    const result = await updateContact(Number(id), updatedData);

    if (result) {
      router.push("/contacts");
    } else {
      alert("Fejl ved opdatering. Prøv igen.");
    }
  };

  if (!contact) return <p>Loading...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Opdater kontakt</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg"
          >
            Opdater Kontakt
          </button>
        </form>
      </div>
    </div>
  );
}
