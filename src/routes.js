import Dashboard from "../src/component/dashboard";
import AnimalTable from "../src/tables";
import Notifications from "layouts/notifications";
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Animal Detection Images",
    key: "Animal Detection Images",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/Images",
    component: <AnimalTable />,
  },
];

export default routes;
