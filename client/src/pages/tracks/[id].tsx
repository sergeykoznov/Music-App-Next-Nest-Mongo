import { constData } from "@/constData";
import { UseInput } from "@/hooks/useInput";
import MainLayout from "@/layouts/MainLayout";
import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ITrack } from "types/track";

const TrackPage = ({ serverTrack }: any) => {
  const [track, setTrack] = useState<ITrack>(serverTrack);

  const router = useRouter();
  const username = UseInput("");
  const text = UseInput("");
  const addComment = async () => {
    try {
      const response = await axios.post(
        `${constData.BASE_URL}/tracks/comment`,
        {
          username: username.value,
          text: text.value,
          trackId: track._id,
        }
      );
      setTrack({ ...track, comments: [...track.comments, response.data] });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <MainLayout
      title={`Music platform - ${track?.name} - ${track?.artist}`}
      keywords={`music, artist, ${track?.name}, ${track?.artist}`}
    >
      <Button
        variant={"outlined"}
        style={{ fontSize: 32 }}
        onClick={() => router.push("/tracks")}
      >
        Track List
      </Button>
      <Grid container style={{ margin: "20px 0" }}>
        {/* <Image
          src={`${constData.BASE_URL}/${track.picture}`}
          alt={track.name}
          width={200}
          height={200}
        /> */}
        <div>
          <h1>Track name - {track?.name}</h1>
          <h1>Song by - {track?.artist}</h1>
          <h1>Streams - {track.listens}</h1>
        </div>
      </Grid>
      <h1>Lyrycs</h1>
      <p>{track?.text}</p>
      <h1>Comments</h1>
      <Grid container>
        <TextField {...username} label={"Your name"} fullWidth />
        <TextField
          {...text}
          label={"Your comment"}
          fullWidth
          multiline
          rows={4}
        />
        <Button onClick={addComment}>Comment</Button>
      </Grid>
      <div>
        {track?.comments.map((comment) => (
          <div key={comment._id}>
            <div>Author - {comment.username}</div>
            <div>Comment - {comment.text}</div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await axios.get(
    `${constData.BASE_URL}/tracks/${params?.id}`
  );
  return {
    props: {
      serverTrack: response.data,
    },
  };
};
