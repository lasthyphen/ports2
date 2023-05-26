import { cacheGet, cacheSet } from 'modules/cache/cache';
import { Tag } from 'modules/app/types/tag';

import pollTags from 'modules/tags/constants/poll-tags-definitions.json';
import pollTagsMapping from 'modules/tags/constants/poll-tags-mapping.json';
import { pollTagsMappingJSONCacheKey } from 'modules/cache/constants/cache-keys';
export function getPollTags(): Tag[] {
  return pollTags;
}

export async function getPollTagsMapping(): Promise<{ [key: number]: string[] }> {
  try {
    const existingTags = await cacheGet(pollTagsMappingJSONCacheKey);

    if (existingTags) {
      return JSON.parse(existingTags);
    }

    const urlPollTags =
      'https://raw.githubusercontent.com/lasthyphen/dgc-polls/master/governance/polls/meta/poll-tags.json';
    const pollTags = await fetch(urlPollTags);
    const dataPollTags = await pollTags.json();

    cacheSet(pollTagsMappingJSONCacheKey, JSON.stringify(dataPollTags));

    return dataPollTags;
  } catch (e) {
    return pollTagsMapping;
  }
}
