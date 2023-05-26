type SystemConfig = {
  USE_CACHE: string;
  ALCHEMY_KEY: string;
  INFURA_KEY: string;
  ETHERSCAN_KEY: string;
  POCKET_KEY: string;
  TRACING_RPC_NODE: string;
  MONGODB_URI: string;
  MONGODB_COMMENTS_DB: string;
  NODE_ENV: 'development' | 'production' | 'test';
  GITHUB_TOKEN: string;
  GITHUB_TOKEN_2: string;
  GITHUB_TOKEN_3: string;
  MIXPANEL_PROD: string;
  MIXPANEL_DEV: string;
  REDIS_URL: string;
  DEFENDER_API_KEY_TESTNET: string;
  DEFENDER_API_SECRET_TESTNET: string;
  DEFENDER_API_KEY_MAINNET: string;
  DEFENDER_API_SECRET_MAINNET: string;
  ALCHEMY_ARBITRUM_KEY: string;
  ALCHEMY_ARBITRUM_TESTNET_KEY: string;
  MIGRATION_WEBHOOK_URL: string;
  GASLESS_WEBHOOK_URL: string;
  DASHBOARD_PASSWORD: string;
  GASLESS_BACKDOOR_SECRET: string;
  GASLESS_DISABLED: string;
};

export const config: SystemConfig = {
  USE_CACHE: process.env.USE_CACHE || '',
  ALCHEMY_KEY: process.env.ALCHEMY_KEY || '',
  INFURA_KEY: process.env.INFURA_KEY || '',
  ETHERSCAN_KEY: process.env.ETHERSCAN_KEY || '',
  POCKET_KEY: process.env.POCKET_KEY || '',
  TRACING_RPC_NODE: process.env.TRACING_RPC_NODE || '',
  MONGODB_URI: 'mongodb://admin:password@127.0.0.1:27017/?authSource=admin&readPreference=primary&ssl=false',
  MONGODB_COMMENTS_DB: 'db',
  NODE_ENV: process.env.NODE_ENV || 'development',
  GITHUB_TOKEN: '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',
  GITHUB_TOKEN_2: process.env.GITHUB_TOKEN_2 || '',
  GITHUB_TOKEN_3: process.env.GITHUB_TOKEN_3 || '',
  MIXPANEL_PROD: process.env.NEXT_PUBLIC_MIXPANEL_PROD || '',
  MIXPANEL_DEV: process.env.NEXT_PUBLIC_MIXPANEL_DEV || '',
  REDIS_URL: process.env.REDIS_URL || '',
  DEFENDER_API_KEY_TESTNET: process.env.DEFENDER_API_KEY_TESTNET || '',
  DEFENDER_API_SECRET_TESTNET: process.env.DEFENDER_API_SECRET_TESTNET || '',
  DEFENDER_API_KEY_MAINNET: process.env.DEFENDER_API_KEY_MAINNET || '',
  DEFENDER_API_SECRET_MAINNET: process.env.DEFENDER_API_SECRET_MAINNET || '',
  ALCHEMY_ARBITRUM_KEY: process.env.NEXT_PUBLIC_ALCHEMY_ARBITRUM_KEY || '',
  ALCHEMY_ARBITRUM_TESTNET_KEY: process.env.NEXT_PUBLIC_ALCHEMY_ARBITRUM_TESTNET_KEY || '',
  MIGRATION_WEBHOOK_URL: process.env.MIGRATION_WEBHOOK_URL || '',
  GASLESS_WEBHOOK_URL: process.env.GASLESS_WEBHOOK_URL || '',
  DASHBOARD_PASSWORD: process.env.DASHBOARD_PASSWORD || '',
  GASLESS_BACKDOOR_SECRET: process.env.GASLESS_BACKDOOR_SECRET || '',
  GASLESS_DISABLED: process.env.GASLESS_DISABLED || ''
};