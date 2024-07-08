import React from "react";
import { Layout } from "../components/layout/layout";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
const teamMembers = [
  {
    imgUrl: "/team/team (1).jpg",
    name: "Abdelrahman Taha",
    cvLink: "",
    linkedIn: "https://www.linkedin.com/in/abdelrahman-taha-603922196/",
    position: "AI Deverloper",
    positionIn: "AI Deverloper",
  },

  {
    imgUrl: "/team/team (2).jpg",
    name: "Abdelrahman Mostafa",
    cvLink:
      "https://drive.google.com/file/d/1LdeG_rYFyhcQscsYgL6B43bg7H4AUKO1/view?usp=drive_link",
    linkedIn: "https://www.linkedin.com/in/abdalrhman-mostafa/",
    position: "Blockchain Developer",
    positionIn: "Leader, Blockchain Developer",
  },

  {
    imgUrl: "/team/team (3).jpg",
    name: "Abdelrahman Abbas",
    cvLink:
      "https://drive.google.com/file/d/1GUV2tw1jptD2D-GihEy0jTwiMdzhLKbl/view?usp=drive_link",
    linkedIn: "https://www.linkedin.com/in/abdel-rahmanabbas",
    position: "MERN Stack Developer",
    positionIn: "Frontend Developer, Web3",
  },

  {
    imgUrl: "/team/team (4).jpg",
    name: "Ahmed Hesham",
    cvLink: "",
    linkedIn: "https://www.linkedin.com/in/ahmed-hesham-671077255/",
    position: "Blockchain Developer",
    positionIn: "Blockchain Developer",
  },
  {
    imgUrl: "/team/team (5).jpg",
    name: "Ammar Zaky",
    cvLink: "",
    linkedIn: "https://www.linkedin.com/in/ammar-zaky-507169252/",
    position: "Game Developer",
    positionIn: "UI/UX Designer",
  },
];

const Team = () => {
  return (
    <Layout>
      <Box sx={{ textAlign: "center", mt: 10, mb: 10 }}>
        <Typography variant="h4" sx={{ mb: 10 }}>
          Our Team
        </Typography>

        <Grid container spacing={1}>
          {teamMembers.map((item, index) => (
            <Grid
              xs={12}
              md={6}
              lg={2.4}
              key={index}
              sx={{
                width: "20%",
                background: "var(--team-card-bg)",
                borderRadius: "5px",
              }}
            >
              <Image
                src={item.imgUrl}
                alt=""
                width={250}
                height={250}
                objectFit={"contain"}
                style={{
                  borderRadius: "10%",
                }}
              />
              <Box
                sx={{
                  padding: "20px 15px",
                }}
              >
                <Typography variant="h5">{item.name}</Typography>

                <a
                  href={item.linkedIn}
                  target="_blank"
                  style={{ textDecoration: "none", color: "#0077B5" }}
                >
                  <LinkedInIcon fontSize="large" />
                </a>
                <a
                  href={item.cvLink}
                  target="_blank"
                  style={{ textDecoration: "none", color: "#FFFFFF" }}
                >
                  <DocumentScannerIcon fontSize="large" />
                </a>

                <Typography variant="h6">{item.position}</Typography>
                <Typography variant="subtitle2">
                  Role in project: {item.positionIn}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    columnGap: "1rem",
                    marginTop: "10px",
                  }}
                ></Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default Team;
