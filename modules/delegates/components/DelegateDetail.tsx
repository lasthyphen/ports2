import React, { useState } from 'react';
import { Alert, Box, Text, Flex, Divider } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import Tabs from 'modules/app/components/Tabs';
import BigNumber from 'lib/bigNumberJs';
import {
  DelegatePicture,
  DelegateCredentials,
  DelegateVoteHistory,
  DelegateParticipationMetrics
} from 'modules/delegates/components';
import { Delegate } from 'modules/delegates/types';
import { DelegateStatusEnum } from 'modules/delegates/delegates.constants';
import { DelegateMKRDelegatedStats } from './DelegateMKRDelegatedStats';
import { DelegateMKRChart } from './DelegateMKRChart';
import useSWR, { useSWRConfig } from 'swr';
import { fetchJson } from 'lib/fetchJson';
import { PollingParticipationOverview } from 'modules/polling/components/PollingParticipationOverview';
import { AddressAPIStats } from 'modules/address/types/addressApiResponse';
import LastVoted from 'modules/polling/components/LastVoted';
import { useLockedMkr } from 'modules/mkr/hooks/useLockedMkr';
import DelegatedByAddress from 'modules/delegates/components/DelegatedByAddress';
import { useAccount } from 'modules/app/hooks/useAccount';
import { useWeb3 } from 'modules/web3/hooks/useWeb3';
import AccountComments from 'modules/comments/components/AccountComments';
import { Address } from 'modules/address/components/Address';
import { formatDelegationHistory } from '../helpers/formatDelegationHistory';
import { CoreUnitModal } from './modals/CoreUnitModal';
import { CoreUnitButton } from './modals/CoreUnitButton';
import { InternalLink } from 'modules/app/components/InternalLink';
import DelegateTags from './DelegateTags';
import DelegateExpiryDate from 'modules/migration/components/DelegateExpiryDate';
import EtherscanLink from 'modules/web3/components/EtherscanLink';

type PropTypes = {
  delegate: Delegate;
};

