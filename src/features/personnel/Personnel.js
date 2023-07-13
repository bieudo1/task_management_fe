import React from "react";
import { Container, Grid, Box } from "@mui/material";
import Team from "./Team";
import User from "./User";
import UsersNoTeam from "./UsersNoTeam";

function Personnel() {
  return (
    <Container sx={{ height: "auto", margin: "64px" }}>
      <Grid container spacing={2} my={1}>
        <Grid item xs={12} md={9}>
          <Team />
        </Grid>
        <Grid item xs={12} md={3}>
          <UsersNoTeam />
        </Grid>
      </Grid>
      <Box sx={{ pt: 3 }}>
        <User />
      </Box>
    </Container>
  );
}

export default Personnel;
