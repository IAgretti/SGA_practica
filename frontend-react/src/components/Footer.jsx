import { Box, Typography } from "@mui/material";

function Footer() {
    return (
        <Box
            component="footer"
            className="layout-footer"
            sx={{
                bgcolor: "background.paper",
                borderTop: 1,
                borderColor: "divider",
                color: "text.secondary",
            }}
        >
            <Box className="layout-container footer-content">
                <Typography variant="body2" fontWeight={600}>
                    SGA · Sistema de Gestión Académica
                </Typography>
                <Typography variant="caption">
                    Gestión académica
                </Typography>
            </Box>
        </Box>
    );
}

export default Footer;