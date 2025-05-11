import {createBrowserRouter, RouterProvider,} from "react-router";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home/Home';
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";
import PrivateRoute from "./services/PrivateRouteServce";
import App from "./App";
import Discovery from "./pages/Discovery/Discovery";

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
            {path: "/administrateur/utilisateurs", element: "<h1>utilisateurs</h1>"},
            {path: "/administrateur/moderation", element: "<h1>moderation</h1>"},
            {path: "/administrateur/monetisation", element: "<h1>monetisation</h1>"},
        ],
    },
    {
        element: <PrivateRoute allowedRoles={["user"]} children={<Discovery/>}></PrivateRoute>,
        children: [
            {path: "/decouvertes", element: "<h1>decouvertes</h1>"},
        ],
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);