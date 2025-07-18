export const perms = {
  adminPanel: {
    view: "Pages",
    demoUiComponents: {
      view: "Pages.DemoUiComponents",
    },
    administration: {
      view: "Pages.Administration",
      roles: {
        view: "Pages.Administration.Roles",
        create: "Pages.Administration.Roles.Create",
        edit: "Pages.Administration.Roles.Edit",
        delete: "Pages.Administration.Roles.Delete",
      },
      users: {
        view: "Pages.Administration.Users",
        create: "Pages.Administration.Users.Create",
        edit: "Pages.Administration.Users.Edit",
        delete: "Pages.Administration.Users.Delete",
        changePermissions: "Pages.Administration.Users.ChangePermissions",
        impersonation: "Pages.Administration.Users.Impersonation",
        unlock: "Pages.Administration.Users.Unlock",
        changeProfilePic: "Pages.Administration.Users.ChangeProfilePicture",
      },
      languages: {
        view: "Pages.Administration.Languages",
        create: "Pages.Administration.Languages.Create",
        edit: "Pages.Administration.Languages.Edit",
        delete: "Pages.Administration.Languages.Delete",
        changeTexts: "Pages.Administration.Languages.ChangeTexts",
        changeDefaultLanguage:
          "Pages.Administration.Languages.ChangeDefaultLanguage",
      },
      auditLogs: {
        view: "Pages.Administration.AuditLogs",
      },
      organizationUnits: {
        view: "Pages.Administration.OrganizationUnits",
        manageOrganizationTree:
          "Pages.Administration.OrganizationUnits.ManageOrganizationTree",
        manageMembers: "Pages.Administration.OrganizationUnits.ManageMembers",
        manageRoles: "Pages.Administration.OrganizationUnits.ManageRoles",
      },
      uiCustomization: {
        view: "Pages.Administration.UiCustomization",
      },
      webhookSubscription: {
        view: "Pages.Administration.WebhookSubscription",
        create: "Pages.Administration.WebhookSubscription.Create",
        edit: "Pages.Administration.WebhookSubscription.Edit",
        changeActivity:
          "Pages.Administration.WebhookSubscription.ChangeActivity",
        detail: "Pages.Administration.WebhookSubscription.Detail",
      },
      webhook: {
        listSendAttempts: "Pages.Administration.Webhook.ListSendAttempts",
        resendWebhook: "Pages.Administration.Webhook.ResendWebhook",
      },
      dynamicProperties: {
        view: "Pages.Administration.DynamicProperties",
        create: "Pages.Administration.DynamicProperties.Create",
        edit: "Pages.Administration.DynamicProperties.Edit",
        delete: "Pages.Administration.DynamicProperties.Delete",
      },
      dynamicPropertyValue: {
        view: "Pages.Administration.DynamicPropertyValue",
        create: "Pages.Administration.DynamicPropertyValue.Create",
        edit: "Pages.Administration.DynamicPropertyValue.Edit",
        delete: "Pages.Administration.DynamicPropertyValue.Delete",
      },
      dynamicEntityProperties: {
        view: "Pages.Administration.DynamicEntityProperties",
        create: "Pages.Administration.DynamicEntityProperties.Create",
        edit: "Pages.Administration.DynamicEntityProperties.Edit",
        delete: "Pages.Administration.DynamicEntityProperties.Delete",
      },
      dynamicEntityPropertyValue: {
        view: "Pages.Administration.DynamicEntityPropertyValue",
        create: "Pages.Administration.DynamicEntityPropertyValue.Create",
        edit: "Pages.Administration.DynamicEntityPropertyValue.Edit",
        delete: "Pages.Administration.DynamicEntityPropertyValue.Delete",
      },

      massNotification: {
        view: "Pages.Administration.MassNotification",
        create: "Pages.Administration.MassNotification.Create",
      },
      tenant: {
        settings: "Pages.Administration.Tenant.Settings",
        subscriptionManagement:
          "Pages.Administration.Tenant.SubscriptionManagement",
      },
      host: {
        maintenance: "Pages.Administration.Host.Maintenance",
      },
      hangfireDashboard: {
        view: "Pages.Administration.HangfireDashboard",
      },
      newVersion: {
        create: "Pages_Administration_NewVersion_Create",
      },
    },
    pairs: {
      view: "Pages.Pairs",
      create: "Pages.Pairs.Create",
      edit: "Pages.Pairs.Edit",
      delete: "Pages.Pairs.Delete",
      documents: {
        view: "Pages.Pair.Documents",
        create: "Pages.Pair.Documents.Create",
        edit: "Pages.Pair.Documents.Edit",
        delete: "Pages.Pair.Documents.Delete",
      },
      perks: {
        view: "Pages.Pair.Perks",
        create: "Pages.Pair.Perks.Create",
        edit: "Pages.Pair.Perks.Edit",
        delete: "Pages.Pair.Perks.Delete",
      },
      uiKeyValue: {
        view: "Pages.Pair.UIKeyValue",
        create: "Pages.Pair.UIKeyValue.Create",
        edit: "Pages.Pair.UIKeyValue.Edit",
        delete: "Pages.Pair.UIKeyValue.Delete",
      },
      covers: {
        view: "Pages.Pair.Covers",
        create: "Pages.Pair.Covers.Create",
        edit: "Pages.Pair.Covers.Edit",
        delete: "Pages.Pair.Covers.Delete",
      },
    },
    categories: {
      view: "Pages.Categories",
      create: "Pages.Categories.Create",
      edit: "Pages.Categories.Edit",
      delete: "Pages.Categories.Delete",
    },
    owners: {
      view: "Pages.Owners",
      create: "Pages.Owners.Create",
      edit: "Pages.Owners.Edit",
      delete: "Pages.Owners.Delete",
    },
    baseInformation: {
      news: {
        view: "Pages.BaseInformation.News",
        edit: "Pages.BaseInformation.News.Edit",
        delete: "Pages.BaseInformation.News.Delete",
      },
    },
    news: {
      create: "Pages.News.Create",
    },
    miFIDTests: {
      view: "Pages.MiFIDTests",
      create: "Pages.MiFIDTests.Create",
      edit: "Pages.MiFIDTests.Edit",
      delete: "Pages.MiFIDTests.Delete",
    },

    miFIDTestAnswers: {
      view: "Pages.MiFIDTestAnswers",
      create: "Pages.MiFIDTestAnswers.Create",
      edit: "Pages.MiFIDTestAnswers.Edit",
      delete: "Pages.MiFIDTestAnswers.Delete",
    },

    miFIDTestQuestions: {
      view: "Pages.MiFIDTestQuestions",
      create: "Pages.MiFIDTestQuestions.Create",
      edit: "Pages.MiFIDTestQuestions.Edit",
      delete: "Pages.MiFIDTestQuestions.Delete",
    },

    staticPages: {
      view: "Pages.StaticPages",
      create: "Pages.StaticPages.Create",
      edit: "Pages.StaticPages.Edit",
      delete: "Pages.StaticPages.Delete",
    },

    topUpTransactions: {
      view: "Pages.TopUpTransactions",
    },

    withdrawTransactions: {
      view: "Pages.WithdrawTrasnsactions",
    },

    localOrders: {
      view: "Pages.LocalOrders.View",
      cancelOrder: "Pages.LocalOrders.CancelOrder",
      export: "Pages.LocalOrders.Export",
    },

    localTrades: {
      view: "Pages.LocalTrades",
      export: "Pages.LocalTrades.Export",
    },

    exchangeTransactions: {
      view: "Pages.ExchangeTransactions.View",
      export: "Pages.ExchangeTransactions.Export",
    },

    feeCalculation: {
      view: "Pages.FeeCalculation",
      export: "Pages.FeeCalculation.Export",
    },

    cashBalance: {
      view: "Pages.CashBalance",
      export: "Pages.CashBalance.Export",
    },

    assetBalance: {
      view: "Pages.AssetBalance",
      export: "Pages.AssetBalance.Export",
    },

    cashPosting: {
      view: "Pages.CashPosting",
      export: "Pages.CashPosting.Export",
    },

    dashboardDef: {
      view: "Pages.DashboardDef.View",
    },

    localOrderEventHistory: {
      view: "Pages.LocalOrderEventHistory.View",
      export: "Pages.LocalOrderEventHistory.Export",
    },

    rabbitExchangeOrderResponses: {
      view: "Pages.RabbitExchangeOrderResponses.View",
    },

    rabbitExchangeTradeResponses: {
      view: "Pages.RabbitExchangeTradeResponses.View",
    },

    debitAndCredit: {
      view: "Pages.DebitAndCredit.View",
      export: "Pages.DebitAndCredit.Export",
    },

    balance: {
      view: "Pages.Balance",
      export: "Pages.Balance.Export",
    },

    accountNames: {
      view: "Pages.AccountNames",
    },

    tenantDashboard: {
      view: "Pages.Tenant.Dashboard",
    },
  },
};
