import Profile from "views/pages/examples/Profile.jsx";
import AllDrivers from "./BackOffice/Users/AllDrivers";
import AllDriverRequest from "./BackOffice/DriverRequest/AllDriverRequest";
import AllUsers from "./BackOffice/Users/AllUsers";
import Agents from "./BackOffice/Users/Agents.jsx";
import AllClaims from "./BackOffice/Claims/AllClaims.jsx";
import DetailClaim from "./BackOffice/Claims/DetailClaim.jsx";
import EditClaim from "./BackOffice/Claims/EditClaim.jsx";
import MyProfile from "./BackOffice/MyProfile.jsx";
import PostNew from "./FrontOffice/Blog/post_new";
import PostMine from "./BackOffice/Blog/post_mine";
import Rides from "./BackOffice/Ride/Rides";

const routes = [
    {
        collapse: true,
        name: "Users",
        icon: "ni ni-shop text-primary",
        state: "dashboardsCollapse",
        rolesAllowed: ['ADMIN'],
        views: [
            {
                path: "/users",
                name: "All",
                component: AllUsers,
                layout: "/admin",
                rolesAllowed: ['ADMIN'],
            },
            {
                path: "/agents",
                name: "Agents",
                component: Agents,
                layout: "/admin",
                rolesAllowed: ['ADMIN'],
            }
        ]
    },
    {
        collapse: true,
        name: "Drivers",
        icon: "fas fa-dharmachakra text-primary",
        state: "driversCollapse",
        rolesAllowed: ['ADMIN'],
        views: [
            {
                path: "/drivers",
                name: "All Drivers",
                component: AllDrivers,
                layout: "/admin"
            },
            {
                path: "/driversRequest",
                name: "Drivers Request",
                component: AllDriverRequest,
                layout: "/admin"
            },
        ]
    },
    {
        collapse: true,
        name: "Posts",
        icon: "fas fa-dharmachakra text-primary",
        state: "postsCollapse",
        views: [
            {
                path: "/posts/new",
                name: "Blog new",
                component: PostNew,
                layout: "/admin"
            },
            {
                path: "/posts/my_posts",
                name: "My posts",
                component: PostMine,
                layout: "/admin"
            },
        ]
    },
    {
        collapse: true,
        name: "Claims",
        icon: "ni ni-spaceship text-pink",
        state: "claimsCollapse",
        views: [
            {
                path: "/claims/edit/:id",
                name: "détail",
                component: EditClaim,
                layout: "/admin",
                invisible: true
            },
            {
                path: "/claims/:id",
                name: "détail",
                component: DetailClaim,
                layout: "/admin",
                invisible: true
            },
            {
                path: "/claims",
                name: "All",
                component: AllClaims,
                layout: "/admin",
                invisible: false
            },
        ]
    },
    {
        collapse: false,
        icon: "fa fa-car text-green",
        path: "/rides",
        name: "rides",
        component: Rides,
        rolesAllowed: ['ADMIN'],
        layout: "/admin"
    },
    {
        collapse: false,
        icon: "fa fa-user text-red",
        path: "/profile",
        name: "Profile",
        component: MyProfile,
        layout: "/admin"
    },

];

export default routes;
