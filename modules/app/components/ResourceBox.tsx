import { Box, Heading, Card, Link as ExternalLink, Flex, Text } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';

type ResourceType = 'general' | 'polling' | 'executive' | 'delegates';

type ResourceLink = {
  linkTitle: string;
  url: string;
};

type Resource = {
  boxTitle: string;
  links: ResourceLink[];
};

const resources: Record<ResourceType, Resource> = {
  general: {
    boxTitle: 'General Governance Resources',
    links: [
      { linkTitle: 'DGC Forum', url: 'https://forum.dijets.io' },
      { linkTitle: 'Governance FAQs', url: 'https://core-council.dijets.io/docs/reference' },
      {
        linkTitle: 'DIPs Framework',
        url: 'https://dips.dijets.io/dips/details/DIP0/'
      },
      { linkTitle: 'Governance Cycle', url: 'https://core-council.dijets.io/docs/guides/governance/governance-cycle' },
      {
        linkTitle: 'HAL - Oracle',
        url: 'https://core-council.dijets.io/docs/guides/governance/HAL'
      }
    ]
  },
  polling: {
    boxTitle: 'Polling FAQs',
    links: [
      {
        linkTitle: 'What is the Governance Portal?',
        url: 'https://core-council.dijets.io/docs/reference/javascript'
      },
      {
        linkTitle: 'What are Governance Polls?',
        url: 'https://core-council.dijets.io/docs/reference/javascript/polls'
      },
      {
        linkTitle: 'What is On-Chain Governance?',
        url: 'https://core-council.dijets.io/docs/reference/javascript/installing'
      },
      {
        linkTitle: 'How to set up a voting wallet?',
        url: 'https://core-council.dijets.io/docs/reference/javascript/voting-wallet'
      },
      {
        linkTitle: 'What is the Governance Cycle',
        url: 'https://dips.dijets.io/dips/details/DIP1'
      }
    ]
  },
  executive: {
    boxTitle: 'Mandate Proposal FAQs',
    links: [
      {
        linkTitle: 'How can DGC Members participate in Dijets Governance?',
        url: 'https://core-council.dijets.io/docs/guides/governance/overview'
      },
      {
        linkTitle: 'What are Dijets 5 Domains?',
        url: 'https://core-council.dijets.io/docs/guides/registration/domain-indices'
      },
      {
        linkTitle: 'What is a DIP',
        url: 'https://core-council.dijets.io/docs/guides/registration/dips'
      },
      {
        linkTitle: 'What are DIP priority markers?',
        url: 'https://core-council.dijets.io/docs/guides/registration/proposalimpact'
      },
      {
        linkTitle: 'How to set up your wallet for voting?',
        url: 'https://core-council.dijets.io/docs/reference/javascript/voting-wallet'
      }
    ]
  },
  delegates: {
    boxTitle: 'DGC FAQs',
    links: [
      {
        linkTitle: 'What is Dijets Council and its purpose?',
        url: 'https://core-council.dijets.io/docs/guides/governance/overview'
      },
      {
        linkTitle: 'What are the requirements for becoming a DGC Member?',
        url: 'https://core-council.dijets.io/docs/guides/registration'
      },
      {
        linkTitle: 'What is the Governance Portal and Polls?',
        url: 'https://core-council.dijets.io/docs/reference/javascript/polls'
      },
      {
        linkTitle: 'What is the Dijets Council and its members?',
        url: 'https://dijets.io/council'
      },
      {
        linkTitle: 'What are some of the incentives for DGC Members?',
        url: 'https://core-council.dijets.io/docs/guides/governance/incentives'
      }
    ]
  }
};

export default function ResourceBox({
  type,
  className
}: {
  type: ResourceType;
  className?: string;
}): JSX.Element {
  return (
    <Box className={className}>
      <Heading mt={3} mb={2} as="h3" variant="microHeading">
        {resources[type].boxTitle}
      </Heading>
      <Card variant="compact" sx={{background: 'linear-gradient(160.47deg, rgb(233 250 252) 0.35%, rgb(227 253 255) 99.18%),rgb(0, 0, 0)', padding: '18px 24px 20px', fontSize: '14px', color: '#787a9b'}}>
        {resources[type].links.map(resource => (
          <Flex key={resource.linkTitle} sx={{ alignItems: 'center', ':not(:last-of-type)': { mb: 3 } }}>
            <ExternalLink href={resource.url} target="_blank">
              <Text sx={{ color: '#9a9bac', ':hover': { color: 'accentBlueEmphasis' } }}>
                {resource.linkTitle}
                <Icon ml={2} name="arrowTopRight" size={2} />
              </Text>
            </ExternalLink>
          </Flex>
        ))}
      </Card>
    </Box>
  );
}
