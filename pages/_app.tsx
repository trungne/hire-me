import "../styles/globals.css";
import type { AppProps } from "next/app";
import "shared/fb";
import { MantineProvider } from "@mantine/core";
import { Provider } from "jotai";
import { QueryClientProvider } from "react-query";
import { QUERY_CLIENT } from "shared/constants";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <QueryClientProvider client={QUERY_CLIENT}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <Component {...pageProps} />
        </MantineProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
