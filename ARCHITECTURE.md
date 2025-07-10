# Admin Panel Architecture Guide

## Overview

This admin panel follows **Uncle Bob's Clean Code principles** with a **feature-first architecture**. The codebase is organized by business features rather than technical file types, promoting better maintainability, scalability, and team collaboration.

## 🏗️ Directory Structure

```
src/
├── features/                    # Feature-based organization
│   ├── auth/                   # Authentication feature
│   │   ├── components/         # Auth-specific components
│   │   │   ├── login-form.tsx
│   │   │   ├── forgot-password.tsx
│   │   │   ├── auth-header.tsx
│   │   │   └── index.ts        # Barrel exports
│   │   └── data/              # Auth-related static data (if needed)
│   │
│   ├── dashboard/             # Dashboard feature
│   │   ├── components/        # Dashboard-specific components
│   │   │   ├── section-cards.tsx
│   │   │   ├── chart-area-interactive.tsx
│   │   │   ├── data-table.tsx
│   │   │   └── index.ts       # Barrel exports
│   │   └── data/             # Dashboard static data
│   │       ├── chart-data.ts
│   │       └── table-chart-data.ts
│   │
│   ├── navigation/           # Navigation feature
│   │   ├── components/       # Navigation components
│   │   │   ├── app-sidebar.tsx
│   │   │   ├── nav-main.tsx
│   │   │   ├── nav-tree.tsx
│   │   │   ├── nav-user.tsx
│   │   │   ├── nav-secondary.tsx
│   │   │   ├── nav-documents.tsx
│   │   │   └── index.ts      # Barrel exports
│   │   └── data/            # Navigation static data
│   │       ├── sidebar-data.ts
│   │       └── tree-data.ts
│   │
│   └── documents/           # Documents feature
│       └── data/           # Document-related data
│           └── documents.json
│
└── shared/                 # Shared utilities and components
    ├── components/         # Reusable UI components
    │   ├── ui/            # Base UI components (shadcn/ui)
    │   │   ├── button.tsx
    │   │   ├── input.tsx
    │   │   ├── sidebar.tsx
    │   │   └── ...
    │   ├── layout/        # Layout-specific components
    │   │   └── site-header.tsx
    │   └── widgets/       # Feature-agnostic widgets
    │       ├── theme-toggle.tsx
    │       ├── color-switcher.tsx
    │       └── color-theme-provider.tsx
    ├── hooks/             # Shared custom hooks
    │   ├── use-mobile.ts
    │   └── use-storage-state.ts
    └── lib/              # Shared utilities and configurations
        ├── utils.ts
        ├── helper.ts
        ├── query.ts
        ├── locales/      # Internationalization
        ├── storage/      # Storage utilities
        └── themes/       # Theme configurations
```

## 🎯 Core Principles

### 1. **Feature-First Organization**

- Files are grouped by business features, not technical types
- Each feature contains its own components, data, and logic
- Related functionality stays together

### 2. **Separation of Concerns**

- **Components**: UI logic and presentation
- **Data**: Static data and configurations extracted from components
- **Shared**: Reusable utilities across features

### 3. **Clear Import Paths**

- `@/features/*` for feature-specific imports
- `@/shared/*` for shared utilities and components

## 📝 How to Add New Files

### Adding a New Feature

When adding a completely new business feature (e.g., "reports", "settings", "users"):

1. **Create the feature directory structure:**

```bash
mkdir -p src/features/your-feature/{components,data}
```

2. **Create the main component:**

```typescript
// src/features/your-feature/components/your-main-component.tsx
import { Card } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";

export function YourMainComponent() {
  return (
    <Card>
      <h2>Your Feature</h2>
      {/* Component logic */}
    </Card>
  );
}
```

3. **Extract static data (if applicable):**

```typescript
// src/features/your-feature/data/your-feature-data.ts
export const yourFeatureConfig = {
  title: "Your Feature",
  description: "Feature description",
  // ... other static data
};
```

4. **Create barrel exports:**

```typescript
// src/features/your-feature/components/index.ts
export { YourMainComponent } from "./your-main-component";
export { AnotherComponent } from "./another-component";
```

5. **Use in app pages:**

```typescript
// app/your-feature/page.tsx
import { YourMainComponent } from "@/features/your-feature/components";

export default function YourFeaturePage() {
  return <YourMainComponent />;
}
```

### Adding Components to Existing Features

When adding a new component to an existing feature:

1. **Create the component file:**

```typescript
// src/features/dashboard/components/new-chart.tsx
import { Card } from "@/shared/components/ui/card";
import { chartData } from "../data/chart-data";

export function NewChart() {
  // Component implementation
}
```

2. **Update the barrel exports:**

