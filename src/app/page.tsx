import { getContacts } from "@/lib/getContacts";
import React from "react";
import dayjs from 'dayjs';

const formatDate = (dateString: string) => {
    return dayjs(dateString).format('DD-MM-YYYY HH:mm');
}


interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

export default async function Home() {

  const contacts = await getContacts();
  console.log(contacts);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-6xl overflow-x-auto">
        <h1 className="text-2xl font-bold text-center mb-4">Contacts</h1>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Phone</th>
              <th className="py-2 px-4 text-left">Created</th>
              <th className="py-2 px-4 text-left">Updated</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact: Contact) => (
              <tr key={contact.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{contact.name}</td>
                <td className="py-2 px-4">{contact.email}</td>
                <td className="py-2 px-4">{contact.phone}</td>
                <td className="py-2 px-4">{formatDate(contact.created_at)}</td>
                <td className="py-2 px-4">{formatDate(contact.updated_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
