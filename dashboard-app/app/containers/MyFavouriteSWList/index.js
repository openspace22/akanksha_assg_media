import React, { useEffect } from "react";
import reducer from "./reducer";
import saga from "./saga";
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import "./style.scss";
import CircularProgress from "../../components/CircularProgress";
import Header from "../../components/Header";
import { 
    loadPageData
 } from "./action";
import {
    selectCatHitObj,
    selectSubCatHitObj,
    getCatHitPercentage,
    selectTotalHit,
    getSubCatHitPercentage
 } from "./selector";
import { connect } from "react-redux";
const key = "favouritesw"
const MyFavouriteSW  = ({
    loadPageData,
    maxHitCat,
    maxHitSubcat,
    catHitPercentage,
    subCatHitPercentage,
    totalHit
}) => {
    useInjectReducer({key,reducer});
    useInjectSaga({key,saga});
    useEffect(()=>{
        loadPageData();
    },[]);
    if(totalHit == 0){
        return null;
    }
    return (
        <div className="page-body favourite">
            {/* <Header title="STATUS BOARD"></Header> */}
            <Header title="STATUS BOARD"></Header>
            <div className="card-holder">
                <div className="card cat">
                    <div className="title-sec">
                        {maxHitCat.title}
                        <div className="cat-type">CATEGORY</div> 
                    </div>
                    <div className="progress-bar-sec">
                        <CircularProgress progress={catHitPercentage}/>
                    </div>
                    <div className="count-footer">
                        <div className="count-sec actual-count-sec">
                            <div>Watched</div>
                            <div>{maxHitCat.totalHit}</div>
                        </div>
                        <div className="fake-border"></div>
                        <div className=" count-sec total-count-sec">
                            <div>Total</div>
                            <div>{totalHit}</div>
                        </div>
                    </div>
                </div>
                <div className="card cat">
                    <div className="title-sec">
                        {maxHitSubcat.title}
                        <div className="cat-type">SUB-CATEGORY</div> 
                    </div>
                    <div className="progress-bar-sec">
                        <CircularProgress progress={subCatHitPercentage}/>
                    </div>
                    <div className="count-footer">
                        <div className="count-sec actual-count-sec">
                            <div>Watched</div>
                            <div>{maxHitSubcat.totalHit}</div>
                        </div>
                        <div className="fake-border"></div>
                        <div className=" count-sec total-count-sec">
                            <div>Total</div>
                            <div>{totalHit}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => ({
    maxHitCat: selectCatHitObj(state),
    maxHitSubcat: selectSubCatHitObj(state),
    catHitPercentage: getCatHitPercentage(state),
    totalHit: selectTotalHit(state),
    subCatHitPercentage: getSubCatHitPercentage(state)
})
export default connect(mapStateToProps,{
    loadPageData
})(MyFavouriteSW);