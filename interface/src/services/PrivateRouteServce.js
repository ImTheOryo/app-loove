import * as PusherPushNotifications from "@pusher/push-notifications-web";
import {Navigate} from "react-router";


const PrivateRoute = ({children, allowedRoles}) => {
    const token = localStorage.getItem("token");
    const beamsClient = new PusherPushNotifications.Client({
        instanceId: "d3357f00-ef05-4ba6-afea-f741e8d1814e",
    });

    const isValidToken = async () => {
      if (!token) {
          await beamsClient.clearAllState();
          return false;
      }
      try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          const isExpired = payload.exp < Date.now() / 1000;
          const hasRole = allowedRoles.includes(payload.status);
          return !isExpired && hasRole;
      } catch {
          await beamsClient.clearAllState();
          return false;
      }

    };

    return isValidToken() ? children : <Navigate to="/connexion"/>;
};

export default PrivateRoute;