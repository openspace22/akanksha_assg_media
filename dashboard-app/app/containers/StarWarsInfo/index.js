import React, { useEffect, useCallback, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import Header from "../../components/Header";
import {
    loadPageData,
    loadCatItems,
    loadItemData
} from "./actions";
import "./style.scss";
import DropDown from "./DropDown";
import { 
    selectCatKey,
    makeCatList,
    makeCatItems,
    selectItemInfo,
    selectItemId
} from "./selector";
import infoJson from "./infoToDisplay";
const key = "starwarsinfo";
const StarWarsInfo = ({
    catList,
    catItems,
    selectedCatKey,
    itemInfo,
    itemId,
    loadPageData,
    loadCatItems,
    loadItemData,
    match: {params},
    history
}) => {
    useInjectSaga({key,saga});
    useInjectReducer({key,reducer});
    const componentMounted = useRef(false);
    useEffect(()=>{
        if(!componentMounted.current){
            componentMounted.current = true;
            loadPageData(params.catId,params.catItemId); 
        }else{
            if(selectedCatKey != params.catId){
                loadCatItems(params.catId);

            }else if(params.catItemId){
                loadItemData(params.catItemId);
            }
        }
    },[params]);
    
    const {key: selectedItemKey = "",value:selectedItemVal = ""} = useMemo(()=>{
        if(itemId){
            const result = catItems.filter((item)=> item.id == itemId)[0];
            return result;
        }
        return {};
    },[itemId,catItems]);
    
    const onChangeCat = useCallback((e)=>{
        history.push(`/starwarsinfo/${e.target.value}/`);
    },[]);
    
    const onChangeItem = useCallback((e)=>{
        const value = e.target.value;
        if(value != undefined){
            const selectedItemId = catItems[value].id;
            history.push(`/starwarsinfo/${selectedCatKey}/${selectedItemId}`);
        }
    });
    return (
        <div className="page-body sw">
            <Header title="STAR WARS"></Header>
            <div className="data-holder">
                <div className="card">
                    <div>
                        <DropDown 
                            value={selectedCatKey} 
                            onChange={onChangeCat} 
                            list={catList}
                            dropDownLabel="Choose category"
                        />
                    </div>
                    <div style={{marginTop: "20px"}}>
                        <DropDown 
                            value={selectedItemKey} 
                            onChange={onChangeItem} 
                            list={catItems} 
                            placeHolder="Select Value"
                            dropDownLabel={`Choose from ${selectedCatKey}:`}
                        />
                    </div>
                </div>
                
                {
                    itemInfo ? 
                        (
                            <div className="card">
                                <div className="info-title">Details of {selectedItemVal}</div>
                                {
                                    infoJson[selectedCatKey].map(({valueId,label},index)=>
                                        (
                                            <div className="info-row" key={index}>
                                                <div className="label-col">{label}:</div>
                                                <div className="value-col">{itemInfo[valueId]}</div>
                                            </div>
                                        )
                                    )
                                }
                            </div>
                            
                        ) : null
                }
                <div className="sw-logo"></div>
            </div>
        </div>
    )
}
StarWarsInfo.defaultProps = {
    catList: []
}
const mapStateToProps = (state) => {
    return{
        catList: makeCatList(state),
        selectedCatKey: selectCatKey(state),
        catItems: makeCatItems(state),
        itemInfo: selectItemInfo(state),
        itemId: selectItemId(state)
    }
}
const withConnect = connect(mapStateToProps,{
    loadPageData,
    loadCatItems,
    loadItemData
})(StarWarsInfo);
export default withConnect;