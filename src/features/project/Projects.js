import React, { useEffect,useState } from "react";
import {
  Box,
  Modal,
  Container,
  Stack,
  Typography,
  Button,
  Grid,TablePagination
} from "@mui/material";
import {  useSelector,useDispatch } from "react-redux";
import LoadingScreen from "../../components/LoadingScreen";
import { getProjects,getSingleTeam, removeProject } from "./ProjectSlice";
import ProjectCard from "./ProjectCard";
import useAuth from "../../hooks/useAuth";
import NewProject from "./NewProject";
import EditProject from "./EditProject";
import SearchInput from "../../components/SearchInput";
import { style } from "../../app/config";
import { useLocation, useNavigate } from "react-router-dom";



function Projects () {
  const { user } = useAuth();
  const location= useLocation()
  
  let params = new URLSearchParams(location.search);
  const navigate = useNavigate()

  let filterName = params.get("project");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const [projectId, setProjectId] = useState("");
  const [openNewProject, setOpenNewProject] = useState(false);
  const [openEditProject, setOpenEditProject] = useState(false);
  const [openRemoveProjects, setOpenRemoveProjects] = useState(false);

  const { currentPageProjects,projectsById, isLoading,count } = useSelector(
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
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  navigate(`?page=${newPage}`)
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 12));
    setPage(0);
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
    dispatch(getProjects({ filterName, page: page + 1, limit: rowsPerPage }));
    if(user.position !== "Ceo"){
      dispatch(getSingleTeam({id:user.team._id}))
    }
  }, [dispatch,filterName, page, rowsPerPage]);

  return (
    <Container sx = {{margin:"64px"}}>
      <>
      {user.position ==="Manager"  && 
        <Button onClick={() =>handleOpenNewProject()}>New Project</Button>
      }
        <Modal
          open={openNewProject}
          onClose={handleCloseNewProject}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >  
          <Box sx={style}>
        <Stack spacing={3}>
          <NewProject handleCloseNewProject={handleCloseNewProject}/>
        </Stack>
        </Box>
        </Modal>
      </>
      {isLoading || !listProjects ? (
        <LoadingScreen />
      ) : (
        <Container >
          <SearchInput type={"project"}/>
      <Typography
        variant="subtitle"
        sx={{ color: "text.secondary", ml: 1 }}
      >
        {count > 1
        ? `${count} users found`
        : count === 1
        ? `${count} user found`
        : "No user found"}
      </Typography>

        <Box sx={{ flexGrow: 1 }} />
     <TablePagination
         sx={{
          "& .MuiablePagination-selectLabel, .MuiTablePagination-select, .MuiTablePagination-selectIcon":
          {display: { xs: "none", md: "block" }},
        }}
        component="div"
        count={count ? count : 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        />
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
          <Box sx={style}>
         <EditProject
            handleCloseEditProject={handleCloseEditProject} 
            projectId={projectId}/> 
        </Box>
        </Modal> 
    </Container>
  );
};


export default Projects;