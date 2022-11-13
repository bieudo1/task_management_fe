import React from "react";
import { Container,Grid} from "@mui/material";
import Team from "./Team"
import User from "./User"
import UsersNoTeam from "./UsersNoTeam";

function Personnel() {
  return (
    <Container sx = {{height:"auto"}}>
        <Grid container
              // direction="column"
              // justifyContent="center"
              // alignItems="center"  
              >
          <Grid item xs = {5} sx = {{display: "flex"}}>
            <Team/>
          </Grid>
          <Grid item xs = {5}>
            <UsersNoTeam/>
          </Grid>
        </Grid>
            <User/>
    </Container>
  );
}

export default Personnel;
