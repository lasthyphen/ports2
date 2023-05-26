import { Flex, Box, Button, Text, Card } from 'theme-ui';
import { useState, useRef } from 'react';
import { DialogOverlay, DialogContent } from 'modules/app/components/Dialog';
import { useBreakpointIndex } from '@theme-ui/match-media';
import { BigNumberJS } from 'lib/bigNumberJs';
import { BigNumber } from 'ethers';
import { formatValue } from 'lib/string';
import { formatDateWithTime } from 'lib/datetime';
import PrimaryLayout from 'modules/app/components/layout/layouts/Primary';
import BurnModal from 'modules/esm/components/BurnModal';
import ShutdownModal from 'modules/esm/components/ShutdownModal';
import ProgressRing from 'modules/esm/components/ProgressRing';
import ESMHistory from 'modules/esm/components/ESMHistory';
import { useEsmTotalStaked } from 'modules/esm/hooks/useEsmTotalStaked';
import { useEsmIsActive } from 'modules/esm/hooks/useEsmIsActive';
import { HeadComponent } from 'modules/app/components/layout/Head';
import { useAllEsmV2Joins } from 'modules/gql/hooks/useAllEsmV2Joins';
import { useEsmThreshold } from 'modules/esm/hooks/useEsmThreshold';
import { useAccount } from 'modules/app/hooks/useAccount';
import { useMkrInEsmByAddress } from 'modules/esm/hooks/useMkrInEsm';
import { useCageTime } from 'modules/esm/hooks/useCageTime';
import { useLockedMkr } from 'modules/mkr/hooks/useLockedMkr';
import { ErrorBoundary } from 'modules/app/components/ErrorBoundary';
import { ExternalLink } from 'modules/app/components/ExternalLink';

