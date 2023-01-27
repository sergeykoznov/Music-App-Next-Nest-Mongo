import React from "react";
import { Card, Grid, IconButton } from "@mui/material";
import { ITrack } from "types/track";
import styles from "styles/TrackItem.module.scss";
import { Delete, Pause, PlayArrow } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/router";

interface TrackItemProps {
  track: ITrack;
  active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
  const router = useRouter();

  return (
    <Card
      className={styles.track}
      onClick={() => router.push("/tracks/" + track.id)}
    >
      <IconButton onClick={(e) => e.stopPropagation()}>{active ? <Pause /> : <PlayArrow />}</IconButton>
      <Image src={track.picture} alt={track.name} width={70} height={70} />
      <Grid
        container
        direction="column"
        style={{ width: 200, margin: "0 20px" }}
      >
        <div>{track.name}</div>
        <div style={{ fontSize: 12, color: "gray" }}>{track.artist}</div>
      </Grid>
      {active && <div>02:42 / 03:42</div>}
      <IconButton onClick={(e) => e.stopPropagation()}style={{ marginLeft: "auto" }}>
        <Delete />
      </IconButton>
    </Card>
  );
};

export default TrackItem;
