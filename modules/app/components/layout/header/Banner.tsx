import { Text, Alert } from 'theme-ui';
import { keyframes } from '@emotion/react';

const scroll = keyframes({
  from: { transform: 'translate(60vw, 0)' },
  to: { transform: 'translate(-60vw, 0)' }
});

const Banner = ({
  content,
  variant = 'banner'
}: {
  content: string | React.ReactElement;
  variant?: string;
}): React.ReactElement => {
  return (
    <Alert
      variant={variant}
      sx={{
        fontSize: [1, 2],
        whiteSpace: 'nowrap',
        borderRadius: 0,
        fontWeight: 'normal',
        textAlign: 'center',
        px: 3,
        pt: 2,
        pb: 2
      }}
    >
      {typeof content === 'string' ? (
        <Text
          as="p"
          sx={{
            animation: `${scroll} 30s linear infinite`,
            whiteSpace: 'nowrap'
          }}
        >
          {content}
        </Text>
      ) : (
        content
      )}
    </Alert>
  );
};

export default Banner;
