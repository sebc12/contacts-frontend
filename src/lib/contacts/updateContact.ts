// lib/contacts/updateContact.ts
export async function updateContact(id: number, updatedData: any) {
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedData)
      });
  
      if (res.ok) {
        const data = await res.json();
        console.log("Contact updated successfully:", data);
        return data;
      } else {
        console.error("Failed to update contact");
        return null;
      }
    } catch (error) {
      console.error("Error i updateContact:", error);
      return null;
    }
  }
  