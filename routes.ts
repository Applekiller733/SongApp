import { type RouteConfig, index, route, layout, prefix } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/login", "routes/login/login.tsx")

] satisfies RouteConfig;
