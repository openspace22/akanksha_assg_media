import React,{ useEffect, useLayoutEffect } from "react";
import Header from "../../components/Header";
import { connect } from "react-redux";
import {
    loadPagedata,
    deleteEmployee
} from "./actions";
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from "./reducer";
import saga from "./saga";
import ListingCardHolder from "../../components/ListingCardHolder";
import {
    selectEmployeeList,
    selectTotalCount,
    selectPageOffset,
    selectStart,
    selectPageNo
} from "./selector";
import { Link } from "react-router-dom";
import "./style.scss";
import TablePagination from '@material-ui/core/TablePagination';
import ListPopover from "../../components/ListPopover";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchFilter from "./SearchFilter";
import AddIcon from '@material-ui/icons/Add';
const key = "employeeListing";
const getBodyTemplate = ({
    phone,
    email,
    address,
    age
} = {}) => {
    return (
        <>
            <div className="info-holder">
                <label className="form-label">Age</label>
                <div>{age}</div>
            </div>
            <div className="info-holder">
                <label className="form-label">Phone No.</label>
                <div>{phone}</div>
            </div>
            <div className="info-holder">
                <label className="form-label">Email Address</label>
                <div>{email}</div>
            </div>
            <div className="info-holder">
                <label className="form-label">Address</label>
                <div className="text-overflow-with-two-lines">{address}</div>
            </div>
        </>
    )
}
const getFooterTemplate = (item) => {
    return (
        <Link
            to={`/employee/${item.id}`}
        >View More</Link>
    )
}
const EmployeesListing = ({
    list,
    pageNo,
    total,
    pageOffset,
    loadPagedata,
    deleteEmployee,
    location,
    history
}) => {
    useInjectSaga({key,saga});
    useInjectReducer({key,reducer});
    
    useEffect(()=>{
        loadPagedata({
            start: 0,
            pageOffset,
            filterQuery: location.search.substr(1)
        });
    },[location]);
    
    useLayoutEffect(()=>{
        const scrollingEle = document.getElementsByClassName("page-body");
        scrollingEle[0].scrollTop = 0;
    },[list]); 
    const searchList = [
        {
            title: "Name",
            searchKey: "first_name_like"
        },
        {
            title: "Age",
            searchKey: "age"
        }
    ]
    const getHeaderTemplate = ({
        id,
        first_name,
        last_name
    }) => {
        const listOptions = [
            {
                type: "ListItem",
                title: "Edit",
                onClick: ()=>{
                    history.push(`/employee/addEdit/${id}`)
                }
            },
            {
                type: "ListItem",
                title: "Delete",
                onClick: (item)=>{
                    deleteEmployee(id);
                }
            }
        ];
        return (
            <>
                <div>{first_name} {last_name}</div>
                <ListPopover  
                    lisItems= {listOptions}
                    clickTarget={(
                        <div 
                            className="more-icon"
                        >
                            <MoreVertIcon></MoreVertIcon>
                        </div>
                    )}>
                    </ListPopover>
            </>
        )
    }
    return (
        <div className="page-body employee">
            <Header title="Listing"></Header>
            <SearchFilter
                list={searchList}
            ></SearchFilter>
            <ListingCardHolder
                prepareHeader={getHeaderTemplate}
                prepareBody={getBodyTemplate}
                prepareFooter={getFooterTemplate}
                noOfCardPerRow={3}
                list={list}
            ></ListingCardHolder>
            <TablePagination
                component="div"
                count={total}
                classes={
                    {
                        root: "page-footer"
                    }
                }
                onChangeRowsPerPage={(event)=>{
                    loadPagedata({
                        start: 0,
                        pageOffset: Number(event.target.value)
                    });
                }}
                page={pageNo - 1}
                rowsPerPage={pageOffset}
                onChangePage={
                    (event,newPage) => {
                        const newStart = newPage*pageOffset;
                        loadPagedata({
                            start: newStart,
                            pageOffset
                        });
                    }
                }
            />
            <div className="add-icon-holder" onClick={
                ()=>{
                    history.push(`/employee/addEdit`)
                }
            }>
                <AddIcon></AddIcon>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => ({
    list: selectEmployeeList(state),
    pageOffset: selectPageOffset(state),
    total: selectTotalCount(state),
    pageNo: selectPageNo(state)
})
export default connect(mapStateToProps,{
    loadPagedata,
    deleteEmployee
})(EmployeesListing);