import { Box, Heading, Card, Text } from 'theme-ui';
import { useBreakpointIndex } from '@theme-ui/match-media';

import VotingStatus from '../PollVotingStatus';
import QuickVote from './QuickVote';
import { isActivePoll } from 'modules/polling/helpers/utils';
import { Poll } from 'modules/polling/types';
import { useAccount } from 'modules/app/hooks/useAccount';

export default function VoteBox({ poll, ...props }: { poll: Poll }): JSX.Element {
  const bpi = useBreakpointIndex();
  const { account } = useAccount();
  const canVote = !!account && isActivePoll(poll);
  const showQuickVote = canVote && bpi > 0;

  return (
    <Box {...props} data-testid="poll-vote-box">
      <Heading mb={2} as="h3" variant="microHeading">
        Your Vote
      </Heading>
      <Card variant="compact" sx={{background: 'linear-gradient(160.47deg, rgb(233 250 252) 0.35%, rgb(227 253 255) 99.18%),rgb(0, 0, 0)', padding: '18px', fontSize: '14px', color: '#787a9b'}}>
        <Text sx={{ fontSize: '16px', fontWeight: 'normal', color: 'black'}}>
          {poll.title}
        </Text>
        <Text as="p" sx={{ fontSize: 2, color: 'textSecondary', my: 2 }}>
          {poll.summary}
        </Text>
        <VotingStatus sx={{ my: 2, textAlign: 'center' }} poll={poll} />
        {showQuickVote && <QuickVote poll={poll} showReviewButton={true} />}
      </Card>
    </Box>
  );
}