```typescript
// src/features/dashboard/components/index.ts
export { SectionCards } from "./section-cards";
export { ChartAreaInteractive } from "./chart-area-interactive";
export { DataTable } from "./data-table";
export { NewChart } from "./new-chart"; // Add this line
```

3. **Extract any static data:**

```typescript
// src/features/dashboard/data/new-chart-data.ts
export const newChartConfig = {
  // Chart configuration
};
```

### Adding Shared Components

For components that will be used across multiple features:

1. **Determine the appropriate shared category:**

   - `ui/` - Base UI components (usually from shadcn/ui)
   - `layout/` - Layout-specific components
   - `widgets/` - Feature-agnostic widgets

2. **Create the component:**

```typescript
// src/shared/components/widgets/notification-bell.tsx
import { Bell } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export function NotificationBell() {
  // Implementation
}
```

3. **Use from any feature:**

```typescript
// src/features/dashboard/components/header.tsx
import { NotificationBell } from "@/shared/components/widgets/notification-bell";
```

### Adding Shared Utilities

For shared hooks, utilities, or configurations:

1. **Create in appropriate shared directory:**

```typescript
// src/shared/hooks/use-api.ts
export function useApi() {
  // Hook implementation
}

// src/shared/lib/api-client.ts
export const apiClient = {
  // API utilities
};
```

2. **Use from any feature:**

```typescript
// src/features/dashboard/components/data-table.tsx
import { useApi } from "@/shared/hooks/use-api";
import { apiClient } from "@/shared/lib/api-client";
```

## 🔄 Data Extraction Guidelines

### When to Extract Data

Extract static data from components when:

- Data is hardcoded within the component
- Configuration objects are large (>10 properties)
- Data might be reused elsewhere
- Data changes frequently and needs easy access

### How to Extract Data

**Before (Mixed Concerns):**

```typescript
// ❌ Bad: Data mixed with component logic
export function NavSidebar() {
  const menuItems = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Analytics", url: "/analytics", icon: BarChart },
    // ... many more items
  ];

  return (
    <nav>
      {menuItems.map((item) => (
        <NavItem key={item.title} {...item} />
      ))}
    </nav>
  );
}
```

**After (Separated Concerns):**

```typescript
// ✅ Good: Data extracted to separate file
// src/features/navigation/data/sidebar-data.ts
export const sidebarMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Analytics", url: "/analytics", icon: BarChart },
  // ... configuration data
];

// src/features/navigation/components/nav-sidebar.tsx
import { sidebarMenuItems } from "../data/sidebar-data";

export function NavSidebar() {
  return (
    <nav>
      {sidebarMenuItems.map((item) => (
        <NavItem key={item.title} {...item} />
      ))}
    </nav>
  );
}
```

## 📁 Import Path Guidelines

### Import Patterns

```typescript
// ✅ Feature imports
import { LoginForm } from "@/features/auth/components";
import { DashboardChart } from "@/features/dashboard/components";

// ✅ Shared imports
import { Button } from "@/shared/components/ui/button";
import { useApi } from "@/shared/hooks/use-api";

// ✅ Relative imports within same feature
import { authConfig } from "../data/auth-config";

// ❌ Avoid cross-feature imports
import { DashboardChart } from "@/features/dashboard/components"; // in auth feature
```

### TypeScript Configuration

The project uses path mappings in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*", "./app/*", "./*"],
      "@/features/*": ["./src/features/*"],
      "@/shared/*": ["./src/shared/*"]
    }
  }
}
```

## 🚀 Benefits of This Architecture

1. **Scalability**: Easy to add new features without affecting existing code
2. **Maintainability**: Related code stays together
3. **Team Collaboration**: Clear ownership boundaries
4. **Testability**: Features can be tested in isolation
5. **Reusability**: Shared components and utilities are easily accessible
6. **Clean Code**: Follows Uncle Bob's principles of separation of concerns

## 🔧 Migration Checklist

When moving files to this structure:

- [ ] Create appropriate feature/shared directories
- [ ] Extract static data from components
- [ ] Update import paths to use new structure
- [ ] Create barrel exports (`index.ts`) for clean imports
- [ ] Update TypeScript path mappings if needed
- [ ] Remove old directories after migration
- [ ] Test build and functionality

## 💡 Best Practices

1. **Keep features independent**: Avoid importing from other features
2. **Extract configuration**: Move static data to separate files
3. **Use barrel exports**: Create `index.ts` files for clean imports
4. **Follow naming conventions**: Use descriptive, feature-specific names
5. **Group related functionality**: Keep components, data, and logic together
6. **Prefer composition**: Build features from shared components
7. **Document decisions**: Update this guide when adding new patterns

---

This architecture ensures the codebase remains clean, maintainable, and scalable as the project grows. Each new feature or component should follow these established patterns for consistency.
