import React from "react";
import {
  Typography,
  Avatar,
  List,
  Box,
} from "@mui/material";
import ListItem from '@mui/material/ListItem';
import { useSelector } from "react-redux";


function UsersNoTeam() {
  const { userNoTeam} = useSelector(
    (state) => state.personnel
  );
  console.log(userNoTeam)


  return(
    <>
    <Typography variant="h4" sx={{ mb: 3 }}>
    User No Team
  </Typography>
        <List sx={{overflowX:"hidden",overflowY:"auto"}}>
        {userNoTeam.map((user) =>(
          <ListItem key={user._id}>
            <Avatar
            alt={user.name}
            src={user.imageUrl}
            sx = {{width:40,height:40}}
          />
          <Box sx = {{p:1}}>
          <Typography>name: {user.name}</Typography>
          <Typography>position: {user.position}</Typography>
          </Box>
          </ListItem>
        ))}
        </List>
    </>
  )

}

export default UsersNoTeam;