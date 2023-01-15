import "../styles/globals.css";
import type { AppProps } from "next/app";
import "shared/fb";
import { MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "react-query";
import { QUERY_CLIENT } from "shared/constants";
import RegistrationModal from "components/Modal/RegistrationModal";
import { SubmitCvModal } from "components/Modal/SubmitCvModal";
import { NotificationsProvider } from "@mantine/notifications";
import { useInitCVInfo, useSubscribeFbAuthState } from "shared/hooks";
import { EditCvModal } from "components/Modal/EditCVModal";
import { TemplatePreviewModal } from "components/Modal/TemplatePreviewModal";

function MyApp({ Component, pageProps }: AppProps) {
  useInitCVInfo();
  useSubscribeFbAuthState();
  return (
    <QueryClientProvider client={QUERY_CLIENT}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <NotificationsProvider position="top-center">
          <Component {...pageProps} />
          <RegistrationModal />
          <SubmitCvModal />
          <EditCvModal />
          <TemplatePreviewModal />
        </NotificationsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
