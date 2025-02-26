import { getContacts } from "@/lib/getContacts";
import { deleteContact } from "@/lib/deleteContact";
import Link from "next/link";
import dayjs from 'dayjs';

const formatDate = (dateString: string) => {
    return dayjs(dateString).format('DD-MM-YYYY HH:mm');
}

export default async function ContactsPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = parseInt(searchParams.page || "1");
  const contactsData = await getContacts(page);

  const contacts = contactsData.data;
  const currentPage = contactsData.pagination.current_page;
  const lastPage = contactsData.pagination.last_page;


  

  return (
    <div className="flex justify-center items-center min-h-screen py-6">
      <div className="w-full max-w-6xl overflow-x-auto">
        <h1 className="text-2xl font-bold text-center mb-4">Contacts</h1>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-2 px-4 text-left">id</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Phone</th>
              <th className="py-2 px-4 text-left">Created</th>
              <th className="py-2 px-4 text-left">Updated</th>   
              <th className="py-2 px-4 text-left">edit</th>   
              <th className="py-2 px-4 text-left">delete</th>   
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact: any) => (
              <tr key={contact.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{contact.id}</td>
                <td className="py-2 px-4">{contact.name}</td>
                <td className="py-2 px-4">{contact.email}</td>
                <td className="py-2 px-4">{contact.phone}</td>
                <td className="py-2 px-4">{formatDate(contact.created_at)}</td>
                <td className="py-2 px-4">{formatDate(contact.updated_at)}</td>
                <td className="py-2 px-4">
                  <Link href={`/contacts/${contact.id}/edit`} className="px-2 py-1 bg-blue-500 text-white rounded">
                    Edit
                  </Link>
                </td>
                <td className="py-2 px-4">
                  <Link href={`/contacts/${contact.id}/delete`} className="px-2 py-1 bg-red-500 text-white rounded">
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4 space-x-4">
          {currentPage > 1 && (
            <Link href={`?page=${currentPage - 1}`} className="px-4 py-2 bg-gray-300 rounded">
              Previous
            </Link>
          )}
          {currentPage < lastPage && (
            <Link href={`?page=${currentPage + 1}`} className="px-4 py-2 bg-gray-300 rounded">
              Next
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
