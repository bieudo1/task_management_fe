import React from "react";
import {
  Typography,
  Button
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useAuth from "../../hooks/useAuth";
import CheckIcon from '@mui/icons-material/Check';


function TaskInProjectCard ({task, handleOpenEditTask, handleOpenRemoveTask,handleStatusArchive}){
    const { user } = useAuth();

    return(
    <>  
        {(task.status === "done" )
                && 
            <Button onClick={() => handleStatusArchive(task._id)}>
                <CheckIcon/>
            </Button>
            } 
        {(task.status === "archive" || user.position === "Worker" ) ? (
            <Typography>{task.name}</Typography>

        ):(
            <>
                <Typography>{task.name}</Typography>
                <Button onClick={() => handleOpenRemoveTask(task._id)}>
                    <DeleteIcon/>
                </Button>
                <Button onClick={() => handleOpenEditTask(task._id)}>
                    <EditIcon/>
                </Button>
            </>
        )}            
    </>
    )
}

export default TaskInProjectCard