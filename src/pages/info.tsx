import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Box, Typography, Theme, useMediaQuery } from "@mui/material";
import { Layout } from "../components/layout/layout";
import { useTheme } from "@emotion/react";
import {} from "@mui/material";

const Info: NextPage = () => {
  const theme = useTheme();
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"), {
    noSsr: false,
  });
  return (
    <Layout>
      <Box
        sx={{
          backgroundImage: `url(${"/info_bg.svg"})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "scroll",
        }}
      >
        {/* <div
          style={{
            width: "100vw",
            position: "fixed",
            zIndex: -1000,
            height: "300%",
          }}
        >
          <Image
            src="/info_bg.svg"
            alt="Info Background"
            layout="fill"
            objectFit="cover"
          />
        </div> */}
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

export default Info;
