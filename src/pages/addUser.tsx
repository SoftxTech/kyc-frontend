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
import { UserCreate } from "../components/users/user-create";

const AddUser: NextPage = () => {
  const { contract, isLoading, error } = useContract(CONTRACT_ADDRESS);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState<User>();
  const [found, setFound] = useState(false);
  const theme = useTheme();
  const router = useRouter();

  const getUser = async (id: number) => {
    if (contract) {
      const result = await contract.call("getPerson", [id]);
      console.log(result);
      setUser(result[0]);
      setFound(result[1]);
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
          <UserCreate />
        </Box>
      </Box>
    </Layout>
  );
};

export default AddUser;
