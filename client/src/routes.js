
import Alternative from "views/pages/dashboards/Alternative.jsx";
import Buttons from "views/pages/components/Buttons.jsx";
import Calendar from "views/pages/Calendar.jsx";
import Cards from "views/pages/components/Cards.jsx";
import Charts from "views/pages/Charts.jsx";
import Components from "views/pages/forms/Components.jsx";
import Dashboard from "views/pages/dashboards/Dashboard.jsx";
import Elements from "views/pages/forms/Elements.jsx";
import Google from "views/pages/maps/Google.jsx";
import Grid from "views/pages/components/Grid.jsx";
import Icons from "views/pages/components/Icons.jsx";
import Lock from "views/pages/examples/Lock.jsx";
import Login from "views/pages/examples/Login.jsx";
import Notifications from "views/pages/components/Notifications.jsx";
import Pricing from "views/pages/examples/Pricing.jsx";
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

import AllDrivers from "./backOffice/Users/AllDrivers";
import AllDriverRequest from "./backOffice/DriverRequest/AllDriverRequest";
import AllUsers from "./backOffice/Users/AllUsers";
import Agents from "./backOffice/Users/Agents.jsx";
import AllClaims from "./backOffice/Claims/AllClaims.jsx";
import DetailClaim from "./backOffice/Claims/DetailClaim.jsx";
import EditClaim from "./backOffice/Claims/EditClaim.jsx";
import MyProfile from "./backOffice/MyProfile.jsx";
import CreateParcel from "./FrontOffice/Parcels/Create";
import PackagesDetails from "./FrontOffice/Parcels/PackageDetails/PackageDetails";
import Packages from "./FrontOffice/Parcels/Packages";


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
      }
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
    collapse: true,
    name: "Examples",
    icon: "ni ni-ungroup text-orange",
    state: "examplesCollapse",
    views: [
      {
        path: "/Add",
        name: "Create Package",
        component: CreateParcel,
        layout: "/auth"
      },
      {
        path: "/parcels",
        name: "Packages",
        component: Packages,
        layout: "/auth"
      },
      {
        path: "/viewparcels/:id",
        name: "view parcels",
        component: PackagesDetails,
        layout: "/auth"
      },
      {
        path: "/login",
        name: "Login",
        component: Login,
        layout: "/auth"
      },
      {
        path: "/register",
        name: "Register",
        component: Register,
        layout: "/auth"
      },
      {
        path: "/lock",
        name: "Lock",
        component: Lock,
        layout: "/auth"
      },
      {
        path: "/timeline",
        name: "Timeline",
        component: Timeline,
        layout: "/admin"
      },
      {
        path: "/profile",
        name: "Profile",
        component: MyProfile,
        layout: "/admin"
      },
      {
        path: "/profileOld",
        name: "Profile",
        component: Profile,
        layout: "/admin"
      },
      {
        path: "/siteselector",
        name: "SiteSelector",
        component: SiteSelector,
        layout: "/admin"
      }

    ]
  },
  {
    collapse: true,
    name: "Components",
    icon: "ni ni-ui-04 text-info",
    state: "componentsCollapse",
    views: [
      {
        path: "/buttons",
        name: "Buttons",
        component: Buttons,
        layout: "/admin"
      },
      {
        path: "/cards",
        name: "Cards",
        component: Cards,
        layout: "/admin"
      },
      {
        path: "/grid",
        name: "Grid",
        component: Grid,
        layout: "/admin"
      },
      {
        path: "/notifications",
        name: "Notifications",
        component: Notifications,
        layout: "/admin"
      },
      {
        path: "/icons",
        name: "Icons",
        component: Icons,
        layout: "/admin"
      },
      {
        path: "/typography",
        name: "Typography",
        component: Typography,
        layout: "/admin"
      },
      {
        collapse: true,
        name: "Multi Level",
        state: "multiCollapse",
        views: [
          {
            path: "#pablo",
            name: "Third level menu",
            component: () => {},
            layout: "/"
          },
          {
            path: "#pablo",
            name: "Just another link",
            component: () => {},
            layout: "/"
          },
          {
            path: "#pablo",
            name: "One last link",
            component: () => {},
            layout: "/"
          }
        ]
      }
    ]
  },
  {
    collapse: true,
    name: "Forms",
    icon: "ni ni-single-copy-04 text-pink",
    state: "formsCollapse",
    views: [
      {
        path: "/elements",
        name: "Elements",
        component: Elements,
        layout: "/admin"
      },
      {
        path: "/components",
        name: "Components",
        component: Components,
        layout: "/admin"
      },
      {
        path: "/validation",
        name: "Validation",
        component: Validation,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Tables",
    icon: "ni ni-align-left-2 text-default",
    state: "tablesCollapse",
    views: [
      {
        path: "/tables",
        name: "Tables",
        component: Tables,
        layout: "/admin"
      },
      {
        path: "/sortable",
        name: "Sortable",
        component: Sortable,
        layout: "/admin"
      },
      {
        path: "/react-bs-table",
        name: "React BS Tables",
        component: ReactBSTables,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Maps",
    icon: "ni ni-map-big text-primary",
    state: "mapsCollapse",
    views: [
      {
        path: "/google",
        name: "Google",
        component: Google,
        layout: "/admin"
      },
      {
        path: "/vector",
        name: "Vector",
        component: Vector,
        layout: "/admin"
      }
    ]
  },
  {
    path: "/widgets",
    name: "Widgets",
    icon: "ni ni-archive-2 text-green",
    component: Widgets,
    layout: "/admin"
  },
  {
    path: "/charts",
    name: "Charts",
    icon: "ni ni-chart-pie-35 text-info",
    component: Charts,
    layout: "/admin"
  },
  {
    path: "/calendar",
    name: "Calendar",
    icon: "ni ni-calendar-grid-58 text-red",
    component: Calendar,
    layout: "/admin"
  }
];

export default routes;
