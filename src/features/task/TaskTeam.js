import React, { useEffect } from "react";
import { Stack, Typography, Card, Box, Container, TablePagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "./TaskSlice";
import TaskTeamTable from "./TaskTeamTable";
import LoadingScreen from "../../components/LoadingScreen";
import SearchInput from "../../components/SearchInput";
import { useLocation } from "react-router-dom";

function TaskTeam() {
  const location = useLocation();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { listTasks, isLoading, totalTasks } = useSelector((state) => state.task);
  let params = new URLSearchParams(location.search);

  let filterName = params.get("task");

  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(getTasks({ filterName, page: page + 1, limit: rowsPerPage }));
  }, [filterName, page, rowsPerPage, dispatch]);

  return (
    <Container sx={{ margin: "64px" }}>
      {isLoading || !listTasks ? (
        <LoadingScreen />
      ) : (
        <>
          {" "}
          <Typography variant="h4" sx={{ mb: 3 }}>
            Task
          </Typography>
          <Card sx={{ p: 3 }}>
            <Stack spacing={2}>
              <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
                <SearchInput type={"task"} />
                <Typography variant="subtitle" sx={{ color: "text.secondary", ml: 1 }}>
                  {totalTasks > 1 ? `${totalTasks} users found` : totalTasks === 1 ? `${totalTasks} user found` : "No user found"}
                </Typography>

                <Box sx={{ flexGrow: 1 }} />

                <TablePagination
                  sx={{
                    "& .MuiTablePagination-selectLabel, .MuiTablePagination-select, .MuiTablePagination-selectIcon": {
                      display: { xs: "none", md: "block" },
                    },
                  }}
                  component="div"
                  count={totalTasks ? totalTasks : 0}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[5, 10, 25]}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Stack>
              <TaskTeamTable tasks={listTasks} />
            </Stack>
          </Card>
        </>
      )}
    </Container>
  );
}

export default TaskTeam;
