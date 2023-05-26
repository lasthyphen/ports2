import { Text } from 'theme-ui';

type Props = {
  children: string | JSX.Element;
  testId?: string;
};

export const StatusText = (props: Props): JSX.Element => (
  <Text
    as="p"
    variant="caps"
    datatest-id={props.testId}
    sx={{ textAlign: 'center', px: [2, 3], color: '#bababa', fontSize: '11px', wordBreak: 'break-word' }}
  >
    {props.children}
  </Text>
);
