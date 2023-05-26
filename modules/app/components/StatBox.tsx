import { Box, Text, Flex, ThemeUIStyleObject } from 'theme-ui';
import Skeleton from 'modules/app/components/SkeletonThemed';

type Props = {
  value?: string | JSX.Element;
  label: string;
  styles?: ThemeUIStyleObject;
  tooltip?: string | JSX.Element;
};

export const StatBox = ({ value, label, tooltip, styles }: Props): JSX.Element => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        gap: '2px',
        m: 2,
        ...styles
      }}
    >
      <Box >
        {value ? (
          <Text
            data-testid={`${label}-stat-box`}
            as="p"
            sx={{
              color: 'secondaryAlt',
              fontWeight: 'bold',
              fontSize: ['16px', '20px']
            }}
          >
            {value}
          </Text>
        ) : (
          <Box sx={{ width: 5 }}>
            <Skeleton />
          </Box>
        )}
      </Box>
      <Flex sx={{ alignItems: ['flex-end', 'center'] }}>
        <Text
          as="p"
          sx={{
            color: 'secondaryEmphasis',
            fontSize: '13px'
          }}
        >
          {label}
        </Text>
        {tooltip}
      </Flex>
    </Flex>
  );
};