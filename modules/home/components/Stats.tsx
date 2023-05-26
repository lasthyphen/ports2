import { Flex, Grid, Box, Text, Link as ExternalLink, Heading } from 'theme-ui';
import { ViewMore } from 'modules/home/components/ViewMore';

type Props = {
  title: string;
  infoUnits: {
    title: string;
    value: string | JSX.Element;
  }[];
  viewMoreUrl: string;
};

export const Stats = ({ title, infoUnits, viewMoreUrl }: Props): JSX.Element => {
  return (
    <>
      {/* Desktop */}
      <Box sx={{ display: ['none', 'block'] }}>
        <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Heading>{title}</Heading>
          <ExternalLink href={viewMoreUrl} target="_blank">
            <ViewMore />
          </ExternalLink>
        </Flex>

        <Flex sx={{ mx: 0, px: 5, pb: 3, pt: 2, background: 'linear-gradient(147.66deg, rgb(255 254 252) 0%, rgb(255 254 249) 88.25%)', borderRadius: 'small', boxShadow: '0px 20px 40px #dbe3ed42, 0px 3px 12px #bebebe2e' }}>
          <Flex m={3} sx={{ width: '100%', justifyContent: 'space-between' }}>
            {infoUnits.map(unit => (
              <Box key={unit.title} data-testid={unit.title}>
                <Box>
                  <Text sx={{ fontSize: 2, color: 'textSecondary' }}>{unit.title}</Text>
                </Box>
                <Box mt={2} data-testid={`${unit.title}-value`}>
                  <Text sx={{ boxSizing: 'border-box',
                  margin: '0px',
                  minWidth: '0px',
                  fontFamily:
                    '__FTPolarMedium_Fallback_6973ac, sans-serif',
                  fontWeight: 600,
                  lineHeight: '40px',
                  fontSize: '28px',
                  color: '#25273d',
                  textAlign: 'center' }}>{unit.value}</Text>
                </Box>
              </Box>
            ))}
          </Flex>
        </Flex>
      </Box>

      {/* Mobile */}
      <Box sx={{ display: ['block', 'none'], backgroundColor: 'background' }}>
        <Grid sx={{ p: 0 }}>
          <Flex sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Heading>{title}</Heading>
            <ExternalLink href={viewMoreUrl} target="_blank">
              <ViewMore />
            </ExternalLink>
          </Flex>

          {infoUnits.map(unit => (
            <Flex key={`${unit.title}-mobile`} sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text sx={{ fontSize: 2, color: 'textSecondary' }}>{unit.title}</Text>
              <Text sx={{ fontSize: 2 }}>{unit.value}</Text>
            </Flex>
          ))}
        </Grid>
      </Box>
    </>
  );
};
