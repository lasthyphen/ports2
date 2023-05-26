export const buttons = {
  primary: {
    borderRadius: 'round',
    cursor: 'pointer',
    outline: 'none',
    fontFamily: 'body',
    fontSize: 2,
    px: 3,
    py: 2,
    color: 'onPrimary',
    fontWeight: 'semiBold',
    letterSpacing: '0.03em',
    border: '1px solid',
    bg: 'primary',
    '&:hover': {
      bg: 'primaryEmphasis'
    },
    '&:active': {
      bg: 'primaryAlt'
    },
    '&:disabled': {
      bg: 'primaryMuted',
      pointerEvents: 'none',
      cursor: 'not-allowed'
    }
  },
  primarys: {
    borderRadius: 'round',
    cursor: 'pointer',
    outline: 'none',
    fontFamily: 'body',
    fontSize: 2,
    px: 3,
    py: 2,
    color: 'onPrimary',
    fontWeight: 'semiBold',
    letterSpacing: '0.03em',
    bg: 'primary',
    '&:hover': {
      bg: 'primaryEmphasis'
    },
    '&:active': {
      bg: 'primaryAlt'
    },
    '&:disabled': {
      bg: 'primaryMuted',
      pointerEvents: 'none',
      cursor: 'not-allowed'
    }
  },
  card: {
    variant: 'cards.tight',
    color: 'inherit',
    cursor: 'pointer'
  },
  primaryLarge: {
    variant: 'buttons.primary',
    py: '8px'
  },
  primaryLarge2: {
    variant: 'buttons.primary',
    py: '12px',
    '&:hover': {
      opacity: '0.8',
    }
  },
  primaryLagress: {
    boxSizing: 'border-box',
    minWidth: '0px',
    appearance: 'none',
    textAlign: 'center',
    textDecoration: 'none',
    backgroundColor: '#25273d',
    border: '0px',
    fontFamily: 'Inter, Helvetica Neue, sans-serif',
    lineHeight: '2.1em',
    fontSize: '14px',
    color: 'var(--theme-ui-colors-neutral10,#FFFFFF)',
    cursor: 'pointer',
    justifyContent: 'center',
    fontWeight: 600,
    borderRadius: '32px',
    transition: 'background 200ms ease 0s',
    display: 'flex',
    margin: '0px auto',
    padding: '6px 24px',
    WebkitBoxAlign: 'center',
    alignItems: 'center',
    '&:hover': {
      opacity: '0.8',
    }
  },
  primaryLagress2: {
    boxSizing: 'border-box',
    minWidth: '0px',
    appearance: 'none',
    textAlign: 'center',
    textDecoration: 'none',
    backgroundColor: '#25273d',
    border: '0px',
    fontFamily: '"Inter", Helvetica Neue, sans-serif',
    lineHeight: '2em',
    fontSize: '14px',
    color: 'var(--theme-ui-colors-neutral10,#FFFFFF)',
    cursor: 'pointer',
    fontWeight: 600,
    borderRadius: '32px',
    transition: 'background 200ms ease 0s',
    display: 'flex',
    width: '142px',
    margin: '0px auto',
    padding: '4px 26px',
    WebkitBoxAlign: 'center',
    alignItems: 'center',
    '&:hover': {
      opacity: '0.8',
    }
  },
  primaryOutline: {
    variant: 'buttons.outline',
    color: 'primary',
    borderColor: 'primary',

    '&:hover:enabled': {
      color: 'primary',
      borderColor: 'primary',
      bg: 'primaryMuted'
    },
    '&:active': {
      color: 'primary',
      borderColor: 'primary',
      bg: 'primaryMuted'
    },
    '&:disabled': {
      color: 'primary',
      borderColor: 'primary',
      opacity: 0.5,
      cursor: 'not-allowed'
    }
  },
  outline: {
    variant: 'buttons.primarys',
    bg: 'surface',
    color: 'text',
    border: '1px solid',
    '&:hover': {
      bg: 'surface',
      color: 'text',
      borderColor: 'secondaryEmphasis'
    },
    '&:active': {
      borderColor: 'secondaryAlt',
      color: 'secondaryAlt'
    },
    '&:disabled': {
      bg: 'background',
      pointerEvents: 'none',
      cursor: 'not-allowed',
      borderColor: 'secondaryMuted',
      opacity: 0.5
    },
    borderColor: 'secondary'
  },
  outlinear: {
    variant: 'buttons.primarys',
    bg: 'surface',
    color: 'text',
    minWidth: '186px',
    border: '1px solid',
    '&:hover': {
      bg: 'surface',
      color: 'text',
      borderColor: 'secondaryEmphasis'
    },
    '&:active': {
      borderColor: 'secondaryAlt',
      color: 'secondaryAlt'
    },
    '&:disabled': {
      bg: 'background',
      pointerEvents: 'none',
      cursor: 'not-allowed',
      borderColor: 'secondaryMuted',
      opacity: 0.5
    },
    borderColor: 'secondary'
  },
  outlines: {
    variant: 'buttons.primarys',
    bg: 'surface',
    color: 'text',
    '&:hover': {
      bg: 'surface',
      color: 'text',
      borderColor: 'secondaryEmphasis'
    },
    '&:active': {
      borderColor: 'secondaryAlt',
      color: 'secondaryAlt'
    },
    '&:disabled': {
      bg: 'background',
      pointerEvents: 'none',
      cursor: 'not-allowed',
      borderColor: 'secondaryMuted',
      opacity: 0.5
    },
    borderColor: 'secondary'
  },
  mutedOutline: {
    variant: 'buttons.outlines',
    color: 'text',
    fontSize: [1, 2],
    px: [2, 3],
    '&:hover': {
      color: 'text',
      borderColor: 'onSecondary'
    }
  },
  mutedOutliner: {
    variant: 'buttons.outlines',
    color: 'text',
    fontSize: [1, 2],
    px: [2, 3],
    '&:hover': {
      color: '#ffffff',
      borderColor: '#56d1bd',
      background: '#1aab9b',
    }
  },
  mutedOutlinerz: {
    variant: 'buttons.outlines',
    color: 'text',
    fontSize: [1, 2],
    px: [2, 3],
    '&:hover': {
      color: '#ffffff',
      borderColor: '#9675ff',
      background: '#5838c1',
    }
  },
  close: {
    cursor: 'pointer',
    p: 0,
    size: '4',
    ':focus': {
      outline: 'none'
    }
  },
  icon: {
    cursor: 'pointer'
  },
  small: {
    variant: 'buttons.primary',
    textTransform: 'uppercase',
    outline: 'none',
    letterSpacing: '0.05em',
    fontSize: 0,
    fontWeight: 'bold',
    cursor: 'pointer',
    p: 2,
    color: 'onPrimary',
    bg: 'primary',
    '&:hover': {
      bg: 'primaryEmphasis'
    },
    '&:active': {
      bg: 'primaryAlt'
    },
    '&:disabled': {
      bg: 'primaryMuted',
      pointerEvents: 'none',
      cursor: 'not-allowed'
    }
  },
  smallOutline: {
    variant: 'buttons.small',
    bg: 'surface',
    color: 'text',
    border: '1px solid',
    borderColor: 'onSurface',
    '&:hover': {
      bg: 'surface',
      color: 'secondaryEmphasis',
      borderColor: 'secondaryEmphasis'
    },
    '&:active': {
      bg: 'surface',
      borderColor: 'secondaryAlt',
      color: 'secondaryAlt'
    },
    '&:disabled': {
      bg: 'background',
      pointerEvents: 'none',
      cursor: 'not-allowed',
      borderColor: 'secondaryMuted',
      opacity: 0.5
    }
  },
  smallOutliner: {
    variant: 'buttons.small',
    height: '26px',
    padding: '6px 12px',
    borderRadius: '6px',
    fontFamily: 'Uber Move Text',
    fontWeight: 'bold',
    marginTop: '10px',
    bg: 'surface',
    color: 'text',
    border: '1px solid',
    borderColor: 'onSurface',
    '&:hover': {
      bg: 'surface',
      color: 'secondaryEmphasis',
      borderColor: 'secondaryEmphasis'
    },
    '&:active': {
      bg: 'surface',
      borderColor: 'secondaryAlt',
      color: 'secondaryAlt'
    },
    '&:disabled': {
      bg: 'background',
      pointerEvents: 'none',
      cursor: 'not-allowed',
      borderColor: 'secondaryMuted',
      opacity: 0.5
    }
  },
  textual: {
    background: 'transparent',
    color: 'accentBlue',
    outline: 'none',
    cursor: 'pointer',
    fontSize: 1
  }
};
