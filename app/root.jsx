import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useMatches,
} from "@remix-run/react";
import sharedStyles from "./styles/shared.css";
import Error from "./components/util/Error";

export const meta = () => ({
  charset: "utf-8",
  title: "RemixExpenses",
  viewport: "width=device-width,initial-scale=1",
});

function Document({ title, children }) {
  const matches = useMatches();
  const disableJS = matches.some((match) => match.handle?.disableJS);
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap"
          rel="stylesheet"
        />
        {title && <title>{title}</title>}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        {!disableJS && <Scripts />}
        <LiveReload />
      </body>
    </html>
  );
}
export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}
export function links() {
  return [{ rel: "stylesheet", href: sharedStyles }];
}

export function CatchBoundary() {
  const caughtResponse = useCatch();

  return (
    <Document title={caughtResponse.statusText}>
      <main>
        <Error title={caughtResponse.statusText}>
          <p>
            {caughtResponse.data?.message ||
              "Something went wrong. Please try again later."}
          </p>
          <p>
            Back to <Link to="/">safety</Link>.
          </p>
        </Error>
      </main>
    </Document>
  );
}
export function ErrorBoundary({ error }) {
  return (
    <Document title="An error occurred">
      <main>
        <Error title="An error occurred">
          <p>
            {error.message || "Something went wrong. Please try again later."}
          </p>
          <p>
            Back to <Link to="/">safety</Link>.
          </p>
        </Error>
      </main>
    </Document>
  );
}
