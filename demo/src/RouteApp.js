import { useRoutes } from "react-router-dom";
import ListEmployeeComponent from "./component/ListEmployeeComponent";

const RouteApp = () => {
  let routes = useRoutes([
    { path: "/", element: <ListEmployeeComponent /> },
    // { path: "/employee", element: <ListEmployeeComponent /> },
    // { path: "/add-employee/:id", element: <CreateEmployeeComponent /> },
    // { path: "/view-employee/:id", element: <ListEmployeeComponent /> },
  ]);
  return routes;
};

export default RouteApp;