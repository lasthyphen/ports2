import { useMemo, useEffect, useState, useCallback } from 'react';
import { GetStaticProps } from 'next';
import { Text, Flex, useColorMode, Box, Alert } from 'theme-ui';
import ErrorPage from 'modules/app/components/ErrorPage';
import { isActivePoll } from 'modules/polling/helpers/utils';
import PrimaryLayout from 'modules/app/components/layout/layouts/Primary';
import Stack from 'modules/app/components/layout/layouts/Stack';
import { ViewMore } from 'modules/home/components/ViewMore';
import { PollCategoriesLanding } from 'modules/home/components/PollCategoriesLanding';
import { GovernanceStats } from 'modules/home/components/GovernanceStats';
import ExecutiveOverviewCard from 'modules/executive/components/ExecutiveOverviewCard';
import { PlayButton } from 'modules/home/components/PlayButton';
import PageLoadingPlaceholder from 'modules/app/components/PageLoadingPlaceholder';
import VideoModal from 'modules/app/components/VideoModal';
import MeetDelegates from 'modules/delegates/components/MeetDelegates';
import { isDefaultNetwork } from 'modules/web3/helpers/networks';
import { useWeb3 } from 'modules/web3/hooks/useWeb3';
import { ErrorBoundary } from 'modules/app/components/ErrorBoundary';
import Skeleton from 'react-loading-skeleton';
import { SupportedNetworks } from 'modules/web3/constants/networks';
import useSWR, { useSWRConfig } from 'swr';
import TopDelegates from 'modules/delegates/components/TopDelegates';
import { ResourcesLanding } from 'modules/home/components/ResourcesLanding/ResourcesLanding';
import { PollsOverviewLanding } from 'modules/home/components/PollsOverviewLanding';
import BigNumber from 'lib/bigNumberJs';
import { getCategories } from 'modules/polling/helpers/getCategories';
import { InternalLink } from 'modules/app/components/InternalLink';
import InformationParticipateMakerGovernance from 'modules/home/components/InformationParticipateMakerGovernance/InformationParticipateMakerGovernance';
import { useBreakpointIndex } from '@theme-ui/match-media';
import { useAccount } from 'modules/app/hooks/useAccount';
import { VIDEO_URLS } from 'modules/app/client/videos.constants';
import Participation from 'modules/home/components/Participation';
import TabsNavigation from 'modules/home/components/TabsNavigation';
import { StickyContainer, Sticky } from 'react-sticky';
import { useInView } from 'react-intersection-observer';
import { useVotedProposals } from 'modules/executive/hooks/useVotedProposals';
import { filterDelegates } from 'modules/delegates/helpers/filterDelegates';
import { fetchLandingPageData } from 'modules/home/api/fetchLandingPageData';
import { LandingPageData } from 'modules/home/api/fetchLandingPageData';
import { shuffleArray } from 'lib/common/shuffleArray';
import { useAllDelegates } from 'modules/gql/hooks/useAllDelegates';

