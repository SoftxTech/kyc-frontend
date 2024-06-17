import type { FC, ReactNode } from "react";
import { createContext, useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";


interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  id: number | null;
}

export interface AuthContextValue extends State {
  platform: "JWT";
  login: (id: number) => Promise<void>;
  // authRefresh: () => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

enum ActionType {
  INITIALIZE = "INITIALIZE",
  LOGIN = "LOGIN",
  AUTHREFRESH = "AUTHREFRESH",
  LOGOUT = "LOGOUT",
}

type InitializeAction = {
  type: ActionType.INITIALIZE;
  payload: {
    isAuthenticated: boolean;
    id: number | null;
  };
};

type LoginAction = {
  type: ActionType.LOGIN;
  payload: {
    id: number;
  };
};

type AuthRefreshAction = {
  type: ActionType.AUTHREFRESH;
  payload: {
    isAuthenticated: boolean;
    id: number | null;
  };
};

type LogoutAction = {
  type: ActionType.LOGOUT;
};

type Action = InitializeAction | LoginAction | LogoutAction | AuthRefreshAction;

type Handler = (state: State, action: any) => State;

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  id: null,
};

const handlers: Record<ActionType, Handler> = {
  INITIALIZE: (state: State, action: InitializeAction): State => {
    const { isAuthenticated, id } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      id,
    };
  },

  LOGIN: (state: State, action: LoginAction): State => {
    const { id } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      id,
    };
  },

  AUTHREFRESH: (state: State, action: InitializeAction): State => {
    const { isAuthenticated, id } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      id,
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
  // authRefresh: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  // useEffect(() => {
  //   const initialize = async (): Promise<void> => {
  //     try {
  //       const { success, data, store_plan } = await authApi.refreshAuth();

  //       if (success) {
  //         const user = {
  //           ...data,

  //         };

  //         dispatch({
  //           type: ActionType.INITIALIZE,
  //           payload: {
  //             isAuthenticated: true,
  //             user,
  //           },
  //         });
  //       } else {
  //         dispatch({
  //           type: ActionType.INITIALIZE,
  //           payload: {
  //             isAuthenticated: false,
  //             id:null,
  //           },
  //         });
  //       }
  //     } catch (err:any) {
  //       if (err.code === 30018) {
  //         await authApi.logout();
  //         router.push('/').catch(console.error);
  //       }

  //       dispatch({
  //         type: ActionType.INITIALIZE,
  //         payload: {
  //           isAuthenticated: false,
  //           id:null,
  //         },
  //       });
  //     }
  //   };

  //   initialize();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [router.pathname]);

  const login = async (id: number): Promise<void> => {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({id: id}),
    });
    console.log(res);
    if (true) {
      dispatch({
        type: ActionType.INITIALIZE,
        payload: {
          id: id,
          isAuthenticated: true,
        },
      });

      const returnUrl =
        (router.query.returnUrl as string | undefined) || "/info";
      router.push(returnUrl).catch(console.error);
    }
  };

  const logout = async (): Promise<void> => {
    await fetch("/api/logout");
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
        // authRefresh,
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
