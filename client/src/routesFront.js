//import CreateParcel from "./frontoffice/Parcels/Create";
import Login from "./views/pages/examples/Login";
import Register from "./views/pages/examples/Register";
import Calendar from "./views/pages/Calendar";
import Google from "./views/pages/maps/Google";
import Vector from "./views/pages/maps/Vector";
import chat from "./components/chats/chat/chat";

const routesFront = [
   /* {
        path: "/parcels",
        name: "Packages",
        icon: "ni ni-calendar-grid-58 text-red",
        component: CreateParcel,
        layout: "/front"
    },*/
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
        path: "/register",
        name: "Register",
        component: Register,
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
