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
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  useTheme,
} from "@mui/material";
import { ConnectWallet } from "@thirdweb-dev/react";
import { SigninForm } from "../login-form";
import { useRouter } from "next/router";

const pages = [
  { name: "Read Out Docs", route: "/info" },
  { name: "Contact", route: "/" },
  { name: "Team", route: "/team" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export const Navbar: FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const [openForm, setOpenForm] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleRoute = (route: string) => {
    router.push(route);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const hanadleSignIn = () => {
    setOpenForm(true);
  };
  const handleClose = () => {
    setOpenForm(false);
  };

  return (
    <AppBar position="fixed" sx={{ background: "none", border: "none" }}>
      <Toolbar sx={{ boxShadow: "none" }}>
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
        <Box sx={{ flexGrow: 0.05, my: 0 }}>
          <ConnectWallet
            style={{
              flexGrow: 0.05,
              color: "white",
              display: "block",
              background: "none",
            }}
          />
        </Box>
        <Box sx={{ flexGrow: 0.05 }}>
          <Button
            onClick={hanadleSignIn}
            // disabled // ConnectWallet condition
            sx={{
              color: theme.palette.primary.contrastText,
              bgcolor: theme.palette.primary.main,
            }}
          >
            Sign In
          </Button>
        </Box>
      </Toolbar>
      <Paper style={{ backgroundColor: "lightblue" }}>
        <Dialog open={openForm} onClose={handleClose} maxWidth="xs" fullWidth>
          <DialogTitle
            style={{
              margin: 3,
              marginLeft: 0,
              backgroundColor: theme.palette.primary.contrastText,
              color: theme.palette.text.primary,
            }}
          >
            <Typography variant="h5">Sign in</Typography>
          </DialogTitle>
          <DialogContent
            style={{
              minWidth: "390px",
              minHeight: "370px",
              backgroundColor: theme.palette.primary.contrastText,
            }}
          >
            <SigninForm />
          </DialogContent>
        </Dialog>
      </Paper>
    </AppBar>
  );
};
