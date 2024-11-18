'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Container, CssBaseline } from "@mui/material";
import BottomNav from "./components/BottomNav";
import Header from "./components/Header";
import { usePathname } from "next/navigation";
import path from 'path';
import { Suspense } from 'react';



export default function Layout({ children }) {

  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isInfoPage = pathname === "/info";
  const isLoginPage = pathname === "/login";
  const signupPage = pathname === "/survey-user";

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
            <Suspense>{children}</Suspense>

            {!isHomePage && !isInfoPage && !isLoginPage && !signupPage && <BottomNav />}
          </Container>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
