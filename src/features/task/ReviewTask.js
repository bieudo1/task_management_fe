import React, { useState } from "react";

import { Stack, TextField,Card, IconButton,List,Typography,Box} from "@mui/material";
import ListItem from '@mui/material/ListItem';
import SendIcon from "@mui/icons-material/Send";


import { useDispatch } from "react-redux";
import { reviewTask } from "./TaskSlice";

function ReviewTask({ taskId ,reviewList,reviewAt,handleCloseReviewTask }) {

  const [review, setReview] = useState("");
  const dispatch = useDispatch();

  console.log(reviewList)
  console.log(taskId)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(reviewTask({ taskId, review }));
    setReview("");
  };

  return (
    <Card sx={{ p: 3 ,m:3}}>
      <List sx = {{overflowX:"hidden",overflowY:"auto",height:250}}>
        {reviewList.map((review,index) => (
          <ListItem key={index} sx={{flexDirection: "column",alignItems: "flex-start"}}>
              <Typography>{review}</Typography>
              <Typography>{reviewAt[index]}</Typography>
          </ListItem>
        ))}
      </List>
    <form onSubmit={handleSubmit}>
      <Stack direction="row" alignItems="center" >
        <TextField
          fullWidth
          size="small"
          value={review}
          placeholder="Write a comment…"
          onChange={(event) => setReview(event.target.value)}
          sx={{
            ml: 2,
            mr: 1,
            "& fieldset": {
              borderWidth: `1px !important`,
              borderColor: (theme) =>
                `${theme.palette.grey[500_32]} !important`,
            },
          }}
        />
        <IconButton type="submit">
          <SendIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </Stack>
    </form>
    </Card>

  );
}

export default ReviewTask;
