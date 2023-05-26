import { Card, Heading, Box, Flex, Button, Text, Spinner, Divider } from 'theme-ui';
import { SupportedNetworks } from 'modules/web3/constants/networks';
import { Poll } from 'modules/polling/types';
import VotingWeight from './VotingWeight';
import PollBar from './BallotPollBar';
import { useAnalytics } from 'modules/app/client/analytics/useAnalytics';
import { ANALYTICS_PAGES } from 'modules/app/client/analytics/analytics.constants';
import { useContext } from 'react';
import { BallotContext } from '../context/BallotContext';
import { InternalLink } from 'modules/app/components/InternalLink';
import EtherscanLink from 'modules/web3/components/EtherscanLink';

type Props = { activePolls: Poll[]; network: SupportedNetworks.DIJETS; polls: Poll[] };

export default function BallotBox({ activePolls, network, polls }: Props): JSX.Element {
  const { trackButtonClick } = useAnalytics(ANALYTICS_PAGES.POLLING);

  const { transaction, ballotCount, clearBallot } = useContext(BallotContext);

  return (
    <Box sx={{ mb: 3 }}>
      <Heading mb={2} mt={4} variant="microHeading" data-testid="your-ballot-title">
        Your Ballot
      </Heading>
      {transaction?.hash && transaction.status === 'pending' ? (
        <Card variant="compact" p={[0, 0]} sx={{ justifyContent: 'center' }}>
          <Flex sx={{ justifyContent: 'center', flexDirection: 'column' }}>
            <Spinner size={48} mt={4} sx={{ color: 'notice', alignSelf: 'center' }} />
            <Text
              mt={3}
              px={4}
              sx={{ textAlign: 'center', fontSize: 16, color: 'secondaryEmphasis', fontWeight: '500' }}
            >
              Transaction Sent. Vote{ballotCount === 1 ? '' : 's'} pending.
            </Text>

            <EtherscanLink hash={transaction.hash} type="transaction" network={network} />
          </Flex>
        </Card>
      ) : (
        <Card variant="compact" sx={{background: 'linear-gradient(160.47deg, rgb(233 250 252) 0.35%, rgb(227 253 255) 99.18%),rgb(0, 0, 0)', padding: '16px', fontSize: '14px', fontWeight: 'bold', color: '#787a9b'}}>
          <PollBar polls={polls} activePolls={activePolls} />

          <Divider />
          <Box sx={{ borderBottom: '1px solid secondaryMuted', px: 3, py: 2 }}>
            <VotingWeight />
          </Box>
          <Divider m="0" sx={{ borderBottom: '1px solid', color: '#b9c3d552' }} />
          <Flex p={3} sx={{ flexDirection: 'column' }}>
            <InternalLink href="/polling/review" title="Review & submit your ballot">
              <Button
                onClick={() => {
                  trackButtonClick('reviewAndSubmitBallot');
                }}
                variant="primaryLagress"
                disabled={!ballotCount}
                sx={{ width: '100%', fontSize: '14px', justifyContent: 'center', cursor: !ballotCount ? 'not-allowed' : 'pointer' }}
              >
                Review & Submit Your Ballot
              </Button>
            </InternalLink>

            {ballotCount > 0 && (
              <Button
                variant="mutedOutline"
                sx={{ width: '100%', cursor: 'pointer', mt: 2 }}
                onClick={clearBallot}
              >
                Clear Ballot
              </Button>
            )}
          </Flex>
        </Card>
      )}
    </Box>
  );
}
