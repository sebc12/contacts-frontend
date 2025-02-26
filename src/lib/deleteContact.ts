export async function deleteContact(id: number) {
    try {
        const res = await fetch(`http://127.0.0.1:8000/api/contacts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer din_token_her'
            }
        });

        if (res.status === 204) {
            console.log('Contact deleted successfully');
            return true;
        } else {
            console.error('Failed to delete contact');
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}
