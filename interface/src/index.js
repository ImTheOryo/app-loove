import './index.css';

import {createBrowserRouter, RouterProvider,} from "react-router";
import {ToastContainer} from "react-toastify";
import Modal from "react-modal";
import React from 'react';
import ReactDOM from 'react-dom/client';

import Home from './pages/Home/Home';
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";
import PrivateRoute from "./services/PrivateRouteServce";
import App from "./App";
import Discovery from "./pages/Discovery/Discovery";
import ChatSummary from "./pages/ChatSummary/ChatSummary";
import UserList from "./pages/UserList/UserList";
import Chat from "./pages/Chat/Chat";
import Likes from "./pages/Likes/Likes";
import ProfileSummary from "./pages/ProfileSummary/ProfileSummary";
import ProfileSettings from "./pages/ProfileSettings/ProfileSettings";


Modal.setAppElement('#root');

const router = createBrowserRouter([
    {
        element: <App/>,
        children: [
            {path: "/", element: <Home/>},
            {path: "/connexion", element: <Login/>},
        ],
    },
    {
        element: <PrivateRoute allowedRoles={["admin"]} children={<Admin/>}></PrivateRoute>,
        children: [
            {path: "/administrateur/tableau-de-bord", element: "<h1>tableau-de-bord</h1>"},
            {path: "/administrateur/statistiques", element: "<h1>statistiques</h1>"},
            {path: "/administrateur/utilisateurs", element: <UserList/>},
            {path: "/administrateur/moderation", element: "<h1>moderation</h1>"},
            {path: "/administrateur/monetisation", element: "<h1>monetisation</h1>"},
        ],
    },
    {
        element: <PrivateRoute allowedRoles={["user"]} children={<Discovery/>}></PrivateRoute>,
        children: [
            {path: "/decouvertes", element: ""},
        ],
    },
    {
        element: <PrivateRoute allowedRoles={["user"]} children={<Likes/>}></PrivateRoute>,
        children: [
            {path: "/likes", element: ""},
        ]
    },
    {
        element: <PrivateRoute allowedRoles={["user"]} children={<ChatSummary/>}></PrivateRoute>,
        children: [
            {path: "/conversations", element: ""}
        ]
    },
    {
        element: <PrivateRoute allowedRoles={["user"]} children={<Chat/>}></PrivateRoute>,
        children: [
            {path: `/conversations/:userId`, element: ""}
        ]
    },
    {
        element: <PrivateRoute allowedRoles={["user"]} children={<ProfileSummary/>}></PrivateRoute>,
        children: [
            {path: "/profile", element: ""}
        ]
    },
    {
        element: <PrivateRoute allowedRoles={["user"]} children={<ProfileSettings/>}></PrivateRoute>,
        children: [
            {path: "/profile/settings", element: ""}
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
        <ToastContainer />
    </React.StrictMode>
);