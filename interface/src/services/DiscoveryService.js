import {API_BASE_URL} from "../constants/Constants";

export class DiscoveryService {

    async getDiscovery() {
        try {
            const res = await fetch(`${API_BASE_URL}/discovery/${localStorage.getItem('id')}`, {
                method: "GET",
                headers: { "Token": localStorage.getItem("token") },
            })

            if (!res.ok) {
                new Error(`Erreur HTTP : ${res.status}!`);
            }
            return res;
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            throw error;
        }
    }

    SetLocalisation (){
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                async (position) =>{
                    await fetch(`${API_BASE_URL}/localisation`,{
                        method: "POST",
                        headers: {Token: localStorage.getItem("token")},
                        body: JSON.stringify({
                            id: localStorage.getItem("id"),
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        })
                    });
                });

            return true;
        }
        return false;
    }

    async ActionUser(action, user){

        await fetch(`${API_BASE_URL}/${action}/${localStorage.getItem('id')}/${user}`, {
            method: "POST",
            headers: { "Token": localStorage.getItem("token") },
        })
    }
}