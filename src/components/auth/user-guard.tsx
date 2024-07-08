import type { FC, ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useAuth } from "../../hooks/use-auth";

interface UserGuardProps {
  children: ReactNode;
}

export const UserGuard: FC<UserGuardProps> = (props) => {
  const { children } = props;
  let { isAuthenticated } = useAuth();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (isAuthenticated) {
      router
        .push({
          pathname: "/",
          query: { returnUrl: router.asPath },
        })
        .catch(console.error);
    } else {
      setChecked(true);
    }
  }, [isAuthenticated]);

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return <>{children}</>;
};

UserGuard.propTypes = {
  children: PropTypes.node,
};
