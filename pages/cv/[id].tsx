import type { NextPage } from "next";
import Head from "next/head";
import { Header, HEADER_HEIGHT } from "components/Header";
import { getCV } from "shared/queries";
import { parseCvInfo } from "shared/utils";
import dynamic from "next/dynamic";
import { Alert, LoadingOverlay } from "@mantine/core";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useMemo, useState } from "react";
import { useAtom } from "jotai";
import { accessTokenAtom } from "shared/atoms";

const PDFDocument = dynamic(() => import("components/PDF"), { ssr: false });

const CVPage: NextPage = () => {
  const router = useRouter();
  const [accessToken] = useAtom(accessTokenAtom);
  const { id } = router.query;
  const { data: response, isLoading } = useQuery("GetCV", {
    queryFn: () => getCV(id as string),
    enabled: !!id && !!accessToken,
  });

  const [isError, setIsError] = useState(false);
  const info = useMemo(() => {
    if (!response) {
      return null;
    }

    if (response.data.error) {
      setIsError(true);
      return null;
    }
    return parseCvInfo(response?.data?.data?.cvBody);
  }, [response]);
  return (
    <>
      <Head>
        <title>CV {response?.data.data.name}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>

      {info ? (
        <PDFDocument info={info} />
      ) : (
        <div
          style={{
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          }}
          className="flex justify-center items-center"
        >
          <LoadingOverlay visible={isLoading} />

          {isError && (
            <Alert title="Invalid ID" color="red">
              Cannot fetch CV with id: {id}
            </Alert>
          )}
        </div>
      )}
    </>
  );
};

export default CVPage;
