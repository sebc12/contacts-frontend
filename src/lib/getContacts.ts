export async function getContacts() {
    try {
        const res = await fetch('http://127.0.0.1:8000/api/contacts', {
            headers: {
                'Content-Type': 'application/json',
            },
            // Tving fetch til at blive kørt på serversiden
            cache: 'no-store'
        });

        if (!res.ok) {
            // Håndter HTTP-fejl som 404 eller 500
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        // Log fejlen i konsollen for debugging
        console.error('Error fetching contacts:', error);

        // Returner en tom array eller en brugerdefineret fejlbesked
        return [];
    }
}
