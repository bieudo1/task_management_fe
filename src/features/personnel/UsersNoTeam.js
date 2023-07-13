import React from "react";
import { Typography, Avatar, List, Box, Card } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import { useSelector } from "react-redux";

function UsersNoTeam() {
  const { userNoTeam } = useSelector((state) => state.personnel);

  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }}>
        User No Team
      </Typography>
      <Card sx={{ overflow: "auto", height: 708 }}>
        <List sx={{ overflowX: "hidden", overflowY: "auto" }}>
          {userNoTeam.map((user) => (
            <ListItem key={user._id}>
              <Avatar alt={user.name} src={user.avatarUrl} sx={{ width: 40, height: 40 }} />
              <Box sx={{ p: 1 }}>
                <Typography>name: {user.name}</Typography>
                <Typography>position: {user.position}</Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Card>
    </>
  );
}

export default UsersNoTeam;
