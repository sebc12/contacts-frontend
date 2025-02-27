// lib/contacts/getContacts.ts
export async function getContacts(page: number = 1) {
    try {
      const res = await fetch(`/api/contacts?page=${page}`, {
        method: "GET",
        cache: "no-store",
      });
  
      if (!res.ok) {
        throw new Error("Fejl ved hentning af kontakter");
      }
  
      const rawData = await res.json();
  
      // Omstrukturer dataen til det format, som din frontend forventer
      const formattedData = {
        data: rawData.data,
        pagination: {
          current_page: rawData.current_page,
          last_page: rawData.last_page
        }
      };
  
      return formattedData;
    } catch (error) {
      console.error("Error i getContacts:", error);
      return { data: [], pagination: { current_page: 1, last_page: 1 } };
    }
  }
  