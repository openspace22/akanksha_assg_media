import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectState = (state) => state.starwarsinfo || initialState;

const selectCatMap = createSelector(
    selectState,
    (state) => state.categoriesMap
);

const selectCatItems = createSelector(
    selectState,
    (state) => state.selectedCatItems
);
export const selectCatKey = createSelector(
    selectState,
    (state) => state.selectedCatKey
)
export const makeCatList = createSelector(
    selectCatMap,
    (catMap) => Object.keys(catMap).map((item)=>({
        key: item,
        value: item
    }))
);
export const selectItemInfo = createSelector(
    selectState,
    (state) => state.itemInfo
);
export const selectItemId = createSelector(
    selectState,
    (state) => state.selectedItemId
);
export const makeCatItems = createSelector(
    selectCatItems,
    selectCatKey,
    (catItems,catKey) => {
        return catItems.map((item,index)=>{
            const findIdRegex = new RegExp(`https?:\\/\\/swapi\\.dev\\/api\\/${catKey}\\/([0-9]+)\\/`,"g");
            const id = findIdRegex.exec(item.url)[1]; 
            return {
                key: index,
                id,
                value: item.name || item.title
            }
        });
    }
)