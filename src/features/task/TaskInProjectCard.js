import React from "react";
import {
  Typography,
  Button,Box
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';


function TaskInProjectCard ({task, handleOpenEditTask, handleOpenRemoveTask,handleStatusArchive}){

    return(
        <>  
            {(task.status === "done" )
                && 
            <Button onClick={() => handleStatusArchive(task._id)}>
                <CheckIcon/>
            </Button>
            } 
            <Typography>{task.name}</Typography>
            <Button onClick={() => handleOpenRemoveTask(task._id)}>
                <DeleteIcon/>
            </Button>
            <Button onClick={() => handleOpenEditTask(task._id)}>
                <EditIcon/>
            </Button>
        </>
    )
}

export default TaskInProjectCard