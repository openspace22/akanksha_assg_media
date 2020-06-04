import { takeLatest, call, put, select, all } from "redux-saga/effects";
import { 
    catDataLoaded,
    pageDataLoaded,
    itemDataLoaded 
} from "containers/StarWarsInfo/actions";
import request from "utils/request";
import {
    LOAD_PAGE_DATA,
    LOAD_CAT_ITEMS,
    LOAD_ITEM_DATA
} from "./constants";
function* fetchPageData({catKey,catItemId}){
    const requestUrl = "https://swapi.dev/api/";
    const categoriesMap = yield call(request,requestUrl);
    const catUrl = categoriesMap[catKey];
    const tasks = [];
    tasks.push(call(request,catUrl))
    if(catItemId){
        tasks.push(call(request, catUrl + catItemId + "/"));
    }
    const [catItemsData, itemInfo] = yield all([...tasks]);
    yield put(pageDataLoaded({
        categoriesMap,
        selectedCatKey: catKey,
        selectedCatItems: catItemsData.results,
        selectedItemId: catItemId,
        itemInfo
    }));
}
function getDataFromStorage(){
    const data = localStorage.getItem("categoryHit");
    return  (JSON.parse(data) || {
        totalHit: 0
    });
}
function* updateStorageData(keys){
    const categoryHitData = yield call(getDataFromStorage);
    console.log(categoryHitData);
    let parent = categoryHitData;
    keys.map(({key,extraInfo})=>{
        if(!parent.data){
            parent.data = {}
        }
        if(!parent.data[key]){
            parent.data[key] = {
                totalHit: 0,
                ...extraInfo
            }
        }
        parent.totalHit++;
        parent = parent.data[key];
    });
    parent.totalHit++;
    console.log(parent);
    yield call([localStorage,localStorage.setItem],"categoryHit",JSON.stringify(categoryHitData));
}
function* fetchCatData({catKey}){
    const { starwarsinfo: {categoriesMap} } = yield select();
    const catItemsData = yield call(request,categoriesMap[catKey]);
    yield put(catDataLoaded({
        selectedCatKey: catKey,
        selectedCatItems: catItemsData.results
    }));
}
function* fetchItemData({itemId}){
    const { starwarsinfo: {selectedCatKey,categoriesMap}} = yield select();
    const itemInfo = yield call(request,categoriesMap[selectedCatKey] + itemId + "/");
    yield* updateStorageData([{
        key: selectedCatKey,
        extraInfo: {
            title: selectedCatKey
        }
    },{
        key: itemId,
        extraInfo: {
            title: itemInfo.name || itemInfo.title
        }
    }]);
    yield put(itemDataLoaded({
        itemInfo,
        selectedItemId: itemId
    }));
}
export default function* loadPageData(){
    yield takeLatest(LOAD_PAGE_DATA,fetchPageData);
    yield takeLatest(LOAD_CAT_ITEMS,fetchCatData);
    yield takeLatest(LOAD_ITEM_DATA,fetchItemData);
}