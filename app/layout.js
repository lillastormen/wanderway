import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Container, CssBaseline } from "@mui/material";

export const metadata = {
  title: "wanderway",
  description: "Ultimate travel planning tool, designed to effortlessly create personalized travel itineraries"
};

export default function Layout({ children }) {

  return (
    <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body>
      <AppRouterCacheProvider>
        <CssBaseline />
        <Container
          maxWidth="lg"
          sx={{
            backgroundColor: "#f5f5f5",
            minHeight: "100vh",
            padding: "20px",
          }}
          id="main-container"
        >
          {children}
        </Container>
      </AppRouterCacheProvider>
    </body>
  </html>
  );
}
