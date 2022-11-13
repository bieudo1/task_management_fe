import React,{useState} from "react";
import { Typography,Modal,Button ,Box} from "@mui/material";
import { fDate } from "../../utils/formatTime";
import ScrollBar from "../../components/ScrollBar";
import { Droppable } from "react-beautiful-dnd";
import {style} from "../../app/config"
import TaskCard from "./TaskCard";
import ReviewTask from "./ReviewTask";



function TaskList({tasks,status }) {
  const [openReviewTask, setOpenReviewTask] = useState(false);
  const [openFileTask, setOpenFileTask] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [review, setReview] = useState([])
  const [reviewAt, setReviewAt] = useState([])
  const handleBlur = (e,value) => {
    console.log(value)
  };

  const handleOpenReviewTask = (id,review,reviewAt) =>{
    setOpenReviewTask(true)
    setReviewAt(reviewAt)
    setReview(review)
    setTaskId(id)
  }

  const handleCloseReviewTask = () =>{
    setOpenReviewTask(false)
  }

  const handleOpenFileTask = (id) =>{
    setOpenFileTask(true)
  }

  const handleCloseFileTask = () =>{
    setOpenFileTask(false)
  }

  return (
    <>
        <Droppable key={status} droppableId={status} >
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((task,index) =>(
               <TaskCard 
               key={task.id} 
               status={status}
               task={task} index={index} 
               handleOpenFileTask={handleOpenFileTask} 
               handleOpenReviewTask={handleOpenReviewTask} 
               />
              ))}
              <Typography sx ={{height:50}}>new</Typography>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Box>
          <Modal
            open={openReviewTask}
            onClose={handleCloseReviewTask}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
              <ReviewTask 
              taskId={taskId}
              reviewList={review}
              reviewAt={reviewAt}
              handleCloseReviewTask={handleCloseReviewTask}/>
          </Modal>
        </Box>
  </>
);
}

export default TaskList;
