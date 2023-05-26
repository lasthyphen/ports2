import { Text, Image, Flex, Heading, Container, Link as ExternalLink, Card } from 'theme-ui';
import Stack from 'modules/app/components/layout/layouts/Stack';
import { ViewMore } from './ViewMore';
import useSWR from 'swr';
import { format, sub } from 'date-fns';
import ParticipationChart from './ParticipationChart';
import forumPosts from '../data/forumPosts.json';
import { Delegate } from 'modules/delegates/types';
import { useWeb3 } from 'modules/web3/hooks/useWeb3';
import SkeletonThemed from 'modules/app/components/SkeletonThemed';
import { AllLocksResponse, ForumPost } from '../types/participation';
import DelegateAvatarNameLight from 'modules/delegates/components/DelegateAvatarNameLight';
import { ErrorBoundary } from 'modules/app/components/ErrorBoundary';

const ForumPosts = ({ posts, bpi }: { posts: ForumPost[]; bpi: number }) => {
  return (
    <Flex sx={{ flexDirection: 'column', gap: 3 }}>
      <Flex sx={{ justifyContent: 'space-between' }}>
        <Heading>Browse the Governance Forum</Heading>
        <ExternalLink href="https://forum.dijets.io" title="View Forum Posts" target="_blank">
          <ViewMore label="View Forum" />
        </ExternalLink>
      </Flex>
      <Flex sx={{ gap: 3, justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {posts.map(({ title, image, summary, link }) => {
          return (
            <Card
              key={title}
              variant="compact"
              sx={{
                flex: [undefined, undefined, undefined, 1]
              }}
            >
              <Flex
                sx={{
                  gap: 3,
                  flexDirection: bpi > 0 ? 'row' : 'column'
                }}
              >
                <Image
                  src={image}
                  sx={bpi > 0 ? { ...{ minWidth: '282px', width: '282px', height: '207px' } } : undefined}
                />
                <Flex
                  sx={{
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <Flex sx={{ flexDirection: 'column', gap: 2 }}>
                    <Heading variant="microHeading">{title}</Heading>
                    <Text variant="smallText" sx={{ color: 'textSecondary' }}>
                      {summary}
                    </Text>
                  </Flex>
                  <ExternalLink href={link} title="View Forum Post" target="_blank">
                    <ViewMore label="Read More" />
                  </ExternalLink>
                </Flex>
              </Flex>
            </Card>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default function Participation({
  activeDelegates,
  bpi
}: {
  activeDelegates: Delegate[];
  bpi: number;
}): React.ReactElement {
  const { network } = useWeb3();
  const MONTHS_PAST = 6;
  // This makes sure the timestamp is the same throughout the day so the SWR cache-key doesn't change
  const unixtimeStart =
    new Date(format(sub(new Date(), { months: MONTHS_PAST }), 'yyyy-MM-dd')).getTime() / 1000;

  const { data: locks } = useSWR<AllLocksResponse[]>(
    `/api/executive/all-locks?network=${network}&unixtimeStart=${unixtimeStart}`
  );

  return (
    <Flex sx={{ flexDirection: 'column', gap: 4, mb: 4 }}>
      <Container sx={{ textAlign: 'center', maxWidth: 'title' }}>
        <Stack gap={2}>
          <Heading as="h2">Follow the Conversation and Participate</Heading>
          <Text as="p" sx={{ color: 'textSecondary', px: 'inherit', fontSize: [2, 4] }}>
            Engage with Dijets Community and make informed decisions.
          </Text>
        </Stack>
      </Container>

      <ForumPosts posts={forumPosts} bpi={bpi} />

      <Flex
        sx={{
          pt: 4,
          justifyContent: 'space-between',
          gap: [5, 3],
          flexDirection: bpi > 1 ? 'row' : 'column'
        }}
      >
        <ErrorBoundary componentName="Governance Participation">
          <Flex sx={{ flexDirection: 'column', flex: 2, gap: 3 }}>
            <Flex sx={{ justifyContent: 'space-between' }}>
              <Heading>Member Participation Stats</Heading>
            </Flex>
            {locks ? (
              locks.length > 0 ? (
                <Card
                  sx={{
                    height: '100%',
                    pr: [0, 3],
                    pb: 3
                  }}
                >
                  <ParticipationChart data={locks} monthsPast={MONTHS_PAST} />
                </Card>
              ) : null
            ) : (
              <SkeletonThemed height="300px" />
            )}
          </Flex>
        </ErrorBoundary>

        <ErrorBoundary componentName="Top Voters">
          <Flex sx={{ flexDirection: 'column', flex: 1, gap: 3 }}>
            <Flex sx={{ justifyContent: 'space-between' }}>
              <Heading>Top Voters</Heading>
              <ExternalLink
                href="https://dijets.io/council"
                title="More on DGC Members"
                target="_blank"
              >
                <ViewMore label="More on DGC Members" />
              </ExternalLink>
            </Flex>
            <Card
              sx={{
                flexDirection: 'column',
                gap: 3,
                p: 3,
                height: '100%'
              }}
            >
              <Flex sx={{ justifyContent: 'space-between' }}>
                <Text variant="caps" sx={{ color: 'secondaryEmphasis' }}>
                  Address
                </Text>
                <Text variant="caps" sx={{ color: 'secondaryEmphasis' }}>
                  Participation
                </Text>
              </Flex>
              {activeDelegates.map((delegate, i) => (
                <Flex
                  key={delegate.voteDelegateAddress}
                  sx={{ justifyContent: 'space-between', alignItems: 'center', mt: '14px', borderBottom: '1px solid #0000001c', paddingBottom: '10px' }}
                >
                  <Flex sx={{ alignItems: 'center', gap: 3 }}>
                    <Text>{i + 1}</Text>
                    <DelegateAvatarNameLight delegate={delegate} />
                  </Flex>
                  <Text sx={{ color: 'secondaryEmphasis', fontSize: '14px' }}>{delegate.combinedParticipation}</Text>
                </Flex>
              ))}
            </Card>
          </Flex>
        </ErrorBoundary>
      </Flex>
    </Flex>
  );
}
