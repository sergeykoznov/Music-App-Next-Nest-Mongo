import FileUpload from "@/components/FileUpload";
import StepWraper from "@/components/StepWraper";
import MainLayout from "@/layouts/MainLayout";
import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";

const Create = () => {
  const [activeStep, setactiveStep] = useState(0);
  const [picture, setPicture] = useState(null);
  const [audio, setAudio] = useState(null);

  const back = () => {
    setactiveStep((prev) => prev - 1);
  };

  const next = () => {
    if (activeStep !== 2) {
      setactiveStep((prev) => prev + 1);
    }
  };

  return (
    <MainLayout>
      <StepWraper activeStep={activeStep}>
        {activeStep === 0 && (
          <Grid container direction={"column"} style={{ padding: 20 }}>
            <TextField style={{ marginTop: 10 }} label={"Track name"} />
            <TextField style={{ marginTop: 10 }} label={"Sing by"} />
            <TextField
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
        <Button disabled={activeStep === 2} onClick={next}>
          Next Step
        </Button>
      </Grid>
    </MainLayout>
  );
};

export default Create;
