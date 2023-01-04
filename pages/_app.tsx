import "../styles/globals.css";
import type { AppProps } from "next/app";
import "shared/fb";
import { MantineProvider } from "@mantine/core";
import { Provider as JotaiProvider } from "jotai";
import { QueryClientProvider } from "react-query";
import { QUERY_CLIENT } from "shared/constants";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <JotaiProvider>
      <QueryClientProvider client={QUERY_CLIENT}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <Component {...pageProps} />
        </MantineProvider>
      </QueryClientProvider>
    </JotaiProvider>
  );
}

export default MyApp;
