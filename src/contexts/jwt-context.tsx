import type { FC, ReactNode } from "react";
import { createContext, useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { authApi } from "../api/authApi";

interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
}

export interface AuthContextValue extends State {
  platform: "JWT";
  login: (id: number) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

enum ActionType {
  INITIALIZE = "INITIALIZE",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

type InitializeAction = {
  type: ActionType.INITIALIZE;
  payload: {
    isAuthenticated: boolean;
  };
};

type LoginAction = {
  type: ActionType.LOGIN;
  payload: {
    isAuthenticated: boolean;
  };
};

type LogoutAction = {
  type: ActionType.LOGOUT;
};

type Action = InitializeAction | LoginAction | LogoutAction;

type Handler = (state: State, action: any) => State;

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
};

const handlers: Record<ActionType, Handler> = {
  INITIALIZE: (state: State, action: InitializeAction): State => {
    const { isAuthenticated } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
    };
  },

  LOGIN: (state: State, action: LoginAction): State => {
    return {
      ...state,
      isAuthenticated: true,
    };
  },

  LOGOUT: (state: State): State => ({
    ...state,
    isAuthenticated: false,
  }),
};

const reducer = (state: State, action: Action): State =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  platform: "JWT",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  const login = async (id: number): Promise<void> => {
    const res = await authApi.login({
      id,
    });
    console.log(res.status);
    if (true) {
      dispatch({
        type: ActionType.INITIALIZE,
        payload: {
          isAuthenticated: true,
        },
      });

      const returnUrl =
        (router.query.returnUrl as string | undefined) || "/info";
      router.push(returnUrl).catch(console.error);
    }
  };

  const logout = async (): Promise<void> => {
    await authApi.logout();
    dispatch({
      type: ActionType.LOGOUT,
    });

    router.push("/").catch(console.error);
  };
  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: "JWT",
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const AuthConsumer = AuthContext.Consumer;
