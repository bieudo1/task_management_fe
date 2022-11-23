import React from "react";
import { Button, Card, Typography,Box,Avatar } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AvatarGroup from '@mui/material/AvatarGroup';



function TeamCard({team,handleOpenEditTeam,handleOpenRemoveTeams }) {
  const { _id: targetTeamId,manager,workers,name } = team;
  


  return (
    <Card sx={{ display: "flex", alignItems: "center", p: 1 ,
    position: "relative"
  }}>
      <Box sx= {{padding:"10px"}}>
        <Box           
        sx ={{
        }}>
          <Typography variant="h5" sx ={{display: "flex",justifyContent: "space-between",color:"#fd7e14",fontWeight: 600}}>
            {name}
          </Typography>
          <Box sx ={{
            position: "absolute",
            top: "4%",
            left: "70%",
            display: "flex",
            flexDirection: "column"
          }}>
            <Button onClick={() => handleOpenRemoveTeams(targetTeamId)}>
              <DeleteIcon sx ={{ width: "0.7em",height: "0.7em"}}/>
            </Button>

            <Button onClick={() => handleOpenEditTeam(targetTeamId)}>
              <EditIcon sx ={{ width: "0.7em",height: "0.7em"}}/>
            </Button>
          </Box>
        </Box>
          <Box >
            <Typography variant="body2" sx={{fontWeight: 600, color: "#1f1f1f" ,fontSize: "1rem",margin: "22px 0  6px"}}>
              Project Leader :
            </Typography>
            <Box
            sx ={{
              display: "flex",
              alignItems: "center"
            }}>
            <Avatar  src={manager.avatarUrl} alt={manager.name}  sx={{width:26,height:26,ml:2,mt:1}}/>
            <Typography sx={{ color: "text.secondary",ml:"10px" }}>{manager.name}</Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="body2" sx={{fontWeight: 600, color: "#1f1f1f" ,fontSize: "1rem",margin: "22px 0  6px"}}>workers :</Typography>
          {(workers.length === 0) ? (<Box sx = {{height:22,m:1}}></Box>) : (
            <AvatarGroup sx = {{justifyContent: "flex-end",ml:2,mt:1,}} max = {4}>
            {workers.map((worker,index) => {
                return (
                  <Avatar
                    key = {index}
                    alt={worker.name}
                    src={worker.avatarUrl}
                    sx = {{width:26,height:26}}
                  />
                );
            })}
            </AvatarGroup>
          )}
        </Box>
      </Box>
    </Card>
  );
}

export default TeamCard;
