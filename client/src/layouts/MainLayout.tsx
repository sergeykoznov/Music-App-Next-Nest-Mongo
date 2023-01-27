import NavBar from "@/components/NavBar/NavBar";
import React from "react";
import Container from "@mui/material/Container";
import Player from "@/components/Player";

interface MainLayoutProps {
  children: React.ReactNode;
}


const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <Container style={{ margin: "90px 0" }}>{children}</Container>
      <Player/>
    </>
  );
};

export default MainLayout;
