import { IconFolder, IconUsers, IconShield } from "@tabler/icons-react";

export interface TreeNode {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  url?: string;
  children?: TreeNode[];
}

export const treeData: TreeNode[] = [
  {
    id: "administration",
    name: "Administration",
    icon: IconFolder,
    children: [
      {
        id: "users",
        name: "Users",
        icon: IconUsers,
        url: "/users",
      },
      {
        id: "roles",
        name: "Roles",
        icon: IconShield,
        url: "/roles",
      },
    ],
  },
];
