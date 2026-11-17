import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import "../styles/layout.css";

export default function LayoutPpal() {
    return (
        <Box className="app-layout">
            
            <Header />
            <Box className="layout-main">
                <Box className="layout-content">
                    <Outlet />
                </Box>
            </Box>
            <Footer />
        </Box>
    );
}