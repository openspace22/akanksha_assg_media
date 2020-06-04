import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectState = (state) => state.addEditEmployee || initialState;

export const selectEmployeeInfo = createSelector(
    selectState,
    (state) => state.employeeInfo
)
