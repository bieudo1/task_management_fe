import React, { useEffect,useState } from "react";
import { Box, TablePagination,Typography,List } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ListItem from '@mui/material/ListItem';
import { getTeams } from "./PersonnelSlice";
import LoadingScreen from "../../components/LoadingScreen";
import SearchInput from "../../components/SearchInput";
import { useLocation } from "react-router-dom";
import TeamCard from "./TeamCard"




function Team() {
  const location= useLocation()
  
  let params = new URLSearchParams(location.search);

  let filterName = params.get("q");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const {currentPageTeams,teamsById,isLoading,totalTeamm} = useSelector(
    (state) => state.personnel,
  );
  const teamList = currentPageTeams.map((userId) => teamsById[userId]);

  const dispatch = useDispatch();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  useEffect(() => {
    dispatch(getTeams({ filterName, page: page + 1, limit: rowsPerPage }));
  }, [filterName, page, rowsPerPage, dispatch]);
  
  return (
    <>
    { isLoading || !teamList ? (
      <LoadingScreen/>
    ):(
    <>
    <SearchInput/>
            <Typography
              variant="subtitle"
              sx={{ color: "text.secondary", ml: 1 }}
            >
              {totalTeamm > 1
                ? `${totalTeamm} users found`
                : totalTeamm === 1
                ? `${totalTeamm} user found`
                : "No user found"}
            </Typography>

            <Box sx={{ flexGrow: 1 }} />
     <TablePagination
              sx={{
                "& .MuiTablePagination-selectLabel, .MuiTablePagination-select, .MuiTablePagination-selectIcon":
                  {
                    display: { xs: "none", md: "block" },
                  },
              }}
              component="div"
              count={totalTeamm ? totalTeamm : 0}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
      <List>
          { teamList.map((team)=>(
            <ListItem key={team._id}>
                <TeamCard team= {team}/>
            </ListItem>
          ))}
      </List>
    </>
    )}
    </>
  );
}

export default Team;
