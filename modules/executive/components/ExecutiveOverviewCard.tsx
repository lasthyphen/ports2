import { useState } from 'react';
import { Text, Flex, Box, Button, Badge, Divider, Card } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import { BigNumber } from 'ethers';
import Skeleton from 'modules/app/components/SkeletonThemed';
import { formatDateWithoutTime } from 'lib/datetime';
import { formatValue } from 'lib/string';
import { getStatusText } from 'modules/executive/helpers/getStatusText';
import { InternalLink } from 'modules/app/components/InternalLink';
import { Proposal } from 'modules/executive/types';
import VoteModal from './VoteModal';
import { CardHeader } from 'modules/app/components/Card/CardHeader';
import { CardTitle } from 'modules/app/components/Card/CardTitle';
import { CardSummary } from 'modules/app/components/Card/CardSummary';
import { useAnalytics } from 'modules/app/client/analytics/useAnalytics';
import { ANALYTICS_PAGES } from 'modules/app/client/analytics/analytics.constants';
import { ZERO_ADDRESS } from 'modules/web3/constants/addresses';
import { StatBox } from 'modules/app/components/StatBox';
import { useExecutiveComments } from 'modules/comments/hooks/useExecutiveComments';
import CommentCount from 'modules/comments/components/CommentCount';
import { StatusText } from 'modules/app/components/StatusText';
import { useMigrationStatus } from 'modules/migration/hooks/useMigrationStatus';

type Props = {
  proposal: Proposal;
  isHat: boolean;
  account?: string;
  votedProposals: string[];
  mkrOnHat?: BigNumber;
};

