import { SupportedNetworks } from '../constants/networks';
import { config } from 'lib/config';
import { ethers, providers } from 'ethers';

export const getDefaultProvider = (
  network: SupportedNetworks | string | undefined,
  optionsOverrides?: Record<string, string>
): providers.BaseProvider => {
  const options = {
    ...(optionsOverrides || {})
  };

  return ethers.getDefaultProvider(network, options);
};
