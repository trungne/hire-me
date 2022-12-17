import "../styles/globals.css";
import type { AppProps } from "next/app";
import "shared/fb";
import { MantineProvider } from "@mantine/core";
import { Provider, useAtom } from "jotai";
import { QueryClientProvider } from "react-query";
import { CURRENT_NAV_BAR_LOCAL_STORAGE, QUERY_CLIENT } from "shared/constants";
import { NavCategoryValueType } from "shared/types";
import { useHydrateAtoms } from "jotai/utils";
import { navBarAtom, navBarPersistentAtom } from "shared/atoms";
import { useEffect } from "react";

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
