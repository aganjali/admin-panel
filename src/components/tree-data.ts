import { perms } from "@/lib/perms";
import { IconFolder, IconUsers, IconShield } from "@tabler/icons-react";

export interface TreeNode {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  url?: string;
  children?: TreeNode[];
  perms: (string | string[])[];
}

export const treeData: TreeNode[] = [
  {
    id: "administration",
    name: "Administration",
    icon: IconFolder,
    perms: [perms.adminPanel.administration.view],
    children: [
      {
        id: "users",
        name: "Users",
        icon: IconUsers,
        url: "/users",
        perms: [perms.adminPanel.administration.users.view],
      },
      {
        id: "roles",
        name: "Roles",
        icon: IconShield,
        url: "/roles",
        perms: [perms.adminPanel.administration.roles.view],
      },
    ],
  },
];
