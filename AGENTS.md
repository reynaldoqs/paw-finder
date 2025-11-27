# Agent Development Rules

## TypeScript

- Use `type` instead of `interface` for type definitions
- Use `React.FC<Props>` for functional components
- Prefer `React.forwardRef` for reusable UI components
- Import types with `type` keyword: `import type { Config } from "..."`

## Code Style

- **Formatter**: Biome with tabs (indentStyle: "tab")
- **Quotes**: Double quotes for strings
- **Imports**: Auto-organized and sorted
- **Comments**: Avoid unnecessary comments; use biome-ignore only when needed
- **Semicolons**: Always use semicolons

## Component Architecture

- **Atomic Design**: atoms → molecules → organisms
- **Client Components**: Mark with `"use client"` at top when using hooks/state
- **Server Components**: Default; use for data fetching (e.g., Supabase queries)

## Styling

- **TailwindCSS**: Primary styling method
- **cn() utility**: Use for conditional/merged classNames
- **Responsive**: Mobile-first with breakpoints (sm, md, lg)
- **Theme**: Support dark mode with `next-themes`

## UI Components

- **Radix UI**: Base for accessible primitives
- **shadcn/ui**: Component patterns
- **Lucide/FontAwesome**: Icons
- **CVA**: Component variants with `class-variance-authority`

## State & Forms

- **Forms**: `react-hook-form` + `zod` validation
- **State**: `useState` for local, avoid unnecessary global state
- **Supabase**: Server components for queries, client for mutations

## File Naming

- **Components**: kebab-case (e.g., `main-navbar.tsx`)
- **Types**: kebab-case (e.g., `animal.ts`)
- **Exports**: Named exports preferred

## Best Practices

- Set `displayName` on forwardRef components
- Use semantic HTML and ARIA attributes
- Close modals/menus on navigation
- Handle loading/error states
- Clean up effects (e.g., URL.revokeObjectURL)
