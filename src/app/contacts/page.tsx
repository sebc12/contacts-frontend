"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { getContacts } from "@/lib/contacts/getContacts";
import { deleteContact } from "@/lib/contacts/deleteContact";

const formatDate = (dateString: string) => {
  return dayjs(dateString).format("DD-MM-YYYY HH:mm");
};

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  created_at?: string;
  updated_at?: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchContacts = async (page: number) => {
    setLoading(true);
    try {
      const contactsData = await getContacts(page);  
      // Tilføj fallback til pagination
      setContacts(contactsData.data || []);
      setCurrentPage(contactsData.pagination?.current_page || 1);
      setLastPage(contactsData.pagination?.last_page || 1);
    } catch (error) {
      console.error("Fejl ved hentning af kontakter:", error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchContacts(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= lastPage) {
      setCurrentPage(newPage);
    }
  };

  const handleDelete = async (id: number) => {
    const success = await deleteContact(id);
    if (success) {
      // Efter sletning kan du enten fjerne kontakten fra listen eller hente siden igen
      fetchContacts(currentPage);
    } else {
      alert("Sletning mislykkedes. Prøv igen.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-6">
      <div className="w-full max-w-6xl overflow-x-auto">
        <h1 className="text-2xl font-bold text-center mb-4">Contacts</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4 text-left">id</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Phone</th>
                <th className="py-2 px-4 text-left">Created</th>
                <th className="py-2 px-4 text-left">Updated</th>
                <th className="py-2 px-4 text-left">Edit</th>
                <th className="py-2 px-4 text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{contact.id}</td>
                  <td className="py-2 px-4">{contact.name}</td>
                  <td className="py-2 px-4">{contact.email}</td>
                  <td className="py-2 px-4">{contact.phone}</td>
                  <td className="py-2 px-4">{formatDate(contact.created_at || "")}</td>
                  <td className="py-2 px-4">{formatDate(contact.updated_at || "")}</td>
                  <td className="py-2 px-4">
                  <Link
                    href={`/contacts/${contact.id}`}
                    className="px-2 py-1 bg-blue-500 text-white rounded"
                    >
                    Edit
                    </Link>
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4 space-x-4">
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Previous
            </button>
          )}
          {currentPage < lastPage && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
