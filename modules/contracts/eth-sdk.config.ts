import type { EthSdkConfig } from '@dethcrypto/eth-sdk';
import 'dotenv/config';
import { ArbitrumPollingAddressMap } from '../web3/constants/addresses';

declare let process: any;

const config: EthSdkConfig = {
  contracts: {
    mainnet: {
      chief: '0x0a3f6849f78076aefaDf113F5BED87720274dDC0',
      chiefOld: '0x9eF05f7F6deB616fd37aC3c959a2dDD25A54E4F5',
      dai: '0x6b175474e89094c44da98b954eedeac495271d0f',
      // This is an arbitrary spell address that must be changed with each implementation
      dssSpell: '0x6f076E9eB81828fa83d9c3E0aa3E088AD24Ee20B',
      end: '0x0e2e8F1D1326A4B9633D96222Ce399c708B19c28',
      esm: '0x09e05fF6142F2f9de8B6B65855A1d56B6cfE4c58',
      iou: '0xa618e54de493ec29432ebd2ca7f14efbf6ac17f7',
      iouOld: '0x496C67A4CEd9C453A60F3166AB4B329870c8E355',
      mkr: '0x207Ac23cf698ce54ad2AE2391be5df4b8c66430F',
      pause: '0xbe286431454714f511008713973d3b053a2d38f3',
      pauseProxy: '0xBE8E3e3618f7474F8cB1d074A26afFef007E98FB',
      polling: '0xD3A9FE267852281a1e6307a1C37CDfD76d39b133',
      pollingOld: '0xF9be8F0945acDdeeDaA64DFCA5Fe9629D0CF8E5D',
      pot: '0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7',
      vat: '0x35D1b3F3D7966A1DFe207aa4514C12a259A0492B',
      voteDelegateFactory: '0xD897F108670903D1d6070fcf818f9db3615AF272',
      voteProxyFactory: '0x6FCD258af181B3221073A96dD90D1f7AE7eEc408',
      voteProxyFactoryOld: '0xa63E145309cadaa6A903a19993868Ef7E85058BE',
      vow: '0xA950524441892A31ebddF91d3cEEFa04Bf454466'
    },
    goerli: {
      chief: '0x33Ed584fc655b08b2bca45E1C5b5f07c98053bC1',
      dai: '0x11fe4b6ae13d2a6055c8d9cf65c55bac32b5d844',
      // This is an arbitrary spell address that must be changed with each implementation
      dssSpell: '0xc4BCED0F4f141915dcCE58DbAB2D2DEe88af472B',
      end: '0xb82F60bAf6980b9fE035A82cF6Acb770C06d3896',
      esm: '0x023A960cb9BE7eDE35B433256f4AfE9013334b55',
      iou: '0x651D1B91e4F657392a51Dba7A6A1A1a72eC6aD1c',

      mkr: '0xc5e4eab513a7cd12b2335e8a0d57273e13d499f7',
      pause: '0xefcd235B1f13e7fC5eab1d05C910d3c390b3439F',
      pauseProxy: '0x5DCdbD3cCF9B09EAAD03bc5f50fA2B3d3ACA0121',
      polling: '0xdbE5d00b2D8C13a77Fb03Ee50C87317dbC1B15fb',
      pot: '0x50672F0a14B40051B65958818a7AcA3D54Bd81Af',
      vat: '0xB966002DDAa2Baf48369f5015329750019736031',
      voteDelegateFactory: '0xE2d249AE3c156b132C40D07bd4d34e73c1712947',
      voteProxyFactory: '0x1a7c1ee5eE2A3B67778ff1eA8c719A3fA1b02b6f',
      vow: '0x23f78612769b9013b3145E43896Fa1578cAa2c2a'
    },
    dijets: {
      chief: '0x23Cb958bE9fdD002606E99bC032E55C8C2a6D433',
      dai: '0xda1A79024d0D5ad60C40dCC31DBb433388e26584',

      dssSpell: '0xf993e0024A4d848168e8a60B09268c4036ae4eAe',
      end: '0xd4AA5c77fb4923d9Bbdade722745202517e42C0B',
      esm: '0x6F101749A8260580eD8Ae5513d8D75bcEd59Ec40',
      iou: '0x9196f19497D9576c2a99071340D8b3535cB712B2',

      mkr: '0xEFbe9981E4bdc773Bb438ceC391A40efA5BbF33E',
      pause: '0x95657E1ebCf6ea3D4E53D3eb53736b3DC90C31B4',
      pauseProxy: '0x5b190A85fb41D7C1d173a4501f12b81c28F59824',
      polling: '0x2c17cF8032469ef943dF192dFf678826F03F50da',
      pot: '0x34c4b2d1b042Eb401c90D7d7b1FC5a6fB33675a5',
      vat: '0xc2B5a1786bdbe38664e1a6bff5126F92dC1078A4',
      voteDelegateFactory: '0xE5967bD2f18dC73ABe81DDA1f4305B8379809C6e',
      voteProxyFactory: '0xc3e785313e3d52a66c20291e78cf399E4c9D9246',
      vow: '0xDaDD02Ce9d58ccFd3779EDB1cC4308d8bA9162f2'
    },
    arbitrumGoerliTestnet: {
      polling: ArbitrumPollingAddressMap['goerli']
    },
    arbitrumOne: {
      polling: ArbitrumPollingAddressMap['mainnet']
    }
  },
  etherscanKeys: { mainnet: process.env.ETHERSCAN_KEY || '' },
  etherscanURLs: {
    arbitrumGoerliTestnet: 'https://goerli-rollup-explorer.arbitrum.io/api',
    arbitrumOne: 'https://api.arbiscan.io/api',
    dijets: 'https://utility-explorer.swedencentral.cloudapp.azure.com/api',
  }
};

export default config;
