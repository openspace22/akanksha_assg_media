import {
    LOAD_PAGE_DATA,
    PAGE_DATA_LOADED,
    LOAD_CAT_ITEMS,
    CAT_DATA_LOADED,
    LOAD_ITEM_DATA,
    ITEM_DATA_LOADED
} from "./constants";
export const catDataLoaded = (data) => ({
    type: CAT_DATA_LOADED,
    data
});
export const loadCatItems = (catKey) => ({
    type: LOAD_CAT_ITEMS,
    catKey
});
export const pageDataLoaded = (data) => ({
    type: PAGE_DATA_LOADED,
    data
});
export const loadPageData = (catKey,catItemId) =>({
    type: LOAD_PAGE_DATA,
    catKey,
    catItemId
});
export const loadItemData = (itemId) => ({
    type: LOAD_ITEM_DATA,
    itemId
});
export const itemDataLoaded = (data) => ({
    type: ITEM_DATA_LOADED,
    data
});