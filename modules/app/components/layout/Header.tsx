import { useRouter } from 'next/router';
import {
  Flex,
  NavLink,
  Container,
  Close,
  Box,
  IconButton,
  Divider,
  Text,
  Badge
} from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import Image from 'next/image';
import AccountSelect from './header/AccountSelect';
import BallotStatus from 'modules/polling/components/BallotStatus';
import { useState, useEffect, useMemo } from 'react';
import { useBreakpointIndex } from '@theme-ui/match-media';
import NetworkSelect from './header/NetworkSelect';
import { ErrorBoundary } from '../ErrorBoundary';
import { useAccount } from 'modules/app/hooks/useAccount';
import { InternalLink } from 'modules/app/components/InternalLink';
import { Menu, MenuButton, MenuItem, MenuList } from '@reach/menu-button';
import { useGasPrice } from 'modules/web3/hooks/useGasPrice';
import { ExternalLink } from '../ExternalLink';
import { useWeb3 } from 'modules/web3/hooks/useWeb3';
import useSWR, { useSWRConfig } from 'swr';
import { PollsResponse } from 'modules/polling/types/pollsResponse';
import { Proposal } from 'modules/executive/types';
import { fetchJson } from 'lib/fetchJson';
import { isActivePoll } from 'modules/polling/helpers/utils';
import { GASNOW_URL, SupportedNetworks } from 'modules/web3/constants/networks';
import { ClientRenderOnly } from '../ClientRenderOnly';

const MenuItemContent = ({ label, icon }) => {
  return (
    <Flex sx={{ alignItems: 'center', gap: 2, justifyContent: 'flex-start' }}>
      <Icon name={icon} size={'auto'} sx={{ height: '20px', width: '20px' }} />
      {typeof label === 'function' ? { label } : <Text>{label}</Text>}
    </Flex>
  );
};

