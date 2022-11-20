import React, { useEffect,useState } from "react";
import {
  Box,
  Modal,
  Container,
  Stack,
  Typography,
  Button,
  Grid
} from "@mui/material";
import {  useSelector,useDispatch } from "react-redux";
import LoadingScreen from "../../components/LoadingScreen";
import { getProjects,getSingleTeam, removeProject } from "./ProjectSlice";
import ProjectCard from "./ProjectCard";
import useAuth from "../../hooks/useAuth";
import NewProject from "./NewProject";
import EditProject from "./EditProject";
import { style } from "../../app/config";



function Projects () {
  const { user } = useAuth();

  const dispatch = useDispatch();
  const [projectId, setProjectId] = useState("");
  const [openNewProject, setOpenNewProject] = useState(false);
  const [openEditProject, setOpenEditProject] = useState(false);
  const [openRemoveProjects, setOpenRemoveProjects] = useState(false);

  const { currentPageProjects,projectsById, isLoading } = useSelector(
    (state) => state.project,
  );

  const listProjects = currentPageProjects.map((projectId) => projectsById[projectId]);

  const handleRemoveProject = (id) =>{
    setOpenRemoveProjects(false)
    dispatch(removeProject({id}))
    console.log(id)
    setProjectId("")
  };
  const handleOpenEditProject = (id) => {
    console.log(id)
    setOpenEditProject(true)
    setProjectId(id)
  };

  const handleCloseEditProject = () => {
    setOpenEditProject(false)
    setProjectId("")
  };
  const handleOpenRemoveProjects = (id) => {
    setOpenRemoveProjects(true)
    setProjectId(id)
  };

  const handleCloseRemoveProjects = () => {
    setOpenRemoveProjects(false)
    setProjectId("")
  };

  const handleOpenNewProject = (id) => {
    setOpenNewProject(true)
  };

  const handleCloseNewProject = () =>{
    setOpenNewProject(false)
  };

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getSingleTeam({id:user.team._id}))
  }, [dispatch]);

  return (
    <Container sx = {{margin:"64px"}}>
      <>
      {user.position !=="Worker"  && 
        <Button onClick={() =>handleOpenNewProject()}>New Project</Button>
      }
        <Modal
          open={openNewProject}
          onClose={handleCloseNewProject}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >   
        <Stack spacing={3}>
          <NewProject handleCloseNewProject={handleCloseNewProject}/>
        </Stack>
        </Modal>
      </>
      {isLoading || !listProjects ? (
        <LoadingScreen />
      ) : (
        <Container >
          
    <Grid container spacing={3} my={1}>
          {listProjects.map((project) => (
            <Grid key={project._id} item xs={12} md={4}>
              <ProjectCard 
              project={project}
              handleOpenRemoveProjects={handleOpenRemoveProjects}
              handleOpenEditProject={handleOpenEditProject}
              />
            </Grid>
          ))}
        </Grid>
        </Container>
      )}
        <Modal
          open={openRemoveProjects}
          onClose={handleCloseRemoveProjects}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
          <div>
          <Box sx={style}>
            <Typography>bạn có muốn xóa không ?</Typography>
            <Box>
              <Button sx={{color:"red"}} onClick={() =>handleRemoveProject(projectId)}>Yes</Button>

              <Button sx={{color:"green"}} onClick={() =>handleCloseRemoveProjects()}>No</Button>
            </Box>
          </Box>
              
      </div>
        </Modal>

        <Modal
          open={openEditProject}
          onClose={handleCloseEditProject}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
          <div>
         <EditProject
            handleCloseEditProject={handleCloseEditProject} 
            projectId={projectId}/> 
      </div>
        </Modal> 
    </Container>
  );
};


export default Projects;