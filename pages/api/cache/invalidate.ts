import { NextApiRequest, NextApiResponse } from 'next';
import { DEFAULT_NETWORK, SupportedNetworks } from 'modules/web3/constants/networks';
import withApiHandler from 'modules/app/api/withApiHandler';
import logger from 'lib/logger';
import { cacheDel } from 'modules/cache/cache';
import {
  delegatesGithubCacheKey,
  allDelegatesCacheKey,
  executiveSupportersCacheKey,
  githubExecutivesCacheKey,
  executiveProposalsCacheKey
} from 'modules/cache/constants/cache-keys';
import { config } from 'lib/config';
import { ApiError } from 'modules/app/api/ApiError';

// Deletes cache for a tally
export default withApiHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const network = (req.query.network as SupportedNetworks) || DEFAULT_NETWORK.network;

    // Allowed cache keys to be deleted, they can be partial since we just check that the key is on the requested path.
    const allowedCacheKeys = [
      'parsed-tally-',
      executiveProposalsCacheKey,
      executiveSupportersCacheKey,
      githubExecutivesCacheKey,
      'polls-',
      delegatesGithubCacheKey,
      allDelegatesCacheKey
    ];

    try {
      const { cacheKey } = req.body;

      if (!req.body?.password || req.body?.password !== config.DASHBOARD_PASSWORD) {
        throw new ApiError('Invalidate cache, invalid password', 401, 'Unauthorized');
      }

      const isAllowed = allowedCacheKeys.reduce((prev, next) => {
        return prev || cacheKey.indexOf(next) !== -1;
      }, false);

      if (!isAllowed || !cacheKey) {
        throw new ApiError('Invalidate cache, invalid request', 400, 'Invalid request');
      }

      logger.debug(`invalidate-cache request: ${cacheKey}`);

      cacheDel(cacheKey, network);

      return res.status(200).json({
        invalidated: true,
        cacheKey
      });
    } catch (e) {
      throw new ApiError(`Invalidate cache, ${e.messaage}`, 500);
    }
  },
  {
    allowPost: true
  }
);
