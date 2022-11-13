import React, {useState, useEffect } from "react";
import {
  Box,
  Link,Modal,
  Card,
  Container,
  Stack,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import { fDate } from "../../utils/formatTime";
import { useParams } from "react-router-dom";
import { getSingleProject } from "./ProjectSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../components/LoadingScreen";
import LinearProgressWithLabel from"../../components/LinearProgressWithLabel";
import PropTypes from 'prop-types';
import File from "../file/File";
import TaskInProject from "../task/TaskInProject";
import AllTask from "../task/AllTask";


LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

function ProjectProfilePage() {
    const params = useParams();
    const projectId = params.projectId;
    const { singleProject, isLoading } = useSelector(
      (state) => state.project,
      shallowEqual
    );
    
    const dispatch = useDispatch();

    useEffect(() => {
        if (projectId) {
          dispatch(getSingleProject(projectId));
        }
    },[dispatch, projectId]);

    
  return (
    <Container sx = {{margin:"64px",}}>
    {isLoading  || singleProject === null ? (
      <LoadingScreen />
    ) : (
      <Container x={{
        position: "relative",
        top:"64px",
        left:"19%",
        paddingTop: "64px",
        backgroundColor: "#f7f7f7",
        height:"auto",
      }}>
        <Box sx={{width: "90%", position: "relative", bottom: "12%"}}>
            <Typography variant="h4">{singleProject.name}</Typography>
        <Grid container spacing={2} my={1}>
          <Grid item xs={12} md={9}>
            <Card sx={{height:"100%"}}>
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
                <TaskInProject  projectId={singleProject._id}/>
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
                  Created: {fDate(singleProject.updatedAt)}
                </Typography>
                <Typography variant="h7">Project details</Typography>
                <Typography variant="h7">Project details</Typography>
                <Typography variant="h7" sx = {{color: "text.secondary"}}>Created by: {singleProject.assigner.name}</Typography>
                <Typography variant="h7">Progress</Typography>
                <Box >
                  <LinearProgressWithLabel value={10}/>
                </Box>
              </Box>
            </Card>
            <Card sx = {{marginTop: "16px"}}>
              <Box sx = {{margin: "10px",display: "grid"}}>
                <Typography variant="h6"> Assigned users </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
        </Box>
    </Container>
    )}
    </Container>
  );
}

export default ProjectProfilePage;
