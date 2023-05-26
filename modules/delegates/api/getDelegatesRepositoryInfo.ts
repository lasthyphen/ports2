import { SupportedNetworks } from 'modules/web3/constants/networks';

export type RepositoryInfo = {
  owner: string;
  repo: string;
  page: string;
};

export function getDelegatesRepositoryInformation(network: SupportedNetworks): RepositoryInfo {
  const repoMainnet = {
    owner: 'lasthyphen',
    repo: 'dgc-polls',
    page: 'governance/delegates'
  };

  const repoTest = {
    owner: 'lasthyphen',
    repo: 'dgc-polls',
    page: 'governance/delegates'
  };

  const delegatesRepositoryInfo = network === SupportedNetworks.DIJETS ? repoMainnet : repoTest;
  return delegatesRepositoryInfo;
}
