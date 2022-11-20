import React from "react";
import { Container,Grid,Box} from "@mui/material";
import Team from "./Team"
import User from "./User"
import UsersNoTeam from "./UsersNoTeam";

function Personnel() {
  return (
    <Container sx = {{height:"auto",margin:"64px"}}>
        <Grid container
              justifyContent= "space-between"
              flexDirection= "row"
              >
          <Grid item xs = {8} sx = {{display: "flex",flexWrap: "wrap"}}>
            <Team/>
          </Grid>
          <Grid item xs = {3}>
            <UsersNoTeam/>
          </Grid>
        </Grid>
        <Box sx ={{pt:3}}>
            <User/>
        </Box>
    </Container>
  );
}

export default Personnel;
