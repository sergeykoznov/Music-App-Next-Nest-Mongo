import React, { useEffect } from "react";
import { Card, Grid, IconButton } from "@mui/material";
import { ITrack } from "types/track";
import styles from "styles/TrackItem.module.scss";
import { Delete, Pause, PlayArrow } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useActions } from "@/hooks/useAction";
import { constData } from "@/constData";
import { useTypedSelector } from "@/hooks/useTypedSelector";

interface TrackItemProps {
  track: ITrack;
}

const TrackItem: React.FC<TrackItemProps> = ({ track }) => {
  const router = useRouter();
  const { pause, volume, duration, currentTime, active } = useTypedSelector(
    (state) => state.player
  );
  const { playerPlay, playerPause, playerSetActive } = useActions();

  const play = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    playerSetActive({ active: track });
    playerPlay();
  };

  useEffect(() => {
    console.log(active);
  }, [active])
  

  return (
    <Card
      className={styles.track}
      onClick={() => router.push("/tracks/" + track._id)}
    >
      <IconButton onClick={play}>
        {active ? <Pause /> : <PlayArrow />}
      </IconButton>
      {/* <Image src={`${constData.BASE_URL}/${track.picture}`} alt={track.name} width={70} height={70} /> */}
      <Grid
        container
        direction="column"
        style={{ width: 200, margin: "0 20px" }}
      >
        <div>{track.name}</div>
        <div style={{ fontSize: 12, color: "gray" }}>{track.artist}</div>
      </Grid>
      {active && <div>02:42 / 03:42</div>}
      <IconButton
        onClick={(e) => e.stopPropagation()}
        style={{ marginLeft: "auto" }}
      >
        <Delete />
      </IconButton>
    </Card>
  );
};

export default TrackItem;
