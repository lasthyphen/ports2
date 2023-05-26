import { Text, ThemeUIStyleObject } from 'theme-ui';

type Props = {
  title: string;
  styles?: ThemeUIStyleObject;
  dataTestId?: string;
};

export const CardTitle = ({ title, styles, dataTestId = 'card-title' }: Props): JSX.Element => (
  <Text data-testid={dataTestId} sx={{ fontSize: 3, mt: 2, letterSpacing: '0.02em', ...styles }}>
    {title}
  </Text>
);
