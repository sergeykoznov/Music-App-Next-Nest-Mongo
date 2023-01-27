import NavBar from "@/components/NavBar/NavBar";
import React from "react";
import Container from "@mui/material/Container";
import Player from "@/components/Player";
import Head from "next/head";

interface MainLayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  title,
  description,
  keywords,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title || "Music platform"}</title>
        <meta
          name="description"
          content={`Music platform - with player ${description || ""}`}
        />
        <meta name="robots" content="index follow" />
        <meta name="keywords" content={keywords || "music, artist, songs"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NavBar />
      <Container style={{ margin: "90px 0" }}>{children}</Container>
      <Player />
    </>
  );
};

export default MainLayout;
