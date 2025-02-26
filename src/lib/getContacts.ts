export async function getContacts(page = 1) {
    try {
        const res = await fetch(`http://127.0.0.1:8000/api/contacts?page=${page}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer din_token_her'
            },
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        // Justeret til det nye JSON-format
        return {
            data: data.data || [],
            pagination: {
                current_page: data.current_page || 1,
                last_page: data.last_page || 1
            }
        };
    } catch (error) {
        console.error('Error fetching contacts:', error);

        // Returner en fallback, hvis der opstår fejl
        return {
            data: [],
            pagination: {
                current_page: page,
                last_page: 1
            }
        };
    }
}
