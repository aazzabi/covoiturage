import Login from "./views/pages/examples/Login";
import Register from "./views/pages/examples/Register";
import Calendar from "./views/pages/Calendar";
import Google from "./views/pages/maps/Google";
import Vector from "./views/pages/maps/Vector";

import chat from "./components/chats/chat/chat";
import {Route} from "react-router-dom";
import React from "react";
import RideAdd from "./FrontOffice/Ride/RideAdd";
import RideEdit from "./FrontOffice/Ride/RideEdit";
import MyRides from "./FrontOffice/Ride/MyRides";
import RideSearch from "./FrontOffice/Ride/RideSearch";
import DetailRide from "./FrontOffice/Ride/DetailRide";

import PostDetail from "./FrontOffice/Blog/post_detail";
import PostNew from "./FrontOffice/Blog/post_new";
import PostMine from "./BackOffice/Blog/post_mine";
import BecomeDriver from "./FrontOffice/Drivers/BecomeDriver";
import MyTravellers from "./FrontOffice/Ride/MyTravellers";
import JoinedRides from "./FrontOffice/Ride/JoinedRides";
import CreateParcel from "./FrontOffice/Parcels/Create";
import PackagesDetails from "./FrontOffice/Parcels/PackageDetails/PackageDetails";
import Packages from "./FrontOffice/Parcels/Packages";
import PostList from "./FrontOffice/Blog/listPosts";
import ClaimAdd from "./FrontOffice/Claims/ClaimAdd";
import MyParcel from "./FrontOffice/Parcels/myparcels";
import EditPackage from "./FrontOffice/Parcels/EditPackage";
import map from './FrontOffice/Parcels/map/map';
import history from './FrontOffice/Parcels/history/history_container.js';
import test from './FrontOffice/Parcels/ApproveNotif';
import DriverRequest from "./FrontOffice/Parcels/DriverRequest";
import requests from "./FrontOffice/Parcels/myparcels/requests";
import BlogDetails from "./FrontOffice/Blog/post_detail/index";
import UserProfile from "./FrontOffice/UserProfile";

const routesFront = [
    {
        path: "/ride/travellers/:id",
        name: "myTravellers",
        icon: "ni ni-calendar-grid-58 text-red",
        component: MyTravellers,
        layout: "/front"
    },
    {
        path: "/ride/details/:id",
        name: "ride",
        icon: "ni ni-calendar-grid-58 text-red",
        component: DetailRide,
        layout: "/front"
    },
    {
        path: "/ride/search",
        name: "rides",
        icon: "ni ni-calendar-grid-58 text-red",
        component: RideSearch,
        layout: "/front"
    },
    {
        path: "/ride/add",
        name: "rideAdd",
        component: RideAdd,
        layout: "/front"
    },{
        path: "/ride/edit/:id",
        name: "editRide",
        component: RideEdit,
        layout: "/front"
    },
    {
        path: "/ride/myrides",
        name: "myrides",
        component: MyRides,
        layout: "/front"
    },
    {
        path: "/ride/joinedRides",
        name: "joinedRides",
        component: JoinedRides,
        layout: "/front"
    },
    {
        path: "/parcels/add",
        name: "Packages",
        icon: "ni ni-calendar-grid-58 text-red",
        component: CreateParcel,
        layout: "/front"
    },
    {
        path: "/parcels/details/:id",
        name: "view parcels",
        component: PackagesDetails,
        layout: "/front"
    },
    {
        path: "/parcels/driverReq/",
        name: "driverReq",
        component: DriverRequest,
        layout: "/front"
    },
    {
        path: "/parcels/edit/:id",
        name: "edit parcels",
        component: EditPackage,
        layout: "/front"
    },
    {
        path: "/myParcels/map/:id",
        name: "view parcels",
        component: map ,
        layout: "/front"
    },
    {
        path: "/myParcels/:id",
        name: "view parcels",
        component: requests ,
        layout: "/front"
    },
    {
        path: "/myParcelsReq/",
        name: "view parcels",
        component: MyParcel,
        layout: "/front"
    },

    {
        path: "/parcels/all/",
        name: "Packages",
        icon: "ni ni-calendar-grid-58 text-red",
        component: Packages,
        layout: "/front"
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        layout: "/front"
    },
    {
        path: "/chat",
        name: "Chat",
        component: chat ,
        layout: "/front"
     },
    {
        path: "/becomeDriver",
        name: "Become Driver",
        component: BecomeDriver,
        layout: "/front"
    },
    {
        path: "/viewparcels/:id",
        name: "view parcels",
        component: PackagesDetails,
        layout: "/front"
    },
    {
        path: "/posts/",
        name: "Blogs",
        component: PostList,
        layout: "/front"
    },   {
        path: "/BlogDetails/:id",
        name: "Blogs",
        component: BlogDetails,
        layout: "/front"
    },
    {
        path: "/history",
        name: "history",
        component: history,
        layout: "/front"
    },
    {
        path: "/test",
        name: "test",
        component: test,
        layout: "/front"
    },
    {
        path: "/user/:id",
        name: "userDetail",
        icon: "ni ni-calendar-grid-58 text-red",
        component: UserProfile,
        layout: "/front"
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        layout: "/front"
    },
    {
        path: "/claims/new",
        name: "Blog new",
        component: ClaimAdd,
        layout: "/front"
    },
    {
        collapse: true,
        name: "Calendar",
        icon: "ni ni-calendar-grid-58 text-red",
        state: "mapsCollapse",
        views: [
            {
                path: "/google",
                name: "Google",
                component: Google,
                layout: "/front"
            },
            {
                path: "/vector",
                name: "Vector",
                component: Vector,
                layout: "/front"
            }
        ]
    }

];

export default routesFront;