export function DelegateDetail({ delegate }: PropTypes): React.ReactElement {
  const { voteDelegateAddress } = delegate;
  const { network } = useWeb3();
  const { cache } = useSWRConfig();
  const [showCoreUnitModal, setShowCoreUnitModal] = useState(false);

  const handleInfoClick = () => {
    setShowCoreUnitModal(!showCoreUnitModal);
  };

  const dataKeyDelegateStats = `/api/address/stats?address=${
    delegate.voteDelegateAddress
  }&network=${network}${delegate.previous ? `&address=${delegate.previous.voteDelegateAddress}` : ''}`;
  const { data: statsData } = useSWR<AddressAPIStats>(delegate ? dataKeyDelegateStats : null, fetchJson, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnMount: !cache.get(dataKeyDelegateStats),
    revalidateOnReconnect: false
  });

  const { data: totalStaked } = useLockedMkr(delegate.voteDelegateAddress);
  const { voteDelegateContractAddress } = useAccount();
  const delegationHistory = formatDelegationHistory(delegate.mkrLockedDelegate);

  const activeDelegators = delegationHistory.filter(({ lockAmount }) => new BigNumber(lockAmount).gt(0));
  const delegatorCount = activeDelegators.length;
  const isOwner = delegate.voteDelegateAddress.toLowerCase() === voteDelegateContractAddress?.toLowerCase();

  const tabTitles = [
    delegate.status === DelegateStatusEnum.recognized ? 'Credentials' : null,
    'Metrics',
    'History',
    'Comments'
  ].filter(i => !!i) as string[];

  const tabPanels = [
    delegate.status === DelegateStatusEnum.recognized ? (
      <Box key="delegate-credentials">
        <DelegateCredentials delegate={delegate} />
      </Box>
    ) : null,
    <Box key="delegate-participation-metrics">
      {delegate.status === DelegateStatusEnum.recognized && (
        <DelegateParticipationMetrics delegate={delegate} />
      )}
      {delegate.status === DelegateStatusEnum.recognized && <Divider />}
      {delegationHistory.length > 0 && totalStaked ? (
        <>
          <Box sx={{ pl: [3, 4], pr: [3, 4], py: [3, 4] }}>
            <DelegatedByAddress delegators={delegationHistory} totalDelegated={totalStaked} />
          </Box>
          <Divider />

          <Box sx={{ pl: [3, 4], pr: [3, 4], pb: [3, 4] }}>
            <DelegateMKRChart delegate={delegate} />
          </Box>
          <Divider />
        </>
      ) : (
        <Box p={[3, 4]} mt={1}>
          <Text>No metrics data found</Text>
        </Box>
      )}
      {statsData && <PollingParticipationOverview votes={statsData.pollVoteHistory} />}
    </Box>,
    <Box key="delegate-vote-history">
      <DelegateVoteHistory delegate={delegate} dataKeyDelegateStats={dataKeyDelegateStats} />
    </Box>,
    <Box key="account-comments" sx={{ p: [3, 4] }}>
      <AccountComments address={delegate.voteDelegateAddress} />
    </Box>
  ].filter(i => !!i);

  return (
    <Box sx={{ variant: 'cards.primary', p: [0, 0] }}>
      <Box sx={{ pl: [3, 4], pr: [3, 4], pt: [3, 4], pb: 2 }}>
        {delegate?.next?.voteDelegateAddress && (
          <InternalLink href={`/address/${delegate?.next?.voteDelegateAddress}`} title="View migration page">
            <Flex sx={{ mb: 4 }}>
              <Alert
                variant="warning"
                sx={{
                  fontWeight: 'normal'
                }}
              >
                You are viewing an older contract. View delegate&apos;s renewed contract
                <Icon name="chevron_right" size={2} ml={2} />
              </Alert>
            </Flex>
          </InternalLink>
        )}
        <Flex
          sx={{
            justifyContent: 'space-between',
            flexDirection: ['column', 'row']
          }}
        >
          <Box>
            <Flex sx={{ mb: 1 }}>
              <DelegatePicture delegate={delegate} key={delegate.id} width={52} />
              <Box sx={{ width: '100%' }}>
                <Box sx={{ ml: 3 }}>
                  <Flex sx={{ alignItems: 'center' }}>
                    <Text as="p" variant="microHeading" sx={{ fontSize: ['16px', '22px'], fontWeight: '600' }}>
                      {delegate.name !== '' ? delegate.name : 'DGC Member'}
                    </Text>
                    {isOwner && (
                      <Flex
                        sx={{
                          display: 'inline-flex',
                          color: 'transparent',
                          padding: '0px 12px',
                          alignItems: 'center',
                          backgroundImage: 'url(/assets/verified.svg)',
                          backgroundSize: 'contain',
                          backgroundRepeat: 'no-repeat',
                          ml: 2
                        }}
                      >
                        <Text sx={{ fontSize: 1 }}>Owner</Text>
                      </Flex>
                    )}
                  </Flex>
                  <Box>
                  <EtherscanLink
                  showBlockExplorerName={false}
                  type="address"
                  prefix="Delegate contract"
                  hash={voteDelegateAddress}
                  network={network}
                />
                </Box>
                </Box>
              </Box>
            </Flex>
            <DelegateTags tags={delegate.tags} />
          </Box>
          <Flex sx={{ my: [3, 0], flexDirection: 'column',  fontSize: '12px', alignItems: ['flex-start', 'flex-end'] }}>
            <CoreUnitButton handleInfoClick={handleInfoClick} />
            <LastVoted
              expired={delegate.expired}
              date={statsData ? (statsData.lastVote ? statsData.lastVote.blockTimestamp : null) : undefined}
              styles={{ my: 1, fontSize: '12px' }}
            />
            <DelegateExpiryDate delegate={delegate} />
          </Flex>
        </Flex>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <DelegateMKRDelegatedStats delegate={delegate} delegatorCount={delegatorCount} />
        </Box>
      </Box>

      <Tabs tabListStyles={{ pl: [3, 4] }} tabTitles={tabTitles} tabPanels={tabPanels}></Tabs>
      {showCoreUnitModal && (
        <CoreUnitModal isOpen={showCoreUnitModal} onDismiss={() => setShowCoreUnitModal(false)} />
      )}
    </Box>
  );
}
