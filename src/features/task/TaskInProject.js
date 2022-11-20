import React, { useEffect, useState } from "react";
import {
  Stack,Container,
  Typography,Modal,
  List,
  Button,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getTaskInProject, getUpDateTaskStatus, removTask } from "./TaskSlice";
import ListItem from '@mui/material/ListItem';
import AllTask from "./AllTask"
import EditTask from "./EditTask";
import TaskInProjectCard from "./TaskInProjectCard";
import useAuth from "../../hooks/useAuth";
import { style } from "../../app/config";



function TaskInProject( {projectId}) {
  const {currentPageTasks,tasksById } = useSelector((state) => state.task);
  const { user } = useAuth();
   
  const {assignee} = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const [taskId, setTaskId] = useState("");
  const [openRemoveTask, setOpenRemoveTask] = useState(false);
  const [openEditTask, setOpenEditTask] = useState(false);
  const [allTask, setAllTask] = useState(false)
    const tasks = currentPageTasks.map((taskId) => tasksById[taskId]);

    const handleOpenAllTasks = () =>{
      setAllTask(true)
    } 
    const handleCloseAllTasks = () =>{
      setAllTask(false)
    }
    const handleOpenRemoveTask = (id) => {
      setOpenRemoveTask(true)
      setTaskId(id)
    };
  
    const handleCloseRemoveTask = () => {
      setOpenRemoveTask(false)
      setTaskId("")
    };

    const handleOpenEditTask = (id) => {
      setOpenEditTask(true)
      setTaskId(id)
    };
  
    const handleCloseEditTask = () => {
      setOpenEditTask(false)
      setTaskId("")
    };
    const handleRemoveTask = (id) =>{
      setOpenRemoveTask(false)
      dispatch(removTask({id}))
      setTaskId("")
    };

    const handleStatusArchive = (id) =>{
      dispatch(getUpDateTaskStatus({taskId:id,status:"archive"}))

    }

    useEffect(() => {
      dispatch(getTaskInProject({projectId}));
  },[dispatch, projectId])

    
    return(
      <Container>
        <Box>
         {(user.position !== "Worker") && <Button onClick={() => handleOpenAllTasks()}>allTask</Button>}
          <Modal
              open={allTask}
              onClose={handleCloseAllTasks}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >   
              <Stack spacing={3}>
                <AllTask handleCloseAllTasks={handleCloseAllTasks}assignee={assignee} projectId={projectId}/>
              </Stack>
          </Modal>
          </Box>
       
        {tasks.length === 0 ? (
            <Typography>new</Typography>
        ):(
          <>
          <List>
            { tasks.map((task) =>(
              <ListItem key= {task._id}>
                <TaskInProjectCard 
                task={task}
                handleOpenEditTask={handleOpenEditTask} 
                handleStatusArchive={handleStatusArchive}
                handleOpenRemoveTask={handleOpenRemoveTask} 
                />
              </ListItem>
            ))}
          </List>
          <Modal
            open={openRemoveTask}
            onClose={handleCloseRemoveTask}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
            <Typography>bạn có muốn xóa không ?</Typography>
            <Box>
              <Button sx={{color:"red"}} onClick={() =>handleRemoveTask(taskId)}>Yes</Button>

              <Button sx = {{color:"green"}} onClick={() =>handleCloseRemoveTask()}>No</Button>
              </Box>
            </Box>
          </Modal>

          <Modal
            open={openEditTask}
            onClose={handleCloseEditTask}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <EditTask 
              handleCloseEditTask={handleCloseEditTask} 
              projectId={projectId}
              assignee={assignee}
              taskId={taskId}/>
          </Modal>
          </>
        )}
      </Container>
    )
}

export default TaskInProject;