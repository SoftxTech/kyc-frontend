import type { NextPage } from "next";
import { Box, Button, InputBase, Typography } from "@mui/material";
import { Layout } from "../components/layout/layout";
import { styled, alpha, useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { useContract } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "../const/addresses";
import { useState } from "react";
import { User } from "../types/user";
import { Profile } from "../components/users/user-profile";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.45),
  "&:hover": {
    backgroundColor: theme.palette.primary.contrastText,
  },
  marginLeft: 0,
  width: "100%",
  color: "#000000",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.disabled,
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "60vw",
    },
  },
}));

const Query: NextPage = () => {
  const { contract, isLoading, error } = useContract(CONTRACT_ADDRESS);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState<User>();
  const [found, setFound] = useState(false);
  const theme = useTheme();
  const router = useRouter();

  const getUser = async (id: number) => {
    if (contract) {
      try {
        const result = await contract.call("getPerson", [id]);
        setUser(result[0]);
        setFound(result[1]);
        toast.success(`User fetched`);
      } catch (err: any) {
        toast.error(err.message || "user not found");
      }
    }
  };
  const handleClick = (event: any) => {
    if (event.key === "Enter") {
      if (searchTerm) getUser(Number(searchTerm));
      setSearchTerm("");
    }
  };
  const handleAddUser = () => {
    router.push("/addUser").catch(console.error);
  };
  // useEffect(() => {
  //   getUser();
  // });
  return (
    <Layout>
      <Box>
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
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleClick}
              type="number"
              placeholder="Search by user ID"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>{" "}
          {found && user && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 3,
              }}
            >
              <Profile
                ID={Number(searchTerm)}
                user={user}
                getUser={getUser}
                contract={contract}
                isLoading={isLoading}
                error={error}
              ></Profile>
            </Box>
          )}
          {!found && user && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 3,
              }}
            >
              {" "}
              <Typography variant="h4" color="error">
                User not found
              </Typography>{" "}
            </Box>
          )}
          <Button
            onClick={handleAddUser}
            size="large"
            sx={{
              ml: -3,
              mt: 4,
              color: theme.palette.primary.light,
              bgcolor: theme.palette.primary.main,
              "&:hover": {
                color: theme.palette.primary.dark, // Adjust hover color as desired
                cursor: "pointer", // Add cursor: pointer for hover feedback
              },
            }}
          >
            Add User +
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default Query;
