import { takeEvery, call, put } from "redux-saga/effects";
import {
    LOAD_PAGE_DATA
} from "./constants";
import {
    pageDataLoaded
 } from "./action";
 
function getMostFetchedCategory(data){
    const root = data.data;
    let maxHitObj = {
        totalHit: 0
    };
    for(const key in root){
        if(root.hasOwnProperty(key)){
            if(root[key].totalHit > maxHitObj.totalHit){
                maxHitObj = JSON.parse(JSON.stringify(root[key]));
            }
        }
    }
    return maxHitObj;
} 
function getMostFetchedSubCat(data){
    const root = data.data;
    let maxHitObj = {
        totalHit: 0
    };
    for(const key in root){
        if(root.hasOwnProperty(key)){
            const subRoot = root[key].data;
            for(const subKey in subRoot){
                if(subRoot.hasOwnProperty(subKey)){
                    if(subRoot[subKey].totalHit > maxHitObj.totalHit){
                        maxHitObj = JSON.parse(JSON.stringify(subRoot[subKey]));
                    }
                }
            }
        }
    }
    return maxHitObj;
}
function* fetchPageData(){
    const dataStr = yield call([localStorage,localStorage.getItem],"categoryHit");
    const pageData = {}
    if(dataStr){
        const data = JSON.parse(dataStr);
        const maxHitCat = yield call(getMostFetchedCategory,data);
        const maxHitSubcat = yield call(getMostFetchedSubCat,data)
        pageData.maxHitCat = maxHitCat;
        pageData.maxHitSubcat = maxHitSubcat;
        pageData.totalHit = data.totalHit;
    }
    yield put(pageDataLoaded(pageData));
}
export default function* loadDataSaga(){
    yield takeEvery(LOAD_PAGE_DATA,fetchPageData);
}