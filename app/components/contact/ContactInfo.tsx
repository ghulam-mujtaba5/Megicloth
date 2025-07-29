"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { contactMethods, contactInfo } from "../../config/contact";

export default function ContactInfo() {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        background: "#ffffff",
        boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
        p: { xs: 3, md: 4 },
        height: "100%",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: "#1e293b" }}>
        Contact Information
      </Typography>
      {contactMethods.map((method, index) => (
        <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 2.5 }}>
          <method.icon sx={{ color: method.color, mr: 1.5 }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {method.title}
            </Typography>
            <Typography variant="body1" sx={{ color: "#475569" }}>
              {method.title === 'Business Hours' ? (
                <> 
                  {contactInfo.hours.map((line, i) => (
                    <span key={i}>{line}<br/></span>
                  ))}
                </>
              ) : (
                method.value
              )}
            </Typography>
          </Box>
        </Box>
      ))}
    </Paper>
  );
}


