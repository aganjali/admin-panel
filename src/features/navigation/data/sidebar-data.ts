import {
  IconDashboard,
  IconDatabase,
  IconFileDescription,
  IconFolder,
  IconHelp,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconChartPie,
} from "@tabler/icons-react";

export const user = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};

export const navMain = [
  {
    title: "Dashboard",
    url: "/",
    icon: IconDashboard,
  },
  {
    title: "Categories",
    url: "/categories",
    icon: IconListDetails,
  },
  {
    title: "Holders",
    url: "/administration/users",
    icon: IconUsers,
  },
  {
    title: "MIFID Tests",
    url: "/mifid-tests",
    icon: IconFileDescription,
  },
  {
    title: "Digital securities",
    url: "/digital-securities",
    icon: IconDatabase,
  },
  {
    title: "News",
    url: "/news",
    icon: IconReport,
  },
  {
    title: "Static Pages",
    url: "/static-pages",
    icon: IconFolder,
  },
  {
    title: "BI",
    url: "/bi",
    icon: IconChartPie,
  },
];

export const navSecondary = [
  {
    title: "Settings",
    url: "/administration/settings",
    icon: IconSettings,
  },
  {
    title: "Get Help",
    url: "/help",
    icon: IconHelp,
  },
  {
    title: "Search",
    url: "/search",
    icon: IconSearch,
  },
];
