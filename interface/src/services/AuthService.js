import {API_BASE_URL} from "../constants/Constants";

export class AuthService {

    async login(form) {
        const data = new FormData(form);
        try {
            const response = await fetch( `${API_BASE_URL}/login`, {
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