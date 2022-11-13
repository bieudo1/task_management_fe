import React from "react";
import {
  Table,
  TableHead,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  List,
  TableContainer,
  Box,
} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";


function UsersNoTeam() {
  const { userNoTeam} = useSelector(
    (state) => state.personnel
  );
  console.log(userNoTeam)


  return(
    <>
        <List>
        {userNoTeam.map((user) =>(
            <Avatar
            alt={user.name}
            src={user.imageUrl}
            sx = {{width:30,height:30}}
          />
        ))}
        </List>
    </>
  )

}

export default UsersNoTeam;