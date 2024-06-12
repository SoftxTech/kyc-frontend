import type { NextPage } from "next";
import { Box, Typography, Theme, useMediaQuery } from "@mui/material";
import { Layout } from "../components/layout/layout";
import { useTheme } from "@emotion/react";
import {} from "@mui/material";
import Image from "next/image";

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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingX: "10%",
            paddingY: "1%",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
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
            <div
              style={{
                alignSelf: "stretch",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  alignSelf: "stretch",
                  width: "8px",
                  height: "57px",
                  margin: "15px",
                  position: "relative",
                  borderRadius: "17px",
                  background:
                    "linear-gradient(180deg, #fff 3.95%, #ffef5d 40.35%, #ffe600 74.56%), #d9d9d9",
                }}
              ></div>{" "}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.primary.contrastText,
                  textDecoration: "none",
                }}
              >
                About Us
              </Typography>
            </div>

            <Typography
              variant="subtitle1"
              sx={{
                width: "100%",
                color: theme.palette.primary.contrastText,
                textDecoration: "none",
              }}
            >
              At IDShield, we are pioneers in revolutionizing KYC processes
              through advanced Blockchain technology. IDShield believes in
              empowering individuals and businesses with secure, efficient, and
              accessible identity verification solutions. Our commitment to
              innovation has positioned IDShield as a leader in the industry,
              delivering unmatched trust and reliability. With IDShield at the
              forefront, we strive to redefine digital identity verification,
              ensuring a seamless and trustworthy experience for our users. Join
              us on the journey to a secure and connected digital future, where
              IDShield leads the way in identity protection and verification.
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "545px",
                height: "306px",
              }}
            >
              <Image
                src="/aboutUs.svg"
                width={545}
                height={306}
                alt="About Us"
                layout="responsive"
                objectFit="cover"
              />
            </Box>
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
            <div
              style={{
                alignSelf: "stretch",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  alignSelf: "stretch",
                  width: "8px",
                  height: "57px",
                  margin: "15px",
                  position: "relative",
                  borderRadius: "17px",
                  background:
                    "linear-gradient(180deg, #fff 3.95%, #ffef5d 40.35%, #ffe600 74.56%), #d9d9d9",
                }}
              ></div>{" "}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.primary.contrastText,
                  textDecoration: "none",
                }}
              >
                Benefits
              </Typography>
            </div>

            <Typography
              variant="subtitle1"
              sx={{
                width: "100%",
                color: theme.palette.primary.contrastText,
                textDecoration: "none",
              }}
            >
              At IDShield, we strive to redefine digital identity verification,
              ensuring a seamless and trustworthy experience for our users. Join
              us on the journey to a secure and connected digital future, where
              IDShield leads the way in identity protection and verification.
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "709px",
                height: "279px",
              }}
            >
              <Image
                src="/benefits.svg"
                width={545}
                height={306}
                alt="Benefits"
                layout="responsive"
                objectFit="cover"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Info;
