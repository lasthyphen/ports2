import { useState } from 'react';
import { Button, Flex, Text, Box, Alert, Link } from 'theme-ui';
import { DialogOverlay, DialogContent } from 'modules/app/components/Dialog';

import Stack from 'modules/app/components/layout/layouts/Stack';
import { MKRInput } from './MKRInput';
import TxIndicators from 'modules/app/components/TxIndicators';
import { BoxWithClose } from 'modules/app/components/BoxWithClose';
import { useLockedMkr } from 'modules/mkr/hooks/useLockedMkr';
import { useAnalytics } from 'modules/app/client/analytics/useAnalytics';
import { ANALYTICS_PAGES } from 'modules/app/client/analytics/analytics.constants';
import { useApproveUnlimitedToken } from 'modules/web3/hooks/useApproveUnlimitedToken';
import { useAccount } from 'modules/app/hooks/useAccount';
import { BigNumber } from 'ethers';
import { useTokenAllowance } from 'modules/web3/hooks/useTokenAllowance';
import { parseUnits } from 'ethers/lib/utils';
import { useContracts } from 'modules/web3/hooks/useContracts';
import { useFree } from '../hooks/useFree';
import { Tokens } from 'modules/web3/constants/tokens';

const ModalContent = ({ close, ...props }) => {
  const { trackButtonClick } = useAnalytics(ANALYTICS_PAGES.EXECUTIVE);
  const { account, voteProxyContract, voteProxyContractAddress, voteProxyHotAddress } = useAccount();

  const [mkrToWithdraw, setMkrToWithdraw] = useState(BigNumber.from(0));
  const { chief } = useContracts();

  const { data: allowance, mutate: mutateTokenAllowance } = useTokenAllowance(
    Tokens.IOU,
    parseUnits('100000000'),
    account,
    voteProxyContract ? undefined : chief.address
  );

  const { approve, tx: approveTx, setTxId: resetApprove } = useApproveUnlimitedToken(Tokens.IOU);

  const allowanceOk = voteProxyContract ? true : allowance; // no need for IOU approval when using vote proxy

  const { data: lockedMkr, mutate: mutateLocked } = useLockedMkr(voteProxyContractAddress || account);

  const { free, tx: freeTx, setTxId: resetFree } = useFree();

  const [transaction, resetTransaction] = allowanceOk ? [freeTx, resetFree] : [approveTx, resetApprove];

  return (
    <BoxWithClose close={close} {...props}>
      <Box>
        {transaction && (
          <Stack sx={{ textAlign: 'center' }}>
            <Text as="p" variant="microHeading">
              {transaction.status === 'pending' ? 'Transaction Pending' : 'Confirm Transaction'}
            </Text>

            <Flex sx={{ justifyContent: 'center' }}>
              <TxIndicators.Pending sx={{ width: 6 }} />
            </Flex>

            {transaction.status !== 'pending' && (
              <Box>
                <Text as="p" sx={{ color: 'secondaryEmphasis', fontSize: 3 }}>
                  Please use your wallet to confirm this transaction.
                </Text>
                <Text
                  as="p"
                  sx={{ color: 'secondary', cursor: 'pointer', fontSize: 2, mt: 2 }}
                  onClick={() => resetTransaction(null)}
                >
                  Cancel
                </Text>
              </Box>
            )}
          </Stack>
        )}
        {!transaction && allowanceOk && (
          <Stack gap={2}>
            <Box sx={{ textAlign: 'center' }}>
              <Text as="p" variant="microHeading" mb={2}>
                Withdraw from voting contract
              </Text>
              <Text as="p" sx={{ color: 'secondaryEmphasis', fontSize: 3 }}>
                Input the amount of HAL to withdraw from the voting contract.
              </Text>
            </Box>

            <Box>
              <MKRInput
                onChange={setMkrToWithdraw}
                balance={lockedMkr}
                value={mkrToWithdraw}
                balanceText="HAL in contract:"
              />
            </Box>

            {voteProxyContract && account === voteProxyHotAddress && (
              <Alert variant="notice" sx={{ fontWeight: 'normal' }}>
                You are using the hot wallet for a voting proxy HAL will be withdrawn to the cold wallet.
              </Alert>
            )}
            <Button
              sx={{ flexDirection: 'column', width: '100%', alignItems: 'center', mt: 3 }}
              disabled={mkrToWithdraw.eq(0) || !lockedMkr || mkrToWithdraw.gt(lockedMkr)}
              data-testid="button-withdraw-mkr"
              onClick={() => {
                trackButtonClick('withdrawMkr');
                free(mkrToWithdraw, {
                  mined: () => {
                    // Mutate locked state
                    mutateLocked();
                    close();
                  },
                  error: () => close()
                });
              }}
            >
              Withdraw HAL
            </Button>
          </Stack>
        )}
        {!transaction && !allowanceOk && (
          <Stack gap={3} {...props}>
            <Box sx={{ textAlign: 'center' }}>
              <Text as="p" variant="microHeading" mb={2}>
                Approve voting contract
              </Text>
              <Text as="p" sx={{ color: 'secondaryEmphasis', fontSize: 3 }}>
                Approve the transfer of IOU tokens to the voting contract to withdraw your HAL.
              </Text>
            </Box>

            <Button
              sx={{ flexDirection: 'column', width: '100%', alignItems: 'center' }}
              onClick={() => {
                trackButtonClick('approveWithdraw');
                approve(chief.address, {
                  mined: () => {
                    mutateTokenAllowance();
                    resetApprove(null);
                  },
                  error: () => {
                    resetApprove(null);
                  }
                });
              }}
              data-testid="withdraw-approve-button"
            >
              Approve
            </Button>
          </Stack>
        )}
      </Box>
    </BoxWithClose>
  );
};

const Withdraw = (props): JSX.Element => {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <>
      <DialogOverlay isOpen={showDialog} onDismiss={() => setShowDialog(false)}>
        <DialogContent aria-label="Executive Votes" widthDesktop="520px">
          <ModalContent sx={{ px: [3, null] }} close={() => setShowDialog(false)} />
        </DialogContent>
      </DialogOverlay>
      {props.link ? (
        <Link
          onClick={() => setShowDialog(true)}
          sx={{ textDecoration: 'underline', cursor: 'pointer', color: 'inherit' }}
        >
          {props.link}
        </Link>
      ) : (
        <Button
        variant="mutedOutlinerz"
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
          backgroundColor: '#8b6af6',
          borderColor: '#9360ff'
        }}
          onClick={() => setShowDialog(true)}
          {...props}
          data-testid="withdraw-button"
        >
          Withdraw
        </Button>
      )}
    </>
  );
};

export default Withdraw;
