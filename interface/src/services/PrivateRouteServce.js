import * as PusherPushNotifications from "@pusher/push-notifications-web";
import {Navigate} from "react-router";


const PrivateRoute = ({children, allowedRoles}) => {
    const token = localStorage.getItem("token");

    const isValidToken = () => {
      if (!token) {
          return false;
      }
      try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          const isExpired = payload.exp * 1000 < Date.now();
          const hasRole = allowedRoles.includes(payload.status);
          return !isExpired && hasRole;
      } catch {
          return false;
      }

    };
    return isValidToken() ? children : <Navigate to="/connexion"/>;
};

export default PrivateRoute;