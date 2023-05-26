import { Box, Label, Checkbox, ThemeUIStyleObject } from 'theme-ui';
import shallow from 'zustand/shallow';
import useDelegatesFiltersStore from 'modules/delegates/stores/delegatesFiltersStore';

export function DelegatesShowExpiredFilter({ ...props }: { sx?: ThemeUIStyleObject }): JSX.Element {
  const [showExpired, setShowExpiredFilter] = useDelegatesFiltersStore(
    state => [state.filters.showExpired, state.setShowExpiredFilter],
    shallow
  );

  const handleChecked = () => {
    setShowExpiredFilter(!showExpired);
  };

  return (
    <Box {...props}>
      <Label variant="thinLabel" sx={{ fontSize: '11px', color: '#868685', alignItems: 'center' }}>
        <Checkbox checked={showExpired} onChange={handleChecked} />
        Show Expired Delegates
      </Label>
    </Box>
  );
}
