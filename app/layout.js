import "./globals.css";

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
        <div>{children}</div>
      </body>
    </html>
  );
}
