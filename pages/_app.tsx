import "../styles/globals.css";
import type { AppProps } from "next/app";
import "shared/fb";
import { MantineProvider } from "@mantine/core";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Component {...pageProps} />
    </MantineProvider>
  );
}

export default MyApp;
