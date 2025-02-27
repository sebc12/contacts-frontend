// lib/contacts/deleteContact.ts
export async function deleteContact(id: number) {
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: "DELETE",
      });
  
      if (res.ok) {
        console.log("Contact deleted successfully");
        return true;
      } else {
        console.error("Failed to delete contact");
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  }
  