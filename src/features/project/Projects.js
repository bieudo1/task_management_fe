import React, { useEffect,useState } from "react";
import {
  Box,
  Link,
  Card,Modal,
  Container,
  Stack,
  Typography,
  CardHeader,
  Button,
  Grid
} from "@mui/material";
import {  useSelector,useDispatch } from "react-redux";
import LoadingScreen from "../../components/LoadingScreen";
import { getProjects,getSingleTeam, removeProject } from "./ProjectSlice";
import ProjectCard from "./ProjectCard";
import useAuth from "../../hooks/useAuth";
import NewProject from "./NewProject";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
        <Button onClick={() =>handleOpenNewProject()}>New Project</Button>
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
        <Container  x={{
          position: "relative",
          top:"64px",
          left:"19%",
          paddingTop: "64px",
          backgroundColor: "#f7f7f7",
          height:"auto",
        }}>
          
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
            <Box sx={style}>
              <Button onClick={() =>handleRemoveProject(projectId)}>Yes</Button>

              <Button onClick={() =>handleCloseRemoveProjects()}>No</Button>
            </Box>
          </Modal>

          {/* <Modal
            open={openEditProject}
            onClose={handleCloseEditProject}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            {/* <EditProject 
              handleCloseEditProject={handleCloseEditProject} 
              assignee={assignee}
              ProjectId={ProjectId}/> */}
          {/* </Modal> */} 
    </Container>
  );
};


export default Projects;