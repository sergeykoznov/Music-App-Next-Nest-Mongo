import React, { useEffect } from "react";
import { Pause, PlayArrow, VolumeUp } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import styles from "styles/Player.module.scss";
import { ITrack } from "types/track";
import TrackProgress from "./TrackProgress";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useAction";
import { constData } from "@/constData";
import { fetchTracks } from "@/store/actions-creators/tracks";
import { NextThunkDispatch, useAppDispatch } from "@/store";

let audio: HTMLAudioElement;

const Player = () => {
  const { pause, volume, duration, currentTime, active } = useTypedSelector(
    (state) => state.player
  );

  const {
    playerPlay,
    playerPause,
    playerSetVolume,
    playerSetCurrentTime,
    playerSetDuration,
  } = useActions();

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else {
      setAudio();
      play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const setAudio = () => {
    if (active) {
      audio.src = `${constData.BASE_URL}/${active.audio}`;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        playerSetDuration({ duration: Math.ceil(audio.duration) });
      };
      audio.ontimeupdate = () => {
        playerSetCurrentTime({
          currentTime: Math.ceil(audio.currentTime),
        });
      };
    }
  };
  const dispatch  = useAppDispatch() as NextThunkDispatch;

  useEffect(() => {
    setTimeout(() =>  dispatch(fetchTracks()), 2000)

  }, [])
  
  const play = () => {
    if (pause) {
      playerPlay();
      audio.play();
     
    } else {
      playerPause();
      audio.pause();
    }
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100;
    playerSetVolume({
      volume: Number(e.target.value),
    });
  };

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value);
    playerSetCurrentTime({
      currentTime: Number(e.target.value),
    });
  };

  if (!active) {
    //return null;
  }

  return (
    <div className={styles.player}>
      <IconButton onClick={play}>
        {pause ? <PlayArrow /> : <Pause />}
      </IconButton>
      <Grid
        container
        direction="column"
        style={{ width: 200, margin: "0 20px" }}
      >
        <div>{active?.name}</div>
        <div style={{ fontSize: 12, color: "gray" }}>{active?.artist}</div>
      </Grid>
      <TrackProgress
        left={currentTime}
        right={duration}
        minutes={true}
        onChange={changeCurrentTime}
      />
      <VolumeUp style={{ marginLeft: "auto" }} />
      <TrackProgress left={volume} right={100} onChange={changeVolume} />
    </div>
  );
};

export default Player;
