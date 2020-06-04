import React, { useEffect, useLayoutEffect , useState } from "react";
import request from "../../utils/request";
import Header from "../../components/Header";
import "./style.scss";
const EmployeeDetail = ({
    match: {params}
}) => {
    const [ data, setData ] = useState(null);
    useEffect(()=>{
        request(`http://localhost:3004/employee?id=${params.id}`).then((data)=>{
            setData(data[0]);
        })
    },[params]);
    return (
        data ? (
            <div className="page-body">
                <Header title={`Detail / ${data.first_name} ${data.last_name}`}></Header>
                <div className="detail-holder">
                    <div className="logo-holder">
                        <div className="logo">
                            {data.first_name.charAt(0)}{data.last_name.charAt(0)}
                        </div>
                        <div>
                            {data.first_name} {data.last_name}
                        </div>
                    </div>
                    <div className="data-sec">
                        <div className="title">
                            Contact Information
                        </div>
                        <div className="info-wrapper">
                            <label className="form-label">Mobile No.</label>
                            <div>{data.phone || "-"}</div>
                        </div>
                        <div className="info-wrapper">
                            <label className="form-label">Email</label>
                            <div>{data.email || "-"}</div>
                        </div>
                        <div className="info-wrapper">
                            <label className="form-label">Address</label>
                            <div>{data.address || "-"}</div>
                        </div>
                    </div>
                    <div className="data-sec no-border">
                        <div className="title">
                            Additional Information
                        </div>
                        <div className="info-wrapper">
                            <label className="form-label">Age.</label>
                            <div>{data.age || "-"}</div>
                        </div>
                        <div className="info-wrapper">
                            <label className="form-label">Salary</label>
                            <div>Rs. {data.salary || "-"}</div>
                        </div>
                        <div className="info-wrapper">
                            <label className="form-label">About</label>
                            <div>{data.about || "-"}</div>
                        </div><div className="info-wrapper">
                            <label className="form-label">Dependents</label>
                            <div>{data.dependants ? data.dependants.map((item)=>{
                                return item.name
                            }).join(",") : "-"}</div>
                        </div>

                    </div>
                </div>
            </div>
            
        ) : null
    )
}
export default EmployeeDetail;