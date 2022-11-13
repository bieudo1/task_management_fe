import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  Box,
  List,
  Container,
} from "@mui/material";
import ListItem from '@mui/material/ListItem';
import { useDispatch, useSelector } from "react-redux";
import { getTasksMine ,getUpDateTaskStatus } from "./TaskSlice";

import TaskList from "./TaskList";
import LoadingScreen from "../../components/LoadingScreen";
import useAuth from "../../hooks/useAuth";
import { DragDropContext } from "react-beautiful-dnd";

const status = [
  {text:"working",
    background1: "#42a5f5",
    background2:"#e7f3fe",
  },
  {text:"review",
    background1: "#ffb300",
    background2:"#fdfcf3",
  },
  {text:"rework",
    background1: "#ef5350",
    background2:"#fef7f6",
  },
  {text:"done",
    background1: "#4caf50",
    background2:"#edf7ee",
  },
]

function Task() {
  const dispatch = useDispatch(); 

  useEffect(() => {
    dispatch(getTasksMine());
  }, [dispatch]);

  const { user } = useAuth();
  const { tasksMineList,tasksMineById,currentTasksMine,isLoading } = useSelector(
    (state) => state.task
  );

const listStatus = ["working","review","rework","done"]

const processingListTask =  () => {

  const tasks = currentTasksMine.map((taskId) => tasksMineById[taskId]);
  
  const newTask =  status.map((s) => (
    tasks.filter((task) => task.status === s.text)
    ))
  const listTasksStatus = {}
  listStatus.forEach((key,index)=> listTasksStatus[key] = newTask[index])
  return  listTasksStatus
}

const [task,setTask] = useState(processingListTask())

useEffect(() =>{
 let x = processingListTask()
 setTask(x)
},[tasksMineList.length])


const removeFromList = (list, index) => {
  const result = Array.from(list);
  const [removed] = result.splice(index, 1);
  return [removed, result];
};
  
  const addToList = (list, index, element) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
  };
  
  const onDragEnd = (result) => {
    console.log(result)
    const {destination,draggableId} = result;
    const status = destination.droppableId;
    const taskId = draggableId;
    if (!result.destination) {
      return;
    }

    dispatch(getUpDateTaskStatus({taskId,status}))

    const listCopy = { ...task };

    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );
    setTask(listCopy)
  };

  return (
    <Container sx = {{position: "relative", right: "3%"}}>
      {isLoading || !tasksMineList ? (
        <LoadingScreen />
      ) : (
        <>
      <DragDropContext onDragEnd={onDragEnd}>
      <Card sx={{ p: 3}}>
        <List sx ={{display: "flex",
        justifyContent: "flex-start",
        overflowX:"auto",overflowY:"hidden",
        alignItems: "flex-start",height:500 }}>
          {status.map((status,index) =>(
            <ListItem key={index}>
              <Box sx = {{pd: 3}}>
                <Box sx = {{padiing:"8px"}}>
                  <Typography sx={{color:"#ffff",backgroundColor:`${status.background1}`,
                  display: "flex",justifyContent: "space-between"
                  ,padding:"0 10px"}}>{status.text}</Typography>
                  </Box>
                  <Box id={status.text} sx={{backgroundColor:`${status.background2}`,
                  width:"270px",height:"auto"
                  ,padding: "10px 20px"}}
                  >
                 <TaskList 
                  tasks = {task[status.text]}
                  status = {status.text}
                  />
                </Box>
              </Box>
            </ListItem>
          ))};
        </List>
      </Card>
      </DragDropContext>
      </>
      )}
    </Container>
  );
}

export default Task;
