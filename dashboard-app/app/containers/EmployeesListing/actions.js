import {
    LOAD_PAGE_DATA,
    PAGE_DATA_LOADED,
    DELETE_EMPLOYEE
} from "./constants";
export const loadPagedata = (data) => ({
    type: LOAD_PAGE_DATA,
    ...data
});
export const pageDataLoaded = (data) => ({
    type: PAGE_DATA_LOADED,
    data
});
export const deleteEmployee = (id) => ({
    type: DELETE_EMPLOYEE,
    id
})