const HeaderMenu = ({ ...props }): JSX.Element => {
  return (
    <Menu>
      <MenuButton
        sx={{
          variant: 'buttons.card',
          borderRadius: 'round',
          height: '37px',
          width: '37px',
          display: 'flex',
          justifyContent: 'center',
          color: 'textSecondary',
          alignItems: 'center',
          '&:hover': {
            color: 'text'
          }
        }}
        {...props}
      >
        <Icon name="dots_h" />
      </MenuButton>
      <MenuList sx={{ variant: 'cards.compact', borderRadius: 'round', mt: 3, p: 1 }}>
        <MenuItem
          onSelect={() => ({})}
          sx={{
            variant: 'menubuttons.default.headerItem'
          }}
        >
          <InternalLink href="/account" title="View account">
            <MenuItemContent icon="person" label="Account" />
          </InternalLink>
        </MenuItem>
        <MenuItem
          onSelect={() => ({})}
          sx={{
            variant: 'menubuttons.default.headerItem'
          }}
        >
          <ExternalLink
            styles={{ variant: 'links.nostyle' }}
            href="https://qowalts.dijets.io"
            title="Support"
          >
            <MenuItemContent icon="discord_outline" label="Support" />
          </ExternalLink>
        </MenuItem>
        <MenuItem
          onSelect={() => ({})}
          sx={{
            variant: 'menubuttons.default.headerItem'
          }}
        >
          <ExternalLink
            styles={{ variant: 'links.nostyle' }}
            href="https://core-council.dijets.io/"
            title="FAQs"
          >
            <MenuItemContent icon="faq" label="Knowledgebase" />
          </ExternalLink>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

const Header = (): JSX.Element => {
  const router = useRouter();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const bpi = useBreakpointIndex();
  const { account } = useAccount();
  const { network } = useWeb3();
  const { data: gas } = useGasPrice({ network });
  const { cache } = useSWRConfig();

  // Fetch polls & proposals from cache or revalidate if we don't have them
  const dataKeyPolls = `/api/polling/all-polls?network=${network}`;
  const { data: pollsData } = useSWR<PollsResponse>(dataKeyPolls, fetchJson, {
    revalidateOnMount: !cache.get(dataKeyPolls)
  });
  const activePolls = useMemo(() => pollsData?.polls?.filter(poll => isActivePoll(poll)), [pollsData?.polls]);

  const dataKeyProposals = `/api/executive?network=${network}&start=0&limit=3&sortBy=active`;
  const { data: proposalsData } = useSWR<Proposal[]>(dataKeyProposals, fetchJson, {
    revalidateOnMount: !cache.get(dataKeyProposals)
  });
  const activeProposals = proposalsData?.filter(p => p.active);

  return (
    <Box
      as="header"
      pt={2}
      pb={2}
      px={4}
      // variant="styles.header"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: ['space-between', 'space-around'],
        paddingLeft: ['14px', '30px'],
        paddingRight: ['14px', '30px'],
        width: '100%',
        zIndex: '100',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'background',
        backgroundImage: 'url(/assets/header-baxt.png)',
        backgroundSize: 'cover',
        backdropFilter: 'blur(30px)'
      }}
    >
      <Flex sx={{ flexDirection: 'row', alignItems: 'center', height: '70px' }}>
          <Image
            className="cursor-pointer"
            src={'/assets/dijets-dark.svg'}
            width={64}
            height={64}
            alt="Dijets Logo" />
      <Flex sx={{ ml: [0, 4, 4, 4] }}>
        <Flex>
          <NavLink
            href={'/polling'}
            title="View polling page"
            p={0}
            sx={{
              fontsize: '15px',
              fontWeight: 600,
              display: ['none', 'block'],
              ml: [0, 0, 4, 'auto'],
              color: router?.asPath?.startsWith('/polling') ? 'primary' : undefined
            }}
          >
            Proposals
          </NavLink>
          {bpi > 1 && activePolls && activePolls.length > 0 && (
            <NavLink href={'/polling'} title="View polling page" p={0}>
              <Badge
                variant="solidCircle"
                sx={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  p: 2,
                  mt: '-1rem',
                  ml: -10
                }}
              >
                {activePolls?.length}
              </Badge>
            </NavLink>
          )}
        </Flex>
        <Flex>
          <NavLink
            href={'/executive'}
            title="View executive page"
            p={0}
            sx={{
              display: ['none', 'block'],
              ml: [0, 4, 4, 4],
              color: router?.asPath?.startsWith('/executive') ? 'primary' : undefined
            }}
          >
            Mandates
          </NavLink>
          {bpi > 1 && activeProposals && activeProposals.length > 0 && (
            <NavLink href={'/executive'} title="View executive page" p={0}>
              <Badge
                sx={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  mt: '-1rem',
                  ml: -10
                }}
                variant="solidCircle"
              >
                {activeProposals.length}
              </Badge>
            </NavLink>
          )}
        </Flex>

        <NavLink
          href={'/delegates'}
          title="View delegates page"
          p={0}
          sx={{
            display: ['none', 'flex'],
            ml: [0, 4, 4, 4],
            color: router?.asPath?.startsWith('/delegates') ? 'primary' : undefined
          }}
        >
          Council Members
        </NavLink>

        <NavLink
        href={'/polling/create'}
        title="View veto module page"
        p={0}
        sx={{
          flexShrink: 0,
          display: ['none', 'flex'],
          ml: [0, 4, 4, 4],
          color: router?.asPath?.startsWith('/create') ? 'primary' : undefined
        }}
      >
        Create a Poll
      </NavLink>
        <NavLink
          href={'/esmodule'}
          title="View veto module page"
          p={0}
          sx={{
            flexShrink: 0,
            display: ['none', 'flex'],
            ml: [0, 4, 4, 4],
            mr: [0, 'auto', 4, 5],
            color: router?.asPath?.startsWith('/esmodule') ? 'primary' : undefined
          }}
        >
          Veto Module
        </NavLink>
      </Flex>
    </Flex><Flex sx={{ alignItems: 'center' }}>
        {bpi > 1 && account && network === SupportedNetworks.DIJETS && (
          <ExternalLink
            title="Dijets Gas Price"
            href={GASNOW_URL}
            styles={{
              variant: 'links.nostyle'
            }}
          >
            <Flex
              sx={{
                alignItems: 'center',
                gap: 1,
                justifyContent: 'flex-start',
                cursor: 'pointer',
                px: [0, 0, 2, 3]
              }}
            >
              <Text variant="smallText">{gas}</Text>
              <Icon name="gas" size={3} />
            </Flex>
          </ExternalLink>
        )}
        {bpi > 3 && account && router.pathname.includes('polling') && <BallotStatus mr={3} />}
        {bpi > 1 && (
          <Flex mr={3}>
            <NetworkSelect />
          </Flex>
        )}

        <ClientRenderOnly>
          <ErrorBoundary componentName="Account Select">
            <AccountSelect />
          </ErrorBoundary>
        </ClientRenderOnly>

        <IconButton
          aria-label="Show menu"
          ml="3"
          sx={{ display: [null, 'none'], height: '28px', width: '24px', p: 0 }}
          onClick={() => setShowMobileMenu(true)}
        >
          <Icon name="menu" sx={{ width: '18px' }} />
        </IconButton>
        {showMobileMenu && (
          <MobileMenu
            hide={() => setShowMobileMenu(false)}
            router={router}
            gas={gas}
            network={network} />
        )}
        {bpi > 0 && (
          <Flex sx={{ ml: 3 }}>
            <HeaderMenu />
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

const MobileMenu = ({ hide, router, gas, network }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      router.events.on('routeChangeComplete', hide);
    }
  }, []);

  return (
    <Container variant="modal">
      <Flex
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2
        }}
      >
        <InternalLink href={'/'} title="View homepage">
          <IconButton aria-label="DGC home" sx={{ width: '40px', height: 4, p: 0 }}>
            <Icon name="maker" size="40px" color="text" sx={{ cursor: 'pointer' }} />
          </IconButton>
        </InternalLink>
        <Flex sx={{ alignItems: 'center', gap: 2 }}>
          <NetworkSelect />
          <Close sx={{ display: ['block'], '> svg': { size: [4] } }} onClick={hide} />
        </Flex>
      </Flex>

      <Flex
        sx={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          mt: 4,
          background: '#ffffff',
          justifyContent: 'space-between',
          height: '40vh',
          '> a': {
            fontSize: 6
          }
        }}
      >
        <Flex
          sx={{
            justifyContent: 'space-between',
            px: 3,
            py: 4,
            width: '100%',
            fontSize: 3
          }}
        >
          <Flex sx={{ flexDirection: 'column', alignItems: 'flex-start', gap: 3, width: '50%' }}>
            <InternalLink title="View polling page" href="/polling">
              <Text sx={{ fontWeight: '600', fontSize: '15px' }}>Polling</Text>
            </InternalLink>
            <InternalLink title="View executive page" href="/executive">
              <Text sx={{ fontWeight: '600', fontSize: '15px' }}>Executive</Text>
            </InternalLink>
          </Flex>
          <Flex sx={{ flexDirection: 'column', alignItems: 'flex-start', gap: 3, width: '50%' }}>
            <InternalLink title="View delegate page" href="/delegates">
              <Text sx={{ fontWeight: '600', fontSize: '15px' }}>Delegates</Text>
            </InternalLink>
            <InternalLink title="View emergency shutdown page" href="/esmodule">
              <Text sx={{ fontWeight: '600', fontSize: '15px' }}>ES Module</Text>
            </InternalLink>
          </Flex>
        </Flex>
        <Divider sx={{ width: '100%' }} />
        <Flex
          sx={{
            justifyContent: 'space-between',
            px: 3,
            py: 4,
            width: '100%',
            fontSize: 3
          }}
        >
          <Flex sx={{ flexDirection: 'column', alignItems: 'flex-start', gap: 3, width: '50%' }}>
            <InternalLink href="/account" title="View account">
              <MenuItemContent icon="person" label="Account" />
            </InternalLink>
            {network === SupportedNetworks.DIJETS && (
              <ExternalLink
                title="Dijets Gas Price"
                href={GASNOW_URL}
                styles={{
                  variant: 'links.nostyle'
                }}
              >
                <MenuItemContent
                  icon="gas"
                  label={
                    <Text>
                      <span sx={{ color: 'primary' }}>{gas}</span> Gwei
                    </Text>
                  }
                />
              </ExternalLink>
            )}
            <Flex onClick={hide}>
              <ExternalLink
                styles={{ variant: 'links.nostyle' }}
                href="https://discord.gg/GHcFMdKden"
                title="Support"
              >
                <MenuItemContent icon="discord_outline" label="Support" />
              </ExternalLink>
            </Flex>
          </Flex>

        </Flex>
      </Flex>
    </Container>
  );
};

export default Header;
