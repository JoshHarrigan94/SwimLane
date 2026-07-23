import { differenceInMinutes, parseISO } from 'date-fns'; import type { JourneyEstimate, JourneyPreferences, Recommendation, SessionFeasibility, SwimBlock, UserSwimPreference } from './models';
export interface JourneyRecommendationInput { estimate?:JourneyEstimate; feasibility?:SessionFeasibility; preferences:JourneyPreferences }
export const minutes=(date:string,time:string)=>differenceInMinutes(parseISO(`${date}T${time}:00`),parseISO(`${date}T00:00:00`));
export const duration=(b:SwimBlock)=>minutes(b.date,b.end)-minutes(b.date,b.start);
export const publicLaneCount=(b:SwimBlock)=>b.laneAllocations.filter(x=>x.type==='public').reduce((n,x)=>n+x.count,0);
export const hasOverlap=(a:SwimBlock,b:SwimBlock)=>a.date===b.date&&a.pool===b.pool&&minutes(a.date,a.start)<minutes(b.date,b.end)&&minutes(b.date,b.start)<minutes(a.date,a.end);
export const sourceConfidence=(b:SwimBlock):Recommendation['confidence']=>!b.source.updatedAt?'Low':b.source.confidence;
export function recommend(block:SwimBlock,p:UserSwimPreference,journey?:JourneyRecommendationInput):Recommendation {
 const reasons:string[]=[]; let score=20;
 if(block.publicLanes===0 || block.configuration==='Closed'){score=0;reasons.push('NO_PUBLIC_ACCESS');}
 else { const lanes=block.publicLanes===null?0:Math.min(25,block.publicLanes*4); score+=lanes; reasons.push(block.publicLanes===null?'LANE_CAPACITY_UNSTATED':block.publicLanes>=4?'GOOD_PUBLIC_CAPACITY':'LIMITED_PUBLIC_CAPACITY');
 const pressure=(6-block.expectedPressure)*7; score+=pressure; reasons.push(block.expectedPressure<=2?'LOW_EXPECTED_PRESSURE':block.expectedPressure>=4?'HIGH_EXPECTED_PRESSURE':'MODERATE_EXPECTED_PRESSURE');
 if(duration(block)>=p.duration){score+=12;reasons.push('STABLE_SESSION');} else {score-=10;reasons.push('SHORT_WINDOW');}
 if(block.bestUse.some(x=>x.toLowerCase().includes(p.goal==='fitness'?'fitness':p.goal))){score+=12;reasons.push('GOAL_FIT');}
 if(p.format!=='any' && ((p.format==='50m'&&block.configuration.includes('50m'))||(p.format==='25m'&&block.configuration.includes('25m'))||(p.format==='training'&&block.pool==='training')))score+=7;
 if(block.restrictions.some(r=>r.severity==='high')){score-=20;reasons.push('RESTRICTION');}
 if(!block.verified){score-=12;reasons.push('ESTIMATED_TIMETABLE');} else score+=5;
 }
 if(journey?.estimate){const e=journey.estimate,maximum=journey.preferences.maximumPreferredJourneyMinutes;if(maximum!==null&&e.estimatedDurationMinutes>maximum){score-=12;reasons.push('JOURNEY_OVER_PREFERENCE')}else if(e.estimatedDurationMinutes<=12)score+=3;if((e.trafficDelayMinutes||0)>=12){score-=12;reasons.push('SEVERE_TRAFFIC_DELAY')}if(e.confidence==='low')score-=3;}if(journey?.feasibility){if(journey.feasibility.status==='missed'||journey.feasibility.status==='not-worth-travelling'){score=Math.min(score,25);reasons.push('INSUFFICIENT_USABLE_SWIM')}else if(journey.feasibility.status==='comfortable')score+=5;}
 score=Math.max(0,Math.min(100,score)); const colour=score>=70?'green':score>=45?'amber':'red'; const experience=score>=80?'Excellent':score>=60?'Good':score>=40?'Acceptable':'Poor'; const confidence=sourceConfidence(block);
 const explanation=journey?.feasibility?.status==='not-worth-travelling'?`Pool setup is promising, but travel leaves only ${journey.feasibility.availableSwimMinutes} useful swimming minutes.`:block.publicLanes===0?'No public swimming is available in this window.':`${block.publicLanes===null?'The venue has not stated a public lane quantity':`${block.publicLanes} public lane${block.publicLanes===1?'':'s'}`}, ${block.expectedPressure<=2?'lighter expected pressure':'expected pressure is higher'}${journey?.estimate?`. Journey is ${journey.estimate.estimatedDurationMinutes} minutes.`:block.verified?' and a verified timetable.':'; timetable confidence is limited.'}`;
 return {block,score,colour,experience,confidence,reasonCodes:reasons,explanation};
}
export const recommendations=(blocks:SwimBlock[],p:UserSwimPreference,j?:JourneyRecommendationInput)=>blocks.map(b=>recommend(b,p,j)).sort((a,b)=>b.score-a.score);
