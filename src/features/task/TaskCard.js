import React, { useState, useEffect } from "react";
import { Grid, Card, Typography, Button, Box, Slider } from "@mui/material";
import { fDate } from "../../utils/formatTime";
import MuiInput from "@mui/material/Input";
import RateReviewIcon from "@mui/icons-material/RateReview";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Draggable } from "react-beautiful-dnd";
import { styled } from "@mui/material/styles";
import { progressTask } from "./TaskSlice";
import { useDispatch } from "react-redux";

const style = { width: "22%", margin: "4px", display: "flex", justifyContent: "center" };
/*
display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    position: "absolute",
    top: 0,
    right: 0
*/
const Input = styled(MuiInput)`
  width: 42px;
`;
function TaskCard({ task, index, handleOpenReviewTask, handleOpenFileTask, status, handleOpenProgress }) {
  const dispatch = useDispatch();

  const [value, setValue] = useState(task?.progress);
  useEffect(() => {
    setValue(task?.progress);
  }, [task?.progress]);

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleSliderChange = (e, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  const handleBlur = () => {
    console.log("1", value);
    setValue(value);
    dispatch(progressTask({ progress: value, taskId: task._id }));
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  const prioritized = () => {
    const urgent = task.urgent;
    const important = task.important;
    if (important && urgent) {
      return <Typography sx={{ background: "red" }}>short</Typography>;
    } else if (!important && !urgent) {
      return <Typography sx={{ background: "green" }}>high</Typography>;
    } else {
      return <Typography sx={{ background: "yellow" }}>fit</Typography>;
    }
  };

  return (
    <Draggable key={task._id} draggableId={task._id} index={index}>
      {(provided, snapshot) => {
        return (
          <>
            {!task ? (
              <Typography></Typography>
            ) : (
              <Card
                ref={provided.innerRef}
                snapshot={snapshot}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                sx={{ widht: "210px", margin: "12px" }}
              >
                <Typography sx={{ padding: "10px" }}>{task.name}</Typography>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", position: "absolute", top: 0, right: 0 }}>
                  {(status === "review" || status === "rework") && (
                    <Button onClick={() => handleOpenReviewTask(task._id, task?.review)}>
                      <RateReviewIcon />
                    </Button>
                  )}
                  <Button>
                    <FileUploadIcon onClick={() => handleOpenFileTask(task._id, task?.file, task?.project._id)} />
                  </Button>
                </Box>
                <Box sx={style}>{prioritized()}</Box>
                <Box sx={{ padding: "10px" }}>
                  <Grid container spacing={1} alignItems="center" sx={{ width: 200 }}>
                    <Grid item xs>
                      <Slider
                        size="small"
                        value={typeof value === "number" ? value : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                      />
                    </Grid>
                    <Grid item>
                      <Input
                        value={value}
                        size="small"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                          step: 10,
                          min: 0,
                          max: 100,
                          type: "number",
                          "aria-labelledby": "input-slider",
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Typography variant="caption" sx={{ fontSize: "0.8rem", padding: "10px" }}>
                  {fDate(task?.dueAt)}
                </Typography>
              </Card>
            )}
          </>
        );
      }}
    </Draggable>
  );
}
export default TaskCard;
