import React, { useCallback } from "react";
import { Box, Card, Stack,Button } from "@mui/material";

import { FormProvider, FUploadImage } from "../../components/form";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { createFile } from "./TaskSlice";
import { LoadingButton } from "@mui/lab";

const defaultValues = {
  file: null,
};

function FileTask({handleCloseFileTask,taskId,projectId}) {
  const { isLoading } = useSelector((state) => state.task);

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "file",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );
  const onSubmit = (data) => {
    console.log(data)
    dispatch(createFile({...data,taskId,projectId}));
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FUploadImage
            name="file"
            maxSize={3145728}
            onDrop={handleDrop}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              size="small"
              sx={{marginRight: "10px"}}
              loading={isSubmitting || isLoading}
            >
              to send
            </LoadingButton>
            <Button
              variant="contained"
              size="small"
              onClick = {()=>handleCloseFileTask()}
            >
              Cancel
            </Button>
          </Box>
        </Stack>
      </FormProvider>
    </Card>
  );
}

export default FileTask;
