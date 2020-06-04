import React from "react";
import Header from "../../components/Header";
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import { Link } from "react-router-dom";
import "./style.scss";
const HomePage = () =>{
    return (
        <div className="page-body home">
            <Header title="Interfaces"></Header>
            <div className="card-holder">
                <Link to="/myfavourite">
                    <div className="card">
                        <div className="icon-holder">
                            <AirplanemodeActiveIcon> </AirplanemodeActiveIcon>
                        </div>
                        <div className="text-holder">Star Wars</div>
                    </div>
                </Link>
                <Link to="/employeedashboard">
                    <div className="card">
                        <div className="icon-holder">
                            <AirplanemodeActiveIcon> </AirplanemodeActiveIcon>
                        </div>
                        <div className="text-holder">Employees</div>
                    </div>
                </Link>
                
            </div>
        </div>
    )
};
export default HomePage; 