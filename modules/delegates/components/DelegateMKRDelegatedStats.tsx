import BigNumber from 'lib/bigNumberJs';
import { Box, Flex } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import { useMkrDelegated } from 'modules/mkr/hooks/useMkrDelegated';
import { Delegate } from 'modules/delegates/types';
import { StatBox } from 'modules/app/components/StatBox';
import { useAccount } from 'modules/app/hooks/useAccount';
import { formatValue } from 'lib/string';
import Tooltip from 'modules/app/components/Tooltip';
import { getDescription } from 'modules/polling/components/VotingWeight';
import { useMKRVotingWeight } from 'modules/mkr/hooks/useMKRVotingWeight';
import Skeleton from 'react-loading-skeleton';

export function DelegateMKRDelegatedStats({
  delegate,
  delegatorCount
}: {
  delegate: Delegate;
  delegatorCount?: number;
}): React.ReactElement {
  const { account } = useAccount();
  // TODO: Fetch addresses suporting through API fetching

  const { data: mkrStaked } = useMkrDelegated(account, delegate.voteDelegateAddress);
  const { data: votingWeight } = useMKRVotingWeight(delegate.voteDelegateAddress);

  return (
    <Flex
      sx={{
        display: ['flex','grid'],
        gridTemplateColumns: '1fr 1fr 1fr',
        gridGap: '12px',
        flexDirection: ['column-reverse', 'row'],
        marginTop: 3,
        marginBottom: 3,
        boxSizing: 'border-box',
        minWidth: '0px',
        padding: ['18px 16px 18px', '18px 32px 18px'],
        borderRadius: '20px',
        border: 'unset',
        height: 'auto',
        width: '100%',
        background:
          'linear-gradient(90.65deg, rgb(252 241 254 / 35%) 1.31%, rgb(255 241 246 / 62%) 99.99%)'
      }}
    >
      <StatBox
        label={'Voting Weight'}
        tooltip={
          <Tooltip label={getDescription({ votingWeight, isDelegate: true })}>
            <Box>
              <Icon sx={{ ml: 1 }} name="question" />
            </Box>
          </Tooltip>
        }
          value={
            !votingWeight ? (
              <Skeleton width="100%" height="15px" />
            ) : votingWeight?.chiefBalanceHot ? (
              formatValue(votingWeight?.chiefBalanceHot)
            ) : (
              'Untracked'
            )
        }
      />
      <StatBox
        label={'LQs Rewarded'}
        value={typeof delegatorCount !== 'undefined' ? new BigNumber(delegatorCount).toFormat(0) : '0.00'}
      />
      {account && (
        <StatBox
          label={'Delegated HAL'}
          value={typeof mkrStaked !== 'undefined' ? formatValue(mkrStaked) : '0.00'}
        />
      )}
    </Flex>
  );
}
