import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

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
          <div>{children}</div>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
