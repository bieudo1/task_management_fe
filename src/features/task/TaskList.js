import React,{useState} from "react";
import { Typography,Modal} from "@mui/material";
import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import ReviewTask from "./ReviewTask";
import FileTask from "./FileTask";



function TaskList({tasks,status }) {
  const [openReviewTask, setOpenReviewTask] = useState(false);
  const [openFileTask, setOpenFileTask] = useState(false);
  const [projectId, setProjectId] = useState("");
  const [taskId, setTaskId] = useState("");
  const [review, setReview] = useState([])
  const [files, setFiles] = useState([]);

//progress
  const handleOpenReviewTask = (id,review) =>{
    setOpenReviewTask(true)
    setReview(review)
    setTaskId(id)
  }

  const handleCloseReviewTask = () =>{
    setOpenReviewTask(false)
    setTaskId("")
  }

  const handleOpenFileTask = (id,files,projectId) =>{
    setOpenFileTask(true)
    setProjectId(projectId)
    setFiles(files)
    setTaskId(id)
  }

  const handleCloseFileTask = () =>{
    setOpenFileTask(false)
  }

  return (
    <>

        <Droppable droppableId={status} >
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((task,index) =>(
               <TaskCard 
               status={status}
               task={task} index={index} 
               handleOpenFileTask={handleOpenFileTask} 
               handleOpenReviewTask={handleOpenReviewTask} 
               />
              ))}
              <Typography sx ={{height:50}}></Typography>
              {provided.placeholder}
            </div>
          )}
        </Droppable>

          <Modal
            open={openReviewTask}
            onClose={handleCloseReviewTask}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div>
              <ReviewTask 
              taskId={taskId}
              reviewList={review}
              handleCloseReviewTask={handleCloseReviewTask}/>
            </div>
          </Modal>

          <Modal
            open={openFileTask}
            onClose={handleCloseFileTask}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div>
              <FileTask
              taskId={taskId}
              projectId={projectId}
              filesList={files}
              handleCloseFileTask={handleCloseFileTask}/>
            </div>
          </Modal>
  </>
);
}

export default TaskList;
