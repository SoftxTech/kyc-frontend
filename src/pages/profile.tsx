import type { NextPage } from "next";
import { Box } from "@mui/material";
import { Layout } from "../components/layout/layout";

import { useContract } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "../const/addresses";
import { useEffect, useState } from "react";
import { User } from "../types/user";
import { Profile } from "../components/users/user-profile";
import { useAuth } from "../hooks/use-auth";
import toast from "react-hot-toast";
import { AuthGuard } from "../components/auth/auth-guard";

const ProfilePage: NextPage = () => {
  const { contract, isLoading, error } = useContract(CONTRACT_ADDRESS);
  const { id } = useAuth();
  const [user, setUser] = useState<User>();
  const [found, setFound] = useState(false);

  const getUser = async (id: number) => {
    if (contract) {
      try {
        const result = await contract.call("getPerson", [id]);
        setUser(result[0]);
        setFound(result[1]);
        if (result[1]) {
          toast.success(`User fetched`);
        } else {
          toast.error("User not found");
        }
      } catch (err: any) {
        toast.error(err.message || "user not found");
      }
    }
  };
  useEffect(() => {
    getUser(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <AuthGuard>
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
              {found && (
                <Profile
                  contract={contract}
                  isLoading={isLoading}
                  error={error}
                  ID={id}
                  isProfile={true}
                  user={user}
                  getUser={getUser}
                ></Profile>
              )}
            </Box>
          </Box>
        </Box>
      </Layout>
    </AuthGuard>
  );
};

export default ProfilePage;
