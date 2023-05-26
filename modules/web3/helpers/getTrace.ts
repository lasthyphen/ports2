import { ethers } from 'ethers';
import { config } from 'lib/config';
import logger from 'lib/logger';
import { SupportedNetworks } from '../constants/networks';

export async function getTrace(
  method: 'trace_call' | 'trace_replayTransaction',
  parameters: string | { from: string; to: string; data: string },
  network: SupportedNetworks
): Promise<any> {
  try {
    const trace = await new ethers.providers.JsonRpcProvider(config.TRACING_RPC_NODE).send(method, [
      parameters,
      ['vmTrace', 'stateDiff']
    ]);
    return trace;
  } catch (err) {
    if (config.TRACING_RPC_NODE) {
      const trace = await new ethers.providers.JsonRpcProvider(config.TRACING_RPC_NODE).send(method, [
        parameters,
        ['vmTrace', 'stateDiff']
      ]);
      return trace;
    } else {
      throw new Error('Failed to fetch transaction trace');
    }
  }
}
