import { GoerliSdk, MainnetSdk, DijetsSdk, ArbitrumGoerliTestnetSdk, ArbitrumOneSdk } from '@dethcrypto/eth-sdk-client';
import { providers, Signer } from 'ethers';

export type ContractName =
  | 'chief'
  | 'chiefOld'
  | 'dai'
  | 'end'
  | 'esm'
  | 'mkr'
  | 'iou'
  | 'iouOld'
  | 'pause'
  | 'pauseProxy'
  | 'polling'
  | 'pollingOld'
  | 'pot'
  | 'vat'
  | 'voteDelegateFactory'
  | 'voteProxyFactory'
  | 'vow';

export type EthSdk = MainnetSdk | GoerliSdk | DijetsSdk;

export type SignerOrProvider = Signer | providers.Provider;

export type SdkGenerators = {
  mainnet: (signerOrProvider: SignerOrProvider) => MainnetSdk;
  goerli: (signerOrProvider: SignerOrProvider) => GoerliSdk;
  dijets: (signerOrProvider: SignerOrProvider) => DijetsSdk;
  goerlifork: (signerOrProvider: SignerOrProvider) => GoerliSdk;
};

export type ArbitrumSdkGenerators = {
  mainnet: (signerOrProvider: SignerOrProvider) => ArbitrumOneSdk;
  goerli: (signerOrProvider: SignerOrProvider) => ArbitrumGoerliTestnetSdk;
};
