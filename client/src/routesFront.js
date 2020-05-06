import Login from "./views/pages/examples/Login";
import Register from "./views/pages/examples/Register";
import Calendar from "./views/pages/Calendar";
import Google from "./views/pages/maps/Google";
import Vector from "./views/pages/maps/Vector";
import React from "react";
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
const routesFront = [
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
        path: "/myParcels/",
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
