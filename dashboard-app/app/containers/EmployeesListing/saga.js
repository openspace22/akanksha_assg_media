import { takeLatest, put, call, select, takeEvery } from "redux-saga/effects";
import {
    LOAD_PAGE_DATA,
    DELETE_EMPLOYEE
} from "./constants";
import {
    pageDataLoaded
 } from "./actions";
import request from "../../utils/request";

const requestApi = (url) => {
    return fetch(url).then((response)=>{
        if (response.status >= 200 && response.status < 300) {
            return response;
        }
        
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    })
} 
function* fetchEmployees({start,pageOffset,filterQuery}){
    const fetchUrl = `http://localhost:3004/employee?_start=${start}&_end=${start+pageOffset}&${filterQuery}`
    const response = yield call(requestApi,fetchUrl);
    const total = Number(response.headers.get('X-Total-Count'));
    const list = yield call([response,response.json]);
    yield put(pageDataLoaded({
        total,
        list,
        start,
        pageOffset
    }));
}
function* deleteEmployee({id}){
    const url = `http://localhost:3004/employee/${id}`;
    const response = yield call(request,url,{
        method: 'DELETE'
    });
    console.log(response);
    const {employeeListing : {pageOffset}}  = yield select();
    yield* fetchEmployees({
        start: 0,
        pageOffset
    });
}
export default function* employeeListingSaga(){
    yield takeLatest(LOAD_PAGE_DATA,fetchEmployees);
    yield takeEvery(DELETE_EMPLOYEE,deleteEmployee);
    //
}