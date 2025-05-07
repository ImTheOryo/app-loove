import {createBrowserRouter, RouterProvider,} from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import PrivateRoute from './services/PrivateRouteServce';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [
        ],
    },
    {
        path: "/connexion",
        element: <Login />,
        children: [
        ],
    },
    {
        path: "/administration/tableau-de-bord",
        element: <PrivateRoute allowedRoles={["admin"]}>

        </PrivateRoute>
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);