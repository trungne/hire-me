import "../styles/globals.css";
import type { AppProps } from "next/app";
import "shared/fb";
import { MantineProvider } from "@mantine/core";
import { Provider } from "jotai";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Component {...pageProps} />
      </MantineProvider>
    </Provider>
  );
}

export default MyApp;
