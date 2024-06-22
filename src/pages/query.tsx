import type { NextPage } from "next";
import { Box, Theme, useMediaQuery, useTheme, InputBase } from "@mui/material";
import { Layout } from "../components/layout/layout";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { useContract } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "../const/addresses";
import { useEffect, useState } from "react";
import { User } from "../types/user";
import { Profile } from "../components/users/users-profile";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.45),
  "&:hover": {
    backgroundColor: theme.palette.primary.contrastText,
  },
  marginLeft: 0,
  width: "100%",
  color: theme.palette.text.dark,
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
  const [abi, setABI] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState<User>();
  const theme = useTheme();
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"), {
    noSsr: false,
  });

  const getUser = async (id: number) => {
    if (contract) {
      // setABI(contract.contractWrapper.abi);
      const result = await contract.call("getPerson", [id]);
      console.log(result);
      setUser(result);
    }
  };
  const handleClick = (event: any) => {
    if (event.key === "Enter") {
      if (searchTerm) getUser(Number(searchTerm));
      setSearchTerm("");
    }
  };
  // useEffect(() => {
  //   getUser();
  // });
  return (
    <Layout>
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
          {user && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 3,
              }}
            >
              <Profile></Profile>
            </Box>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default Query;
