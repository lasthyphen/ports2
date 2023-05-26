import React from 'react';
import { Flex, Text, Card, Heading } from 'theme-ui';
import { markdownToHtml } from 'lib/markdown';
import { GetStaticProps } from 'next';
import { HeadComponent } from 'modules/app/components/layout/Head';

const terms = `
#### 1. Acceptance of Terms
Please read these Terms of Use (the “Terms” or “Terms of Use”) carefully before using the Service. By using or otherwise accessing the Service, or clicking to accept or agree to these Terms where that option is made available, you (1) agree that you have read and understand these Terms (2) accept and agree to these Terms and (3) any additional terms, rules and conditions of participation issued from time-to-time. If you do not agree to the Terms, then you may not access or use the Content or Service.
`;

export default function Terms(props: { content: string }): JSX.Element {
  return (
    <Flex sx={{ flexDirection: 'column', justifyContent: 'center' }}>
      <HeadComponent title="Terms" />

      <Heading as="h2" sx={{ textAlign: 'center' }}>
        Terms of Use
      </Heading>
      <Text sx={{ textAlign: 'center', fontStyle: 'italic', mt: 1, mb: 3 }}>
        Last Revised: October 14th, 2021
      </Text>
      <Card sx={{ overflowY: 'auto' }}>
        <div dangerouslySetInnerHTML={{ __html: props.content || '' }} />
      </Card>
    </Flex>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const content = await markdownToHtml(terms);

  return {
    props: {
      content
    }
  };
};
