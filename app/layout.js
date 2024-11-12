'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Container, CssBaseline } from "@mui/material";
import Menu from "./components/Menu";
import Header from "./components/Header";
import { usePathname } from "next/navigation";



export default function Layout({ children }) {

  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
      <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <AppRouterCacheProvider>
          <CssBaseline />
          <Header />
          <Container
            sx={{
              paddingBottom: "70px",
              backgroundColor: "#f5f5f5",
              minHeight: "calc(100vh - 70px )"
            }}
            id="main-container"
          >

            {children}
            {!isHomePage && <Menu />}
          </Container>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
