export const getExecutiveVotingWeightCopy = (isVotingDelegate: boolean): string =>
  isVotingDelegate
    ? 'Your mandates voting weight is made up of the wrapped DJTX delegated to your delegate contract. This amount is applied to any mandates you support.'
    : 'Your mandate voting weight is made up of the WDJTX (Wrapped DJTX) in your vote proxy and voting contract. This amount is applied to any mandates you support.';
