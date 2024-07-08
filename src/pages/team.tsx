import React from "react";
import { Layout } from "../components/layout/layout";
import { TeamSec } from "../components/users/team-sec";
import { Box, Typography } from "@mui/material";

const Team = () => {
  return (
    <Layout>
      <Box sx={{ textAlign: "center", mt: 10, mb: 10 }}>
        <Typography variant="h4" sx={{ mb: 10 }}>
          Our Team
        </Typography>

        <TeamSec />
      </Box>
    </Layout>
  );
};

export default Team;
