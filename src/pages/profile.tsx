import type { NextPage } from "next";
import { Box, InputBase, Typography } from "@mui/material";
import { Layout } from "../components/layout/layout";
import { styled, alpha } from "@mui/material/styles";
import { useContract } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "../const/addresses";
import { useEffect, useState } from "react";
import { User } from "../types/user";
import { Profile } from "../components/users/user-profile";
import { useAuth } from "../hooks/use-auth";
import { useRouter } from "next/router";

const Query: NextPage = () => {
  const { contract, isLoading, error } = useContract(CONTRACT_ADDRESS);
  const { id } = useAuth();
  const [user, setUser] = useState<User>();
  const [found, setFound] = useState(false);
  const router = useRouter();
  const getUser = async (id: number) => {
    if (contract) {
      const result = await contract.call("getPerson", [id]);
      console.log(result);
      setUser(result[0]);
      setFound(result[1]);
    }
  };
  useEffect(() => {
    getUser(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 3,
            }}
          >
            {found && <Profile ID={id} user={user} getUser={getUser}></Profile>}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Query;
