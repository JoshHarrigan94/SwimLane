import { z } from 'zod'; import type { JourneyEstimate, JourneyRequest } from '../lib/models';
export interface JourneyProvider { estimateJourney(request:JourneyRequest):Promise<JourneyEstimate> }
export class JourneyError extends Error { constructor(public code:'TIMEOUT'|'QUOTA'|'INVALID_KEY'|'NO_ROUTE'|'UNAVAILABLE'|'INVALID_RESPONSE',message:string){super(message)} }
export const journeyRequestSchema=z.object({origin:z.object({latitude:z.number().min(-90).max(90),longitude:z.number().min(-180).max(180)}),destinationVenueId:z.literal('wales-national-pool-swansea'),departureTime:z.string().datetime(),mode:z.enum(['drive','walk','cycle','transit'])});
