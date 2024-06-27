import { CacheProvider, EmotionCache, ThemeProvider } from "@emotion/react";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { createEmotionCache } from "../utils/create-emotion-cache";
import { FC } from "react";
import Head from "next/head";
import {
  SettingsConsumer,
  SettingsProvider,
} from "../contexts/settings-context";
import { CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { createTheme } from "../theme";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { AuthProvider } from "../contexts/jwt-context";

type EnhancedAppProps = AppProps & {
  Component: NextPage;
  emotionCache: EmotionCache;
};

const clientSideEmotionCache = createEmotionCache();
const activeChain = "sepolia";

const App: FC<EnhancedAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>KYC</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta
          name="description"
          content="KYC is an app to know your customer"
        />
        <meta name="keywords" content="KYC, kyc" />
      </Head>
      <AuthProvider>
        <SettingsProvider>
          <SettingsConsumer>
            {({ settings }) => (
              <ThemeProvider
                theme={createTheme({
                  mode: settings.theme,
                })}
              >
                <CssBaseline />
                <Toaster position="top-center" />
                <ThirdwebProvider
                  clientId={"7bd58850e7bf1d66ec5f3fb739437749"}
                  activeChain={activeChain}
                >
                  <Component {...pageProps} />
                </ThirdwebProvider>
              </ThemeProvider>
            )}
          </SettingsConsumer>
        </SettingsProvider>
      </AuthProvider>
    </CacheProvider>
  );
};

export default App;
