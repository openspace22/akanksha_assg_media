import { initialState } from "./reducer";
import { createSelector } from "reselect";
const seletState = (state) =>  state.employeeListing || initialState;

export const selectEmployeeList = createSelector(
    seletState,
    (state) => state.list
);

export const selectTotalCount = createSelector(
    seletState,
    (state) => state.total
);

export const selectPageOffset = createSelector(
    seletState,
    (state) => state.pageOffset
);

export const selectStart = createSelector(
    seletState,
    (state) => state.start
)
export const selectPageNo = createSelector(
    selectStart,
    selectPageOffset,
    (start,offset) => Math.ceil((start + offset) / offset)
)