import {
  IconFileText,
  IconCurrencyDollar,
  IconPalette,
  IconShield,
  IconUsers,
  IconSettings,
  IconTool,
  IconClipboardList,
  IconCalculator,
  IconCoin,
  IconWallet,
  IconTrendingUp,
  IconShoppingCart,
  IconUserCog,
  IconTransfer,
  IconHistory,
  IconRefresh,
  IconDownload,
  IconUpload,
  IconScale,
  IconBuildingBank,
  IconEye,
  IconLanguage,
  IconWebhook,
  IconTool as IconMaintenance,
  IconSubscript,
  IconUserBolt,
} from "@tabler/icons-react";

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
    icon: IconUserCog,
    children: [
      {
        id: "organization-units",
        name: "Organization Units",
        icon: IconUsers,
        url: "/administration/organization-units",
      },
      {
        id: "roles",
        name: "Roles",
        icon: IconShield,
        url: "/administration/roles",
      },
      {
        id: "users",
        name: "Users",
        icon: IconUsers,
        url: "/administration/users",
      },
      {
        id: "languages",
        name: "Languages",
        icon: IconLanguage,
        url: "/administration/languages",
      },
      {
        id: "audit-logs",
        name: "Audit logs",
        icon: IconEye,
        url: "/administration/audit-logs",
      },
      {
        id: "maintenance",
        name: "Maintenance",
        icon: IconMaintenance,
        url: "/administration/maintenance",
      },
      {
        id: "subscription",
        name: "Subscription",
        icon: IconSubscript,
        url: "/administration/subscription",
      },
      {
        id: "visual-settings",
        name: "Visual Settings",
        icon: IconPalette,
        url: "/administration/visual-settings",
      },
      {
        id: "webhook-subscriptions",
        name: "Webhook Subscriptions",
        icon: IconWebhook,
        url: "/administration/webhook-subscriptions",
      },
      {
        id: "settings",
        name: "Settings",
        icon: IconSettings,
        url: "/administration/settings",
      },
    ],
  },
  {
    id: "tools",
    name: "Tools",
    icon: IconTool,
    children: [
      {
        id: "manual-transfer",
        name: "Manual Transfer",
        icon: IconTransfer,
        url: "/tools/manual-transfer",
      },
    ],
  },
  {
    id: "logs",
    name: "Logs",
    icon: IconClipboardList,
    children: [
      {
        id: "ex-requests",
        name: "Ex Requests",
        icon: IconRefresh,
        url: "/logs/ex-requests",
      },
      {
        id: "re-order-responses",
        name: "RE Order Responses",
        icon: IconRefresh,
        url: "/logs/re-order-responses",
      },
      {
        id: "re-trade-responses",
        name: "RE Trade Responses",
        icon: IconRefresh,
        url: "/logs/re-trade-responses",
      },
    ],
  },
  {
    id: "accounting",
    name: "Accounting",
    icon: IconCalculator,
    children: [
      {
        id: "account-names",
        name: "Account Names",
        icon: IconFileText,
        url: "/accounting/account-names",
      },
      {
        id: "balances",
        name: "Balances",
        icon: IconScale,
        url: "/accounting/balances",
      },
      {
        id: "debit-and-credits",
        name: "Debit And Credits",
        icon: IconDownload,
        url: "/accounting/debit-and-credits",
      },
    ],
  },
  {
    id: "postings",
    name: "Postings",
    icon: IconCoin,
    children: [
      {
        id: "cash-postings",
        name: "Cash Postings",
        icon: IconCurrencyDollar,
        url: "/postings/cash-postings",
      },
      {
        id: "trading-fees",
        name: "Trading Fees",
        icon: IconFileText,
        url: "/postings/trading-fees",
      },
      {
        id: "deposits",
        name: "Deposits",
        icon: IconDownload,
        url: "/postings/deposits",
      },
      {
        id: "withdraws",
        name: "Withdraws",
        icon: IconUpload,
        url: "/postings/withdraws",
      },
    ],
  },
  {
    id: "balances",
    name: "Balances",
    icon: IconWallet,
    children: [
      {
        id: "cash-balances",
        name: "Cash Balances",
        icon: IconCurrencyDollar,
        url: "/balances/cash-balances",
      },
      {
        id: "asset-balances",
        name: "Asset Balances",
        icon: IconBuildingBank,
        url: "/balances/asset-balances",
      },
    ],
  },
  {
    id: "trades",
    name: "Trades",
    icon: IconTrendingUp,
    children: [
      {
        id: "trade-history",
        name: "Trade History",
        icon: IconHistory,
        url: "/trades/trade-history",
      },
    ],
  },
  {
    id: "orders",
    name: "Orders",
    icon: IconShoppingCart,
    children: [
      {
        id: "order-history",
        name: "Order History",
        icon: IconHistory,
        url: "/orders/order-history",
      },
      {
        id: "order-event-histories",
        name: "Order Event Histories",
        icon: IconRefresh,
        url: "/orders/order-event-histories",
      },
    ],
  },
  {
    id: "investor-manager",
    name: "Investor Manager",
    icon: IconUserCog,
    children: [
      {
        id: "investors",
        name: "Investors",
        icon: IconUsers,
        url: "/investor-manager/investors",
      },
      {
        id: "kyc-attempts",
        name: "Kyc Attempts",
        icon: IconUserBolt,
        url: "/investor-manager/kyc-attempts",
      },
    ],
  },
];
