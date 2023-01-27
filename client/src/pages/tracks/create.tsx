import FileUpload from "@/components/FileUpload";
import StepWraper from "@/components/StepWraper";
import { constData } from "@/constData";
import { UseInput } from "@/hooks/useInput";
import MainLayout from "@/layouts/MainLayout";
import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { Router, useRouter } from "next/router";
import React, { useState } from "react";

const Create = () => {
  const router = useRouter();

  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState(null);
  const [audio, setAudio] = useState(null);
  const name = UseInput("");
  const artist = UseInput("");
  const text = UseInput("");

  const back = () => {
    setActiveStep((prev) => prev - 1);
  };

  const next = () => {
    if (activeStep !== 2) {
      setActiveStep(prev => prev + 1)
  } else {
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("artist", artist.value);
      formData.append("text", text.value);
      formData.append("picture", picture || "");
      formData.append("audio", audio || "");
      axios
        .post(`${constData.BASE_URL}/tracks`, formData)
        .then((resp) => router.push(`/tracks`))
        .catch((e) => console.log(e));
    }
  };

  return (
    <MainLayout>
      <StepWraper activeStep={activeStep}>
        {activeStep === 0 && (
          <Grid container direction={"column"} style={{ padding: 20 }}>
            <TextField
              {...name}
              style={{ marginTop: 10 }}
              label={"Track name"}
            />
            <TextField
              {...artist}
              style={{ marginTop: 10 }}
              label={"Sing by"}
            />
            <TextField
              {...text}
              style={{ marginTop: 10 }}
              label={"Track text"}
              multiline
              rows={3}
            />
          </Grid>
        )}
        {activeStep === 1 && (
          <FileUpload setFile={setPicture} accept="image/*">
            <Button>Upload image</Button>
          </FileUpload>
        )}
        {activeStep === 2 && (
          <FileUpload setFile={setAudio} accept="audio/*">
            <Button>Upload Audio</Button>
          </FileUpload>
        )}
      </StepWraper>
      <Grid container justifyContent="space-between">
        <Button disabled={activeStep === 0} onClick={back}>
          Prev Step
        </Button>
        <Button disabled={activeStep > 2} onClick={next}>
          Next Step
        </Button>
      </Grid>
    </MainLayout>
  );
};

export default Create;
