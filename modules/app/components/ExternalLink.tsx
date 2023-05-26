import { Link as ThemeUILink, ThemeUIStyleObject } from 'theme-ui';

type Props = {
  href: string;
  title: string;
  children: JSX.Element;
  styles?: ThemeUIStyleObject;
};

export const ExternalLink = ({ href, title, children, styles }: Props): JSX.Element => {
  return (
    <ThemeUILink
      href={href}
      title={title}
      target="_blank"
      rel="noreferrer"
      sx={{
        ...styles,     
        fontFamily: '"Inter", sans-serif',
        fontWeight: 'bold',
        color: '#1e1e1e'
      }}
    >
      {children}
    </ThemeUILink>
  );
};
