import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Box, Typography, Theme, useMediaQuery } from "@mui/material";
import { Layout } from "../components/layout/layout";
import { useTheme } from "@emotion/react";
import {} from "@mui/material";

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
      <Box>
        <div
          style={{
            width: "100vw",
            position: "fixed",
            zIndex: -1000,
            height: "100vh",
          }}
        >
          <Image
            src="/kyc_bg.svg"
            alt="KYC Background"
            layout="fill"
            objectFit="cover"
          />
        </div>
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
