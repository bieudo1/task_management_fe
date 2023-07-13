import React from "react";
import { Table, TableHead, TableRow, TableBody, TableCell, TableContainer, Box } from "@mui/material";

function TaskTeamTable({ tasks }) {
  return (
    <Box sx={{ overflowX: "auto" }}>
      <TableContainer sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: { xs: "20%", sm: "25%" } }}>Name</TableCell>
              <TableCell sx={{ display: { xs: "20%", md: "table-cell" } }}>Project</TableCell>
              <TableCell sx={{ display: { xs: "20%", md: "table-cell" } }}>Assignee</TableCell>
              <TableCell sx={{ display: { xs: "20%", md: "table-cell" } }}>Due At</TableCell>
              <TableCell sx={{ display: { xs: "20%", sm: "table-cell" }, width: "20%" }}>Done At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => {
              return (
                <TableRow key={task._id} hover>
                  <TableCell
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    {task?.name}
                  </TableCell>
                  <TableCell align="left" sx={{ display: { xs: "20%", md: "table-cell" } }}>
                    {task.project?.name}
                  </TableCell>
                  <TableCell align="left" sx={{ display: { xs: "20%", md: "table-cell" } }}>
                    {task.assignee?.name}
                  </TableCell>
                  <TableCell align="left" sx={{ display: { xs: "20%", md: "table-cell" } }}>
                    {task.dueAt}
                  </TableCell>
                  <TableCell align="left" sx={{ display: { xs: "20%", md: "table-cell" } }}>
                    {task.doneAt}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TaskTeamTable;
