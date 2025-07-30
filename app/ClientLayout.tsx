import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Box } from '@mui/material';
import { ReactNode } from "react";


interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, minHeight: '70vh' }}>{children}</Box>
      <Footer />
    </Box>
  );
}
