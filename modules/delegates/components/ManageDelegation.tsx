import { Card, Box, Button, Heading } from 'theme-ui';
import React, { useState } from 'react';
import { Delegate } from '../types';
import { ANALYTICS_PAGES } from 'modules/app/client/analytics/analytics.constants';
import { useAnalytics } from 'modules/app/client/analytics/useAnalytics';
import { DelegateModal } from './modals/DelegateModal';
import { UndelegateModal } from './modals/UndelegateModal';
import { useLockedMkr } from 'modules/mkr/hooks/useLockedMkr';
import { useMkrDelegated } from 'modules/mkr/hooks/useMkrDelegated';
import { useAccount } from 'modules/app/hooks/useAccount';

export default function ManageDelegation({
  delegate,
  textDelegate = 'Delegate HAL to this delegate',
  textUndelegate = 'Undelegate HAL from this delegate'
}: {
  delegate: Delegate;
  textDelegate?: string;
  textUndelegate?: string;
}): React.ReactElement {
  const { account } = useAccount();
  const { trackButtonClick } = useAnalytics(ANALYTICS_PAGES.DELEGATE_DETAIL);
  const [showDelegateModal, setShowDelegateModal] = useState(false);
  const [showUndelegateModal, setShowUndelegateModal] = useState(false);

  const { mutate: mutateTotalStaked } = useLockedMkr(delegate.voteDelegateAddress);
  const { mutate: mutateMkrStaked } = useMkrDelegated(account, delegate.voteDelegateAddress);

  return (
    <Box>
      <Heading mt={3} mb={2} as="h3" variant="microHeading">
        Manage Delegation
      </Heading>
      <Card variant="compact" sx={{ borderRadius: '20px',
        background: 'rgb(224, 249, 240)',
        padding: '32px' }}>
        <Box>
          <Button
            variant="primaryLarge2"
            data-testid="button-delegate"
            disabled={!account}
            onClick={() => {
              trackButtonClick('openDelegateModal');
              setShowDelegateModal(true);
            }}
            sx={{ width: '100%', height: 'auto', mb: [3], background: '#2fccaed6', boxShadow: 'rgba(0, 0, 0, 0.13) 0px 2px 8px', fontWeight: '700', border: '1px solid #22e8da4a' }}
          >
            {textDelegate}
          </Button>
        </Box>

        <Box>
          <Button
            variant="primaryLarge2"
            disabled={!account}
            onClick={() => {
              trackButtonClick('openUndelegateModal');
              setShowUndelegateModal(true);
            }}
            sx={{ width: '100%', height: 'auto', background: '#25273d', boxShadow: 'rgba(0, 0, 0, 0.13) 0px 2px 8px', fontWeight: '700', color: '#ffffff', border: '1px solid #ff8cc845' }}
          >
            {textUndelegate}
          </Button>
        </Box>
      </Card>
      {showDelegateModal && (
        <DelegateModal
          delegate={delegate}
          isOpen={showDelegateModal}
          onDismiss={() => setShowDelegateModal(false)}
          mutateTotalStaked={mutateTotalStaked}
          mutateMKRDelegated={mutateMkrStaked}
        />
      )}
      {showUndelegateModal && (
        <UndelegateModal
          delegate={delegate}
          isOpen={showUndelegateModal}
          onDismiss={() => setShowUndelegateModal(false)}
          mutateTotalStaked={mutateTotalStaked}
          mutateMKRDelegated={mutateMkrStaked}
        />
      )}
    </Box>
  );
}
