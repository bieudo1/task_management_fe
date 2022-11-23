import React, { useEffect,useState } from "react";
import {
  Box,
  Card,
  Container,
  Grid,
  Modal,
  List,
  Avatar,
  Button,
  Typography,
} from "@mui/material";
import ListItem from '@mui/material/ListItem';
import { fDate } from "../../utils/formatTime";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleProject, projectFinished } from "./ProjectSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../components/LoadingScreen";
import LinearProgressWithLabel from"../../components/LinearProgressWithLabel";
import PropTypes from 'prop-types';
import useAuth from "../../hooks/useAuth";
import File from "../file/File";
import TaskInProject from "../task/TaskInProject";
import { style } from "../../app/config";


LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};
//user.position ==="Manager"
function ProjectProfilePage() {
  const { user } = useAuth();
    const navigate = useNavigate();
  const [openFinished, setOpenFinished] = useState(false);
  const params = useParams();
    const [finished ,setFinished] = useState(false)
    const projectId = params.projectId;
    const { singleProject,progress, isLoading } = useSelector(
      (state) => state.project,
      shallowEqual
    );
  const {totalTasks,statusArchive } = useSelector((state) => state.task);
    const dispatch = useDispatch();
    const handleProjectFinished = (id) =>{
      dispatch(projectFinished({projectId:id,status:"archive"}))
      navigate(`/Projects`)

    }
    useEffect(() => {
      if (statusArchive && totalTasks !== 0 ) {
        console.log(totalTasks)
        if (statusArchive.length === totalTasks ){setFinished(true)}
      }
  },[statusArchive.length]);

    useEffect(() => {
        if (projectId) {
          dispatch(getSingleProject(projectId));
        }
    },[dispatch, projectId]);
    const handleOpenFinished = (id) => {
      setOpenFinished(true)
    };
    const handleCloseFinished = () =>{
      setOpenFinished(false)
    };
    
  return (
    <Container sx = {{margin:"64px"}}>
    {isLoading  || singleProject === null ? (
      <LoadingScreen />
    ) : (
      <Container x={{
        position: "relative",
        top:"64px",
        left:"19%",
        paddingTop: "64px",
      }}>
        <Box sx={{width: "90%", position: "relative", bottom: "12%"}}>
            <Typography variant="h4">{singleProject.name}</Typography>
        <Grid container spacing={2} my={1}>
          <Grid item xs={12} md={9}>
            <Card >
            <Box sx={{padding:"2%"}}>
              <Typography
                  variant="caption"
                  sx={{ display: "block", color: "text.secondary",fontSize: "0.8rem" }}
              >
                  {fDate(singleProject.updatedAt)}
              </Typography>
              <Typography paragraph sx={{fontSize: "0.8rem"}}>{singleProject.description}</Typography>
              </Box>
            </Card>

            <Card sx = {{marginTop: "16px"}}>
              <Box sx ={{margin: "10px"}}>
                <Typography>files</Typography>
                <File projectId={singleProject._id}/>
              </Box>
            </Card>
      
            <Card sx = {{marginTop: "16px"}}>
              <Box sx ={{margin: "10px"}}>
                <Typography> all task</Typography>
                <TaskInProject   projectId={singleProject._id}/>
              </Box>
            </Card>

          </Grid>
          <Grid item xs={12} md={3}>
            <Card >
              <Box sx = {{margin: "10px",display: "grid"}}>
                <Typography variant="h6"> Project details </Typography>
                <Typography  
                  variant="h7"
                  sx={{ color: "text.secondary"}}>
                  Created: {fDate(singleProject.createdAt)}
                </Typography>
                <Typography variant="h7" sx = {{color: "text.secondary"}}>Created by:
                <Avatar
                      alt={singleProject.assigner.name}
                      src={singleProject.assigner.imageUrl}
                      sx = {{width:40,height:40}}
                    />{singleProject.assigner.name}</Typography>
                <Box >
                  <LinearProgressWithLabel value={progress}/>
                </Box>
              </Box>
            </Card>
            <Card sx = {{marginTop: "16px"}}>
              <Box sx = {{margin: "10px",display: "grid"}}>
                <Typography variant="h6"> Assigned users </Typography>
                <List sx={{overflowX:"hidden",overflowY:"auto"}}>
                  {singleProject.assignee.map((user) =>(
                    <ListItem key={user._id}>
                      <Avatar
                      alt={user.name}
                      src={user.imageUrl}
                      sx = {{width:40,height:40}}
                    />
                    <Box sx = {{p:1}}>
                    <Typography>name: {user.name}</Typography>
                    </Box>
                    </ListItem>
                  ))}
                  </List>
              </Box>
            </Card>
              {(finished && user.position ==="Manager" ) && 
                <Button 
                  variant="contained"
                  size="small"
                  sx = {{margin: "10px"}}
                  onClick = {() => handleOpenFinished()}
                > 
                    Project Finished
                </Button>}
          </Grid>
        </Grid>
        </Box>
    </Container>
    )}
     <Modal
      open={openFinished}
      onClose={handleCloseFinished}
      aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
     >
      <Box sx={style}>
        <Typography>bạn có muốn kết thúc không ?</Typography>
        <Box>
          <Button sx={{color:"red"}} onClick={() =>handleProjectFinished(singleProject._id)}>Yes</Button>

          <Button sx = {{color:"green"}}onClick={() =>handleCloseFinished()}>No</Button>
        </Box>
      </Box>
    </Modal>
    </Container>
  );
}

export default ProjectProfilePage;
