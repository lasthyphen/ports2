import { Icon } from '@makerdao/dai-ui-icons';
import { Button, Flex, Text, ThemeUIStyleObject } from 'theme-ui';

type Props = { label: string; onClick: () => void; styles?: ThemeUIStyleObject; disabled?: boolean };

export const PlayButton = ({ label, onClick, styles, disabled }: Props): JSX.Element => (
  <Button variant="outlinear" sx={{ ...styles, fontWeight: '600', background: 'rgba(255, 255, 255, 0.5)', borderColor: '#c2e1d1' }} onClick={onClick} disabled={disabled}>
    <Flex sx={{ alignItems: 'center' }}>
      <Icon sx={{ mr: 2, color: '#787a9b' }} name="play" size={'20px'} />
      <Text color="#787a9b">{label}</Text>
    </Flex>
  </Button>
);
