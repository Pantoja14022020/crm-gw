import React from "react"
import ReactDOM from "react-dom/client"
import './styles/index.css'
import App from "./App.jsx"
import 'animate.css/animate.min.css';

// @material-tailwind/react
import { ThemeProvider } from "@material-tailwind/react";


ReactDOM.createRoot(document.getElementById("root")).render(
    <ThemeProvider>
         <App/>
    </ThemeProvider>
)