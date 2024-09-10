import React from "react"
import "./styles"
import { hydrateRoot } from "react-dom/client"
import { RouterProvider } from "@tata1mg/router"
import clientRouter from "catalyst-core/router/ClientRouter"

const { __ROUTER_INITIAL_DATA__: routerInitialData } = window

const router = clientRouter({ routerInitialState: routerInitialData })

const Application = (
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)

const container = document.getElementById("app")
hydrateRoot(container, Application)