export default function ExecutiveOverviewCard({
  proposal,
  isHat,
  account,
  votedProposals,
  mkrOnHat
}: Props): JSX.Element {
  const { trackButtonClick } = useAnalytics(ANALYTICS_PAGES.EXECUTIVE);
  const [voting, setVoting] = useState(false);
  const { comments } = useExecutiveComments(proposal.address);

  const hasVotedFor =
    votedProposals &&
    !!votedProposals.find(
      proposalAddress => proposalAddress.toLowerCase() === proposal.address.toLowerCase()
    );

  if (!('about' in proposal)) {
    return (
      <Card sx={{ p: [0, 0] }}>
        <Box sx={{ p: 3 }}>
          <Text>mandate address {proposal.address}</Text>
        </Box>
      </Card>
    );
  }

  const canVote = !!account;

  const { isDelegateContractExpired } = useMigrationStatus();

  return (
    <Card
      sx={{
        p: [0, 0],
        width: '100%',
      }}
    >
      <Flex
        sx={{
          flexDirection: 'column',
          px: [3, 4],
          pt: [3, proposal.spellData?.hasBeenScheduled ? 3 : 4],
          pb: [2],
          justifyContent: 'space-between'
        }}
      >
        <Flex sx={{ justifyContent: 'space-between' }}>
          <Box>
            <Flex sx={{ flexDirection: 'column' }}>
              <InternalLink href={`/executive/${proposal.key}`} title="View mandate details">
                <>
                  <CardHeader text={`posted ${formatDateWithoutTime(proposal.date)}`} />
                  <CardTitle title={proposal.title} styles={{ mt: 2, fontSize: '15px', fontWeight: 700 }} />
                  <CardSummary text={proposal.proposalBlurb} styles={{ marginTop: 3, marginBottom: 2, fontSize: '14px', color: '#757575' }} />
                </>
              </InternalLink>
              <Flex sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                {isHat && proposal.address !== ZERO_ADDRESS ? (
                  // TODO this should be made the primary badge component in our theme
                  <Box
                    sx={{
                      borderRadius: '12px',
                      padding: '4px 8px',
                      display: 'flex',
                      alignItems: 'center',
                      color: 'tagColorThree',
                      backgroundColor: 'tagColorThreeBg',
                      my: 2
                    }}
                  >
                    <Text sx={{ fontSize: 2 }}>Governing Proposal</Text>
                  </Box>
                ) : null}
              </Flex>
            </Flex>
          </Box>
        </Flex>

        <Flex sx={{ flexDirection: 'column' }}>
          <Box sx={{ mt: 2, mb: 1 }}>
            {comments && comments.length > 0 && (
              <InternalLink href={`/executive/${proposal.key}`} title="View Comments" hash="comments">
                <CommentCount count={comments.length} />
              </InternalLink>
            )}
          </Box>
          <Flex
            sx={{
              flexDirection: ['column', 'row'],
              alignItems: ['stretch', 'center'],
              justifyContent: 'space-between',
              height: ['auto', 'auto', 'auto', 74]
            }}
          >
            <Flex
              sx={{
                flexDirection: ['column', 'row'],
                flexWrap: 'wrap-reverse',
                width: 'auto',
                gap: [3, 4]
              }}
            >
              <InternalLink href={`/executive/${proposal.key}`} title="View mandate details">
                <Button
                  variant="primaryLagress"
                  sx={{
                    boxSizing: 'border-box',
                    margin: '0px',
                    minWidth: '0px',
                    appearance: 'none',
                    textAlign: 'center',
                    textDecoration: 'none',
                    padding: '8px 24px',
                    border: '0px',
                    fontFamily: 'Inter, "Helvetica Neue", sans-serif',
                    lineHeight: '1em',
                    fontSize: '14px',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    borderRadius: '32px',
                    transition: 'background 200ms ease 0s',
                    width: '100%',
                    height: '42px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'rgba(0, 0, 0, 0.13) 0px 2px 8px',
                    backgroundColor: '#25273d',
                  }}
                >
                  Proposal Details
                </Button>
              </InternalLink>
              {!hasVotedFor && canVote && (
                <Button
                  variant="primaryLagress"
                  sx={{                     
                  boxSizing: 'border-box',
                  margin: '0px',
                  minWidth: '0px',
                  appearance: 'none',
                  textAlign: 'center',
                  textDecoration: 'none',
                  padding: '8px 18px',
                  border: '0px',
                  fontFamily: 'Inter, "Helvetica Neue", sans-serif',
                  lineHeight: '1em',
                  fontSize: '14px',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  borderRadius: '32px',
                  transition: 'background 200ms ease 0s',
                  width: ['100%', '148px'],
                  height: '42px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'rgba(0, 0, 0, 0.13) 0px 2px 8px',
                  backgroundColor: '#25273d', }}
                  disabled={
                    (hasVotedFor && votedProposals && votedProposals.length === 1) ||
                    isDelegateContractExpired
                  }
                  onClick={ev => {
                    trackButtonClick('openExecVoteModal');
                    setVoting(true);
                    ev.stopPropagation();
                  }}
                  data-testid="vote-button-exec-overview-card"
                >
                  {'Cast your Vote'}
                </Button>
              )}
              {hasVotedFor && (
                <Badge
                  variant="primary"
                  sx={{
                    color: 'primary',
                    borderColor: 'primary',
                    textTransform: 'uppercase',
                    display: 'inline-flex',
                    alignItems: 'center',
                    m: 1,
                    border: 'none'
                  }}
                >
                  <Flex sx={{ display: 'inline-flex', pr: 2 }}>
                    <Icon name="verified" size={3} />
                  </Flex>
                  Your Vote
                </Badge>
              )}
            </Flex>
            <Flex sx={{ flexShrink: 0, justifyContent: 'flex-end', marginTop: ['8px', '0px'] }}>
              {proposal.spellData?.mkrSupport === undefined ? (
                <Box sx={{ width: 6, ml: 'auto', height: '100%' }}>
                  <Skeleton />
                </Box>
              ) : (
                <StatBox
                  value={formatValue(BigNumber.from(proposal.spellData?.mkrSupport))}
                  label="HAL Locked"
                  styles={{ textAlign: 'right',  }}
                />
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      {voting && <VoteModal proposal={proposal} close={() => setVoting(false)} />}

      <Flex sx={{ flexDirection: 'column', justifySelf: 'flex-end' }}>
        <Divider my={0} mx={3} sx={{ color: 'rgb(240, 240, 240)' }} />
        <Flex sx={{ py: 3, justifyContent: 'center' }}>
          <StatusText testId="proposal-status">
            {getStatusText({ proposalAddress: proposal.address, spellData: proposal.spellData, mkrOnHat })}
          </StatusText>
        </Flex>
      </Flex>
    </Card>
  );
}
