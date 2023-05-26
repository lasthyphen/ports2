import { SupportedNetworks } from '../constants/networks';
import { getDefaultProvider } from './getDefaultProvider';
import { providers } from 'ethers';
import logger from 'lib/logger';

export async function getENS({
  address,
  provider
}: {
  address: string;
  provider: providers.Web3Provider;
}): Promise<string | null> {
  try {
    const name = await provider.lookupAddress(address);
    return name;
  } catch (err) {
    logger.error(`getENS: ${address}. Unable to get ENS.`, err);
    return null;
  }
}

export async function resolveENS(ensName: string): Promise<string | null> {
  const provider = getDefaultProvider(SupportedNetworks.DIJETS);

  try {
    const address = await provider.resolveName(ensName);
    return address;
  } catch (err) {
    logger.error(`resolveENS: ${ensName}. Unable to resolve.`, err);
    return null;
  }
}