const ESModule = (): React.ReactElement => {
  const loader = useRef<HTMLDivElement>(null);
  const { account } = useAccount();
  const [showDialog, setShowDialog] = useState(false);
  const bpi = useBreakpointIndex();

  const { data: allEsmJoins } = useAllEsmV2Joins();
  const { data: totalStaked, mutate: mutateTotalStaked } = useEsmTotalStaked();
  const { data: thresholdAmount } = useEsmThreshold();
  const { data: esmIsActive } = useEsmIsActive();
  const { data: mkrInEsmByAddress, mutate: mutateMkrInEsmByAddress } = useMkrInEsmByAddress(account);
  const { data: cageTime } = useCageTime();
  const { data: lockedInChief } = useLockedMkr(account);

  const esmThresholdMet = !!totalStaked && !!thresholdAmount && totalStaked.gte(thresholdAmount);

  const DesktopView = () => {
    return (
      <>
        <Flex sx={{ flexDirection: 'row' }}>
          <Text data-testid="total-mkr-esmodule-staked">
            {totalStaked ? (
              `${formatValue(totalStaked, 'wad', 6)}`
            ) : (
              <Box pl="14px" pr="14px">
                <div ref={loader} />
              </Box>
            )}
          </Text>
          {thresholdAmount && (
            <Text color="#708390" sx={{ fontWeight: '400' }}>
              &nbsp;of {thresholdAmount ? `${formatValue(thresholdAmount, 'wad', 0)} HAL` : '---'}
            </Text>
          )}
        </Flex>
        <Box
          sx={{
            borderRadius: 'medium',
            minHeight: 20,
            backgroundColor: 'secondary',
            height: '20px',
            my: 3
          }}
          data-testid="progress-bar"
        >
          {thresholdAmount && (
            <Box
              as="div"
              style={{
                borderRadius: 'inherit',
                height: '100%',
                transition: 'width 0.2s ease-in',
                backgroundColor: '#f75625',
                minHeight: '20px',
                width: totalStaked
                  ? `${
                      esmThresholdMet
                        ? '100'
                        : formatValue(totalStaked.mul(100).div(thresholdAmount), 'wad', 0)
                    }%`
                  : '0%'
              }}
            />
          )}
        </Box>
      </>
    );
  };

  const MobileView = () => {
    return (
      <>
        <ProgressRing
          progress={
            esmThresholdMet
              ? esmIsActive
                ? 100
                : new BigNumberJS(formatValue(totalStaked.mul(100).div(thresholdAmount), 'wad', 0)).toNumber()
              : 0
          }
          totalStaked={totalStaked}
          thresholdAmount={thresholdAmount}
        />
      </>
    );
  };

  return (
    <PrimaryLayout sx={{ maxWidth: 'container' }}>
      <HeadComponent title="Veto Module" />

      <DialogOverlay isOpen={showDialog} onDismiss={() => setShowDialog(false)}>
        <DialogContent aria-label="Executive Vote">
          {totalStaked ? (
            !esmThresholdMet ? (
              <BurnModal
                setShowDialog={setShowDialog}
                lockedInChief={lockedInChief || BigNumber.from(0)}
                totalStaked={totalStaked}
                mutateTotalStaked={mutateTotalStaked}
                mutateMkrInEsmByAddress={mutateMkrInEsmByAddress}
              />
            ) : (
              <ShutdownModal setShowDialog={setShowDialog} thresholdAmount={thresholdAmount} />
            )
          ) : (
            <Box pl="14px" pr="14px">
              <div ref={loader} />
            </Box>
          )}
        </DialogContent>
      </DialogOverlay>
      {cageTime && cageTime.gt(0) && (
        <Flex
          sx={{
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid #F75524',
            borderRadius: 'medium',
            backgroundColor: '#FDEDE8',
            color: '#994126',
            p: 3,
            fontSize: 1,
            my: 3
          }}
        >
          <Text data-testid="es-initiated" sx={{ textAlign: 'center' }}>
            Emergency shutdown has been initiated on {formatDateWithTime(cageTime.toNumber())}. This dashboard
            is currently read-only. You can read more information about next steps{' '}
            <ExternalLink
              href=""
              title="Learn about the veto module"
            >
              <Text>here</Text>
            </ExternalLink>
            .
          </Text>
        </Flex>
      )}
      <Box>
        <Text variant="heading">DGC Veto Module</Text>
      </Box>
      <Box mt={4}>
        <Text variant="text" sx={{ color: 'onSecondary' }}>
          The Veto Module allows the guardian account (a multisig vault) to cease polling for a proposal to mitigate malicious governance attempts and/or intents. The Guardian account should lock {' '}
          {thresholdAmount ? `${formatValue(thresholdAmount, 'wad', 0)}` : '---'} HAL before calling the cease function of the module. The 75K HAL acts as a security and protects the module against abuse.{' '}
          <ExternalLink
            href=""
            title="View the veto  docs"
          >
            <Text>Read the documentation here.</Text>
          </ExternalLink>
        </Text>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Text sx={{ fontSize: '16px'}}>Total HAL Deposited</Text>
      </Box>
      <Card mt={3}>
        {bpi < 1 ? <MobileView /> : <DesktopView />}
        <Flex
          sx={{
            flexDirection: bpi > 0 ? 'row' : 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: bpi < 1 ? 2 : undefined
          }}
        >
          {!account && (
            <Box p={2}>
              <Text color="#9FAFB9" sx={{ fontWeight: '300', alignSelf: 'center' }}>
                No Account Connected
              </Text>
            </Box>
          )}
          {totalStaked && account ? (
            <Button
              onClick={() => setShowDialog(true)}
              variant="outline"
              sx={{ color: 'onNotice', borderColor: 'notice' }}
            >
              {esmThresholdMet ? 'Initiate Veto Module' : 'Deposit Your HAL'}
            </Button>
          ) : null}
          <Box p={2}>
            <Text color="#9FAFB9" sx={{ fontWeight: '300', alignSelf: 'center' }}>
              {mkrInEsmByAddress && mkrInEsmByAddress.gt(0) ? (
                <Box>
                  You burned{' '}
                  <strong style={{ fontWeight: 'bold' }}>{formatValue(mkrInEsmByAddress, 'wad', 6)}</strong>{' '}
                  in the VM
                </Box>
              ) : (
                'You have no HAL in the veto Module'
              )}
            </Text>
          </Box>
        </Flex>
      </Card>
      <Box mt={5}>
        <Text variant="microHeading">Veto History</Text>
      </Box>
      <ErrorBoundary componentName="Veto History">
        <ESMHistory allEsmJoins={allEsmJoins} />
      </ErrorBoundary>
    </PrimaryLayout>
  );
};

export default function ESModulePage(): JSX.Element {
  return (
    <ErrorBoundary componentName="Vetoed Proposals">
      <ESModule />
    </ErrorBoundary>
  );
}
