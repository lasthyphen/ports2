import { useMemo } from 'react';
import { BigNumberJS } from 'lib/bigNumberJs';
import Skeleton from 'modules/app/components/SkeletonThemed';
import { Stats } from 'modules/home/components/Stats';
import { Poll } from 'modules/polling/types';
import { DelegatesAPIStats } from 'modules/delegates/types';
import { isActivePoll } from 'modules/polling/helpers/utils';

type Props = {
  polls: Poll[];
  stats?: DelegatesAPIStats;
  mkrOnHat?: string;
  mkrInChief?: string;
};

export function GovernanceStats({ polls, stats, mkrOnHat, mkrInChief }: Props): JSX.Element {
  const activePollCount = useMemo(() => polls.filter(poll => isActivePoll(poll)).length, [polls]);

  const infoUnits = [
    {
      title: 'HAL in Governance',
      value: mkrOnHat ? '0.00 HAL' : <Skeleton />
    },
    {
      title: 'Active Polls',
      value: polls ? activePollCount.toString() : <Skeleton />
    },
    {
      title: 'DGC Members',
      value: stats ? '6' : <Skeleton />
    },
    {
      title: 'Shadow Delegates',
      value: stats ? stats.shadow.toString() : <Skeleton />
    },
    {
      title: 'HAL Delegated',
      value: stats ? '0.00 HAL' : <Skeleton />
    },
    {
      title: 'CAPs',
      value: mkrInChief ? '0' : <Skeleton />
    }
  ];

  return (
    <Stats
      title="Governance Stats"
      infoUnits={infoUnits}
      viewMoreUrl=""
    />
  );
}
