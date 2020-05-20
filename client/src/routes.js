import Buttons from "views/pages/components/Buttons.jsx";
import Calendar from "views/pages/Calendar.jsx";
import Cards from "views/pages/components/Cards.jsx";
import Charts from "views/pages/Charts.jsx";
import Components from "views/pages/forms/Components.jsx";
import Elements from "views/pages/forms/Elements.jsx";
import Google from "views/pages/maps/Google.jsx";
import Grid from "views/pages/components/Grid.jsx";
import Icons from "views/pages/components/Icons.jsx";
import Lock from "views/pages/examples/Lock.jsx";
import Login from "views/pages/examples/Login.jsx";
import Notifications from "views/pages/components/Notifications.jsx";
import Profile from "views/pages/examples/Profile.jsx";
import SiteSelector from "views/pages/examples/SiteSelector";
import ReactBSTables from "views/pages/tables/ReactBSTables.jsx";
import Register from "views/pages/examples/Register.jsx";
import Sortable from "views/pages/tables/Sortable.jsx";
import Tables from "views/pages/tables/Tables.jsx";
import Timeline from "views/pages/examples/Timeline.jsx";
import Typography from "views/pages/components/Typography.jsx";
import Validation from "views/pages/forms/Validation.jsx";
import Vector from "views/pages/maps/Vector.jsx";
import Widgets from "views/pages/Widgets.jsx";
import AllDrivers from "./BackOffice/Users/AllDrivers";
import AllDriverRequest from "./BackOffice/DriverRequest/AllDriverRequest";
import AllUsers from "./BackOffice/Users/AllUsers";
import Agents from "./BackOffice/Users/Agents.jsx";
import AllClaims from "./BackOffice/Claims/AllClaims.jsx";
import DetailClaim from "./BackOffice/Claims/DetailClaim.jsx";
import EditClaim from "./BackOffice/Claims/EditClaim.jsx";
import Create from "./FrontOffice/Parcels/Create";
import PackageDetails from "./FrontOffice/Parcels/PackageDetails/PackageDetails";
import MyProfile from "./BackOffice/MyProfile.jsx";
import Packages from "./FrontOffice/Parcels/Packages";
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
