import {
  IconFolder,
  IconFile,
  IconFileText,
  IconChartBar,
  IconLock,
  IconCode,
  IconSearch,
  IconCurrencyDollar,
  IconPalette,
  IconShield,
  IconUsers,
  IconSettings,
  IconDatabase,
  IconDeviceMobile,
  IconCloudComputing,
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
    id: "documentation",
    name: "Documentation",
    icon: IconFolder,
    children: [
      {
        id: "cover-page",
        name: "Cover page",
        icon: IconFileText,
        url: "/documents/1",
      },
      {
        id: "table-of-contents",
        name: "Table of contents",
        icon: IconFile,
        url: "/documents/2",
      },
      {
        id: "executive-summary",
        name: "Executive summary",
        icon: IconFileText,
        url: "/documents/3",
      },
      {
        id: "api-documentation",
        name: "API Documentation",
        icon: IconCode,
        url: "/documents/24",
      },
      {
        id: "compliance-documentation",
        name: "Compliance Documentation",
        icon: IconShield,
        url: "/documents/23",
      },
    ],
  },
  {
    id: "technical",
    name: "Technical",
    icon: IconFolder,
    children: [
      {
        id: "technical-approach",
        name: "Technical approach",
        icon: IconFileText,
        url: "/documents/4",
      },
      {
        id: "system-architecture",
        name: "System Architecture Overview",
        icon: IconCode,
        url: "/documents/21",
      },
      {
        id: "database-schema",
        name: "Database Schema",
        icon: IconDatabase,
        url: "/documents/26",
      },
      {
        id: "testing-methodology",
        name: "Testing Methodology",
        icon: IconSettings,
        url: "/documents/27",
      },
      {
        id: "performance-metrics",
        name: "Performance Metrics",
        icon: IconChartBar,
        url: "/documents/35",
      },
      {
        id: "disaster-recovery",
        name: "Disaster Recovery Plan",
        icon: IconShield,
        url: "/documents/36",
      },
      {
        id: "third-party-integrations",
        name: "Third-party Integrations",
        icon: IconCloudComputing,
        url: "/documents/37",
      },
      {
        id: "mobile-compatibility",
        name: "Mobile Compatibility",
        icon: IconDeviceMobile,
        url: "/documents/40",
      },
      {
        id: "data-migration",
        name: "Data Migration Plan",
        icon: IconDatabase,
        url: "/documents/41",
      },
      {
        id: "quality-assurance",
        name: "Quality Assurance Protocols",
        icon: IconSettings,
        url: "/documents/42",
      },
      {
        id: "maintenance-plan",
        name: "Maintenance Plan",
        icon: IconSettings,
        url: "/documents/32",
      },
    ],
  },
  {
    id: "research",
    name: "Research",
    icon: IconFolder,
    children: [
      {
        id: "market-analysis",
        name: "Market Analysis",
        icon: IconChartBar,
        url: "/documents/30",
      },
      {
        id: "competitor-comparison",
        name: "Competitor Comparison",
        icon: IconSearch,
        url: "/documents/31",
      },
      {
        id: "user-personas",
        name: "User Personas",
        icon: IconUsers,
        url: "/documents/33",
      },
      {
        id: "user-feedback",
        name: "User Feedback Summary",
        icon: IconUsers,
        url: "/documents/38",
      },
      {
        id: "stakeholder-analysis",
        name: "Stakeholder Analysis",
        icon: IconUsers,
        url: "/documents/43",
      },
      {
        id: "environmental-impact",
        name: "Environmental Impact Assessment",
        icon: IconSearch,
        url: "/documents/44",
      },
    ],
  },
  {
    id: "planning",
    name: "Planning",
    icon: IconFolder,
    children: [
      {
        id: "design",
        name: "Design",
        icon: IconPalette,
        url: "/documents/5",
      },
      {
        id: "capabilities",
        name: "Capabilities",
        icon: IconFileText,
        url: "/documents/6",
      },
      {
        id: "deployment-strategy",
        name: "Deployment Strategy",
        icon: IconSettings,
        url: "/documents/28",
      },
      {
        id: "future-roadmap",
        name: "Future Development Roadmap",
        icon: IconFileText,
        url: "/documents/20",
      },
      {
        id: "risk-management",
        name: "Risk Management Plan",
        icon: IconShield,
        url: "/documents/22",
      },
      {
        id: "localization-strategy",
        name: "Localization Strategy",
        icon: IconFileText,
        url: "/documents/39",
      },
    ],
  },
  {
    id: "business",
    name: "Business",
    icon: IconFolder,
    children: [
      {
        id: "innovation-advantages",
        name: "Innovation and Advantages",
        icon: IconFileText,
        url: "/documents/8",
      },
      {
        id: "past-performance",
        name: "Past Performance",
        icon: IconChartBar,
        url: "/documents/13",
      },
      {
        id: "cost-benefit",
        name: "Cost-Benefit Analysis",
        icon: IconCurrencyDollar,
        url: "/documents/18",
      },
      {
        id: "budget-breakdown",
        name: "Budget Breakdown",
        icon: IconCurrencyDollar,
        url: "/documents/29",
      },
    ],
  },
  {
    id: "security",
    name: "Security & Compliance",
    icon: IconFolder,
    children: [
      {
        id: "security-measures",
        name: "Security Measures and Data Protection Policies",
        icon: IconLock,
        url: "/documents/16",
      },
      {
        id: "accessibility-compliance",
        name: "Accessibility Compliance",
        icon: IconShield,
        url: "/documents/34",
      },
    ],
  },
  {
    id: "features",
    name: "Features & Innovation",
    icon: IconFolder,
    children: [
      {
        id: "emr-solutions",
        name: "Overview of EMR's Innovative Solutions",
        icon: IconCode,
        url: "/documents/9",
      },
      {
        id: "advanced-algorithms",
        name: "Advanced Algorithms and Machine Learning",
        icon: IconCode,
        url: "/documents/10",
      },
      {
        id: "adaptive-protocols",
        name: "Adaptive Communication Protocols",
        icon: IconCode,
        url: "/documents/11",
      },
      {
        id: "advantages-tech",
        name: "Advantages Over Current Technologies",
        icon: IconFileText,
        url: "/documents/12",
      },
      {
        id: "integration-systems",
        name: "Integration with existing systems",
        icon: IconCloudComputing,
        url: "/documents/7",
      },
      {
        id: "scalability",
        name: "Scalability and Future Proofing",
        icon: IconSettings,
        url: "/documents/17",
      },
    ],
  },
  {
    id: "training",
    name: "Training & Support",
    icon: IconFolder,
    children: [
      {
        id: "user-training",
        name: "User Training and Onboarding Experience",
        icon: IconUsers,
        url: "/documents/19",
      },
      {
        id: "customer-feedback",
        name: "Customer Feedback and Satisfaction Levels",
        icon: IconUsers,
        url: "/documents/14",
      },
      {
        id: "implementation-challenges",
        name: "Implementation Challenges and Solutions",
        icon: IconSettings,
        url: "/documents/15",
      },
    ],
  },
  {
    id: "design-visual",
    name: "Design & Visual",
    icon: IconFolder,
    children: [
      {
        id: "ui-mockups",
        name: "User Interface Mockups",
        icon: IconPalette,
        url: "/documents/25",
      },
    ],
  },
];
