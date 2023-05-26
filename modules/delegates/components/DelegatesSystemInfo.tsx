import BigNumber from 'lib/bigNumberJs';
import StackLayout from 'modules/app/components/layout/layouts/Stack';
import SkeletonThemed from 'modules/app/components/SkeletonThemed';
import { Box, Card, Flex, Heading, Text } from 'theme-ui';
import { DelegatesAPIStats } from '../types';
import { useContractAddress } from 'modules/web3/hooks/useContractAddress';
import { useTotalSupply } from 'modules/web3/hooks/useTotalSupply';
import { BigNumberWAD } from 'modules/web3/constants/numbers';
import { useWeb3 } from 'modules/web3/hooks/useWeb3';
import { Tokens } from 'modules/web3/constants/tokens';
import EtherscanLink from 'modules/web3/components/EtherscanLink';

export function DelegatesSystemInfo({
  stats,
  className
}: {
  stats: DelegatesAPIStats;
  className?: string;
}): React.ReactElement {
  const delegateFactoryAddress = useContractAddress('voteDelegateFactory');
  const { network } = useWeb3();

  const { data: totalMkr } = useTotalSupply(Tokens.MKR);

  const statsItems = [
    {
      title: 'Total delegates',
      id: 'total-delegates-system-info',
      value: stats.total
    },
    {
      title: 'Recognized delegates',
      id: 'total-recognized-delegates-system-info',
      value: stats.recognized
    },
    {
      title: 'Shadow delegates',
      id: 'total-shadow-delegates-system-info',
      value: stats.shadow
    },
    {
      title: 'Total HAL Delegated',
      id: 'total-mkr-system-info',
      value: new BigNumber(stats.totalMKRDelegated).toFormat(0)
    },
    {
      title: 'Percent of HAL Delegated',
      id: 'percent-mkr-system-info',
      value: totalMkr ? (
        `${new BigNumber(stats.totalMKRDelegated)
          .dividedBy(new BigNumber(totalMkr._hex).div(BigNumberWAD))
          .multipliedBy(100)
          .toFormat(2)}%`
      ) : (
        <SkeletonThemed width={'100px'} height={'15px'} />
      )
    },
    {
      title: 'Total Delegators',
      id: 'total-delegators-system-info',
      value: stats.totalDelegators
    }
  ];

  return (
    <Box sx={{ mt: 3 }}>
      <Heading mt={3} mb={2} as="h3" variant="microHeading">
        System Info
      </Heading>
      <Card variant="compact" sx={{background: 'linear-gradient(160.47deg, rgb(246 248 255) 0.35%, rgb(254 248 255) 99.18%),rgb(255, 255, 255)', padding: '32px', fontSize: '14px', color: '#8386ab'}}>
        <StackLayout gap={3}>
          <Flex sx={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <Text sx={{ fontSize: '14px', color: '#7f7f8c' }}>Delegate Factory</Text>
            {delegateFactoryAddress ? (
              <EtherscanLink type="address" showAddress hash={delegateFactoryAddress} network={network} />
            ) : (
              <Box sx={{ width: 6 }}>
                <SkeletonThemed />
              </Box>
            )}
          </Flex>
          {statsItems.map(item => (
            <Flex key={item.id} sx={{ justifyContent: 'space-between', flexDirection: 'row' }}>
              <Text sx={{ fontSize: '14px', color: '#7f7f8c' }}>{item.title}</Text>
              <Text variant="h2" sx={{ fontSize: 3 }} data-testid={item.id}>
                {item.value}
              </Text>
            </Flex>
          ))}
        </StackLayout>
      </Card>
    </Box>
  );
}
