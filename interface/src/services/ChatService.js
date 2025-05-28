import {API_BASE_URL} from "../constants/Constants";

export class ChatService {
    async getAllMatch(){
        try {
            const response = await fetch(`${API_BASE_URL}/chat/${localStorage.getItem("id")}`, {
                method: 'GET',
                headers: { "Token": localStorage.getItem("token") },
            })

            if (!response.ok) {
                new Error(`Erreur HTTP : ${response.status}!`);
            }
            return response;
        } catch (error) {
            console.error("Erreur lors de la récupération des matchs :", error);
            throw error;
        }

    }

    async getAllMessages(useIdChatWith){
        try {
            const response = await fetch(`${API_BASE_URL}/chat/${localStorage.getItem("id")}/${useIdChatWith}`, {
                method: 'GET',
                headers: { "Token": localStorage.getItem("token") },
            })

            if (!response.ok) {
                new Error(`Erreur HTTP : ${response.status}!`);
            }
            return response;
        } catch (error) {
            console.error("Erreur lors de la récupération des messages :", error);
        }
    }

    async seenMessage(user_id){
        try {
            await fetch(`${API_BASE_URL}/chat/${localStorage.getItem("id")}/${user_id}`, {
                method: 'PATCH',
                headers: { "Token": localStorage.getItem("token") },
            })
        } catch (error) {
            console.error(error);
        }
    }

    async sendMessage(message, user_id){
        const data =  new FormData(message);
        try {
            await fetch(`${API_BASE_URL}/chat/${localStorage.getItem("id")}/${user_id}`, {
                method: 'POST',
                headers: { "Token": localStorage.getItem("token") },
                body: data
            })
        } catch (error) {
            console.error(error);
        }
    }

}