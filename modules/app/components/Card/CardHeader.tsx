import { Text, ThemeUIStyleObject } from 'theme-ui';

type Props = {
  text: string;
  styles?: ThemeUIStyleObject;
};

export const CardHeader = ({ text, styles }: Props): JSX.Element => (
  <Text as="h5" variant="caps" sx={{ color: 'textSecondary', ...styles, marginBottom: '14px' }}>
    {text}
  </Text>
);
