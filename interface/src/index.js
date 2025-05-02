import {createBrowserRouter, RouterProvider,} from "react-router";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from "./pages/Login/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
        ],
    },
    {
        path: "/connexion",
        element: <Login />,
        children: [
        ],
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);