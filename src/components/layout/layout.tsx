import { Box, Theme, useMediaQuery } from "@mui/material";
import type { FC, ReactNode } from "react";
import PropTypes from "prop-types";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"), {
    noSsr: false,
  });
  return (
    <Box
      sx={{
        backgroundImage: `url(${"/kyc_bg.svg"})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Navbar />
      {children}
      <Footer mdUp={mdUp} />
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};
