import React, { useEffect ,useState} from "react";
import { Box, Container,Paper,Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { experimentalStyled as styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import TaskIcon from '@mui/icons-material/Task';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { getCount } from "./adminSlice";
import LoadingScreen from "../../components/LoadingScreen";
import PieChart from "./PieChart";
import BarChartCount from "./BarChartCount";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



function Admin() {
  const {projectCount, teamCount,userCount,taskCount,countOutOfDate,countOnTime,isLoading } = useSelector(
    (state) => state.admin,
  );
    const statur = Object.values(taskCount)
    console.log(countOutOfDate)
    console.log(countOnTime)
  const dispatch = useDispatch();
  const listCount = [
    {
      const: `project: ${projectCount}`,
      icon:<AccountTreeIcon/>
    },
    {

      const: `task : ${taskCount.totalTask}`,
      icon:<TaskIcon/>
    },
    {
      const: `user : ${userCount}`,
      icon:<PersonIcon/>
    },
    {
      const: `team : ${teamCount}`,
      icon:<GroupIcon/>
    }
  ]
  useEffect(() => {
    dispatch(getCount());
  }, [dispatch]);
  return (
    <Container>
      {isLoading ?(
        <LoadingScreen />
      ) : (
        <>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 4, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
           {listCount.map((count,index)=>(
             <Grid xs={2} sm={3} md={3} key={index}>
             <Item sx = {{display: "flex",
                alignItems: "center",
                justifyContent: "center"}}> 
               {count.icon}
               <Typography sx = {{marginLeft:"10px"}}>
                {count.const}
               </Typography>
               </Item>
             </Grid>
           ))}
          </Grid>
        </Box>
        <Grid container spacing={{ xs: 4, md: 3 }} columns={{ xs: 6, sm: 8, md: 12 }}>
        <Grid xs={5} sm={3} md={3} >
        <Box sx = {{marginTop: "16px"}}>
          <div style = {{width : 400}}>
            <PieChart statur = {statur}/>
          </div>
        </Box>
        </Grid>
        <Grid xs={5} sm={3} md={3}>
        <Box sx = {{marginTop: "16px"}}>
          <div style = {{width : 400}}>
            <BarChartCount countOnTime = {countOnTime} countOutOfDate={countOutOfDate}/>
          </div>
        </Box>
        </Grid>
        </Grid>
        </>
      )}
    </Container>
  );
}

export default Admin;
