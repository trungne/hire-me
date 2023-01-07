import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Header } from "components/Header";
import { useAtom } from "jotai";
import { cvInfoAtom } from "shared/atoms";

const PDFDocument = dynamic(() => import("components/PDF"), { ssr: false });
const Generate: NextPage = () => {
  const [info] = useAtom(cvInfoAtom);

  return (
    <>
      <Head>
        <title>Generated PDF</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      {info ? (
        <PDFDocument info={info} />
      ) : (
        <div>Not enough information to generate PDF</div>
      )}
    </>
  );
};

export default Generate;
