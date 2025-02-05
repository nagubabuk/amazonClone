import * as React from "react";
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    Link,
} from "react-router-dom";
import App from "../App";
import Home from "../components/Home";
import ProductForm from "../components/Prouduct/ProductForm";
import ProductsList from "../admin/ProductsList";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children:[
            {
                path:"",
                element:<Home/>
            },
            {
                 path:"/products-list", 
                 element:< ProductsList />
            },
            {
                path:"create-product",
                element:<ProductForm/>
            }

        ]
    }
]);

export default routes;