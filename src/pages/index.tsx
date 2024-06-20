import type { NextPage } from "next";
import Head from "next/head";
import { Box, Typography, Theme, useMediaQuery, useTheme } from "@mui/material";
import { Layout } from "../components/layout/layout";

const Home: NextPage = () => {
  const theme = useTheme();
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"), {
    noSsr: false,
  });
  return (
    <Layout>
      <Head>
        <title>KYC</title>
        <meta name="description" content="KYC" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          backgroundImage: `url(${"/kyc_bg.svg"})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box
          sx={{
            display: "flex",
            padding: 3,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            minHeight: "100vh",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: "5rem",
              fontWeight: "bold",
              color: theme.palette.primary.main,
              textDecoration: "none",
            }}
          >
            Welcome TO Our KYC
          </Typography>
          {mdUp && (
            <Typography
              variant="subtitle1"
              sx={{
                width: "37%",
                color: theme.palette.primary.contrastText,
                textDecoration: "none",
              }}
            >
              Lorem ipsum dolor sit amet consectetur. Odio nibh dignissim mattis
              convallis. In phasellus vitae nunc hac at sed aliquet eu
              consectetur. Felis arcu nec mi tristique ut in sed. Neque elit non
              viverra consectetur.
            </Typography>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default Home;
