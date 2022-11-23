import React from "react";
import {
  Table,
  TableHead,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  Link,Button,
  TableContainer,
  Box,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";



function UserTable({ users,handleOpenRemoveUser }) {


  return (
    <Box sx={{ overflowX: "auto" }}>
      <TableContainer sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: { xs: "20%", sm: "25%" } }}>
                Name
              </TableCell>
              <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                Email
              </TableCell>
              <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                Team
              </TableCell>
              <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                Phone1
              </TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              return (
                <TableRow key={user._id} hover>
                  <TableCell
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Avatar
                      alt={user.name}
                      src={user.avatarUrl}
                      sx={{ mr: 2 }}
                    />
                    <Link
                      variant="subtitle2"
                      sx={{ fontWeight: 600 }}
                      component={RouterLink}
                      to={`/user/${user._id}`}
                    >
                      {user.name}
                    </Link>
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ display: { xs: "none", md: "table-cell" } }}
                  >
                    {user.email}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ display: { xs: "none", md: "table-cell" } }}
                  >
                    {user.team?.name}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ display: { xs: "none", md: "table-cell" } }}
                  >
                    {user.phone1}
                  </TableCell>                
                <TableCell align="left">
                  <Button onClick={() => handleOpenRemoveUser(user._id)}>
                    xóa
                  </Button>
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

export default UserTable;
