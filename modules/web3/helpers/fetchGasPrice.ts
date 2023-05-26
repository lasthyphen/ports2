import { fetchJson } from 'lib/fetchJson';
import { formatUnits } from 'ethers/lib/utils';
import { GASNOW_ENDPOINT } from '../constants/networks';
import logger from 'lib/logger';

export const fetchGasPrice = async (
  speed: 'average' | 'fast' | 'slow' = 'fast'
): Promise<string | number> => {
  try {
    const jsonResponse = await fetchJson(GASNOW_ENDPOINT);

    return parseInt(jsonResponse.average);
  } catch (e) {
    logger.error('fetchGasPrice: Error fetching gas price', e.message);
    return '--';
  }
};
