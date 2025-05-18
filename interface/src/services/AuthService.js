export class AuthService {

    async login(form) {
        const data = new FormData(form);
        try {
            const response = await fetch( 'https://app-loove-api.local/login', {
                method: 'POST',
                body: data,
            });

            if (!response.ok) {
                new Error(`Erreur HTTP : ${response.status}!`);
            }

            return response;
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            throw error;
        }
    }
}