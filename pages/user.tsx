import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Header, HEADER_HEIGHT } from "components/Header";
import { useAtom } from "jotai";
import { accessTokenAtom, appUserAtom } from "shared/atoms";
import { useQuery } from "react-query";
import { getAllCVsByEmail } from "shared/queries";
import Template from "components/PDF/Template";
import { parseCvInfo } from "shared/utils";
import { TEMPLATE_MAP } from "components/PDF/styles";
import { PDFViewer } from "@react-pdf/renderer";
import { Button, LoadingOverlay, Text } from "@mantine/core";
import Link from "next/link";
import { Edit, Eye } from "tabler-icons-react";
import { editCVModalAtom } from "components/Modal/EditCVModal";

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {

  if (!context.req.cookies["accessToken"]) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const UserPage: NextPage = () => {
  const [user] = useAtom(appUserAtom);
  const [accessToken] = useAtom(accessTokenAtom);
  const [, setEditCVModalProps] = useAtom(editCVModalAtom);

  const { data, isLoading } = useQuery(
    ["getAllCVs", user?.email],
    () => {
      if (user?.email) {
        return getAllCVsByEmail(user?.email);
      }
    },
    {
      enabled: !!user?.email && !!accessToken,
    }
  );
  return (
    <>
      <Head>
        <title>Hire me</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header></Header>
      <LoadingOverlay visible={isLoading} />
      <div
        style={{
          minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
        }}
        className="flex items-center justify-center mx-auto max-w-4xl gap-2 flex-wrap"
      >
        {!data?.data.data.length && !isLoading && (
          <div className="flex flex-col gap-4">
            <Text className="text-center">You have no CVs yet</Text>
            <Link href="/">
              <Button>Start creating some!</Button>
            </Link>
          </div>
        )}
        {data?.data.data.map((cv) => {
          const info = parseCvInfo(cv.cvBody);
          if (!info) {
            return null;
          }

          return (
            <div className="" key={cv.id}>
              <div className="flex justify-evenly items-center p-2">
                <Link className="flex items-center" href={`cv/${cv.id}`}>
                  <Button compact>
                    <Eye></Eye>
                  </Button>
                </Link>

                <Button compact variant="outline">
                  <Edit
                    onClick={() => {
                      setEditCVModalProps({
                        id: cv.id,
                        name: cv.name,
                      });
                    }}
                  />
                </Button>
              </div>

              <PDFViewer
                className="w-full h-[200px] md:h-[450px] md:w-[300px]"
                showToolbar={false}
              >
                <Template
                  styles={
                    TEMPLATE_MAP[info.template]
                      ? TEMPLATE_MAP[info.template]
                      : TEMPLATE_MAP[0]
                  }
                  cvInfo={info}
                />
              </PDFViewer>

              <Text className="text-center p-2 font-bold">{cv.name}</Text>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UserPage;
