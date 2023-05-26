import { Flex, Text, useColorMode } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import { ExternalLink } from 'modules/app/components/ExternalLink';
import React from 'react';
import { translate } from '@makerdao/i18n-helper';
import { useBreakpointIndex } from '@theme-ui/match-media';

const ContactSection = ({ heading, logos }) => {
  return (
    <Flex sx={{ flexDirection: 'column', gap: 2 }}>
      <Text as="h4" sx={{ fontSize: 3, fontWeight: 'semiBold' }}>
        {heading}
      </Text>
      <Flex
        sx={{
          alignItems: 'center',
          '& svg': {
            width: 20,
            height: 20,
            transition: 'opacity 0.2s',
            cursor: 'pointer',
            opacity: 0.8,
            marginRight: 24,
            ':hover': {
              opacity: 1
            }
          }
        }}
      >
        {logos.map(({ title, url, icon, styles }) => (
          <ExternalLink key={title} styles={{ color: 'text', ...styles }} href={url} title={title}>
            <Icon name={icon} />
          </ExternalLink>
        ))}
      </Flex>
    </Flex>
  );
};

export default function Footer({ locale = 'en' }: { locale?: string }): React.ReactElement {
  const bpi = useBreakpointIndex();

  const t = text => translate(text, locale);

  const links = [
    {
      header: t('Governance'),
      list: [
        {
          url: 'https://forum.dijets.io/',
          title: t('Forum')
        },
        {
          url: 'https://core-council.dijets.io',
          title: t('Councillors Hub')
        },
        {
          url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSDGbfLD9_hX7lm6osRoRIZofWq1c9WHKD1qHQxym9i2_ZKYT41Zy1nGL5Nzsv079Q6Fk5pF6G5Y1t1/pubhtml',
          title: t('Proposal Tracker Sheet')
        },
        {
          url: 'https://core-council.dijets.io',
          title: t('Monthly Gov Cycle')
        },
        {
          url: 'https://qowalts.dijets.io',
          title: t('Qowalts')
        }
      ]
    },
    {
      header: t('Useful Links'),
      list: [

        {
          url: 'https://support.dijets.co.uk',
          title: t('Guides & Support')
        },
        {
          url: 'https://explorer.dijets.io',
          title: t('Unified Explorer')
        },
        {
          url: 'https://dmms.dijets.io',
          title: t('Dijets Money Markets')
        },
        {
          url: 'https://docs-greyhyphen.vercel.app/docs',
          title: t('Documentation')
        },
        {
          url: 'https://dijets.statuspage.io/',
          title: t('Service Status')
        }
      ]
    },
    {
      header: t('Dijets Inc.'),
      list: [
        {
          url: 'https://dijets.io',
          title: t('Dijets')
        },
        {
          url: 'https://dips.dijets.io',
          title: t('DIPs Directory')
        },
        {
          url: 'https://dijets.io/council',
          title: t('Dijets Council')
        },
        {
          url: 'https://wallet.dijets.io',
          title: t('Wallet')
        },
        {
          url: 'https://binaries.dijets.io',
          title: t('Binaries')
        }
      ]
    }
  ];

  const logos = {
    makerdao: [
      { title: 'Qowalts', url: 'https://qowalts.dijets.io', icon: 'discord' },
      { title: 'Twitter', url: 'https://twitter.com/OfficialDijets', icon: 'twitter' },
      { title: 'Reddit', url: 'https://www.facebook.com/DijetalRealm', icon: 'reddit' },
      { title: 'GitHub', url: 'https://www.github.com/Dijets-Inc', icon: 'github' }
    ],
    makerdux: [
      { title: 'Discord', url: 'https://qowalts.dijets.io', icon: 'discord' },
      { title: 'Twitter', url: 'https://twitter.com/OfficialDijets', icon: 'twitter' },
      { title: 'GitHub', url: 'https://www.facebook.com/DijetalRealm', icon: 'github' },
      { title: 'Canny', url: 'https://dijets.canny.io/', icon: 'canny' },
    ]
  };

  const mobile = bpi <= 1;
  return (
    <div sx={{ position: 'relative', mt: 4 }}>
      <div
        sx={{
          width: '100vw',
          height: '100%',
          left: '50%',

          zIndex: -1,
          position: 'absolute',
          transform: 'translateX(-50%)',
          backgroundImage:
               bpi <= 2
              ? 'url(/assets/bg_medium.jpeg)'
              : 'url(/assets/bg_footer_light.jpeg)',
          backgroundSize: ['1500px', '1500px', '1500px', '100% 600px', '100% 400px'],
          backgroundRepeat: 'no-repeat',
          backgroundPosition: ['-750px 100%', '-750px 100%', '-750px 100%', 'bottom', 'bottom']
        }}
      />
      <Flex
        as="footer"
        sx={{
          justifyContent: 'space-between',
          gap: 4,
          width: '100%',
          flexDirection: mobile ? 'column' : 'row',
          pt: 4,
          pb: 5
        }}
      >
        <ContactSection heading="Community Channels" logos={logos.makerdao} />
        <Flex
          sx={{
            justifyContent: 'space-between',
            gap: [4, 2, 5],
            width: ['100%', '100%', 'initial'],
            flexWrap: ['wrap', 'nowrap']
          }}
        >
          {links.map(group => {
            return (
              <Flex key={group.header} sx={{ flexDirection: 'column', gap: 2, minWidth: ['45%', 'initial'] }}>
                <Text as="h4" sx={{ fontSize: 3, fontWeight: 'semiBold' }}>
                  {group.header}
                </Text>
                {group.list.map(({ url, title }) => {
                  return (
                    <ExternalLink
                      key={title}
                      href={url}
                      title={title}
                      styles={{ fontSize: [1, 2], color: 'text' }}
                    >
                      <Text>{title}</Text>
                    </ExternalLink>
                  );
                })}
              </Flex>
            );
          })}
        </Flex>
        <ContactSection heading="Development Channels" logos={logos.makerdux} />
      </Flex>
    </div>
  );
}
