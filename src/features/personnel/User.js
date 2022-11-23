import React, { useEffect, useState } from "react";
import {
  Stack,
  Typography,
  Card,
  Box,Modal,Button,
  TablePagination,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUsers,removeUser } from "./PersonnelSlice";
import UserTable from "./UserTable";
import LoadingScreen from "../../components/LoadingScreen";
import SearchInput from "../../components/SearchInput";
import { useLocation } from "react-router-dom";
import NewUser from "./NewUser";
import { style } from "../../app/config";

function User() {
  const location= useLocation()
  
  let params = new URLSearchParams(location.search);

  let filterName = params.get("user");

  const [page, setPage] = useState(0);
  const [openNewUser, setOpenNewUser] = useState(false);
  const [openRemoveUser, setOpenRemoveUser] = useState(false);
  const [userId, setUserId] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const {currentPageUsers,usersById,totalUsers,isLoading } = useSelector(
    (state) => state.personnel
  );

  const users = currentPageUsers.map((userId) => usersById[userId]);
  console.log(users)

  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const handleOpenNewUser = (id) => {
    setOpenNewUser(true)
  };

  const handleCloseNewUser = () =>{
    setOpenNewUser(false)
  };
  
  const handleOpenRemoveUser = (id) => {
    setOpenRemoveUser(true)
    setUserId(id)
  };

  const handleCloseRemoveUser = () => {
    setOpenRemoveUser(false)
    setUserId("")
  };

  const handleRemoveUser = (id) =>{
    setOpenRemoveUser(false)
    dispatch(removeUser({id}))
    setUserId("")
  };

  useEffect(() => {
    dispatch(getUsers({ filterName, page: page + 1, limit: rowsPerPage }));
  }, [filterName, page, rowsPerPage, dispatch]);

  return (
    <>
    <Typography variant="h4" sx={{ mb: 3 }}>
      User
    </Typography>
    <Button onClick={() =>handleOpenNewUser()}>New User</Button>
    { isLoading || !users ? (
      <LoadingScreen />
    ):(
    <> 
        <Modal
            open={openNewUser}
            onClose={handleCloseNewUser}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          > 
          <Box sx={style}> 
            <Stack spacing={3}>
            <NewUser handleCloseNewUser={handleCloseNewUser}/>
            </Stack>
          </Box>
          </Modal>
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
            <SearchInput type={"user"}/>
          
            <Typography
              variant="subtitle"
              sx={{ color: "text.secondary", ml: 1 }}
            >
              {totalUsers > 1
                ? `${totalUsers} users found`
                : totalUsers === 1
                ? `${totalUsers} user found`
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
              count={totalUsers ? totalUsers : 0}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Stack>
          <UserTable users={users} handleOpenRemoveUser={handleOpenRemoveUser}/>
          <Modal
            open={openRemoveUser}
            onClose={handleCloseRemoveUser}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
            <Typography>bạn có muốn xóa không ?</Typography>
            <Box>
              <Button sx={{color:"red"}} onClick={() =>handleRemoveUser(userId)}>Yes</Button>

              <Button sx={{color:"green"}} onClick={() =>handleCloseRemoveUser()}>No</Button>
              </Box>
            </Box>
          </Modal>
        </Stack>
      </Card>
    </>
    )}
    </>
  );
}

export default User;
