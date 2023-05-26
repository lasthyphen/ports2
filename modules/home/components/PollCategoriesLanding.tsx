import { Flex, Box, Heading } from 'theme-ui';
import { PollCategoryTag } from 'modules/polling/components/PollCategoryTag';
import { InternalLink } from 'modules/app/components/InternalLink';
import { TagCount } from 'modules/app/types/tag';

type Props = {
  pollCategories: TagCount[];
};

export const PollCategoriesLanding = ({ pollCategories }: Props): JSX.Element => (
  <Flex sx={{ flexDirection: 'column', alignItems: 'center', mt: 5 }}>
    <Flex sx={{ flexWrap: 'wrap', justifyContent: 'center', maxWidth: '1000px', margin: 'auto' }}>
      {pollCategories
        .filter(category => category.id !== 'uncategorized')
        .sort((a, b) => ((a.precedence || 100) > (b.precedence || 100) ? 1 : -1))
        .slice(0, 11)
        .map(category => (
          <Box key={category.id} sx={{ my: 3, mx: 4 }}>
            <InternalLink
              href={'/polling'}
              queryParams={{ category: category.id }}
              title={`${category.longname} polls`}
            >
              <PollCategoryTag tag={category} />
            </InternalLink>
          </Box>
        ))}
    </Flex>
  </Flex>
);
