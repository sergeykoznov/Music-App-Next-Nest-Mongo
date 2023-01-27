import { Grid, Button, Card, Box, TextField } from "@mui/material";
import { useRouter } from "next/router";
import MainLayout from "@/layouts/MainLayout";
import React, { useState } from "react";
import TrackList from "@/components/TrackList";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { GetServerSideProps } from "next";
import { fetchTracks, searchTracks } from "@/store/actions-creators/tracks";
import { NextThunkDispatch, useAppDispatch, wrapper } from "@/store";

const Index = () => {
  const router = useRouter();
  const dispatch = useAppDispatch() as NextThunkDispatch;
  const { tracks, error } = useTypedSelector((state) => state.tracks);
  const [query, setQuery] = useState<string>("");
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(
    null
  );

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(async () => {
        await dispatch(await searchTracks(e.target.value));
      }, 500)
    );
  };

  if (error) {
    return (
      <MainLayout>
        <h1>{error}</h1>
      </MainLayout>
    );
  }


  return (
    <MainLayout title={"Track list - music platform"}>
      <Grid container justifyContent={"center"}>
        <Card style={{ width: 900 }}>
          <Box p={3}>
            <Grid container justifyContent={"space-between"}>
              <h1>Track list</h1>
              <Button onClick={() => router.push("/tracks/create")}>
                Upload
              </Button>
            </Grid>
          </Box>
          <TextField fullWidth value={query} onChange={search} />
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </MainLayout>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async () => {
    // store.dispatch(fetchTracks());
    const dispatch = store.dispatch as NextThunkDispatch;
    dispatch(fetchTracks());

    return {
      props: {},
    };
  });
