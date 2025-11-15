# Tasks App

A task management application built with React and TypeScript.

## Tech Stack

[Vite](https://vitejs.dev/) + [React 19](https://react.dev/) boilerplate with [TypeScript](https://www.typescriptlang.org/) & [Tailwind CSS](https://tailwindcss.com/). Using [Radix UI](https://www.radix-ui.com/) for headless UI components, [TanStack Router](https://tanstack.com/router) for type-safe routes, [React Hook Form](https://react-hook-form.com/) along with [Zod](https://zod.dev/) for schema validation, and [Zustand](https://zustand.docs.pmnd.rs/) for global state management with their persist plugin to sync state with localStorage.

## Notes

- Using [crypto.randomUUID()](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID) for generating collision-safe unique UUIDs. It has good browser support, but in real-world scenarios, this is typically handled at the backend.
- Using [Zustand](https://zustand.docs.pmnd.rs/) to demonstrate real-world patterns, alongside using state through individual queries for optimal re-renders.
- Tried to mimic the given Figma design as closely as possible, retaining the same look and feel even on desktop.

## How to Run

### Prerequisites
- Node.js (version 20.19+, 22.12+)
- npm or yarn package manager

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Production
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Linting
```bash
# Run ESLint
npm run lint
```
