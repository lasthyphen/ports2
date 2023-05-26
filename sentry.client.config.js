// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn:
    process.env.NODE_ENV === 'production'
      ? SENTRY_DSN || 'https://18e4da2c1f0f465aa6098b641d8c8824@o645319.ingest.sentry.io/4505167319138304'
      : null,
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,
  integrations: [new Sentry.Integrations.Breadcrumbs({ console: false })]
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
