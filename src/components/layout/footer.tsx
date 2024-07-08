import { Box, Grid, IconButton, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

interface FooterProps {
  mdUp: boolean;
}

export const Footer: FC<FooterProps> = (props) => {
  const { mdUp } = props;
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        margin: "0px",
        bottom: "16px",
        color: theme.palette.primary.contrastText,
        position: "sticky",
        width: "100%",
        padding: theme.spacing(2),
        textAlign: "center",
      }}
    >
      <Grid container spacing={12}>
        {mdUp && (
          <>
            {" "}
            <Grid item md={4} sx={{ marginLeft: 4 }}>
              <Typography
                variant="subtitle2"
                noWrap
                sx={{
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                Empowering Trust:
              </Typography>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontWeight: 700,
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                }}
              >
                IDShield Chain
              </Typography>{" "}
              <Typography
                variant="subtitle2"
                noWrap
                sx={{
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                Blockchain KYC Solutions Leader.
              </Typography>
            </Grid>
            <Grid item md={3} sx={{ marginTop: "45px", textAlign: "center" }}>
              <Typography
                variant="subtitle2"
                noWrap
                sx={{
                  display: "inline-block",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                Terms & Conditions
              </Typography>{" "}
              <Typography
                variant="subtitle2"
                noWrap
                sx={{
                  display: "inline-block",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                Privacy policy
              </Typography>
            </Grid>
          </>
        )}
        <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
          <IconButton>
            <BsFacebook size={24} />
          </IconButton>
          <IconButton>
            <BsInstagram size={24} />
          </IconButton>
          <IconButton>
            <BsTwitter size={24} />
          </IconButton>
          <IconButton>
            <BsGithub size={24} />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};
