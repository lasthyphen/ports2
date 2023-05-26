import { ApiError } from 'modules/app/api/ApiError';
import validateQueryParam from 'modules/app/api/validateQueryParam';
import withApiHandler from 'modules/app/api/withApiHandler';
import { fetchPollById, fetchPollBySlug } from 'modules/polling/api/fetchPollBy';
import { DEFAULT_NETWORK, SupportedNetworks } from 'modules/web3/constants/networks';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * @swagger
 * definitions:
 *   Poll:
 *     type: object
 *     properties:
 *       pollId:
 *         type: integer
 *       creator:
 *         type: string
 *       blockCreated:
 *         type: number
 *       startDate:
 *         type: string
 *       endDate:
 *         type: string
 *       multiHash:
 *         type: string
 *       url:
 *         type: string
 *       slug:
 *         type: string
 *       content:
 *         type: string
 *       summary:
 *         type: string
 *       title:
 *         type: string
 *       options:
 *         type: object
 *       discussionLink:
 *         type: string
 *       voteType:
 *         type: string
 *         enum: ['Plurality Voting', 'Ranked Choice IRV']
 *       tags:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             id: string
 *             shortname: string
 *             longname: string
 *             description: string
 *       ctx:
 *         type: object
 *     example:
 *       - pollId: 1
 *         creator: '0x123123'
 *         blockCreated: 123123
 *         startDate: "2021-11-08T16:00:00.000Z"
 *         endDate: "2021-11-08T16:00:00.000Z"
 *         multiHash: 'Qme2ni4asyMj6Y1irnJVuaDaV4eWekJK2aT1GdjRd8yQ6L'
 *         url: 'https://raw.githubusercontent.com/lasthyphen/dgc-polls/master/governance/polls/Ratification%20Poll%20for%20Supplement%20to%20Collateral%20Onboarding%20Application%20(MIP6c3-SP1)%20-%20November%208%2C%202021.md'
 *         slug: 'Qme2ni4a'
 *         content: 'ABC'
 *         summary: 'abc'
 *         title: 'abc'
 *         options:
 *           0: 'Abstain'
 *           1: 'Yes'
 *           2: 'No'
 *         discussionLink: 'https://forum.makerdao.com'
 *         voteType: 'Plurality Voting'
 *         tags: [{ id: 'greenlight', longname: 'Greenlight', shortname: 'Greenlight', description: 'Lorem ipsum' }]
 *         ctx:
 *           prev: null
 *           next: null
 *
 * /api/polling/{slug}:
 *   get:
 *     tags:
 *     - "polls"
 *     description: Returns a poll detail
 *     produces:
 *     - "application/json"
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: Slug of the poll
 *     responses:
 *       '200':
 *         description: "Poll Detail"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Poll'
 */
export default withApiHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  const network = validateQueryParam(req.query.network, 'string', {
    defaultValue: DEFAULT_NETWORK.network,
    validValues: [SupportedNetworks.GOERLI, SupportedNetworks.GOERLIFORK, SupportedNetworks.DIJETS, SupportedNetworks.MAINNET]
  }) as SupportedNetworks;

  const slug = req.query.slug as string;

  let poll = await fetchPollBySlug(slug, network);

  if (!poll && !isNaN(parseInt(slug))) {
    poll = await fetchPollById(parseInt(slug), network);
  }

  if (!poll) {
    throw new ApiError('Poll not found', 404, 'Poll not found');
  }

  res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate');
  res.status(200).json(poll);
});
