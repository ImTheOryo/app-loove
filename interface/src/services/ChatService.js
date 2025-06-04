import {API_BASE_URL} from "../constants/Constants";

export class ChatService {

    async seenMessage(chatId, idSender){
        try {
            await fetch(`${API_BASE_URL}/chat/${chatId}/${idSender}`, {
                method: 'PATCH',
                headers: { "Token": localStorage.getItem("token") },
            })
        } catch (error) {
            console.error(error);
        }
    }

    async sendMessage(chatId, message){

        try {
            await fetch(`${API_BASE_URL}/chat/${chatId}/${localStorage.getItem("id")}`, {
                method: 'POST',
                headers: { "Token": localStorage.getItem("token") },
                body: message
            })
        } catch (error) {
            console.error(error);
        }
    }

}