import React, { useEffect, useState } from "react";
import { Box, Grid, TablePagination, Typography, Button, Modal, Stack, Container, Card } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getTeams, removeTeam } from "./PersonnelSlice";
import LoadingScreen from "../../components/LoadingScreen";
import SearchInput from "../../components/SearchInput";
import { useLocation, useNavigate } from "react-router-dom";
import TeamCard from "./TeamCard";
import EditTeam from "./EditTeam";
import { centered, styleModal } from "../../app/config";

function Team() {
  const location = useLocation();

  let params = new URLSearchParams(location.search);
  const navigate = useNavigate();

  let filterName = params.get("team");

  const [page, setPage] = useState(0);
  const [teamId, setTeamId] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [openEditTeam, setOpenEditTeam] = useState(false);
  const [openRemoveTeams, setOpenRemoveTeams] = useState(false);
  const { currentPageTeams, teamsById, userNoTeam, isLoading, totalTeamm } = useSelector((state) => state.personnel);

  const teamList = currentPageTeams.map((userId) => teamsById[userId]);

  let managerList = userNoTeam.filter((user) => user.position === "Manager");
  let workerList = userNoTeam.filter((user) => user.position === "Worker");
  managerList = managerList.map((user) => ({ value: user._id, label: user.name }));
  workerList = workerList.map((user) => ({ value: user._id, label: user.name }));

  const dispatch = useDispatch();

  const handleRemoveTeam = (id) => {
    setOpenRemoveTeams(false);
    dispatch(removeTeam({ id }));
    setTeamId("");
  };

  const handleOpenFromTeam = (id) => {
    setOpenEditTeam(true);
    setTeamId(id);
  };

  const handleCloseEditTeam = () => {
    setOpenEditTeam(false);
    setTeamId("");
  };
  const handleOpenRemoveTeams = (id) => {
    setOpenRemoveTeams(true);
    setTeamId(id);
  };

  const handleCloseRemoveTeams = () => {
    setOpenRemoveTeams(false);
    setTeamId("");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    navigate(`?page=${newPage}`);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 12));
    setPage(0);
  };

  useEffect(() => {
    dispatch(getTeams({ filterName, page: page + 1, limit: rowsPerPage }));
  }, [filterName, page, rowsPerPage, dispatch]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Team
      </Typography>
      <Button sx={{ m: "10px" }} onClick={() => handleOpenFromTeam()}>
        New Team
      </Button>

      {isLoading || !teamList ? (
        <LoadingScreen />
      ) : (
        <Container>
          <SearchInput type={"team"} />
          <Typography variant="subtitle" sx={{ color: "text.secondary", ml: 1 }}>
            {totalTeamm > 1 ? `${totalTeamm} users found` : totalTeamm === 1 ? `${totalTeamm} user found` : "No user found"}
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <TablePagination
            sx={{
              "& .MuiablePagination-selectLabel, .MuiTablePagination-select, .MuiTablePagination-selectIcon": {
                display: { xs: "none", md: "block" },
              },
            }}
            component="div"
            count={totalTeamm ? totalTeamm : 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[6, 12, 24]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Grid container spacing={3} my={1}>
            {teamList.map((team) => (
              <Grid key={team._id} item xs={12} md={4}>
                <TeamCard team={team} handleOpenFromTeam={handleOpenFromTeam} handleOpenRemoveTeams={handleOpenRemoveTeams} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}

      <Modal open={openRemoveTeams} onClose={handleCloseRemoveTeams} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={styleModal}>
          <Card sx={centered}>
            <Typography>bạn có muốn xóa không ?</Typography>
            <Box>
              <Button sx={{ color: "red" }} onClick={() => handleRemoveTeam(teamId)}>
                Yes
              </Button>

              <Button sx={{ color: "green" }} onClick={() => handleCloseRemoveTeams()}>
                No
              </Button>
            </Box>
          </Card>
        </Box>
      </Modal>

      <Modal open={openEditTeam} onClose={handleCloseEditTeam} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={styleModal}>
          <Stack spacing={3}>
            <EditTeam userNoTeam={userNoTeam} workerList={workerList} managerList={managerList} handleCloseEditTeam={handleCloseEditTeam} />
          </Stack>
        </Box>
      </Modal>

      <Modal open={openEditTeam} onClose={handleCloseEditTeam} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={styleModal}>
          <EditTeam
            teamId={teamId}
            userNoTeam={userNoTeam}
            workerList={workerList}
            managerList={managerList}
            handleCloseEditTeam={handleCloseEditTeam}
          />
        </Box>
      </Modal>
    </Container>
  );
}

export default Team;
