import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { ThemeProvider, Flex, Box } from 'theme-ui';
import { Global } from '@emotion/core';
import { ethers } from 'ethers';
import '@reach/dialog/styles.css';
import '@reach/listbox/styles.css';
import '@reach/menu-button/styles.css';
import '@reach/tabs/styles.css';
import '@reach/tooltip/styles.css';
import './fonts/styles.css';
import { fetchJson } from 'lib/fetchJson';
import theme from 'lib/theme';
import Header from 'modules/app/components/layout/Header';
import Cookies from 'modules/app/components/Cookies';
import { AnalyticsProvider } from 'modules/app/client/analytics/AnalyticsContext';
import { CookiesProvider } from 'modules/app/client/cookies/CookiesContext';
import { HeadComponent } from 'modules/app/components/layout/Head';
import { AccountProvider } from 'modules/app/context/AccountContext';
import NextNprogress from 'nextjs-progressbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BallotProvider } from 'modules/polling/context/BallotContext';
import debug from 'debug';
import Script from 'next/script';
import Banner from 'modules/app/components/layout/header/Banner';
import bannerContent from 'modules/home/data/bannerContent.json';
import { MigrationBanner } from 'modules/migration/components/MigrationBanner';
import { Web3Provider } from 'modules/web3/components/Web3Provider';
import React, { useMemo } from 'react';

const vitalslog = debug('govpo:vitals');
export const reportWebVitals = vitalslog;

const App = ({ Component, pageProps }: AppProps): React.ReactElement => {
  ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.ERROR);

  const activeBannerContent = bannerContent.find(({ active }) => active === true);
  const banners = useMemo(() => {
    return (
      <React.Fragment>
        {activeBannerContent && <Banner content={activeBannerContent.content} />}
        <MigrationBanner />
      </React.Fragment>
    );
  }, []);
  return (
    <Web3Provider>
      {/* @ts-ignore */}
      <ThemeProvider theme={theme}>
        <NextNprogress
          color="#1aab9b"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
          options={{ showSpinner: false }}
        />
        <AccountProvider>
          <BallotProvider>
            <HeadComponent />
            {process.env.NODE_ENV === 'production'} &&
            <CookiesProvider disabled={false}>
              <AnalyticsProvider>
                <SWRConfig
                  value={{
                    // default to 60 second refresh intervals
                    refreshInterval: 60000,
                    revalidateOnMount: true,
                    fetcher: url => fetchJson(url)
                  }}
                >

                  <Flex
                    sx={{
                      flexDirection: 'column',
                      variant: 'layout.root',

                      paddingTop: '60px',
                      overflowX: 'hidden'
                    }}
                  >
                    {banners && <Box sx={{ pb: 3 }}>{banners}</Box>}
                    <Box sx={{ px: [3, 4] }}>
                      <Component {...pageProps} />
                    </Box>
                    <Header />
                    <Cookies />
                  </Flex>
                </SWRConfig>
              </AnalyticsProvider>
            </CookiesProvider>
          </BallotProvider>
        </AccountProvider>
        <ToastContainer position="top-right" theme="light" />
      </ThemeProvider>
    </Web3Provider>
  );
};

export default App;
