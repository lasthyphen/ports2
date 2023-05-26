import { useState } from 'react';
import { Button, Flex, Text, Box, Link } from 'theme-ui';
import { DialogOverlay, DialogContent } from 'modules/app/components/Dialog';

import Stack from 'modules/app/components/layout/layouts/Stack';
import { MKRInput } from './MKRInput';
import TxIndicators from 'modules/app/components/TxIndicators';
import { BoxWithClose } from 'modules/app/components/BoxWithClose';
import { useMkrBalance } from 'modules/mkr/hooks/useMkrBalance';
import { useLockedMkr } from 'modules/mkr/hooks/useLockedMkr';
import { useAnalytics } from 'modules/app/client/analytics/useAnalytics';
import { ANALYTICS_PAGES } from 'modules/app/client/analytics/analytics.constants';
import { useApproveUnlimitedToken } from 'modules/web3/hooks/useApproveUnlimitedToken';
import { useAccount } from 'modules/app/hooks/useAccount';
import { useContracts } from 'modules/web3/hooks/useContracts';
import { BigNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import { useTokenAllowance } from 'modules/web3/hooks/useTokenAllowance';
import { useLock } from '../hooks/useLock';
import { Tokens } from 'modules/web3/constants/tokens';
import { ExternalLink } from 'modules/app/components/ExternalLink';

const ModalContent = ({
  close,
  showProxyInfo
}: {
  close: () => void;
  showProxyInfo?: boolean;
}): React.ReactElement => {
  const [mkrToDeposit, setMkrToDeposit] = useState(BigNumber.from(0));
  const { trackButtonClick } = useAnalytics(ANALYTICS_PAGES.EXECUTIVE);
  const { account, voteProxyContractAddress, voteProxyColdAddress } = useAccount();
  const { data: mkrBalance } = useMkrBalance(account);

  const { mutate: mutateLocked } = useLockedMkr(voteProxyContractAddress || account);
  const { chief } = useContracts();

  const { data: chiefAllowance, mutate: mutateTokenAllowance } = useTokenAllowance(
    Tokens.MKR,
    parseUnits('100000000'),
    account,
    account === voteProxyColdAddress ? (voteProxyContractAddress as string) : chief.address
  );

  const { approve, tx: approveTx, setTxId: resetApprove } = useApproveUnlimitedToken(Tokens.MKR);

  const { lock, tx: lockTx, setTxId: resetLock } = useLock();

  const [tx, resetTx] = chiefAllowance ? [lockTx, resetLock] : [approveTx, resetApprove];

  return (
    <BoxWithClose close={close}>
      <Box>
        {tx && (
          <Stack sx={{ textAlign: 'center' }}>
            <Text as="p" variant="microHeading">
              {tx.status === 'pending' ? 'Transaction Pending' : 'Confirm Transaction'}
            </Text>

            <Flex sx={{ justifyContent: 'center' }}>
              <TxIndicators.Pending sx={{ width: 6 }} />
            </Flex>

            {tx.status !== 'pending' && (
              <Box>
                <Text sx={{ color: 'secondaryEmphasis', fontSize: 3 }}>
                  Please use your wallet to confirm this transaction.
                </Text>
                <Text
                  as="p"
                  sx={{ color: 'secondary', cursor: 'pointer', fontSize: 2, mt: 2 }}
                  onClick={() => resetTx(null)}
                >
                  Cancel
                </Text>
              </Box>
            )}
          </Stack>
        )}
        {!tx && chiefAllowance && (
          <Stack gap={2}>
            <Box sx={{ textAlign: 'center' }}>
              <Text as="p" variant="microHeading">
                Deposit into voting contract
              </Text>
              <Text as="p" sx={{ color: 'secondaryEmphasis', fontSize: 3, mt: 3 }}>
                Input the amount of HAL to deposit into the voting contract.
              </Text>
            </Box>

            <Box>
              <MKRInput value={mkrToDeposit} onChange={setMkrToDeposit} balance={mkrBalance} />
            </Box>

            <Button
              data-testid="button-deposit-mkr"
              sx={{ flexDirection: 'column', width: '100%', alignItems: 'center' }}
              disabled={mkrToDeposit.eq(0) || mkrToDeposit.gt(mkrBalance || BigNumber.from(0))}
              onClick={() => {
                trackButtonClick('DepositMkr');
                lock(mkrToDeposit, {
                  mined: () => {
                    // Mutate locked state
                    mutateLocked();
                    close();
                  },
                  error: () => close()
                });
              }}
            >
              Deposit HAL
            </Button>
          </Stack>
        )}
        {!tx && !chiefAllowance && (
          <Stack gap={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Text as="p" variant="microHeading">
                Approve voting contract
              </Text>
              <Text as="p" sx={{ color: 'secondaryEmphasis', fontSize: 3, mt: 3 }}>
                Approve the transfer of HAL to the voting contract.
              </Text>
            </Box>

            <Button
              sx={{ flexDirection: 'column', width: '100%', alignItems: 'center' }}
              onClick={() => {
                trackButtonClick('approveDeposit');
                approve(voteProxyContractAddress || chief.address, {
                  mined: () => {
                    mutateTokenAllowance();
                  }
                });
              }}
              data-testid="deposit-approve-button"
            >
              Approve
            </Button>
            {showProxyInfo && (
              <Text as="p" sx={{ fontSize: 2, mt: 3, color: 'textSecondary', textAlign: 'center' }}>
                Interested in creating a proxy contract instead of depositing directly into CAP? Learn more{' '}
                <ExternalLink
                  href="https://forum.dijets.io"
                  title="Read about proxy contracts"
                >
                  <Text sx={{ color: 'accentBlue', fontSize: 2 }}>here</Text>
                </ExternalLink>{' '}
                and create one{' '}
                <ExternalLink href="https://dijets.io" title="Go to proxy setup">
                  <Text sx={{ color: 'accentBlue', fontSize: 2 }}>here</Text>
                </ExternalLink>
                .
              </Text>
            )}
          </Stack>
        )}
      </Box>
    </BoxWithClose>
  );
};

const Deposit = ({ link, showProxyInfo }: { link?: string; showProxyInfo?: boolean }): JSX.Element => {
  const { account, voteProxyContractAddress, voteProxyHotAddress } = useAccount();
  const { trackButtonClick } = useAnalytics(ANALYTICS_PAGES.EXECUTIVE);
  const [showDialog, setShowDialog] = useState(false);

  const open = () => {
    if (account && voteProxyContractAddress && account === voteProxyHotAddress) {
      alert(
        'You are using the hot wallet for a voting proxy. ' +
          'You can only deposit from the cold wallet. ' +
          'Switch to that wallet to continue.'
      );
      return;
    }
    setShowDialog(true);
  };

  return (
    <>
      <DialogOverlay isOpen={showDialog} onDismiss={() => setShowDialog(false)}>
        <DialogContent aria-label="Executive Votes" widthDesktop="520px">
          <ModalContent close={() => setShowDialog(false)} showProxyInfo={showProxyInfo} />
        </DialogContent>
      </DialogOverlay>
      {link ? (
        <Link
          onClick={() => {
            trackButtonClick('btn-click');
            open();
          }}
          sx={{ textDecoration: 'underline', cursor: 'pointer' }}
        >
          {link}
        </Link>
      ) : (
        <Button
          variant="mutedOutliner"
          sx={{
            appearance: 'none',
            display: 'inline-block',
            textAlign: 'center',
            lineHeight: 'inherit',
            textDecoration: 'none',
            fontSize: '14px',
            paddingLeft: '16px',
            paddingRight: '16px',
            borderRadius: '6px',
            cursor: 'pointer',
            outline: 'none',
            fontFamily:
              'Inter,-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Roboto,Ubuntu',
            boxShadow: 'rgb(0 0 0 / 14%) 0px 2px 8px',
            paddingTop: '3px',
            paddingBottom: '3px',
            color: '#ffffff',
            fontWeight: 600,
            letterSpacing: '0.03em',
            border: '1px solid',
            backgroundColor: '#57d4b9',
            borderColor: '#18cda6'
          }}
          onClick={() => {
            trackButtonClick('OpenDepositModal');
            open();
          }}
          data-testid="deposit-button"
        >
          Deposit
        </Button>
      )}
    </>
  );
};

export default Deposit;
