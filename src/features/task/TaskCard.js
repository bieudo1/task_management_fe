import React from "react";
import { Container, Card, Typography, Button } from "@mui/material";
import { fDate } from "../../utils/formatTime";
import ScrollBar from "../../components/ScrollBar";
import RateReviewIcon from '@mui/icons-material/RateReview';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Draggable } from "react-beautiful-dnd";



function TaskCard({task,index,handleOpenReviewTask,status}) {
    return (
    <Draggable key={task._id} draggableId={task._id} index={index}>
      {(provided, snapshot) => {
        return (
            <>
            { (!task) ? (
                <Typography></Typography>
            ):(
            <Card ref={provided.innerRef}
                snapshot={snapshot}
                {...provided.draggableProps}
                {...provided.dragHandleProps} key={task._id} 
                sx={{widht:"210px",margin:"12px"}}>
                <Typography sx={{padding:"10px"}}>
                  {task.name}

                 {status === "review" &&
                 <Button onClick={() => handleOpenReviewTask(task._id, task.review, task.reviewAt)}>
                    <RateReviewIcon/>
                  </Button>
                  }
                  <Button>
                    <FileUploadIcon/>
                  </Button>
                </Typography>
                {/* <ScrollBar handleBlur= {handleBlur}/> */}
                <Typography variant="caption" sx= {{fontSize: "0.8rem",padding:"10px"}}>
                  {fDate(task.updatedAt)}
                </Typography>
        </Card>)}
        </>
        )
      }}
    </Draggable>
    )
}
export default TaskCard;