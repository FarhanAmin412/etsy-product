import SvgColor from "../../../components/svg-color";

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: icon("dashboard"),
  },
  {
    title: "Inbox",
    path: "/dashboard/chat",
    icon: icon("bundle"),
  },
  {
    title: "orders",
    path: "/dashboard/orders",
    icon: icon("order"),
  },
  {
    title: "users",
    path: "/dashboard/user",
    icon: icon("users"),
  },
  {
    title: "products",
    path: "/dashboard/products",
    icon: icon("catalog"),
  },
  {
    title: "catalog",
    path: "/dashboard/catalog",
    icon: icon("catalog"),
  },
  {
    title: "stores",
    path: "/dashboard/stores",
    icon: icon("store"),
  },
  {
    title: "Mockups",
    path: "/dashboard/mockups",
    icon: icon("library"),
  },
  {
    title: "Scopes",
    path: "/dashboard/scopes",
    icon: icon("ic_lock"),
  },
  {
    title: "Apps",
    path: "/dashboard/apps",
    icon: icon("ic_lock"),
  },
];

export default navConfig;
