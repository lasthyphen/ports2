import Head from 'next/head';

import { config } from 'lib/config';

export function HeadComponent({
  title,
  description,
  image,
  url
}: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}): React.ReactElement {
  const dev = config.NODE_ENV === 'development';

  const defaultDescription =
    'Dijets Governance Portal allows for anyone to view governance proposals, and also allows for DGC Members to vote.';
  const defaultTitle = 'Dijets Governance Portal';

  const renderedTitle = title || defaultTitle;
  const renderedDescription = description || defaultDescription;
  return (
    <Head>
      <title>Dijets Governance - {renderedTitle}</title>
      <meta name="description" content={renderedDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content={renderedTitle} />
      <meta property="og:description" content={renderedDescription} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400&display=swap"
      rel="stylesheet"
    />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url}></meta>}

      <meta name="twitter:title" content={renderedTitle} />
      <meta name="twitter:description" content={renderedDescription} />
      {image && <meta name="twitter:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image"></meta>

      <meta
        httpEquiv="Content-Security-Policy"
        content={
          "default-src 'none';" +
          'frame-src https://connect.trezor.io https://www.youtube-nocookie.com https://player.vimeo.com;' +
          "font-src https://fonts.googleapis.com https://fonts.gstatic.com https://oasis.app 'self';" +
          "connect-src https://fonts.googleapis.com http://localhost:8545/ http://127.0.0.1:8546/ http://127.0.0.1:8545/ http://20.68.211.18:3001/v1 http://localhost:3001/ 'self' https: wss:;" +
          "style-src 'self' https://oasis.app https://fonts.googleapis.com 'unsafe-inline';" +
          `script-src 'self' https://oasis.app http://20.68.211.18:3001/ https://fonts.googleapis.com https://fonts.gstatic.com https://gc.zgo.at/count.js ${
            dev ? "'unsafe-eval'" : ''
          } 'sha256-a0L6Pfwt+Nftvey0NflqMTGt/tO5UMFmI/PAiNnoYRo=';` +
          "img-src 'self' https: data:"
        }
      />
    </Head>
  );
}
