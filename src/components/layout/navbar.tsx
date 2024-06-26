import { FC, MouseEvent, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useTheme } from "@mui/material";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/use-auth";

const pages = [
  { name: "Read Out Docs", route: "/info" },
  { name: "Query", route: "/query" },
  { name: "Team", route: "/team" },
];

export const Navbar: FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const address = useAddress();
  let { logout, isAuthenticated } = useAuth();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleRoute = (route: string) => {
    router.push(route);
  };

  const hanadleSignIn = () => {
    router.push("/login").catch(console.error);
  };
  const handleProfile = () => {
    router.push("/profile").catch(console.error);
  };

  const handleLogout = async (): Promise<void> => {
    await logout();
  };
  return (
    <AppBar
      position="fixed"
      sx={{ background: "none", border: "none", position: "sticky" }}
    >
      <Toolbar sx={{ boxShadow: "none", mr: -5 }}>
        <GppGoodOutlinedIcon
          sx={{ display: { md: "flex" }, mr: 1 }}
          fontSize="large"
        />
        <Typography
          variant="h6"
          noWrap
          sx={{
            mr: 2,
            display: { md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            color: theme.palette.primary.main,
            textDecoration: "none",
          }}
        >
          ID
        </Typography>{" "}
        <Typography
          variant="h6"
          noWrap
          sx={{
            mr: 2,
            display: { md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Shield
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "flex", md: "none" },
            justifyContent: "end",
          }}
        >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {pages.map((page) => (
              <MenuItem key={page.name} onClick={() => handleRoute(page.route)}>
                <Typography textAlign="center">{page.name}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            justifyContent: "end",
          }}
        >
          {pages.map((page) => (
            <Button
              key={page.name}
              onClick={() => handleRoute(page.route)}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {page.name}
            </Button>
          ))}
        </Box>
        <Box sx={{ flexGrow: 0.05, m: 0, p: 0, width: "180px" }}>
          <ConnectWallet modalSize="wide" />
        </Box>
        {address && !isAuthenticated && (
          <Box sx={{ flexGrow: 0.05 }}>
            <Button
              onClick={hanadleSignIn}
              size="large"
              sx={{
                ml: -3,
                color: theme.palette.primary.light,
                bgcolor: theme.palette.primary.main,
                "&:hover": {
                  color: theme.palette.primary.dark, // Adjust hover color as desired
                  cursor: "pointer", // Add cursor: pointer for hover feedback
                },
              }}
            >
              Sign In
            </Button>
          </Box>
        )}
        {isAuthenticated && (
          <>
            {" "}
            <Box sx={{ flexGrow: 0.05, ml: 1 }}>
              <Button
                onClick={handleLogout}
                size="large"
                sx={{
                  ml: -3,
                  color: theme.palette.primary.light,
                  bgcolor: theme.palette.primary.main,
                  "&:hover": {
                    color: theme.palette.primary.dark, // Adjust hover color as desired
                    cursor: "pointer", // Add cursor: pointer for hover feedback
                  },
                }}
              >
                Log out
              </Button>
            </Box>
            <Box sx={{ flexGrow: 0.1, ml: 1 }}>
              <IconButton
                onClick={handleProfile}
                size="large"
                sx={{
                  ml: -3,

                  color: theme.palette.primary.light,
                  bgcolor: theme.palette.primary.main,
                  "&:hover": {
                    color: theme.palette.primary.dark, // Adjust hover color as desired
                    cursor: "pointer", // Add cursor: pointer for hover feedback
                  },
                }}
              >
                <AccountCircleIcon fontSize="large" />
              </IconButton>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
