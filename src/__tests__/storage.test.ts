import { beforeEach, expect, it } from 'vitest'; import { loadFeedback, saveFeedback } from '../lib/storage';
beforeEach(()=>localStorage.clear());it('persists feedback locally',()=>{saveFeedback({id:'1',createdAt:'2026-01-01',crowding:2,enjoyment:5,trainingQuality:4,chooseAgain:true,pool:'main',sessionId:'m1'});expect(loadFeedback()).toHaveLength(1);expect(loadFeedback()[0].enjoyment).toBe(5)});
