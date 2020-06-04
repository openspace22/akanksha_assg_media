import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectState = (state) => state.favouritesw || initialState;

export const selectTotalHit = createSelector(
    selectState,
    (state) => state.totalHit 
)
export const selectCatHitObj = createSelector(
    selectState,
    (state) => {
        return state.maxHitCat
    }
);
export const selectSubCatHitObj = createSelector(
    selectState,
    (state) => {
        return state.maxHitSubcat
    }
);
export const getCatHitPercentage = createSelector(
    selectTotalHit,
    selectCatHitObj,
    (totalHit,{totalHit: totalCatHit} = { totalHit : 0}) => {
        const hitPerc = ((totalCatHit * 100) / totalHit);
        return  (isNaN(hitPerc) ? 0 : Math.round(hitPerc * 100)/100);
    }
);
export const getSubCatHitPercentage = createSelector(
    selectTotalHit,
    selectSubCatHitObj,
    (totalHit,{totalHit: totalSubCatHit} = { totalHit : 0}) => {
        const hitPerc = ((totalSubCatHit * 100) / totalHit);
        return  (isNaN(hitPerc) ? 0 : Math.round(hitPerc * 100)/100);
    }
);