import { matchPath } from "react-router";
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeIcon from '@material-ui/icons/Home';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
const list = [
    {
        title: "Home",
        href: "/",
        Icon: HomeIcon,
    },
    {
        title: "Star Wars",
        href: "/starwarsinfo",
        Icon: BubbleChartIcon,
        child: [
            {
                title: "Select Category",
                Icon: AirplanemodeActiveIcon,
                href: "/starwarsinfo/people/",
                isActive: function(location){
                    return matchPath(location.pathname,'/starwarsinfo/:catId/:catItemId?');
                }
            },
            {
                title: "Status Board",
                Icon: DashboardIcon,
                href: "/myfavourite"
            }
        ]
    },
    {
        title: "Employee",
        href: "/employee",
        Icon: BubbleChartIcon,
        child: [
            {
                title: "Listing",
                Icon: AirplanemodeActiveIcon,
                href: "/employee/listing",
                isActive: function(location){
                     return location.pathname.includes("employee/");
                    
                 }
            },
            {
                title: "Dashboard",
                Icon: AirplanemodeActiveIcon,
                href: "/employeedashboard",

            }
        ],
    }
];
export default list;