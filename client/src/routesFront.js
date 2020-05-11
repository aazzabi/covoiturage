
import Login from "./views/pages/examples/Login";
import Register from "./views/pages/examples/Register";
import Calendar from "./views/pages/Calendar";
import Google from "./views/pages/maps/Google";
import Vector from "./views/pages/maps/Vector";

import chat from "./components/chats/chat/chat";


import {Route} from "react-router-dom";
import React from "react";
import CreateParcel from "./FrontOffice/Parcels/Create";
import PackagesDetails from "./FrontOffice/Parcels/PackageDetails/PackageDetails";
import PostDetail from "./FrontOffice/Blog/post_detail";
import Packages from "./FrontOffice/Parcels/Packages";
import PostNew from "./FrontOffice/Blog/post_new";
import PostMine from "./FrontOffice/Blog/post_mine";
import PostList from "./FrontOffice/Blog/listPosts";
import ClaimAdd from "./FrontOffice/Claims/ClaimAdd";
import BecomeDriver from "./FrontOffice/Drivers/BecomeDriver";
import UserProfile from "./FrontOffice/UserProfile";

const routesFront = [
    {
        path: "/parcels/add",
        name: "Packages",
        icon: "ni ni-calendar-grid-58 text-red",
        component: CreateParcel,
        layout: "/front"
    },
    {
        path: "/parcels",
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
    },
    {
        path: "/posts/:id",
        name: "Blog",
        component: PostDetail,
        layout: "/front"
    },
    {
        path: "/posts/new",
        name: "Blog new",
        component: PostNew,
        layout: "/front"
    },
    {
        path: "/posts/my_posts",
        name: "Blog new",
        component: PostMine,
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