const LandingPage = ({
  proposals,
  polls,
  delegates,
  stats,
  mkrOnHat,
  hat,
  mkrInChief
}: LandingPageData) => {
  const bpi = useBreakpointIndex();
  const [videoOpen, setVideoOpen] = useState(false);
  const [mode] = useColorMode();
  const [backgroundImage, setBackroundImage] = useState('url(/assets/bg_medium.jpeg)');

  const [recognizedDelegates, meetYourDelegates] = useMemo(() => {
    const recognized = filterDelegates(delegates, false, true, false, null);
    const meet = shuffleArray(
      // filter out previous contracts for delegates who have migrated, but the old contract has not yet expired
      recognized.filter(({ next }) => !next)
    );
    return [recognized, meet];
  }, [delegates]);

  // change background on color mode switch
  useEffect(() => {
    setBackroundImage(mode === 'dark' ? 'url(/assets/bg_dark_medium.jpeg)' : 'url(/assets/bg_medium.jpeg)');
  }, [mode]);

  // account
  const { account, votingAccount } = useAccount();

  // polls
  const activePolls = useMemo(() => polls.filter(poll => isActivePoll(poll)).slice(0, 4), [polls]);
  const pollCategories = getCategories(polls);

  // delegates
  const topDelegates = recognizedDelegates
    .sort((a, b) => (new BigNumber(a.mkrDelegated).gt(new BigNumber(b.mkrDelegated)) ? -1 : 1))
    .slice(0, 5);

  const activeDelegates = recognizedDelegates
    .sort((a, b) => {
      const [first] = a.combinedParticipation?.split('%') || '0';
      const [second] = b.combinedParticipation?.split('%') || '0';
      return parseFloat(second) - parseFloat(first);
    })
    .slice(0, 5);

  // executives
  const { data: votedProposals, mutate: mutateVotedProposals } = useVotedProposals();

  // revalidate votedProposals if connected address changes
  useEffect(() => {
    mutateVotedProposals();
  }, [votingAccount]);

  // Use intersection observers to change the hash on scroll
  const [activeTab, setActiveTab] = useState('#vote');

  const { ref: voteRef, inView: voteInview } = useInView({
    /* Optional options */
    threshold: 0.5
  });

  const { ref: learnRef, inView: learnInview } = useInView({
    /* Optional options */
    threshold: 0.5
  });

  const { ref: engageRef, inView: engageInview } = useInView({
    /* Optional options */
    threshold: 0.5
  });

  const { ref: delegateRef, inView: delegateInview } = useInView({
    /* Optional options */
    threshold: 0.5
  });

  useEffect(() => {
    if (learnInview) {
      setActiveTab('#learn');
    } else if (voteInview) {
      setActiveTab('#vote');
    } else if (engageInview) {
      setActiveTab('#engage');
    } else if (delegateInview) {
      setActiveTab('#delegate');
    }
  }, [learnInview, voteInview, engageInview, delegateInview]);

  const hashChangeHandler = useCallback(() => {
    setActiveTab(window.location.hash);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('hashchange', hashChangeHandler);
      return () => {
        window.removeEventListener('hashchange', hashChangeHandler);
      };
    }
  }, []);

  return (
    <div>
      {delegates.length === 0 && polls.length === 0 && (
        <Alert variant="warning">
          <Text>There is a problem loading the governance data. Please, try again later.</Text>
        </Alert>
      )}
      <Box
        as={'div'}
        sx={{
          left: 0,
          pt: '100%',
          width: '100%',
          minHeight: '670px',
          zIndex: -1,
          bottom: '50px',
          position: 'absolute',
          backgroundImage,
          backgroundSize: ['cover', 'cover'],
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <VideoModal isOpen={videoOpen} onDismiss={() => setVideoOpen(false)} url={VIDEO_URLS.howToVote} />
      <StickyContainer>
        <PrimaryLayout sx={{ maxWidth: 'page' }}>
          <Stack gap={[5, 6]} separationType="p">
            <section>
              <Flex sx={{ flexDirection: ['column', 'column', 'row'], justifyContent: 'space-between', marginTop: '32px' }}>
                <Flex sx={{ p: 3, width: ['100%', '100%', '50%'], flexDirection: 'column' }}>
                  <Text sx={{ color: 'text', fontSize: '28px', fontWeight: 'bold' }}>
                    Dijets Governance
                  </Text>
                  <Text as="p" sx={{ fontWeight: 'semiBold', my: 3, width: ['100%', '100%', '80%'] }}>
                    Vote with or delegate your HAL tokens to shape Dijets Ecosystem and its future.
                  </Text>
                  <Box>
                    <PlayButton
                      label="How to vote"
                      onClick={() => setVideoOpen(true)}
                      styles={{ mr: [1, 3] }}
                    />
                  </Box>
                </Flex>
                <Flex sx={{ py: 3, px: [1, 3], width: ['100%', '100%', '50%'], flexDirection: 'column' }}>
                  <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text sx={{boxSizing: 'border-box',
                    margin: '0',
                    minWidth: '0',
                    textAlign: 'center',
                    fontWeight: 800,
                    fontSize: '15px',
                        }}>DIP0: The Genesis DIP</Text>
                    <InternalLink href={'/executive'} title="DIP #0">
                      <ViewMore />
                    </InternalLink>
                  </Flex>
                  <Flex sx={{ mt: 3 }}>
                    <ErrorBoundary componentName="DIP #0">
                      {proposals ? (
                        proposals.length > 0 ? (
                          <ExecutiveOverviewCard
                            votedProposals={votedProposals}
                            account={account}
                            isHat={hat ? hat.toLowerCase() === proposals[0].address.toLowerCase() : false}
                            proposal={proposals[0]}
                          />
                        ) : (
                          <Text>No proposals found</Text>
                        )
                      ) : (
                        <Skeleton />
                      )}
                    </ErrorBoundary>
                  </Flex>
                </Flex>
              </Flex>
            </section>

            <section>
              <ErrorBoundary componentName="Governance Stats">
                <GovernanceStats polls={polls} stats={stats} mkrOnHat={mkrOnHat} mkrInChief={mkrInChief} />
              </ErrorBoundary>
            </section>
            <section id="vote">
              <Sticky topOffset={bpi < 1 ? 1050 : 700}>
                {({ style }) => (
                  <Box
                    style={{
                      ...style,
                      zIndex: 100,
                      width: 'auto',
                      left: 0,
                      display: 'none',
                      top: 66
                    }}
                  >
                    <TabsNavigation activeTab={activeTab} />
                  </Box>
                )}
              </Sticky>
              <Box ref={voteRef} />
              <Box sx={{ mt: 3 }}>
                <PollsOverviewLanding activePolls={activePolls} allPolls={polls} />
              </Box>
              <PollCategoriesLanding pollCategories={pollCategories} />
            </section>

            <section id="delegate">
              <Box ref={delegateRef} />
              <ErrorBoundary componentName="Meet Delegates">
                <MeetDelegates delegates={meetYourDelegates} bpi={bpi} />
              </ErrorBoundary>
            </section>

            <section id="engage">
              <Box ref={engageRef} />
              <Participation activeDelegates={activeDelegates} bpi={bpi} />
            </section>
            <Flex
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              sx={{ justifyContent: 'flex-end', mb: 3 }}
            >
              <ViewMore label="Back to the top" icon="chevron_up" />
            </Flex>
          </Stack>
        </PrimaryLayout>
      </StickyContainer>
    </div>
  );
};

export default function Index({
  proposals: prefetchedProposals,
  polls: prefetchedPolls,
  mkrOnHat: prefetchedMkrOnHat,
  hat: prefetchedHat,
  mkrInChief: prefetchedMkrInChief
}: LandingPageData): JSX.Element {
  const { network } = useWeb3();
  const delegatesData = useAllDelegates();

  const fallbackData = isDefaultNetwork(network)
    ? {
        proposals: prefetchedProposals,
        polls: prefetchedPolls,
        mkrOnHat: prefetchedMkrOnHat,
        hat: prefetchedHat,
        mkrInChief: prefetchedMkrInChief
      }
    : null;

  const { cache } = useSWRConfig();
  const cacheKey = `page/landing/${network}`;
  const { data, error } = useSWR<Partial<LandingPageData>>(
    !network || isDefaultNetwork(network) ? null : cacheKey,
    () => fetchLandingPageData(network, true),
    {
      revalidateOnMount: !cache.get(cacheKey),
      ...(fallbackData && { fallbackData })
    }
  );

  if (!isDefaultNetwork(network) && !data && !error) {
    return <PageLoadingPlaceholder sidebar={false} />;
  }

  if (error) {
    return (
      <PrimaryLayout sx={{ maxWidth: 'dashboard' }}>
        <ErrorPage statusCode={500} title="Error fetching data" />
      </PrimaryLayout>
    );
  }

  const props = {
    proposals: isDefaultNetwork(network) ? prefetchedProposals : data?.proposals ?? [],
    polls: isDefaultNetwork(network) ? prefetchedPolls : data?.polls || [],
    delegates: delegatesData.data?.delegates ?? [],
    stats: delegatesData.data?.stats,
    mkrOnHat: isDefaultNetwork(network) ? prefetchedMkrOnHat : data?.mkrOnHat ?? undefined,
    hat: isDefaultNetwork(network) ? prefetchedHat : data?.hat ?? undefined,
    mkrInChief: isDefaultNetwork(network) ? prefetchedMkrInChief : data?.mkrInChief ?? undefined
  };

  return <LandingPage {...props} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const { proposals, polls, mkrOnHat, hat, mkrInChief } = await fetchLandingPageData(
    SupportedNetworks.DIJETS
  );

  return {
    revalidate: 5 * 60, // allow revalidation every 30 minutes
    props: {
      proposals,
      polls,
      mkrOnHat,
      hat,
      mkrInChief
    }
  };
};
