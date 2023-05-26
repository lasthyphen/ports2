import { ExternalLink } from 'modules/app/components/ExternalLink';
import { Box, Text, ThemeUIStyleObject } from 'theme-ui';
import { CHAIN_INFO, SupportedNetworks } from '../constants/networks';
import { getBlockExplorerName, networkNameToChainId } from '../helpers/chain';
import { getEtherscanLink } from '../helpers/getEtherscanLink';
import { Icon } from '@makerdao/dai-ui-icons';
import { formatAddress } from 'lib/utils';
import React from 'react';

export default function EtherscanLink({
  network,
  hash,
  type,
  showAddress = false,
  showBlockExplorerName = true,
  prefix = 'View on ',
  suffix = '',
  styles
}: {
  network: SupportedNetworks.DIJETS;
  hash: string;
  type: 'transaction' | 'address';
  showAddress?: boolean;
  showBlockExplorerName?: boolean;
  prefix?: string;
  suffix?: string;
  styles?: ThemeUIStyleObject;
}): React.ReactElement {
  const blockExplorerName = getBlockExplorerName(network);
  const chainId = networkNameToChainId(network);
  const isGasless = CHAIN_INFO[chainId]?.type === 'gasless';

  return (
    <Box sx={{ color: 'accentBlue' }}>
      <ExternalLink href={getEtherscanLink(network, hash, type)} title='View on Dijets UC Explorer'>
        <Text
          sx={{ color: 'inherit', fontSize:'14px', display: 'flex', alignItems: 'center', width: '100%', ...(styles || {}) }}
        >
          {showAddress && formatAddress(hash)}
          {!showAddress && (
            <React.Fragment>
              {isGasless && <Icon name="lightningBolt" color="primary" size={3} mr={1} />}
              {prefix}
              {showBlockExplorerName ? 'Dijets Explorer' : ''}
              {suffix}
            </React.Fragment>
          )}
          <Icon name="arrowTopRight" size={2} ml={1} color="inherit" />
        </Text>
      </ExternalLink>
    </Box>
  );
}
