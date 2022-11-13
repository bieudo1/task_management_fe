import React from "react";
import { Container, Card, Typography, List,Box,Avatar } from "@mui/material";
import { fDate } from "../../utils/formatTime";
import ListItem from '@mui/material/ListItem';


function TeamCard({team }) {
  const { _id: targetProjectId,manager,workers,name } = team;
  


  return (
    <Card sx ={{width:"50vw"}}>
      <Box sx= {{padding:"10px"}}>
    <Typography>{name}</Typography>
      <Box>
        <Typography variant="body2"  noWrap>
          Project Leader :
        </Typography>
        <Box>
        <Avatar  src={manager.imageUrl} alt={manager.name}  sx={{width:30,height:30}}/>
        <Typography sx={{ color: "text.secondary" }}>{manager.name}</Typography>
        </Box>
      </Box>
      <Typography variant="body2">workers :</Typography>
      {(workers.length === 0) ? (<Typography></Typography>) : (
        workers.map((worker) => { return (
          <ListItem
              key={worker._id}
              sx={{width:0}}
          >
            <Avatar
              alt={worker.name}
              src={worker.imageUrl}
              sx = {{width:30,height:30}}
            />
            <Typography sx={{ color: "text.secondary" }}>{worker.name}</Typography>
          </ListItem>
        )
      }))}
      </Box>
      </Card>
  );
}

export default TeamCard;
