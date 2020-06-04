import { 
    PAGE_DATA_LOADED,
    LOAD_PAGE_DATA 
} from "./constants";
export const pageDataLoaded = (data) => ({
    type: PAGE_DATA_LOADED,
    data
});
export const loadPageData = () => ({
    type: LOAD_PAGE_DATA
})