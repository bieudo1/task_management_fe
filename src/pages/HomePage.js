import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";

import { Box, Card, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import TaskIcon from '@mui/icons-material/Task';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { capitalCase } from "change-case";
import Task from "../features/task/Task";
import Projects from "../features/project/Projects";
import TaskTeam from "../features/task/TaskTeam";
import Admin from "../features/admin/Admin";
import { useSelector } from 'react-redux';
import ProjectProfilePage from "../features/project/ProjectProfilePage";
import Personnel from "../features/personnel/Personnel";
import { drawerWidth} from "../app/config";


function HomePage() {
  const {openItem,drawerOpen,targetProjectId} = useSelector((state) => state.menu);
  
  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
  );

  const PROFILE_TABS = [
    {
      value: "Task",
      icon: <TaskIcon sx={{ fontSize: 24 }} />,
      component: <Task/>,
    },
    {
      value: "Project",
      icon: <AccountTreeIcon sx={{ fontSize: 24 }} />,
      component: <Projects/>,
    },
    {
      value: "TaskTeam",
      icon: <AccountTreeIcon sx={{ fontSize: 24 }} />,
      component: <TaskTeam/>,
    },
    {
      value: "SingleProject",
      component: <ProjectProfilePage projectId={targetProjectId}/>,
    },
    {
      value: "Admin",
      component: <Admin/>,
    },
    {
      value: "Personnel",
      component: <Personnel/>,
    },
  ];

  return (
    <Main open={drawerOpen}>
      <Container sx={{
        position: "relative",
        // top:"32px",
        left:"19%",
        margin:0,
        paddingTop: "64px",
        backgroundColor: "#f7f7f7",
        height:"auto",
        width:"100vW",
        maxWidth: "100%"
      }} >
        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === openItem.toString();
          return isMatched && <Box sx = {{heght:"50%"}} key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Main>
  );
}

export default HomePage;
