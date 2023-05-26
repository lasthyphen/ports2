import { SupportedChainId } from '../constants/chainID';
import { SupportedNetworks } from '../constants/networks';

export type BlockExplorer = 'Etherscan' | 'Arbiscan' | 'Blockscout' | 'block explorer';

export type SupportedChain = {
  blockExplorerUrl: string;
  blockExplorerName: BlockExplorer;
  chainId: SupportedChainId;
  label: string;
  network: SupportedNetworks;
  defaultRpc: string;
  spockUrl?: string;
  type: 'gasless' | 'normal';
  rpcs: {
    [key: string]: string;
  };
};
